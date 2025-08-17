import React from "react";
import { View, ImageBackground, Text } from "react-native";
import { useRouter } from "expo-router";
import { images } from "@/constants/icons";
import { CustomButton } from "@/components/reuseables/CustomButton";
import { CustomText } from "@/components/reuseables/themed-element/ThemedText";
import Animated, { FadeInDown } from "react-native-reanimated";
import AppGradient from "./_components/AppGradient";

const App = () => {
	const router = useRouter();

	return (
		<View className="flex-1">
			<ImageBackground
				source={images.beachImage}
				resizeMode="cover"
				className="flex-1"
			>
				<AppGradient
					// Background Linear Gradient
					colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}
				>
					<View className="flex-1 justify-between">
						<Animated.View
							entering={FadeInDown.delay(300)
								.mass(0.5)
								.stiffness(80)
								.springify(20)}
						>
							<CustomText type="title" className="text-center mt-6">
								Simple Meditation
							</CustomText>

							<CustomText type="subtitle" className="text-center mt-2">
								Simplifying Meditation for Everyone
							</CustomText>
						</Animated.View>

						<Animated.View
							entering={FadeInDown.delay(300)
								.mass(0.5)
								.stiffness(80)
								.springify(20)}
						>
							<CustomButton
								onPress={() => router.push("/nature-meditate")}
								title="Get Started"
								containerClassName="mb-5"
							/>
						</Animated.View>
					</View>
				</AppGradient>
			</ImageBackground>
		</View>
	);
};

export default App;
