import React from 'react';
import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { fonts, fontSizes, colors, spacing, pageDimensions } from './fonts';
import { 
  HeaderConfig, 
  FooterConfig, 
  mergeHeaderConfig, 
  mergeFooterConfig 
} from '@/types/branding';

// Base styles used across all templates
export const baseStyles = StyleSheet.create({
  page: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.body,
    color: colors.black,
    backgroundColor: colors.white,
    padding: pageDimensions.margin,
    paddingBottom: pageDimensions.margin + 20, // Extra space for footer
  },
  
  // Header section
  header: {
    marginBottom: spacing.lg,
    borderBottomWidth: 2,
    borderBottomColor: colors.lightGray,
    paddingBottom: spacing.md,
  },
  
  title: {
    fontFamily: 'Helvetica-Bold',
    fontSize: fontSizes.title,
    color: colors.black,
    marginBottom: spacing.sm,
  },
  
  subtitle: {
    fontFamily: fonts.primary,
    fontSize: fontSizes.body,
    color: colors.darkGray,
  },
  
  // Name/Date line
  nameDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    gap: spacing.lg,
  },
  
  nameDateField: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  
  nameDateLabel: {
    fontSize: fontSizes.body,
    fontFamily: 'Helvetica-Bold',
  },
  
  nameDateLine: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    minWidth: 100,
  },
  
  // Instructions
  instructions: {
    marginBottom: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.veryLightGray,
    borderRadius: 4,
  },
  
  instructionsText: {
    fontSize: fontSizes.body,
    fontStyle: 'italic',
    color: colors.darkGray,
  },
  
  // Content area
  content: {
    flex: 1,
  },
  
  // Footer
  footer: {
    position: 'absolute',
    bottom: spacing.lg,
    left: pageDimensions.margin,
    right: pageDimensions.margin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    paddingTop: spacing.sm,
  },
  
  footerText: {
    fontSize: fontSizes.tiny,
    color: colors.mediumGray,
  },
  
  pageNumber: {
    fontSize: fontSizes.tiny,
    color: colors.mediumGray,
  },
  
  // Word bank
  wordBank: {
    marginBottom: spacing.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 4,
  },
  
  wordBankTitle: {
    fontSize: fontSizes.small,
    fontFamily: 'Helvetica-Bold',
    marginBottom: spacing.sm,
    color: colors.darkGray,
  },
  
  wordBankWords: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  
  wordBankWord: {
    fontSize: fontSizes.body,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: colors.veryLightGray,
    borderRadius: 4,
  },
});

// Header component with title, name, and date fields
interface HeaderProps {
  title: string;
  subtitle?: string;
  showNameDate?: boolean;  // Legacy prop - use config instead
  config?: Partial<HeaderConfig>;
}

