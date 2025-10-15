import CSS from "csstype";

const style = document.createElement("style");
document.head.append(style);

const propertiesDefaultingToPx: { [property in keyof CSS.Properties]: true } = {
    padding: true,
    paddingTop: true,
    paddingRight: true,
    paddingBottom: true,
    paddingLeft: true,

    margin: true,
    marginTop: true,
    marginRight: true,
    marginBottom: true,
    marginLeft: true,

    width: true,
    height: true,

    top: true,
    right: true,
    bottom: true,
    left: true,

    gap: true,
} as const;

const propertiesDefaultingToPxArr = Object.keys(propertiesDefaultingToPx);

type CSSProperties =
    | CSS.Properties
    | {
          [property in keyof typeof propertiesDefaultingToPx]:
              | number
              | CSS.Properties[property];
      };

export function createClass(name: string, cssProperties: CSSProperties) {
    const tempElement = document.createElement("div");

    Object.entries(cssProperties).forEach(([property, value]) => {
        if (
            propertiesDefaultingToPxArr.includes(property) &&
            value &&
            typeof value === "number"
        ) {
            value = value + "px";
        }

        tempElement.style[property] = value;
    });

    const cssString = tempElement.style.cssText;
    tempElement.remove();

    style.innerText += `.${name}{${cssString}}`;

    return name;
}
