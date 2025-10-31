import { largeClass, buttonClass } from "./test-button.s";

export function Button(
    opts?: Partial<{
        text: string;
        large: boolean;
    }>,
) {
    const button = document.createElement("button");
    button.innerText = opts?.text || "Button";
    button.classList.add(buttonClass());

    if (opts?.large) {
        button.classList.add(largeClass);
    }

    return button;
}
