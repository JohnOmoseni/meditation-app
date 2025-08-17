import { Text as RNText, type TextProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import clsx from "clsx";
import * as React from "react";
import * as Slot from "@rn-primitives/slot";

export type ThemedTextProps = TextProps &
	React.ComponentProps<typeof RNText> & {
		ref?: React.RefObject<RNText>;
		lightColor?: string;
		darkColor?: string;
		asChild?: boolean;
		type?: "default" | "title" | "secondary" | "subtitle" | "link";
	};

const TextClassContext = React.createContext<string | undefined>(undefined);

function CustomText({
	style,
	lightColor,
	darkColor,
	type = "default",
	className,
	asChild = false,
	...rest
}: ThemedTextProps) {
	const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
	const textClass = React.useContext(TextClassContext);
	const Component = asChild ? Slot.Text : RNText;

	return (
		<Component
			style={[{}, style]}
			className={clsx(
				"text-foreground",
				{
					"text-base font-rmono": type === "default",
					"text-4xl font-bold": type === "title",
					"text-3xl font-bold": type === "secondary",
					"text-xl font-semibold font-regular": type === "subtitle",
					"text-base leading-[17px] text-secondary font-semibold":
						type === "link",
				},
				textClass,
				className
			)}
			{...rest}
		/>
	);
}

export { CustomText, TextClassContext };
