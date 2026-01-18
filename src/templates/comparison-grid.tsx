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
  instructions: {
    fontSize: fontSizes.body,
    marginBottom: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.lightBg,
    borderRadius: 4,
  },
  tableContainer: {
    marginTop: spacing.md,
    border: `1.5pt solid ${colors.primary}`,
    borderRadius: 4,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
  },
  headerCell: {
    flex: 1,
    padding: spacing.sm,
    borderRight: `0.5pt solid rgba(255,255,255,0.3)`,
  },
  headerCellLast: {
    flex: 1,
    padding: spacing.sm,
  },
  headerText: {
    fontSize: fontSizes.body,
    fontFamily: fonts.heading,
    color: colors.white,
    textAlign: 'center',
  },
  dataRow: {
    flexDirection: 'row',
    borderBottom: `0.5pt solid ${colors.border}`,
    minHeight: 40,
  },
  dataRowLast: {
    flexDirection: 'row',
    minHeight: 40,
  },
  categoryCell: {
    flex: 1,
    padding: spacing.sm,
    borderRight: `0.5pt solid ${colors.border}`,
    backgroundColor: '#f0f7ff',
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: fontSizes.body,
    fontFamily: fonts.heading,
    color: colors.primary,
  },
  dataCell: {
    flex: 1,
    padding: spacing.sm,
    borderRight: `0.5pt solid ${colors.border}`,
    justifyContent: 'center',
  },
  dataCellLast: {
    flex: 1,
    padding: spacing.sm,
    justifyContent: 'center',
  },
  blankLine: {
    width: '90%',
    borderBottom: `1pt solid ${colors.text}`,
    marginTop: spacing.sm,
  },
  dataText: {
    fontSize: fontSizes.small,
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
  // Answer key styles
  answerKeyTitle: {
    fontSize: fontSizes.subtitle,
    fontFamily: fonts.heading,
    color: colors.primary,
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottom: `1pt solid ${colors.primary}`,
  },
  answerKeySection: {
    marginBottom: spacing.md,
  },
  answerKeyCategory: {
    fontSize: fontSizes.body,
    fontFamily: fonts.heading,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  answerKeyItem: {
    fontSize: fontSizes.small,
    marginLeft: spacing.md,
    marginBottom: spacing.xs,
  },
});

// Extended content interface for comparison grid
interface ComparisonItem {
  category: string;
  values: string[];
}

interface ComparisonGridContent extends GeneratedContent {
  subjects?: string[]; // Column headers (e.g., ["Reptiles", "Amphibians"])
  categories?: string[]; // Row headers (e.g., ["Skin", "Habitat", "Breathing"])
  data?: ComparisonItem[];
}

interface ComparisonGridProps {
  content: ComparisonGridContent;
  showAnswerKey?: boolean;
  showBlanks?: boolean; // If true, show blank lines instead of answers
  headerConfig?: Partial<HeaderConfig>;
  footerConfig?: Partial<FooterConfig>;
}

export function ComparisonGrid({ 
  content, 
  showAnswerKey = true,
  showBlanks = true,
  headerConfig,
  footerConfig: _footerConfig,
}: ComparisonGridProps) {
  const { title, instructions, subjects = [], data = [] } = content;

  // Extract categories from data if not provided
  const categories = data.map(item => item.category);

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <Header 
          title={title} 
          subtitle="Comparison Chart"
          config={headerConfig}
        />

        {/* Instructions */}
        <View style={styles.instructions}>
          <Text>{instructions || 'Compare the items by filling in the chart below.'}</Text>
        </View>

        {/* Comparison Table */}
        <View style={styles.tableContainer}>
          {/* Header Row */}
          <View style={styles.headerRow}>
            <View style={styles.headerCell}>
              <Text style={styles.headerText}>Category</Text>
            </View>
            {subjects.map((subject, idx) => (
              <View 
                key={idx} 
                style={idx === subjects.length - 1 ? styles.headerCellLast : styles.headerCell}
              >
                <Text style={styles.headerText}>{subject}</Text>
              </View>
            ))}
          </View>

          {/* Data Rows */}
          {data.map((row, rowIdx) => (
            <View 
              key={rowIdx} 
              style={rowIdx === data.length - 1 ? styles.dataRowLast : styles.dataRow}
            >
              {/* Category cell */}
              <View style={styles.categoryCell}>
                <Text style={styles.categoryText}>{row.category}</Text>
              </View>

              {/* Value cells */}
              {row.values.map((value, colIdx) => (
                <View 
                  key={colIdx} 
                  style={colIdx === row.values.length - 1 ? styles.dataCellLast : styles.dataCell}
                >
                  {showBlanks ? (
                    <View style={styles.blankLine} />
                  ) : (
                    <Text style={styles.dataText}>{value}</Text>
                  )}
                </View>
              ))}
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
          
          {data.map((row, rowIdx) => (
            <View key={rowIdx} style={styles.answerKeySection}>
              <Text style={styles.answerKeyCategory}>{row.category}:</Text>
              {row.values.map((value, colIdx) => (
                <Text key={colIdx} style={styles.answerKeyItem}>
                  • {subjects[colIdx]}: {value}
                </Text>
              ))}
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
