import { Pressable, StyleSheet, Text, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";

interface ImagePickerSheetProps {
  sheetId: string;
  payload?: {
    onTakePhoto: () => void;
    onPickGallery: () => void;
  };
}

export default function ImagePickerSheet({
  sheetId,
  payload,
}: ImagePickerSheetProps) {
  const handleOption = (callback: () => void) => {
    SheetManager.hide(sheetId);
    // Small delay to ensure sheet closes smoothly before opening camera/gallery
    setTimeout(() => callback(), 100);
  };

  return (
    <ActionSheet id={sheetId} gestureEnabled>
      <View style={styles.container}>
        <Text style={styles.title}>Add Image</Text>

        <Pressable
          style={styles.option}
          onPress={() => handleOption(payload?.onTakePhoto || (() => {}))}
        >
          <Text style={styles.optionText}>📷 Take Photo</Text>
        </Pressable>

        <Pressable
          style={styles.option}
          onPress={() => handleOption(payload?.onPickGallery || (() => {}))}
        >
          <Text style={styles.optionText}>🖼️ Choose from Gallery</Text>
        </Pressable>

        <Pressable
          style={[styles.option, styles.cancelOption]}
          onPress={() => SheetManager.hide(sheetId)}
        >
          <Text style={[styles.optionText, styles.cancelText]}>Cancel</Text>
        </Pressable>
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  option: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  optionText: {
    fontSize: 16,
    color: "#007AFF",
    textAlign: "center",
    fontWeight: "500",
  },
  cancelOption: {
    marginTop: 10,
    backgroundColor: "#f5f5f5",
    borderColor: "#d0d0d0",
  },
  cancelText: {
    color: "#666",
  },
});
