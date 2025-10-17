import React from "react";
import { createClass } from "./runtime";
import { createRoot } from "react-dom/client";
import { Button } from "./test-button";

export const redClassDef: Parameters<typeof createClass> = [
    "red",
    {
        backgroundColor: "red",
        color: "white",
        fontFamily: "sans-serif",
        padding: 5,
        width: 200,
        "&:hover": {
            backgroundColor: "blue",
        },
        span: {
            textDecoration: "underline",
            "&:hover": {
                fontWeight: "bold",
            },
        },
    },
];

export function run() {
    const div = document.createElement("div");
    div.innerHTML = `<span>Hello World</span>`;
    const button = Button({
        text: "Click Me",
        large: true,
    });
    button.onclick = () => {
        div.innerText = "You clicked the button.";
    };
    document.body.append(div, button);

    const redClass = createClass(...redClassDef);

    div.classList.add(redClass);

    const reactRootDiv = document.createElement("div");
    document.body.append(reactRootDiv);
    const reactRoot = createRoot(reactRootDiv);
    reactRoot.render(
        <div className={redClass}>
            <span>Hello React</span>
        </div>,
    );
}
