import React from 'react';
import { View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import {
  WorksheetDocument,
  WorksheetPage,
  Header,
  HeaderConfig,
  FooterConfig,
} from '@/lib/pdf/base-components';
import { fontSizes, colors, spacing } from '@/lib/pdf/fonts';
import { GeneratedContent } from '@/lib/api/openai';
import { ResolvedAsset } from '@/lib/assets/resolver';

// Styles specific to vocabulary cards
const styles = StyleSheet.create({
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  
  card: {
    width: '48%', // Two cards per row
    minHeight: 120,
    borderWidth: 2,
    borderColor: colors.lightGray,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.md,
    backgroundColor: colors.white,
  },
  
  cardWithImage: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  
  cardImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: colors.veryLightGray,
  },
  
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  
  cardContent: {
    flex: 1,
  },
  
  cardTerm: {
    fontFamily: 'Helvetica-Bold',
    fontSize: fontSizes.heading,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  
  cardDefinition: {
    fontFamily: 'Helvetica',
    fontSize: fontSizes.small,
    color: colors.darkGray,
    lineHeight: 1.4,
  },
  
  // Alternate card style (flashcard-style)
  flashCard: {
    width: '48%',
    height: 140,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 8,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  
  flashCardTop: {
    height: '50%',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.sm,
  },
  
  flashCardTerm: {
    fontFamily: 'Helvetica-Bold',
    fontSize: fontSizes.heading,
    color: colors.white,
    textAlign: 'center',
  },
  
  flashCardBottom: {
    height: '50%',
    backgroundColor: colors.white,
    justifyContent: 'center',
    padding: spacing.sm,
  },
  
  flashCardDefinition: {
    fontFamily: 'Helvetica',
    fontSize: fontSizes.tiny,
    color: colors.darkGray,
    textAlign: 'center',
    lineHeight: 1.3,
  },
});

interface VocabularyCardsProps {
  content: GeneratedContent;
  assets?: ResolvedAsset[];
  showImages?: boolean;
  cardStyle?: 'standard' | 'flashcard';
  headerConfig?: Partial<HeaderConfig>;
  footerConfig?: Partial<FooterConfig>;
}

/**
 * Vocabulary Cards Template
 * Displays vocabulary terms with definitions in a card layout
 */
export const VocabularyCards: React.FC<VocabularyCardsProps> = ({
  content,
  assets = [],
  showImages = true,
  cardStyle = 'standard',
  headerConfig,
  footerConfig,
}) => {
  const title = content.title || 'Vocabulary Cards';
  const items = content.items || [];

  // Map assets to items by index (simple matching for now)
  const getAssetForIndex = (index: number): ResolvedAsset | undefined => {
    return assets[index];
  };

  return (
    <WorksheetDocument title={title}>
      <WorksheetPage footerConfig={footerConfig}>
        <Header 
          title={title} 
          subtitle="Study these vocabulary words and their definitions"
          config={headerConfig}
        />
        
        <View style={styles.cardsContainer}>
          {items.map((item, index) => {
            const asset = showImages ? getAssetForIndex(index) : undefined;
            
            if (cardStyle === 'flashcard') {
              return (
                <View key={index} style={styles.flashCard}>
                  <View style={styles.flashCardTop}>
                    <Text style={styles.flashCardTerm}>
                      {item.term || `Term ${index + 1}`}
                    </Text>
                  </View>
                  <View style={styles.flashCardBottom}>
                    <Text style={styles.flashCardDefinition}>
                      {item.definition || 'Definition not available'}
                    </Text>
                  </View>
                </View>
              );
            }

            // Standard card style
            return (
              <View 
                key={index} 
                style={asset ? [styles.card, styles.cardWithImage] : styles.card}
              >
                {asset && (
                  <View style={styles.cardImageContainer}>
                    <Image
                      src={asset.previewUrl}
                      style={styles.cardImage}
                    />
                  </View>
                )}
                <View style={styles.cardContent}>
                  <Text style={styles.cardTerm}>
                    {item.term || `Term ${index + 1}`}
                  </Text>
                  <Text style={styles.cardDefinition}>
                    {item.definition || 'Definition not available'}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </WorksheetPage>
    </WorksheetDocument>
  );
};

export default VocabularyCards;
