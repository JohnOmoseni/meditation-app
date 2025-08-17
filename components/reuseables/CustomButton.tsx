import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { Pressable } from "react-native";
import { CustomText, TextClassContext } from "./themed-element/ThemedText";
import cn from "clsx";
import React, { ReactNode } from "react";
import { COLORS } from "@/constants/colors";

const buttonVariants = cva("group row-flex", {
	variants: {
		variant: {
			outline:
				"border border-border bg-background web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent",
			default:
				"bg-primary border border-primary web:hover:opacity-80 active:opacity-80 rounded-xl active:opacity-90 w-full",
			link: "web:underline-offset-4 web:hover:underline web:focus:underline",
		},
		size: {
			default: "px-4 py-2 min-h-[62px] native:h-14",
			lg: "px-6 py-2 native:h-14",
			icon: "h-10 w-10",
			badge: "px-6 py-2.5 !rounded-full",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

const buttonTextVariants = cva("font-quicksand-semibold", {
	variants: {
		variant: {
			default: "text-primary-foreground",
			outline: "group-active:text-accent-foreground",
			link: "text-primary group-active:underline",
		},
		size: {
			default: "text-xl native:text-xl",
			lg: "native:text-lg",
			icon: "",
			badge: "",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

type ButtonProps = React.ComponentProps<typeof Pressable> &
	React.ComponentProps<typeof TouchableOpacity> &
	VariantProps<typeof buttonVariants> &
	VariantProps<typeof buttonTextVariants> &
	Partial<{
		buttonType: "pressable" | "touchable" | "link";
		icon: ReactNode;
		title: string;
		containerClassName: string;
		isLoading: boolean;
		renderElement: ReactNode;
	}>;

function CustomButton({
	ref,
	className,
	containerClassName,
	variant,
	buttonType,
	size,
	icon,
	title,
	isLoading,
	renderElement,
	...props
}: ButtonProps) {
	const Component = buttonType === "pressable" ? Pressable : TouchableOpacity;
	return (
		<TextClassContext.Provider
			value={buttonTextVariants({ variant, size, className })}
		>
			{buttonType === "link" ? (
				<Component
					className={cn(
						props.disabled && "opacity-50 web:pointer-events-none",
						buttonVariants({ variant, size, className })
					)}
					ref={ref}
					role="button"
					activeOpacity={0.7}
					{...props}
				/>
			) : (
				<Component
					className={cn(
						props.disabled && "opacity-50 web:pointer-events-none",
						icon && "gap-2.5",
						containerClassName,
						className,
						buttonVariants({ variant, size })
					)}
					ref={ref}
					role="button"
					{...(buttonType !== "pressable" && { activeOpacity: 0.7 })}
					{...props}
				>
					{icon}

					<View className="">
						{isLoading ? (
							<ActivityIndicator size="small" color={COLORS.white} />
						) : (
							<CustomText>{title}</CustomText>
						)}
					</View>
				</Component>
			)}
		</TextClassContext.Provider>
	);
}

export { CustomButton, buttonTextVariants, buttonVariants };
export type { ButtonProps };
