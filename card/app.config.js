const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

module.exports = {
  expo: {
    name: 'Contact Card',
    slug: 'contact-card',
    version: '1.0.0',
    icon: './assets/headshot.png',
    orientation: 'portrait',
    userInterfaceStyle: 'automatic',
    assetBundlePatterns: ['assets/*'],
    plugins: ['expo-asset'],
    ios: {
      supportsTablet: true,
    },
    android: {
      softwareKeyboardLayoutMode: 'pan',
      adaptiveIcon: {
        foregroundImage: './assets/headshot.png',
        backgroundColor: '#000000',
      },
    },
    extra: {
      contactCard: {
        fullName: process.env.CONTACT_CARD_FULL_NAME || 'Your Name',
        defaultLanguage: process.env.CONTACT_CARD_DEFAULT_LANG || 'en',
        titleEn: process.env.CONTACT_CARD_TITLE_EN || 'Your Title',
        titleFr: process.env.CONTACT_CARD_TITLE_FR || 'Votre Titre',
        titleEs: process.env.CONTACT_CARD_TITLE_ES || 'Tu Titulo',
        location: process.env.CONTACT_CARD_LOCATION || 'City, ST',
        email: process.env.CONTACT_CARD_EMAIL || 'you@example.com',
        githubUrl:
          process.env.CONTACT_CARD_GITHUB_URL || 'https://github.com/user',
        linkedinUrl:
          process.env.CONTACT_CARD_LINKEDIN_URL ||
          'https://linkedin.com/in/user',
      },
    },
  },
};
