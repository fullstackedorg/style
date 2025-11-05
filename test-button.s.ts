import { createClass } from "./style";

const spacing = {
    xs: 3,
    s: 5,
    m: 10,
    l: 20,
    xl: 30,
};

const colors = {
    primary: {
        main: "#007aff",
        darken: "#0b5bb3",
    },
};

export const largeClass = "lrg";

export const buttonClass = () =>
    createClass("btn", {
        padding: `${spacing.s}px ${spacing.m}px`,
        borderRadius: spacing.s,
        backgroundColor: colors.primary.main,
        color: "white",
        fontWeight: "bold",
        border: 0,
        cursor: "pointer",
        flex: "1",
        "&:active": {
            backgroundColor: colors.primary.darken,
        },
        [`&.${largeClass}`]: {
            padding: `${spacing.m}px ${spacing.l}px`,
        },
    });
buttonClass();
