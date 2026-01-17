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
  questionsContainer: {
    marginTop: spacing.md,
  },
  questionBlock: {
    marginBottom: spacing.lg,
    paddingBottom: spacing.md,
    borderBottom: `0.5pt solid ${colors.border}`,
  },
  questionRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  questionNumber: {
    fontSize: fontSizes.body,
    fontFamily: fonts.heading,
    width: 24,
    color: colors.primary,
  },
  questionText: {
    fontSize: fontSizes.body,
    flex: 1,
    lineHeight: 1.4,
  },
  optionsContainer: {
    marginLeft: 24,
    marginTop: spacing.sm,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  optionCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    border: `1.5pt solid ${colors.text}`,
    marginRight: spacing.sm,
    marginTop: 2,
  },
  optionText: {
    fontSize: fontSizes.body,
    flex: 1,
    lineHeight: 1.3,
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
  // Answer key page styles
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

interface MultipleChoiceProps {
  content: GeneratedContent;
  showAnswerKey?: boolean;
}

export function MultipleChoice({ content, showAnswerKey = true }: MultipleChoiceProps) {
  const { title, instructions, items, answerKey } = content;

  // Split questions into pages (about 5 questions per page)
  const questionsPerPage = 5;
  const pages: typeof items[] = [];
  for (let i = 0; i < items.length; i += questionsPerPage) {
    pages.push(items.slice(i, i + questionsPerPage));
  }

  return (
    <Document>
      {pages.map((pageItems, pageIndex) => (
        <Page key={pageIndex} size="LETTER" style={styles.page}>
          {/* Header - only on first page */}
          {pageIndex === 0 && (
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>Multiple Choice Quiz</Text>
              <View style={styles.nameSection}>
                <View style={styles.nameField}>
                  <Text style={styles.nameLabel}>Name:</Text>
                  <View style={styles.nameLine} />
                </View>
                <View style={styles.nameField}>
                  <Text style={styles.nameLabel}>Date:</Text>
                  <View style={[styles.nameLine, { width: 100 }]} />
                </View>
                <View style={styles.nameField}>
                  <Text style={styles.nameLabel}>Score:</Text>
                  <View style={[styles.nameLine, { width: 60 }]} />
                </View>
              </View>
            </View>
          )}

          {/* Instructions - only on first page */}
          {pageIndex === 0 && instructions && (
            <View style={styles.instructions}>
              <Text>{instructions}</Text>
            </View>
          )}

          {/* Questions */}
          <View style={styles.questionsContainer}>
            {pageItems.map((item, idx) => {
              const questionNumber = pageIndex * questionsPerPage + idx + 1;
              return (
                <View key={idx} style={styles.questionBlock} wrap={false}>
                  <View style={styles.questionRow}>
                    <Text style={styles.questionNumber}>{questionNumber}.</Text>
                    <Text style={styles.questionText}>{item.question}</Text>
                  </View>
                  
                  <View style={styles.optionsContainer}>
                    {item.options?.map((option, optIdx) => (
                      <View key={optIdx} style={styles.optionRow}>
                        <View style={styles.optionCircle} />
                        <Text style={styles.optionText}>{option}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              );
            })}
          </View>

          {/* Footer */}
          <View style={styles.footer} fixed>
            <Text>© Worksheet Generator</Text>
            <Text>Page {pageIndex + 1} of {pages.length + (showAnswerKey && answerKey ? 1 : 0)}</Text>
          </View>
        </Page>
      ))}

      {/* Answer Key Page */}
      {showAnswerKey && answerKey && answerKey.length > 0 && (
        <Page size="LETTER" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>Answer Key</Text>
          </View>

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
