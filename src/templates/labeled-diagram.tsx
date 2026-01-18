import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';
import { GeneratedContent } from '@/lib/api/openai';
import { ResolvedAsset } from '@/lib/assets/resolver';
import { fonts, fontSizes, colors, pageDimensions, spacing } from '@/lib/pdf/fonts';
import { Header, HeaderConfig, FooterConfig } from '@/lib/pdf/base-components';

const styles = StyleSheet.create({
  page: {
    padding: pageDimensions.margin,
    fontFamily: fonts.primary,
    fontSize: fontSizes.body,
    backgroundColor: '#ffffff',
  },
  instructions: {
    fontSize: fontSizes.body,
    marginBottom: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.lightBg,
    borderRadius: 4,
  },
  diagramSection: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  diagramContainer: {
    width: '100%',
    height: 280,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  diagramImage: {
    maxWidth: '95%',
    maxHeight: 260,
    objectFit: 'contain',
  },
  diagramPlaceholder: {
    fontSize: fontSizes.body,
    color: colors.muted,
    textAlign: 'center',
  },
  labelLinesSection: {
    marginTop: spacing.lg,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottom: `0.5pt solid ${colors.border}`,
  },
  labelNumber: {
    width: 24,
    fontSize: fontSizes.body,
    fontFamily: fonts.heading,
    color: colors.primary,
  },
  labelLine: {
    flex: 1,
    borderBottom: `1pt solid ${colors.text}`,
    marginRight: spacing.md,
    height: 16,
  },
  labelHint: {
    fontSize: fontSizes.small,
    color: colors.muted,
    width: 180,
  },
  wordBankContainer: {
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: '#e8f5e9',
    borderRadius: 4,
    border: `1pt solid #4caf50`,
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

// Extended content interface for labeled diagrams
interface LabeledDiagramContent extends GeneratedContent {
  diagramKeywords?: string[];
}

interface LabeledDiagramProps {
  content: LabeledDiagramContent;
  assets?: ResolvedAsset[];
  showAnswerKey?: boolean;
  headerConfig?: Partial<HeaderConfig>;
  footerConfig?: Partial<FooterConfig>;
}

// Shuffle array for word bank
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function LabeledDiagram({ 
  content, 
  assets = [],
  showAnswerKey = true,
  headerConfig,
  footerConfig: _footerConfig,
}: LabeledDiagramProps) {
  const { title, instructions, items } = content;

  // Get the main diagram image (first asset)
  const diagramImage = assets.length > 0 ? assets[0] : null;

  // Create word bank from terms (shuffled)
  const wordBank = shuffleArray(items.map(item => item.term || ''));

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <Header 
          title={title} 
          subtitle="Labeled Diagram"
          config={headerConfig}
        />

        {/* Instructions */}
        <View style={styles.instructions}>
          <Text>{instructions || 'Label the parts of the diagram using the word bank below.'}</Text>
        </View>

        {/* Diagram Section */}
        <View style={styles.diagramSection}>
          <View style={styles.diagramContainer}>
            {diagramImage ? (
              <Image
                src={diagramImage.previewUrl}
                style={styles.diagramImage}
              />
            ) : (
              <Text style={styles.diagramPlaceholder}>
                [Diagram: {title}]
              </Text>
            )}
          </View>
        </View>

        {/* Label Lines */}
        <View style={styles.labelLinesSection}>
          {items.map((item, idx) => (
            <View key={idx} style={styles.labelRow}>
              <Text style={styles.labelNumber}>{idx + 1}.</Text>
              <View style={styles.labelLine} />
              <Text style={styles.labelHint}>
                {item.definition ? `(${item.definition.substring(0, 40)}${item.definition.length > 40 ? '...' : ''})` : ''}
              </Text>
            </View>
          ))}
        </View>

        {/* Word Bank */}
        <View style={styles.wordBankContainer}>
          <Text style={styles.wordBankTitle}>Word Bank</Text>
          <View style={styles.wordBankWords}>
            {wordBank.map((word, idx) => (
              <Text key={idx} style={styles.wordBankWord}>{word}</Text>
            ))}
          </View>
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
          
          {items.map((item, idx) => (
            <View key={idx} style={styles.answerKeyItem}>
              <Text style={styles.answerKeyNumber}>{idx + 1}.</Text>
              <Text style={styles.answerKeyText}>{item.term}</Text>
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
