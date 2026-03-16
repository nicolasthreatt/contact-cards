import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';

export async function shareBundledResume(assetModule) {
  const isSharingAvailable = await Sharing.isAvailableAsync();
  if (!isSharingAvailable) {
    throw new Error('Native sharing is not available on this device.');
  }

  const [resumeAsset] = await Asset.loadAsync(assetModule);

  const sourceUri = resumeAsset.localUri || resumeAsset.uri;
  if (!sourceUri) {
    throw new Error('Resume asset URI could not be resolved.');
  }

  const shareUri = `${FileSystem.cacheDirectory}resume.pdf`;
  const existingShareFile = await FileSystem.getInfoAsync(shareUri);
  if (existingShareFile.exists) {
    await FileSystem.deleteAsync(shareUri, { idempotent: true });
  }

  await FileSystem.copyAsync({ from: sourceUri, to: shareUri });

  await Sharing.shareAsync(shareUri, {
    dialogTitle: 'Share Resume',
    mimeType: 'application/pdf',
    UTI: 'com.adobe.pdf',
  });
}
