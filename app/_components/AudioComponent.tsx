import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ImageBackground, Pressable, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";

import { AUDIO_FILES, MEDITATION_DATA } from "@/constants/data";
import { MEDITATION_IMAGES } from "@/constants/icons";
import { CustomButton } from "@/components/reuseables/CustomButton";
import { useTimerContext } from "../../context/TimerContext";
import { CustomText } from "@/components/reuseables/themed-element/ThemedText";
import { COLORS } from "@/constants/colors";
import AppGradient from "../_components/AppGradient";

const Page = () => {
	const { id } = useLocalSearchParams();
	const { duration: secondsRemaining, setDuration } = useTimerContext();

	const [isMeditating, setMeditating] = useState(false);
	const [audioSound, setSound] = useState<Audio.Sound>();
	const [isPlayingAudio, setPlayingAudio] = useState(false);

	useEffect(() => {
		if (!isMeditating) return;

		if (secondsRemaining === 0) {
			if (isPlayingAudio) {
				audioSound?.pauseAsync();
			}
			setMeditating(false);
			setPlayingAudio(false);
			return;
		}

		const timerId = setTimeout(() => {
			setDuration(secondsRemaining - 1);
		}, 1000);

		return () => clearTimeout(timerId);
	}, [secondsRemaining, isMeditating, isPlayingAudio, audioSound]);

	useEffect(() => {
		return () => {
			setDuration(10);
			audioSound?.unloadAsync();
		};
	}, [audioSound]);

	const initializeSound = async () => {
		const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;

		const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);
		setSound(sound);
		return sound;
	};

	const togglePlayPause = async () => {
		const sound = audioSound ? audioSound : await initializeSound();

		const status = await sound?.getStatusAsync();

		if (status?.isLoaded && !isPlayingAudio) {
			await sound?.playAsync();
			setPlayingAudio(true);
		} else {
			await sound?.pauseAsync();
			setPlayingAudio(false);
		}
	};

	async function toggleMeditationSessionStatus() {
		if (secondsRemaining === 0) setDuration(10);

		setMeditating(!isMeditating);

		await togglePlayPause();
	}

	const handleAdjustDuration = () => {
		if (isMeditating) toggleMeditationSessionStatus();

		router.push("/(modal)/adjust-meditation-duration");
	};

	// Format the timeLeft to ensure two digits are displayed
	const formattedTimeMinutes = String(
		Math.floor(secondsRemaining / 60)
	).padStart(2, "0");
	const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, "0");

	return (
		<View className="flex-1">
			<ImageBackground
				source={MEDITATION_IMAGES[Number(id) - 1]}
				resizeMode="cover"
				className="flex-1"
			>
				<AppGradient colors={["transparent", "rgba(0,0,0,0.8)"]}>
					<Pressable
						onPress={() => router.back()}
						className="absolute top-16 left-6 z-10"
					>
						<AntDesign name="leftcircleo" size={50} color={COLORS.white} />
					</Pressable>

					<View className="flex-1 justify-center">
						<View className="mx-auto bg-white rounded-full size-44 row-flex">
							<CustomText type="title" className="text-red-800">
								{formattedTimeMinutes}:{formattedTimeSeconds}
							</CustomText>
						</View>
					</View>

					<View className="mb-5">
						<CustomButton
							title="Adjust duration"
							onPress={handleAdjustDuration}
						/>
						<CustomButton
							title={isMeditating ? "Stop" : "Start Meditation"}
							onPress={toggleMeditationSessionStatus}
							containerClassName="mt-4"
						/>
					</View>
				</AppGradient>
			</ImageBackground>
		</View>
	);
};

export default Page;
