import React from "react";
import { View, ImageBackground, Pressable, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { images, MEDITATION_IMAGES } from "@/constants/icons";
import { CustomText } from "@/components/reuseables/themed-element/ThemedText";
import { MEDITATION_DATA } from "@/constants/data";
import { LinearGradient } from "expo-linear-gradient";
import { cn } from "@/lib/utlis";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import AppGradient from "../_components/AppGradient";

const App = () => {
	const router = useRouter();
	const insets = useSafeAreaInsets();

	return (
		<View className="flex-1">
			<ImageBackground
				source={images.beachImage}
				resizeMode="cover"
				className="flex-1"
			>
				<AppGradient
					colors={["#161b2e", "#0a4d4a", "#766e67"]}
					// colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}
				>
					<Animated.View
						className="mt-3 mb-4"
						entering={FadeInDown.delay(300)
							.mass(0.5)
							.stiffness(80)
							.springify(20)}
					>
						<CustomText type="title" className="">
							Welcome John
						</CustomText>

						<CustomText type="subtitle" className="mt-2 pl-1">
							Start your meditation practice today
						</CustomText>
					</Animated.View>

					<FlatList
						data={MEDITATION_DATA}
						keyExtractor={(item) => item.id.toString()}
						showsVerticalScrollIndicator={false}
						contentContainerClassName={cn("pt-4", {
							"pb-24": insets.bottom !== 0,
						})}
						renderItem={({ item }) => (
							<Pressable
								onPress={() => router.push(`/meditate/${item.id}`)}
								className="h-64 my-4 w-full px-1"
							>
								<ImageBackground
									source={MEDITATION_IMAGES[item.id - 1]}
									resizeMode="cover"
									className="flex-1 overflow-hidden rounded-lg"
								>
									<LinearGradient
										// Gradient from transparent to black
										colors={["transparent", "rgba(0,0,0,0.8)"]}
										style={{
											flex: 1,
											justifyContent: "center",
										}}
									>
										<CustomText type="secondary" className="text-center">
											{item.title}
										</CustomText>
									</LinearGradient>
								</ImageBackground>
							</Pressable>
						)}
					/>
				</AppGradient>
			</ImageBackground>
		</View>
	);
};

export default App;
