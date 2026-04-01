import { AuthProvider } from "@/context/authContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient"

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient} >
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AuthProvider>
    </QueryClientProvider>

  )
}
