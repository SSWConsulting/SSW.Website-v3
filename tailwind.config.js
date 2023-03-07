const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

/** @type {import("tailwindcss").Config} */
module.exports = {
	mode: "jit",
	content: [
		"./components/**/*.{js,ts,jsx,tsx}",
		"./content/**/*.mdx",
		"./pages/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: "class",
	theme: {
		colors: {
			transparent: "transparent",
			current: "currentColor",
			black: colors.black,
			white: colors.white,
			teal: colors.cyan,
			green: colors.emerald,
			red: colors.rose,
			purple: colors.purple,
			pink: colors.pink,
			yellow: colors.yellow,
			amber: colors.amber,
			"social-phone": "#b31217",
			"social-youtube": "#b31217",
			"social-linkedin": "#0077b5",
			"social-facebook": "#3b5998",
			"social-twitter": "#55acee",
			"social-tiktok": "#000",
			"social-github": "#2C2C2C",
			"social-meetup": "#f05664",
			sswRed: "#cc4141",
			azure: "#007fff",
			gray: {
				50: "#f9f9f9",
				100: "#f2f2f2",
				200: "#dfdfdf",
				300: "#cccccc",
				400: "#a6a6a6",
				500: "#808080",
				600: "#737373",
				700: "#606060",
				800: "#414141",
				900: "#333333",
				1000: "#1c1b2e",
			},
			blue: {
				50: "#DCEEFF",
				100: "#B4DBFF",
				200: "#85C5FE",
				300: "#4EABFE",
				400: "#2296fe",
				500: "#0084FF",
				600: "#0574e4",
				700: "#0D5DBD",
				800: "#144696",
				900: "#1D2C6C",
				1000: "#241748",
			},
			orange: {
				200: "#EB7752",
				300: "#EA6C45",
				400: "#E85C30",
				500: "#EC4815",
				600: "#DC4419",
				700: "#D04017",
				800: "#C1360F",
			},
		},
		screens: {
			sm: "600px",
			md: "900px",
			lg: "1200px",
			xl: "1500px",
			"2xl": "1800px",
		},
		fontSize: {
			xxxs: ".625rem",
			xxs: ".75rem",
			xs: ".875rem",
			sm: "1rem",
			base: "1.125rem",
			md: "1.2rem",
			lg: "1.25rem",
			xl: "1.5rem",
			"2xl": "1.75rem",
			"3xl": "2rem",
			"4xl": "2.5rem",
			"5xl": "3.25rem",
			"6xl": "4rem",
			"7xl": "5rem",
			"8xl": "6rem",
			"9xl": "7rem",
			"10xl": "8rem",
			"11xl": "9rem",
			"12xl": "10rem",
			"13xl": "11rem",
			"14xl": "12rem",
			"15xl": "13rem",
			"16xl": "14rem",
		},
		borderWidth: {
			DEFAULT: "3px",
			0: "0",
			1: "1px",
			2: "2px",
			3: "3px",
			4: "4px",
		},
		extend: {
			backgroundPosition: {
				"right-bottom-4": "right 1rem bottom 1rem",
			},
			content: {
				bread: "'>'",
			},
			textDecoration: ["active"],
			opacity: {
				7: ".075",
				15: ".15",
			},
			height: {
				22: "5.5rem",
				62: "15.5rem",
			},
			width: {
				88: "22rem",
			},
			minHeight: {
				4: "1rem",
				8: "2rem",
				12: "3rem",
				16: "4rem",
				20: "5rem",
				24: "6rem",
				28: "7rem",
				70: "17.5rem",
				158: "39.5rem",
				1025: "410px",
				"800px": "800px",
				"1/2": "50%",
				"1/3": "33.333333%",
				"2/3": "66.666667%",
				"1/4": "25%",
				"2/4": "50%",
				"3/4": "75%",
				"1/5": "20%",
				"2/5": "40%",
				"3/5": "60%",
				"4/5": "80%",
				"1/6": "16.666667%",
				"2/6": "33.333333%",
				"3/6": "50%",
				"4/6": "66.666667%",
				"5/6": "83.333333%",
				"screen-1/2": "50vh",
				"screen-1/3": "33.333333vh",
				"screen-2/3": "66.666667vh",
				"screen-1/4": "25vh",
				"screen-2/4": "50vh",
				"screen-3/4": "75vh",
				"screen-1/5": "20vh",
				"screen-2/5": "40vh",
				"screen-3/5": "60vh",
				"screen-4/5": "80vh",
				"screen-1/6": "16.666667vh",
				"screen-2/6": "33.333333vh",
				"screen-3/6": "50vh",
				"screen-4/6": "66.666667vh",
				"screen-5/6": "83.333333vh",
			},
			maxWidth: {
				"8xl": "83rem",
				"9xl": "86rem",
				"1/2": "50%",
				"1/3": "33.333333%",
				"2/3": "66.666667%",
				"1/4": "25%",
				"2/4": "50%",
				"3/4": "75%",
				"1/5": "20%",
				"2/5": "40%",
				"3/5": "60%",
				"4/5": "80%",
				"1/6": "16.666667%",
				"2/6": "33.333333%",
				"3/6": "50%",
				"4/6": "66.666667%",
				"5/6": "83.333333%",
			},
			spacing: {
				15: "60px",
				17: "4.25rem",
				25: "100px",
				70: "17.5rem",
				128: "32rem",
				150: "40rem",
				liveStream: "75px",
			},
			padding: {
				"9/16": "56.25%",
			},
			zIndexStack: [
				"base",
				"bgVideo",
				"videoMask",
				"content",
				"badge",
				"videoThumbnail",
				"tooltip",
			], // ordered by z-index ascendant
			fontFamily: {
				sans: [
					"var(--open-sans-font)",
					"Helvetica Neue",
					"Helvetica",
					"sans-serif",
				],
				body: ["Arial", "Helvetica Neue", "Helvetica", "sans-serif"],
			},
			animation: {
				"more-bounce": "more-bounce 2s infinite",
				ripple: "ripple-out 0.75s",
				"ripple-pseudo": "ripple-out-pseudo 0.75s",
			},
			keyframes: {
				"more-bounce": {
					"0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
					"40%": { transform: "translateY(-30px)" },
					"60%": { transform: "translateY(-15px)" },
				},
				"ripple-out": {
					"0%": { width: "0%" },
					"100%": { width: "100%" },
				},
				"ripple-out-pseudo": {
					"0%": { background: "rgba(0, 0, 0, 0.25)" },
					"100%": { background: "transparent" },
				},
			},
			colors: {
				gray: {
					75: "#f5f5f5",
					125: "#eeeeee",
					450: "#9e9e9e",
					550: "#6C757D",
					650: "#666666",
				},
				red: {
					550: "#dc3545",
				},
				inherit: "inherit",
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						lineHeight: 1.45,
						h1: {
							fontWeight: "300",
							margin: "1rem 0",
							padding: "60px 0 20px 0",
							lineHeight: 1.2,
						},
						h3: {
							fontWeight: "300",
							marginBottom: "7px",
						},
						p: {
							marginBottom: "10px",
						},
						hr: {
							margin: "30px 0",
						},
						pre: {
							color: theme("colors.gray.700"),
							backgroundColor: theme("colors.gray.100"),
							lineHeight: 1.5,
						},
					},
				},
				consulting: {
					css: {
						h1: {
							"> strong": {
								color: theme("colors.sswRed"),
							},
						},
						"p, ul": {
							fontWeight: theme("fontWeight.light"),
							margin: "0 auto",
							padding: "20px 0",
						},
						"p > img": {
							margin: "0 auto",
						},
						"ul > li": {
							display: "block",
							fontWeight: theme("fontWeight.bold"),
							margin: "2em 3rem 0 3rem",
							"> div::before": {
								color: theme("colors.sswRed"),
								content: "\u25A0",
								display: "inline-block",
								fontFamily: "Arial Black",
								fontWeight: theme("fontWeight.bold"),
								marginLeft: "-1em",
								width: "1em",
							},
						},
					},
				},
			}),
			backgroundImage: {
				done: "url('/images/icons/done.png')",
				"live-banner-wait": "url('/blocks/LiveStreamBanner-Wait.png')",
				"live-banner-live": "url('/blocks/LiveStreamBanner-Live.gif')",
				"card-video": "url('/images/icons/video-icon.svg')",
				"card-blog": "url('/images/icons/blog-post.svg')",
				benefits: "url('/consulting/mvc-benefits-bg.jpg')",
				"video-mask": "url('/images/video-mask.png')",
			},
		},
		linearGradientColors: {
			"social-instagram": [
				"#f09433",
				"#e6683c 25%",
				"#dc2743 50%",
				"#cc2366 75%",
				"#bc1888",
			],
		},
	},
	variants: {
		// extend: { typography: ["tint", "dark", "primary"] },
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("tailwindcss-gradients"),
		require("@headlessui/tailwindcss")({ prefix: "ui" }),

		// taken from https://github.com/tailwindlabs/tailwindcss/discussions/2156#discussioncomment-1283105
		plugin(function ({ addVariant, e }) {
			addVariant("not-first", ({ modifySelectors, separator }) => {
				modifySelectors(({ className }) => {
					return `.${e(`not-first${separator}${className}`)}:not(:first-child)`;
				});
			});
		}),

		plugin(function ({ addVariant }) {
			const alias_list = Object.entries({
				">": ["children", "child"],
				" ": ["heir", "descendant"],
				"~": ["sibling", "twin"],
			});

			// list of elements from https://developer.mozilla.org/en-US/docs/Web/HTML/Element
			const elements = [
				// general selector
				"",

				// content
				"address",
				"article",
				"aside",
				"footer",
				"header",
				"h1",
				"h2",
				"h3",
				"h4",
				"h5",
				"h6",
				"main",
				"nav",
				"section",

				// Text content
				"blockquote",
				"dd",
				"div",
				"dl",
				"dt",
				"figcaption",
				"figure",
				"hr",
				"li",
				"menu",
				"ol",
				"p",
				"pre",
				"ul",

				// Inline text semantics
				"a",
				"abbr",
				"b",
				"bdi",
				"bdo",
				"br",
				"cite",
				"code",
				"data",
				"dfn",
				"em",
				"i",
				"kbd",
				"mark",
				"q",
				"rp",
				"rt",
				"ruby",
				"s",
				"samp",
				"small",
				"span",
				"strong",
				"sub",
				"sup",
				"time",
				"u",
				"var",
				"wbr",

				// Image and multimedia
				"area",
				"audio",
				"img",
				"map",
				"track",
				"video",

				// Embedded content
				"embed",
				"iframe",
				"object",
				"param",
				"picture",
				"portal",
				"source",

				// SVG and MathML
				"svg",
				"math",

				// Tables
				"table",
				"thead",
				"tbody",
				"tr",
				"th",
				"td",
			];

			let variants = elements.flatMap((element) =>
				alias_list.flatMap(([selector, aliases]) =>
					aliases.map((alias) => {
						// eg. element == 'div', selector == ':where(&) >' alias == 'child'

						const variant = alias + (element ? `-${element}` : "");
						const base = `:where(&) ${selector} ${element}:where(:not(.not-${variant}))`;
						const added = {
							"~": `:where(&:not(.not-${variant}))`,
							" ": `:where(&) ${selector} :where(:not(.not-${variant})) ${element}`,
						}[selector];

						return [variant, added ? [base, added] : base];
					})
				)
			);

			variants.forEach((v) => addVariant(...v));
		}),

		plugin(function ({ matchUtilities, theme }) {
			matchUtilities(
				{
					z: (value) => ({
						zIndex: value,
					}),
				},
				{
					values: Object.keys(theme("zIndexStack")).reduce((ret, key) => {
						ret[theme("zIndexStack")[key]] = key;
						return ret;
					}, {}),
				}
			);
		}),
	],
};
