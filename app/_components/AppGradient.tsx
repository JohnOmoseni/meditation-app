import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { ColorValue, StyleSheet } from "react-native";
import React, { ReactNode } from "react";

const AppGradient = ({
	children,
	colors,
	...rest
}: React.ComponentProps<typeof LinearGradient> & {
	children: ReactNode;
	colors: readonly [ColorValue, ColorValue, ...ColorValue[]];
}) => {
	return (
		<LinearGradient colors={colors} style={styles.container}>
			<SafeAreaView className="flex-1 px-5 py-3 relative">
				{children}
			</SafeAreaView>
		</LinearGradient>
	);
};

export default AppGradient;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
