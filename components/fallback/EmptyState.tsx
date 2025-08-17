import React, { ReactNode } from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { CustomText } from "../reuseables/themed-element/ThemedText";
import { COLORS } from "@/constants/colors";
import { CustomButton } from "../reuseables/CustomButton";
import { cva, VariantProps } from "class-variance-authority";

const emptyStateContainerVariants = cva("", {
	variants: {
		variant: {
			default: "flex-center shadow-sm bg-card rounded-xl ",
		},
		size: {
			default: "p-6 mt-2.5",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

const iconVariants = cva("object-contain icon", {
	variants: {
		iconColor: {
			default: COLORS.textLight,
		},
		iconSize: {
			default: 60,
		},
	},
	defaultVariants: {
		iconColor: "default",
		iconSize: "default",
	},
});

type EmptyStateProps = Partial<{
	icon?: keyof typeof Ionicons.glyphMap;
	iconSize?: number;
	iconColor?: string;
	title?: string;
	description?: string;
	buttonTitle?: string;
	buttonIcon?: ReactNode;
	onButtonPress?: () => void;
	renderButton?: ReactNode;
	containerClassName?: string;
}>;
type EmptyStateVariantProps = React.ComponentProps<typeof View> &
	VariantProps<typeof iconVariants> &
	EmptyStateProps;

const EmptyState = ({
	icon = "receipt-outline",
	iconSize = 60,
	iconColor = COLORS.textLight,
	title = "No Transactions yet",
	description = "Start tracking your finances by adding your first transaction",
	buttonTitle = "Add Transaction",
	buttonIcon = <Ionicons name="add-circle" size={18} color={COLORS.white} />,
	onButtonPress,
	renderButton,
	containerClassName,
}: EmptyStateProps) => {
	const router = useRouter();

	return (
		<View
			className={`flex-center shadow-sm bg-card rounded-xl p-6 mt-2.5 ${containerClassName}`}
		>
			<Ionicons name={icon} size={iconSize} color={iconColor} className="m-4" />

			<CustomText type="secondary" className="mb-2 text-center">
				{title}
			</CustomText>

			<CustomText className="text-sm text-center mb-8 leading-5">
				{description}
			</CustomText>

			{renderButton ? (
				renderButton
			) : (
				<CustomButton
					title={buttonTitle}
					icon={buttonIcon}
					variant={"secondary"}
					onPress={onButtonPress ?? (() => router.push("/"))}
					className=""
				/>
			)}
		</View>
	);
};

export { EmptyState };
