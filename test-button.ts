import { createClass } from "./build";

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

const largeClass = "lrg";

export const buttonClassDef: Parameters<typeof createClass> = [
    "btn",
    {
        padding: `${spacing.s}px ${spacing.m}px`,
        borderRadius: spacing.s,
        backgroundColor: colors.primary.main,
        color: "white",
        fontWeight: "bold",
        border: 0,
        cursor: "pointer",
        "&:active": {
            backgroundColor: colors.primary.darken,
        },
        [`&.${largeClass}`]: {
            padding: `${spacing.m}px ${spacing.l}px`,
        },
    },
];

export function Button(
    opts?: Partial<{
        text: string;
        large: boolean;
    }>,
) {
    const button = document.createElement("button");
    button.innerText = opts?.text || "Button";
    button.classList.add(createClass(...buttonClassDef));

    if (opts?.large) {
        button.classList.add(largeClass);
    }

    return button;
}
