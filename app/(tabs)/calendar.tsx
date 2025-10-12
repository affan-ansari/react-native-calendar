import React from "react";
import {
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function Example() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
        <TextInput
          placeholder="Tap anywhere outside to dismiss keyboard"
          style={{ borderWidth: 1, borderColor: "#ccc", padding: 10 }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
