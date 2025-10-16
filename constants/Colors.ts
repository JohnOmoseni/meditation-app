const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

const coffeeTheme = {
	primary: "#8B593E",
	background: "#FFF8F3",
	text: "#4A3428",
	border: "#E5D3B7",
	white: "#FFFFFF",
	textLight: "#9A8478",
	expense: "#E74C3C",
	income: "#2ECC71",
	card: "#FFFFFF",
	shadow: "#000000",
};

export const THEMES = {
	coffee: coffeeTheme,
};

export const COLORS = THEMES.coffee;

export const NAV_THEME = {
	light: {
		background: "hsl(0 0% 100%)", // background
		border: "hsl(240 5.9% 90%)", // border
		card: "hsl(0 0% 100%)", // card
		notification: "hsl(0 84.2% 60.2%)", // destructive
		primary: "hsl(240 5.9% 10%)", // primary
		text: "hsl(240 10% 3.9%)", // foreground
	},
	dark: {
		background: "hsl(240 10% 3.9%)", // background
		border: "hsl(240 3.7% 15.9%)", // border
		card: "hsl(240 10% 3.9%)", // card
		notification: "hsl(0 72% 51%)", // destructive
		primary: "hsl(0 0% 98%)", // primary
		text: "hsl(0 0% 98%)", // foreground
	},
};
