/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
		"./providers/**/*.{js,jsx,ts,tsx}",
	],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				error: "#F14141",
				success: "#2F9B65",

				border: "var(--border)",
				input: "var(--input)",
				ring: "var(--ring)",

				gray: {
					100: "var(--grey)",
					200: "var(--grey-100)",
				},

				background: {
					DEFAULT: "var(--background)s",
					"background-100": "var(--background-100)",
				},
				foreground: {
					DEFAULT: "var(--foreground)",
					"foreground-100": "var(--foreground-100)",
				},
				primary: {
					DEFAULT: "var(--primary)",
					foreground: "var(--primary-foreground)",
				},
				muted: {
					DEFAULT: "var(--muted)",
					foreground: "var(--muted-foreground)",
				},
				popover: {
					DEFAULT: "var(--popover))",
					foreground: "var(--popover-foreground)",
				},
				accent: {
					DEFAULT: "var(--accent)",
					foreground: "var(--accent-foreground)",
				},
				card: {
					DEFAULT: "var(--card)",
					foreground: "var(--card-foreground)",
				},
				shadow_color: {
					DEFAULT: "var(--shadow-color)",
				},
				// borderWidth: {
				//   hairline: hairlineWidth(),
				// },
			},
			fontFamily: {
				quicksand: ["Quicksand-Regular", "sans-serif"],
				"quicksand-bold": ["Quicksand-Bold", "sans-serif"],
				"quicksand-semibold": ["Quicksand-SemiBold", "sans-serif"],
				"quicksand-light": ["Quicksand-Light", "sans-serif"],
				"quicksand-medium": ["Quicksand-Medium", "sans-serif"],

				rmono: ["Roboto-Mono", "sans-serif"],
			},
		},
	},
	plugins: [],
};
