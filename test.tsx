import React from "react";
import { createRoot } from "react-dom/client";
import { Button } from "./test-button";
import { redClass } from "./test.s";

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

const c = redClass();

div.classList.add(c);

const reactRootDiv = document.createElement("div");
document.body.append(reactRootDiv);
const reactRoot = createRoot(reactRootDiv);
reactRoot.render(
    <div className={c}>
        <span>Hello React</span>
    </div>,
);
