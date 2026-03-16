import React, { useMemo, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { CONTACT_INFO, getTranslatedTitle } from './src/config/contact';
import { ActionButton } from './src/components/ActionButton';
import { LanguageMenu } from './src/components/LanguageMenu';
import { LANGUAGE_OPTIONS, TRANSLATIONS } from './src/i18n/translations';
import { styles } from './src/styles/appStyles';
import { shareBundledResume } from './src/utils/resume';
import { buildVCard } from './src/utils/vcard';
import QRCode from 'react-native-qrcode-svg';

const HEADSHOT = require('./assets/headshot.png');
const RESUME = require('./assets/resume.pdf');

export default function App() {
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const [language, setLanguage] = useState(CONTACT_INFO.defaultLanguage);
  const [isLanguageMenuVisible, setIsLanguageMenuVisible] = useState(false);
  const [isEmailComposerVisible, setIsEmailComposerVisible] = useState(false);
  const [isQrVisible, setIsQrVisible] = useState(false);
  const [outboundEmail, setOutboundEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const isPhoneWidth = screenWidth < 430;
  const cardWidth = isPhoneWidth
    ? Math.max(screenWidth - 12, 320)
    : Math.min(screenWidth - 32, 440);
  const pagePaddingHorizontal = isPhoneWidth ? 6 : 16;
  const pagePaddingVertical = isPhoneWidth ? 26 : 16;
  const cardPaddingHorizontal = isPhoneWidth ? 18 : 24;
  const cardMinHeight = isPhoneWidth ? screenHeight - 52 : undefined;
  const cardPaddingTop = isPhoneWidth ? 32 : 10;
  const cardPaddingBottom = isPhoneWidth ? 24 : 18;
  const headshotSize = isPhoneWidth ? 184 : 176;
  const qrSize = isPhoneWidth ? 122 : 116;

  const translated = TRANSLATIONS[language] || TRANSLATIONS.en;
  const translatedTitle = getTranslatedTitle(language);
  const vcardPayload = useMemo(
    () => buildVCard(CONTACT_INFO, translatedTitle),
    [language, translatedTitle]
  );

  const handleOpenUrl = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        Alert.alert('Unavailable', 'This link cannot be opened on the current device.');
        return;
      }

      await Linking.openURL(url);
    } catch {
      Alert.alert('Unavailable', 'Unable to open that action right now.');
    }
  };

  const handleLaunchEmailComposer = async () => {
    const trimmedEmail = outboundEmail.trim();
    const trimmedMessage = emailMessage.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!isValidEmail) {
      Alert.alert('Missing email', 'Enter a valid recipient email address first.');
      return;
    }

    const subject = encodeURIComponent(`Great meeting you - ${CONTACT_INFO.fullName}`);
    const body = encodeURIComponent(trimmedMessage);
    const mailtoUrl = `mailto:${trimmedEmail}?subject=${subject}&body=${body}`;

    try {
      const supported = await Linking.canOpenURL(mailtoUrl);
      if (!supported) {
        Alert.alert('Unavailable', 'Email is not available on this device.');
        return;
      }

      await Linking.openURL(mailtoUrl);
      setIsEmailComposerVisible(false);
    } catch {
      Alert.alert('Unavailable', 'Unable to open the email app right now.');
    }
  };

  const handleShareResume = async () => {
    try {
      await shareBundledResume(RESUME);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'The resume could not be shared.';
      Alert.alert(
        'Resume unavailable',
        message
      );
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <View
          style={[
            styles.page,
            {
              paddingHorizontal: pagePaddingHorizontal,
              paddingVertical: pagePaddingVertical,
            },
          ]}
        >
          <View
            style={[
              styles.card,
              {
                minHeight: cardMinHeight,
                paddingBottom: cardPaddingBottom,
                paddingHorizontal: cardPaddingHorizontal,
                paddingTop: cardPaddingTop,
                width: cardWidth,
              },
            ]}
          >
            <View style={styles.heroRow}>
              <View style={styles.languageMenuWrap}>
                <LanguageMenu
                  currentLanguage={language}
                  isVisible={isLanguageMenuVisible}
                  onClose={() => setIsLanguageMenuVisible(false)}
                  onOpen={() => setIsLanguageMenuVisible(true)}
                  onSelect={(nextLanguage) => {
                    setLanguage(nextLanguage);
                    setIsLanguageMenuVisible(false);
                  }}
                  options={LANGUAGE_OPTIONS}
                />
              </View>

              <Image
                source={HEADSHOT}
                style={[
                  styles.headshot,
                  {
                    borderRadius: headshotSize / 2,
                    height: headshotSize,
                    width: headshotSize,
                  },
                ]}
              />
            </View>

            <View style={styles.identityBlock}>
              <Text style={styles.name}>{CONTACT_INFO.fullName}</Text>
              <Text style={styles.title}>{translatedTitle}</Text>
              <Text style={styles.location}>{CONTACT_INFO.location}</Text>
            </View>

            <Pressable
              onPress={() => setIsQrVisible(true)}
              style={({ pressed }) => [
                styles.qrBlock,
                pressed && styles.qrBlockPressed,
              ]}
            >
              <View style={styles.qrFrame}>
                <QRCode value={vcardPayload} size={qrSize} />
              </View>
              <Text style={styles.qrHint}>{translated.qrHint}</Text>
            </Pressable>

            <View style={styles.buttonStack}>
              <ActionButton
                label={translated.email}
                backgroundColor="#EA4335"
                pressedColor="#D93025"
                onPress={() => setIsEmailComposerVisible(true)}
              />
              <ActionButton
                label={translated.github}
                backgroundColor="#27272A"
                pressedColor="#3F3F46"
                onPress={() => handleOpenUrl(CONTACT_INFO.githubUrl)}
              />
              <ActionButton
                label={translated.linkedin}
                backgroundColor="#0A66C2"
                pressedColor="#004182"
                onPress={() => handleOpenUrl(CONTACT_INFO.linkedinUrl)}
              />
              <ActionButton
                label={translated.resume}
                backgroundColor="#059669"
                pressedColor="#047857"
                onPress={handleShareResume}
              />
            </View>
          </View>
        </View>
      <Modal
        animationType="fade"
        transparent
        visible={isQrVisible}
        onRequestClose={() => setIsQrVisible(false)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setIsQrVisible(false)}>
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <Text style={styles.modalTitle}>{translated.qrDialogTitle}</Text>
            <View style={styles.modalQrFrame}>
              <QRCode value={vcardPayload} size={240} />
            </View>
            <Text style={styles.modalHelp}>{translated.qrDialogHelp}</Text>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        animationType="slide"
        transparent
        visible={isEmailComposerVisible}
        onRequestClose={() => setIsEmailComposerVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalBackdrop}
        >
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setIsEmailComposerVisible(false)}
          >
            <Pressable
              style={[
                styles.composeCard,
                { width: cardWidth },
              ]}
              onPress={() => {}}
            >
              <Text style={styles.composeTitle}>Compose Email</Text>

              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={setOutboundEmail}
                placeholder="to-email@domain.com"
                placeholderTextColor="#64748B"
                style={styles.input}
                value={outboundEmail}
              />

              <TextInput
                multiline
                onChangeText={setEmailMessage}
                placeholder="Type your message here..."
                placeholderTextColor="#64748B"
                style={[styles.input, styles.messageInput]}
                textAlignVertical="top"
                value={emailMessage}
              />

              <View style={styles.composeActions}>
                <Pressable
                  onPress={() => setIsEmailComposerVisible(false)}
                  style={({ pressed }) => [
                    styles.secondaryAction,
                    pressed && styles.secondaryActionPressed,
                  ]}
                >
                  <Text style={styles.secondaryActionLabel}>Cancel</Text>
                </Pressable>
                <Pressable
                  onPress={handleLaunchEmailComposer}
                  style={({ pressed }) => [
                    styles.primaryAction,
                    pressed && styles.primaryActionPressed,
                  ]}
                >
                  <Text style={styles.primaryActionLabel}>Open Mail</Text>
                </Pressable>
              </View>
            </Pressable>
          </Pressable>
        </KeyboardAvoidingView>
      </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
