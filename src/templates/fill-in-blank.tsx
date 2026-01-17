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
    marginBottom: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.lightBg,
    borderRadius: 4,
  },
  wordBankContainer: {
    marginBottom: spacing.lg,
    padding: spacing.md,
    backgroundColor: '#fff8e1',
    borderRadius: 4,
    border: `1pt solid #ffc107`,
  },
  wordBankTitle: {
    fontSize: fontSizes.body,
    fontFamily: fonts.heading,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  wordBankWords: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  wordBankWord: {
    fontSize: fontSizes.body,
    fontFamily: fonts.heading,
    padding: `${spacing.xs}pt ${spacing.sm}pt`,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    border: `0.5pt solid ${colors.border}`,
    marginRight: spacing.sm,
    marginBottom: spacing.xs,
  },
  passageContainer: {
    marginTop: spacing.md,
    lineHeight: 2.2,
  },
  passageText: {
    fontSize: fontSizes.body,
    lineHeight: 2.2,
    textAlign: 'justify',
  },
  sentenceContainer: {
    marginBottom: spacing.lg,
  },
  sentenceRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    alignItems: 'flex-start',
  },
  sentenceNumber: {
    fontSize: fontSizes.body,
    fontFamily: fonts.heading,
    width: 24,
    color: colors.primary,
  },
  sentenceText: {
    fontSize: fontSizes.body,
    flex: 1,
    lineHeight: 1.8,
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
  answerKeyItem: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  answerKeyNumber: {
    width: 30,
    fontFamily: fonts.heading,
  },
  answerKeyText: {
    flex: 1,
  },
});

// Extended content interface for fill-in-blank
interface FillInBlankContent extends GeneratedContent {
  wordBank?: string[];
  passage?: string;
  sentences?: string[];
}

interface FillInBlankProps {
  content: FillInBlankContent;
  showAnswerKey?: boolean;
  headerConfig?: Partial<HeaderConfig>;
  footerConfig?: Partial<FooterConfig>;
}

export function FillInBlank({ 
  content, 
  showAnswerKey = true,
  headerConfig,
  footerConfig: _footerConfig,
}: FillInBlankProps) {
  const { title, instructions, wordBank, passage, sentences, items, answerKey } = content;

  // Use either passage or items/sentences format
  const hasSentences = sentences && sentences.length > 0;
  const hasPassage = passage && passage.length > 0;
  const hasItems = items && items.length > 0 && items.some(item => item.question);

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <Header 
          title={title} 
          subtitle="Fill in the Blanks"
          config={headerConfig}
        />

        {/* Instructions */}
        {instructions && (
          <View style={styles.instructions}>
            <Text>{instructions}</Text>
          </View>
        )}

        {/* Word Bank */}
        {wordBank && wordBank.length > 0 && (
          <View style={styles.wordBankContainer}>
            <Text style={styles.wordBankTitle}>Word Bank</Text>
            <View style={styles.wordBankWords}>
              {wordBank.map((word, idx) => (
                <Text key={idx} style={styles.wordBankWord}>{word}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Passage Format */}
        {hasPassage && (
          <View style={styles.passageContainer}>
            <Text style={styles.passageText}>{passage}</Text>
          </View>
        )}

        {/* Sentences Format */}
        {hasSentences && (
          <View style={styles.sentenceContainer}>
            {sentences.map((sentence, idx) => (
              <View key={idx} style={styles.sentenceRow}>
                <Text style={styles.sentenceNumber}>{idx + 1}.</Text>
                <Text style={styles.sentenceText}>{sentence}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Items Format (questions) */}
        {hasItems && !hasSentences && !hasPassage && (
          <View style={styles.sentenceContainer}>
            {items.map((item, idx) => (
              <View key={idx} style={styles.sentenceRow}>
                <Text style={styles.sentenceNumber}>{idx + 1}.</Text>
                <Text style={styles.sentenceText}>{item.question}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text>© Worksheet Generator</Text>
          <Text>Page 1 of {showAnswerKey && answerKey ? 2 : 1}</Text>
        </View>
      </Page>

      {/* Answer Key Page */}
      {showAnswerKey && answerKey && answerKey.length > 0 && (
        <Page size="LETTER" style={styles.page}>
          <Header 
            title={title} 
            subtitle="Answer Key"
            config={{ ...headerConfig, showNameField: false, showDateField: false, showScoreField: false }}
          />

          <Text style={styles.answerKeyTitle}>Answers</Text>
          
          {answerKey.map((item, idx) => (
            <View key={idx} style={styles.answerKeyItem}>
              <Text style={styles.answerKeyNumber}>{item.question}.</Text>
              <Text style={styles.answerKeyText}>{item.answer}</Text>
            </View>
          ))}

          <View style={styles.footer} fixed>
            <Text>© Worksheet Generator</Text>
            <Text>Answer Key</Text>
          </View>
        </Page>
      )}
    </Document>
  );
}
