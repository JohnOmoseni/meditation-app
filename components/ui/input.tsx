import { cn } from "@/lib/utlis";
import * as React from "react";
import { TextInput, type TextInputProps } from "react-native";

function Input({
	className,
	placeholderClassName,
	...props
}: TextInputProps & {
	ref?: React.RefObject<TextInput>;
}) {
	return (
		<TextInput
			className={cn(
				"web:flex h-12 native:h-14 web:w-full rounded-lg border border-input bg-background px-4 py-3.5 web:py-2 text-base native:text-lg native:leading-[1.25] text-foreground file:border-0 file:bg-transparent file:font-medium",
				props.editable === false && "opacity-50",
				className
			)}
			placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
			placeholderTextColor={cn("text-muted-foreground", placeholderClassName)}
			{...props}
		/>
	);
}

export { Input };
