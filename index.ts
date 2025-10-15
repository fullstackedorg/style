import { createClass } from "./style";

document.title = "Fullstacked Style";

const redClass = createClass("red", {
    backgroundColor: "red",
    color: "white",
    fontFamily: "sans-serif",
    padding: 5,
    width: 200
});

const div = document.createElement("div");
div.classList.add(redClass);
div.innerHTML = `<span>Hello</span>`;
document.body.append(div);
