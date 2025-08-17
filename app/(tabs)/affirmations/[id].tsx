import React, { useEffect, useState } from "react";
import AppGradient from "@/app/_components/AppGradient";
import AFFIRMATION_GALLERY, { GalleryPreviewDataType } from "@/constants/data";
import { AntDesign } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { View, ImageBackground, Pressable, ScrollView } from "react-native";
import { COLORS } from "@/constants/colors";
import { CustomText } from "@/components/reuseables/themed-element/ThemedText";

const AffirmationPractice = () => {
	const { id } = useLocalSearchParams();

	const [affirmation, setAffirmation] = useState<GalleryPreviewDataType>();
	const [sentences, setSentences] = useState<string[]>([]);

	useEffect(() => {
		for (let idx = 0; idx < AFFIRMATION_GALLERY.length; idx++) {
			const affirmationData = AFFIRMATION_GALLERY[idx].data;

			const affirmationToStart = affirmationData.find(
				(a) => a.id === Number(id)
			);

			if (affirmationToStart) {
				setAffirmation(affirmationToStart);

				const affirmationsArray = affirmationToStart.text.split(".");

				// Remove the last element if it's an empty string
				if (affirmationsArray[affirmationsArray.length - 1] === "") {
					affirmationsArray.pop();
				}

				setSentences(affirmationsArray);
				return;
			}
		}
	}, [id]);

	return (
		<View className="flex-1">
			<ImageBackground
				source={affirmation?.image}
				resizeMode="cover"
				className="flex-1"
			>
				<AppGradient colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.9)"]}>
					<Pressable
						onPress={() => router.back()}
						className="absolute top-4 left-4 z-10"
					>
						<AntDesign name="leftcircleo" size={50} color={COLORS.white} />
					</Pressable>

					<ScrollView className="mt-20" showsVerticalScrollIndicator={false}>
						<View className="h-full justify-center">
							<View className="h-4/5 justify-center">
								{sentences.map((sentence, idx) => (
									<CustomText
										key={idx}
										type="secondary"
										className="text-center mb-12"
									>
										{sentence}.
									</CustomText>
								))}
							</View>
						</View>
					</ScrollView>
				</AppGradient>
			</ImageBackground>
		</View>
	);
};

export default AffirmationPractice;
