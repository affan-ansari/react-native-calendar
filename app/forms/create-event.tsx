import AppButton from "@/components/AppButton";
import { useEvents } from "@/contexts/EventsContext";
import { Event } from "@/types/events";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const pad = (n: number) => String(n).padStart(2, "0");
const fmtISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

const fmtHM = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`; // ⬅️ time format

export default function CreateEventScreen() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [description, setDescription] = useState("");
  const { addEvent } = useEvents();

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

  const handleCreate = () => {
    if (!title || !date || !description) {
      alert("Please fill in all fields");
      return;
    }
    const newEvent: Event = {
      id: Date.now().toString(),
      title,
      date: date.toISOString(),
      description,
    };
    console.log("New event:", newEvent);
    addEvent(newEvent);
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

          <View style={styles.buttonContainer}>
            <AppButton
              title="Create Event"
              disabled={isDisabled}
              onPress={handleCreate}
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
});
