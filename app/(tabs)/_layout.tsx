import React from "react";
import { Tabs } from "expo-router";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform, View } from "react-native";
import { cn } from "@/lib/utlis";
import { CustomText } from "@/components/reuseables/themed-element/ThemedText";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(tabs)",
};

type TabBarIconProps = {
	color?: string;
	title: string;
	icon: any;
	focused: boolean;
};

const TabBarIcon = ({ focused, icon, color, title }: TabBarIconProps) => (
	<View
		className={cn(
			"w-max items-center justify-between h-full gap-0.5 absolute mt-3",
			title === "Affirmations" && "pr-5"
		)}
	>
		{/* <Image
			source={icon}
			className="size-7"
			resizeMode="contain"
			tintColor={focused ? "#FE8C00" : "#5D5F6D"}
		/> */}

		{icon}
		<CustomText
			style={{
				color: focused ? color : "#5D5F6D",
			}}
			className={cn("text-center w-full", focused && "font-bold")}
		>
			{title}
		</CustomText>
	</View>
);

const TabsLayout = () => {
	return (
		<Tabs
			safeAreaInsets={{ top: 0, bottom: 30 }}
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,

				tabBarStyle: {
					borderTopLeftRadius: 50,
					borderTopRightRadius: 50,
					borderBottomLeftRadius: 50,
					borderBottomRightRadius: 50,
					marginHorizontal: 50,
					position: "absolute",
					paddingRight: 4,
					height: Platform.OS === "ios" ? 80 : 75,
					bottom: Platform.OS === "ios" ? 35 : 50,
					backgroundColor: "white",
					shadowColor: "#1a1a1a",
					shadowOffset: { width: 0, height: 2 },
					shadowOpacity: 0.1,
					shadowRadius: 4,
					elevation: 5,
				},
			}}
		>
			<Tabs.Screen
				name="nature-meditate"
				options={{
					title: "Meditate",
					tabBarIcon: ({ focused, color }) => (
						<TabBarIcon
							title="Home"
							color={color}
							icon={
								<MaterialCommunityIcons
									name="flower-tulip"
									size={28}
									color={color}
								/>
							}
							focused={focused}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="affirmations"
				options={{
					title: "Affirmations",
					tabBarIcon: ({ focused, color }) => (
						<TabBarIcon
							color={color}
							title="Affirmations"
							icon={
								<Entypo name="open-book" size={28} color={color} className="" />
							}
							focused={focused}
						/>
					),
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;
