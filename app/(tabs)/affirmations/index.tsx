import { CustomText } from "@/components/reuseables/themed-element/ThemedText";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import AppGradient from "@/app/_components/AppGradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import AFFIRMATION_GALLERY from "@/constants/data";
import GuidedAffirmationsGallery from "@/app/_components/GuidedAffirmationGallery";

const Page = () => {
	const insets = useSafeAreaInsets();

	return (
		<View className="flex-1">
			<AppGradient colors={["#2e1f58", "#54426b", "#a790af"]}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Animated.View
						entering={FadeInDown.delay(300)
							.mass(0.5)
							.stiffness(80)
							.springify(20)}
					>
						<CustomText type="secondary" className="mt-3">
							Change your beliefs with affirmations
						</CustomText>
					</Animated.View>

					<View className="mt-4" style={{ marginBottom: insets.bottom + 50 }}>
						{AFFIRMATION_GALLERY.map((g) => (
							<GuidedAffirmationsGallery
								key={g.title}
								title={g.title}
								products={g.data}
							/>
						))}
					</View>
				</ScrollView>
			</AppGradient>
		</View>
	);
};

export default Page;
