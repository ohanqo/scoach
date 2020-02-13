module.exports = {
    theme: {
        extend: {
            flex: {
                parent: "0 0 100%",
            },
            colors: {
                primary: {
                    "200": "#9995b9",
                    "400": "#6851ff",
                },
                violet: "#14072B",
            },
            fontFamily: {
                "circular": [
                    "CircularStd",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "Segoe UI",
                    "Roboto",
                    "Oxygen",
                    "Ubuntu",
                    "Cantarell",
                    "Open Sans",
                    "Helvetica Neue",
                    "sans-serif",
                ],
            },
        },
    },
    variants: { opacity: ["responsive", "disabled"] },
    plugins: [],
};
