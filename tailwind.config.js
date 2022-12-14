/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class', // or 'media' or 'class'
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				gilroy: ["Gilroy", "sans-serif"],
			},
			animation: {
				enter: "enter .2s ease-out",
				leave: "leave .15s ease-in forwards",
			},
			keyframes: {
				enter: {
					"0%": {
						opacity: "0",
						transform: "scale(.9)",
					},
					"100%": {
						opacity: "1",
						transform: "scale(1)",
					},
				},
				leave: {
					"0%": {
						opacity: "1",
						transform: "scale(1)",
					},
					"100%": {
						opacity: "0",
						transform: "scale(.9)",
					},
				},
			},
		},
	},
	plugins: [],
};
