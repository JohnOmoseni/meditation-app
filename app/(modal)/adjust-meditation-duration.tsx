import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import { useTimerContext } from "../../context/TimerContext";
import { COLORS } from "@/constants/colors";
import { CustomButton } from "@/components/reuseables/CustomButton";
import { CustomText } from "@/components/reuseables/themed-element/ThemedText";
import AppGradient from "../_components/AppGradient";

const AdjustMeditationDuration = () => {
	const { setDuration } = useTimerContext();

	const handlePress = (duration: number) => {
		setDuration(duration);
		router.back();
	};

	return (
		<View className="flex-1">
			<AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
				<Pressable
					onPress={() => router.back()}
					className="absolute top-8 left-6 z-10"
				>
					<AntDesign name="leftcircleo" size={50} color={COLORS.white} />
				</Pressable>

				<View className="justify-center h-4/5">
					<CustomText type="subtitle" className="text-center mb-8">
						Adjust your meditation duration Change your beliefs with
						affirmations
					</CustomText>

					<View>
						<CustomButton
							title="10 seconds"
							onPress={() => handlePress(10)}
							containerClassName="mb-5"
						/>
						<CustomButton
							title="5 minutes"
							onPress={() => handlePress(5 * 60)}
							containerClassName="mb-5"
						/>
						<CustomButton
							title="10 minutes"
							onPress={() => handlePress(10 * 60)}
							containerClassName="mb-5"
						/>
						<CustomButton
							title="15 minutes"
							onPress={() => handlePress(15 * 60)}
							containerClassName="mb-5"
						/>
					</View>
				</View>
			</AppGradient>
		</View>
	);
};

export default AdjustMeditationDuration;