export const Header: React.FC<HeaderProps> = ({ 
  title, 
  subtitle, 
  showNameDate = true,
  config: userConfig,
}) => {
  const config = mergeHeaderConfig(userConfig);
  const accentColor = config.accentColor || colors.primary;
  
  // Determine which fields to show
  const showName = config.showNameField ?? showNameDate;
  const showDate = config.showDateField ?? showNameDate;
  const showScore = config.showScoreField ?? false;
  const showPeriod = config.showPeriodField ?? false;
  
  // Count how many fields we're showing
  const fieldCount = [showName, showDate, showScore, showPeriod].filter(Boolean).length;
  
  // Build dynamic styles
  const dynamicHeaderStyle = {
    marginBottom: config.style === 'minimal' ? spacing.md : config.style === 'compact' ? spacing.sm : spacing.lg,
    borderBottomWidth: config.style === 'minimal' ? 0 : 2,
    borderBottomColor: config.accentColor || colors.lightGray,
    paddingBottom: config.style === 'compact' ? spacing.sm : spacing.md,
  };
  
  const dynamicTitleStyle = {
    fontFamily: 'Helvetica-Bold' as const,
    fontSize: fontSizes.title,
    color: config.accentColor || colors.black,
    marginBottom: spacing.sm,
  };
  
  return (
    <View style={dynamicHeaderStyle}>
      {/* Logo and School Name Row */}
      {(config.logoUrl || config.schoolName) && (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
          {config.logoUrl && (
            <Image 
              src={config.logoUrl} 
              style={{ width: 40, height: 40, marginRight: spacing.sm }} 
            />
          )}
          {config.schoolName && (
            <Text style={{ fontSize: fontSizes.small, color: colors.darkGray }}>
              {config.schoolName}
            </Text>
          )}
          {config.className && (
            <Text style={{ fontSize: fontSizes.small, color: colors.mediumGray, marginLeft: 'auto' }}>
              {config.className}
            </Text>
          )}
        </View>
      )}
      
      {/* Teacher Name Row (if provided) */}
      {config.teacherName && (
        <Text style={{ fontSize: fontSizes.small, color: colors.darkGray, marginBottom: spacing.xs }}>
          {config.teacherName}
        </Text>
      )}
      
      {/* Title */}
      <Text style={dynamicTitleStyle}>
        {title}
      </Text>
      
      {/* Subtitle or custom subtitle */}
      {(subtitle || config.customSubtitle) && (
        <Text style={baseStyles.subtitle}>
          {config.customSubtitle || subtitle}
        </Text>
      )}
      
      {/* Student Fields Row */}
      {fieldCount > 0 && (
        <View style={baseStyles.nameDate}>
          {showName && (
            <View style={baseStyles.nameDateField}>
              <Text style={baseStyles.nameDateLabel}>Name:</Text>
              <View style={baseStyles.nameDateLine} />
            </View>
          )}
          {showDate && (
            <View style={baseStyles.nameDateField}>
              <Text style={baseStyles.nameDateLabel}>Date:</Text>
              <View style={baseStyles.nameDateLine} />
            </View>
          )}
          {showPeriod && (
            <View style={baseStyles.nameDateField}>
              <Text style={baseStyles.nameDateLabel}>{config.period ? config.period : 'Period:'}</Text>
              {!config.period && <View style={baseStyles.nameDateLine} />}
            </View>
          )}
          {showScore && (
            <View style={baseStyles.nameDateField}>
              <Text style={baseStyles.nameDateLabel}>Score:</Text>
              <View style={baseStyles.nameDateLine} />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

// Instructions component
interface InstructionsProps {
  text: string;
}

export const Instructions: React.FC<InstructionsProps> = ({ text }) => (
  <View style={baseStyles.instructions}>
    <Text style={baseStyles.instructionsText}>{text}</Text>
  </View>
);

// Footer component with attribution and page number
interface FooterProps {
  attribution?: string;  // Legacy prop - use config instead
  showPageNumber?: boolean;  // Legacy prop - use config instead
  config?: Partial<FooterConfig>;
}

export const Footer: React.FC<FooterProps> = ({ 
  attribution,
  showPageNumber,
  config: userConfig,
}) => {
  const config = mergeFooterConfig(userConfig);
  
  // Handle legacy props
  const finalAttribution = attribution ?? config.attribution;
  const finalShowPages = showPageNumber ?? config.showPageNumbers;
  
  // Don't render if style is 'none'
  if (config.style === 'none') {
    return null;
  }
  
  const isMinimal = config.style === 'minimal';
  
  // Build dynamic footer style
  const dynamicFooterStyle = {
    position: 'absolute' as const,
    bottom: spacing.lg,
    left: pageDimensions.margin,
    right: pageDimensions.margin,
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    borderTopWidth: isMinimal ? 0 : 1,
    borderTopColor: colors.lightGray,
    paddingTop: spacing.sm,
  };
  
  return (
    <View style={dynamicFooterStyle} fixed>
      {/* Left side: Logo, attribution, or copyright */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
        {config.logoUrl && (
          <Image 
            src={config.logoUrl} 
            style={{ width: 16, height: 16 }} 
          />
        )}
        {config.copyrightText ? (
          <Text style={baseStyles.footerText}>{config.copyrightText}</Text>
        ) : config.showAttribution !== false && finalAttribution ? (
          <Text style={baseStyles.footerText}>{finalAttribution}</Text>
        ) : null}
      </View>
      
      {/* Right side: Website and/or page numbers */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
        {config.schoolWebsite && (
          <Text style={baseStyles.footerText}>{config.schoolWebsite}</Text>
        )}
        {finalShowPages && (
          <Text 
            style={baseStyles.pageNumber}
            render={({ pageNumber, totalPages }) => 
              config.pageNumberFormat === 'simple' 
                ? `${pageNumber}` 
                : `Page ${pageNumber} of ${totalPages}`
            }
          />
        )}
      </View>
    </View>
  );
};

// Word bank component
interface WordBankProps {
  words: string[];
  title?: string;
}

export const WordBank: React.FC<WordBankProps> = ({ 
  words, 
  title = 'Word Bank' 
}) => (
  <View style={baseStyles.wordBank}>
    <Text style={baseStyles.wordBankTitle}>{title}</Text>
    <View style={baseStyles.wordBankWords}>
      {words.map((word, index) => (
        <Text key={index} style={baseStyles.wordBankWord}>
          {word}
        </Text>
      ))}
    </View>
  </View>
);

// Base worksheet document wrapper
interface WorksheetDocumentProps {
  children: React.ReactNode;
  title?: string;
}

export const WorksheetDocument: React.FC<WorksheetDocumentProps> = ({ 
  children,
  title = 'Worksheet',
}) => (
  <Document title={title} author="Worksheet Generator">
    {children}
  </Document>
);

// Base page wrapper
interface WorksheetPageProps {
  children: React.ReactNode;
  showFooter?: boolean;
  footerConfig?: Partial<FooterConfig>;
}

export const WorksheetPage: React.FC<WorksheetPageProps> = ({ 
  children,
  showFooter = true,
  footerConfig,
}) => (
  <Page size="LETTER" style={baseStyles.page}>
    <View style={baseStyles.content}>
      {children}
    </View>
    {showFooter && <Footer config={footerConfig} />}
  </Page>
);

// Export types for use in templates
export type { HeaderConfig, FooterConfig } from '@/types/branding';
export { presets, defaultHeaderConfig, defaultFooterConfig } from '@/types/branding';
