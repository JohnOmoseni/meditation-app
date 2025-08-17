import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TimerProvider from "../context/TimerContext";
import "../styles/globals.css";

// this will prevent the flash screen from auto hiding until loading all the assets is complete
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [fontsLoaded, fontError] = useFonts({
		"Roboto-Mono": require("../assets/fonts/RobotoMono-Regular.ttf"),
	});

	useEffect(() => {
		if (fontError) throw fontError;
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded) {
		return null;
	}

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<SafeAreaProvider>
			<TimerProvider>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name="index" options={{}} />
					{/* <Stack.Screen name="(tabs)" options={{}} /> */}
					<Stack.Screen name="meditate/[id]" options={{}} />
					<Stack.Screen
						name="(modal)/adjust-meditation-duration"
						options={{ presentation: "modal" }}
					/>
				</Stack>
			</TimerProvider>
			<StatusBar style="light" />
		</SafeAreaProvider>
	);
}
