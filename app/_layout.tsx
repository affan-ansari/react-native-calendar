import "@/components/Sheets/sheets";
import { EventsProvider } from "@/contexts/EventsContext";
import { Stack } from "expo-router";
import { SheetProvider } from "react-native-actions-sheet";
export default function RootLayout() {
  return (
    <SheetProvider>
      <EventsProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="forms" options={{ headerShown: false }} />
        </Stack>
      </EventsProvider>
    </SheetProvider>
  );
}
