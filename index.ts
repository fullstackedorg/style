import { createClass } from "./style";

document.title = "Fullstacked Style";

const div = document.createElement("div");
div.innerHTML = `<span>Hello World</span>`;
document.body.append(div);

const redClass = createClass("red", {
    backgroundColor: "red",
    color: "white",
    fontFamily: "sans-serif",
    padding: 5,
    width: 200,
    cursor: "pointer",
    ":hover": {
        backgroundColor: "blue",
    },
    span: {
        textDecoration: "underline",
        ":hover": {
            fontWeight: "bold",
        },
    },
});

div.classList.add(redClass);
