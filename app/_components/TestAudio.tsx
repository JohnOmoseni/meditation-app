import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ImageBackground, Pressable, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useAudioPlayer } from "expo-audio";
import { AUDIO_FILES, MEDITATION_DATA } from "@/constants/data";
import { MEDITATION_IMAGES } from "@/constants/icons";
import { CustomButton } from "@/components/reuseables/CustomButton";
import { useTimerContext } from "../../context/TimerContext";
import { CustomText } from "@/components/reuseables/themed-element/ThemedText";
import { COLORS } from "@/constants/colors";
import AppGradient from "../_components/AppGradient";

export default function Page() {
	const { id } = useLocalSearchParams();
	const { duration: secondsRemaining, setDuration } = useTimerContext();

	const [isMeditating, setMeditating] = useState(false);

	// Initialize audio player
	const audioSource = AUDIO_FILES[MEDITATION_DATA[Number(id) - 1].audio];
	const audioPlayer = useAudioPlayer(audioSource);

	const isPlayingAudio = audioPlayer.playing;

	// Timer logic
	useEffect(() => {
		if (!isMeditating) return;

		if (secondsRemaining === 0) {
			if (isPlayingAudio) {
				audioPlayer.pause();
			}
			setMeditating(false);
			return;
		}

		const timer = setTimeout(() => {
			setDuration(secondsRemaining - 1);
		}, 1000);

		return () => clearTimeout(timer);
	}, [
		secondsRemaining,
		isMeditating,
		isPlayingAudio,
		audioPlayer,
		setDuration,
	]);

	// Reset when unmounting
	useEffect(() => {
		return () => {
			setDuration(10);
			audioPlayer.seekTo(0);
			audioPlayer.pause();
		};
	}, [audioPlayer, setDuration]);

	const toggleMeditationSessionStatus = () => {
		if (secondsRemaining === 0) setDuration(10);

		setMeditating(!isMeditating);

		if (isPlayingAudio) {
			audioPlayer.pause();
		} else {
			audioPlayer.play();
		}
	};

	const handleAdjustDuration = () => {
		if (isMeditating) toggleMeditationSessionStatus();
		router.push("/(modal)/adjust-meditation-duration");
	};

	const minutes = String(Math.floor(secondsRemaining / 60)).padStart(2, "0");
	const seconds = String(secondsRemaining % 60).padStart(2, "0");

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
							<CustomText type="title" className="text-blue-800">
								{minutes}.{seconds}
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
}
