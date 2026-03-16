import Constants from 'expo-constants';

const contactCard = Constants.expoConfig?.extra?.contactCard || {};

export const CONTACT_INFO = {
  fullName: contactCard.fullName || 'Your Name',
  location: contactCard.location || 'City, ST',
  email: contactCard.email || 'you@example.com',
  githubUrl: contactCard.githubUrl || 'https://github.com/user',
  linkedinUrl: contactCard.linkedinUrl || 'https://linkedin.com/in/user',
  defaultLanguage: contactCard.defaultLanguage || 'en',
  titles: {
    en: contactCard.titleEn || 'Your Title',
    fr: contactCard.titleFr || contactCard.titleEn || 'Votre Titre',
    es: contactCard.titleEs || contactCard.titleEn || 'Tu Titulo',
  },
};

export function getTranslatedTitle(language) {
  return CONTACT_INFO.titles[language] || CONTACT_INFO.titles.en;
}
