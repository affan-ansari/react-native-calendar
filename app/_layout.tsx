import { EventsProvider } from "@/contexts/EventsContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <EventsProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="forms" options={{ headerShown: false }} />
      </Stack>
    </EventsProvider>
  );
}
