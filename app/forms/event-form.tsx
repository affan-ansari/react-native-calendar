import AppButton from "@/components/AppButton";
import { useEvents } from "@/contexts/EventsContext";
import { Event } from "@/types/events";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SheetManager } from "react-native-actions-sheet";

const pad = (n: number) => String(n).padStart(2, "0");
const fmtISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

const fmtHM = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

export default function EventFormScreen() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { addEvent, updateEvent, getEvent } = useEvents();

  const isEditMode = !!id;
  const existingEvent = id ? getEvent(id) : undefined;

  useEffect(() => {
    if (isEditMode && existingEvent) {
      setTitle(existingEvent.title);
      setDate(new Date(existingEvent.date));
      setDescription(existingEvent.description);
      setImageUri(existingEvent.imageUri || null);
    }
  }, [isEditMode, existingEvent]);

  const isDisabled = !title || !date || !description;

  const dateDisplay = useMemo(() => (date ? fmtISO(date) : ""), [date]);
  const timeDisplay = useMemo(() => (date ? fmtHM(date) : ""), [date]);

  const onChange = (_e: DateTimePickerEvent, selected?: Date) => {
    if (selected) setDate(selected);
  };

  const onChangeTime = (e: DateTimePickerEvent, selected?: Date) => {
    if (e.type === "set" && selected) {
      const base = new Date(date ?? new Date());
      base.setHours(selected.getHours(), selected.getMinutes(), 0, 0);
      setDate(base);
    }
  };

  const openDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date ?? new Date(),
      onChange,
      mode: "date",
      is24Hour: true,
    });
  };

  const openTimePicker = () => {
    DateTimePickerAndroid.open({
      value: date ?? new Date(),
      onChange: onChangeTime,
      mode: "time",
    });
  };

  const requestPermissions = async () => {
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== "granted" || mediaStatus !== "granted") {
      Alert.alert(
        "Permissions Required",
        "Please grant camera and media library permissions to add images."
      );
      return false;
    }
    return true;
  };

  const takePhoto = async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    SheetManager.show("remove-image-sheet", {
      payload: {
        onConfirm: () => setImageUri(null),
      },
    });
  };

  const showImageOptions = () => {
    SheetManager.show("image-picker-sheet", {
      payload: {
        onTakePhoto: takePhoto,
        onPickGallery: pickImage,
      },
    });
  };

  const handleSubmit = () => {
    if (!title || !date || !description) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const eventData: Event = {
      id: isEditMode && id ? id : Date.now().toString(),
      title,
      date: date.toISOString(),
      description,
      imageUri: imageUri || undefined,
    };

    if (isEditMode && id) {
      updateEvent(id, eventData);
      Alert.alert("Success", "Event updated successfully");
    } else {
      addEvent(eventData);
      Alert.alert("Success", "Event created successfully");
    }

    router.back();
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.form}>
          <Text style={styles.label}>Event Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter event title"
            placeholderTextColor="#999"
            returnKeyType="next"
          />

          <Text style={styles.label}>Date</Text>
          <Pressable onPress={openDatePicker}>
            <View pointerEvents="none">
              <TextInput
                style={styles.input}
                value={dateDisplay}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#999"
                editable={false}
              />
            </View>
          </Pressable>

          <Text style={styles.label}>Time</Text>
          <Pressable onPress={openTimePicker}>
            <View pointerEvents="none">
              <TextInput
                style={styles.input}
                value={timeDisplay}
                placeholder="HH:mm"
                placeholderTextColor="#999"
                editable={false}
              />
            </View>
          </Pressable>

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter event description"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <Text style={styles.label}>Image (Optional)</Text>
          {imageUri ? (
            <View style={styles.imageContainer}>
              <Image source={{ uri: imageUri }} style={styles.image} />
              <View style={styles.imageActions}>
                <Pressable
                  onPress={showImageOptions}
                  style={styles.imageButton}
                >
                  <Text style={styles.imageButtonText}>Change Image</Text>
                </Pressable>
                <Pressable
                  onPress={removeImage}
                  style={[styles.imageButton, styles.removeButton]}
                >
                  <Text
                    style={[styles.imageButtonText, styles.removeButtonText]}
                  >
                    Remove
                  </Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <Pressable onPress={showImageOptions} style={styles.addImageButton}>
              <Text style={styles.addImageText}>+ Add Image</Text>
            </Pressable>
          )}

          <View style={styles.buttonContainer}>
            <AppButton
              title={isEditMode ? "Update Event" : "Create Event"}
              disabled={isDisabled}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  buttonContainer: {
    marginTop: 24,
  },
  addImageButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#ddd",
    borderStyle: "dashed",
    borderRadius: 8,
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  addImageText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  imageContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    resizeMode: "cover",
  },
  imageActions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  imageButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  imageButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  removeButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FF3B30",
  },
  removeButtonText: {
    color: "#FF3B30",
  },
});
