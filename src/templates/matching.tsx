import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import { GeneratedContent } from '@/lib/api/openai';
import { fonts, fontSizes, colors, pageDimensions, spacing } from '@/lib/pdf/fonts';
import { Header, HeaderConfig, FooterConfig } from '@/lib/pdf/base-components';

const styles = StyleSheet.create({
  page: {
    padding: pageDimensions.margin,
    fontFamily: fonts.primary,
    fontSize: fontSizes.body,
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: spacing.lg,
    borderBottom: `2pt solid ${colors.primary}`,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: fontSizes.title,
    fontFamily: fonts.heading,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSizes.small,
    color: colors.muted,
  },
  nameSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTop: `1pt solid ${colors.border}`,
  },
  nameField: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameLabel: {
    fontSize: fontSizes.body,
    marginRight: spacing.xs,
  },
  nameLine: {
    width: 150,
    borderBottom: `1pt solid ${colors.text}`,
  },
  instructions: {
    fontSize: fontSizes.body,
    marginBottom: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.lightBg,
    borderRadius: 4,
  },
  matchingContainer: {
    marginTop: spacing.md,
  },
  columnHeaders: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottom: `1pt solid ${colors.border}`,
  },
  columnHeader: {
    fontFamily: fonts.heading,
    fontSize: fontSizes.body,
    color: colors.primary,
  },
  columnA: {
    width: '45%',
  },
  columnMiddle: {
    width: '10%',
    textAlign: 'center',
  },
  columnB: {
    width: '45%',
  },
  matchRow: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    alignItems: 'flex-start',
    minHeight: 40,
  },
  termContainer: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  termNumber: {
    fontSize: fontSizes.body,
    fontFamily: fonts.heading,
    width: 24,
    color: colors.primary,
  },
  termText: {
    fontSize: fontSizes.body,
    flex: 1,
    paddingRight: spacing.sm,
  },
  answerBlank: {
    width: 30,
    borderBottom: `1pt solid ${colors.text}`,
    marginLeft: spacing.xs,
    textAlign: 'center',
  },
  middleSection: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  definitionContainer: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  definitionLetter: {
    fontSize: fontSizes.body,
    fontFamily: fonts.heading,
    width: 24,
    color: colors.secondary,
  },
  definitionText: {
    fontSize: fontSizes.body,
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: pageDimensions.margin,
    left: pageDimensions.margin,
    right: pageDimensions.margin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: fontSizes.small,
    color: colors.muted,
    borderTop: `0.5pt solid ${colors.border}`,
    paddingTop: spacing.sm,
  },
  // Answer key styles
  answerKeyTitle: {
    fontSize: fontSizes.subtitle,
    fontFamily: fonts.heading,
    color: colors.primary,
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottom: `1pt solid ${colors.primary}`,
  },
  answerKeyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  answerKeyItem: {
    width: '20%',
    padding: spacing.sm,
    marginBottom: spacing.xs,
  },
  answerKeyText: {
    fontSize: fontSizes.body,
  },
});

interface MatchingProps {
  content: GeneratedContent;
  showAnswerKey?: boolean;
  headerConfig?: Partial<HeaderConfig>;
  footerConfig?: Partial<FooterConfig>;
}

// Shuffle array using Fisher-Yates
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function Matching({ 
  content, 
  showAnswerKey = true,
  headerConfig,
  footerConfig: _footerConfig,
}: MatchingProps) {
  const { title, instructions, items } = content;

  // Create shuffled definitions (Column B)
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const definitions = items.map((item, idx) => ({
    letter: letters[idx],
    text: item.definition || item.answer || '',
    matchesNumber: idx + 1,
  }));
  
  // Shuffle definitions for the worksheet
  const shuffledDefinitions = shuffleArray(definitions);

  // Generate answer key
  const answerKey = items.map((_, idx) => {
    const matchedDef = shuffledDefinitions.find(d => d.matchesNumber === idx + 1);
    return {
      question: String(idx + 1),
      answer: matchedDef?.letter || '',
    };
  });

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <Header 
          title={title} 
          subtitle="Matching"
          config={headerConfig}
        />

        {/* Instructions */}
        <View style={styles.instructions}>
          <Text>{instructions || 'Match each term in Column A with its definition in Column B. Write the letter of the correct answer on the line.'}</Text>
        </View>

        {/* Column Headers */}
        <View style={styles.columnHeaders}>
          <Text style={[styles.columnHeader, styles.columnA]}>Column A - Terms</Text>
          <Text style={[styles.columnHeader, styles.columnMiddle]}></Text>
          <Text style={[styles.columnHeader, styles.columnB]}>Column B - Definitions</Text>
        </View>

        {/* Matching Content */}
        <View style={styles.matchingContainer}>
          {items.map((item, idx) => (
            <View key={idx} style={styles.matchRow} wrap={false}>
              {/* Column A - Terms */}
              <View style={styles.termContainer}>
                <Text style={styles.termNumber}>{idx + 1}.</Text>
                <Text style={styles.termText}>{item.term || item.question}</Text>
                <View style={styles.answerBlank} />
              </View>

              {/* Middle spacer */}
              <View style={styles.middleSection} />

              {/* Column B - Definitions (shuffled) */}
              <View style={styles.definitionContainer}>
                <Text style={styles.definitionLetter}>{shuffledDefinitions[idx]?.letter}.</Text>
                <Text style={styles.definitionText}>{shuffledDefinitions[idx]?.text}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text>© Worksheet Generator</Text>
          <Text>Page 1 of {showAnswerKey ? 2 : 1}</Text>
        </View>
      </Page>

      {/* Answer Key Page */}
      {showAnswerKey && (
        <Page size="LETTER" style={styles.page}>
          <Header 
            title={title} 
            subtitle="Answer Key"
            config={{ ...headerConfig, showNameField: false, showDateField: false, showScoreField: false }}
          />

          <Text style={styles.answerKeyTitle}>Answers</Text>
          
          <View style={styles.answerKeyGrid}>
            {answerKey.map((item, idx) => (
              <View key={idx} style={styles.answerKeyItem}>
                <Text style={styles.answerKeyText}>
                  {item.question}. {item.answer}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.footer} fixed>
            <Text>© Worksheet Generator</Text>
            <Text>Answer Key</Text>
          </View>
        </Page>
      )}
    </Document>
  );
}
