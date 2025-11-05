import { createClass } from "./style";

export const redClass = () =>
    createClass("red", {
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
            "@media(max-width: 400px)": {
                backgroundColor: "purple",
            },
        },
    });
redClass();
