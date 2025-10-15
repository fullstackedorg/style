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

    fontSize: true,
} as const;

const propertiesDefaultingToPxArr = Object.keys(propertiesDefaultingToPx);
const allCSSProperties = [];
for (const property in document.body.style) {
    allCSSProperties.push(property);
}

type CSSProperties =
    | CSS.Properties
    | {
          [property in keyof typeof propertiesDefaultingToPx]:
              | number
              | CSS.Properties[property];
      }
    | {
          [child: string]: CSSProperties;
      };

function createStyle(tag: string, cssProperties: CSSProperties) {
    const tempElement = document.createElement("div");

    Object.entries(cssProperties).forEach(([property, value]) => {
        if (
            propertiesDefaultingToPxArr.includes(property) &&
            value &&
            typeof value === "number"
        ) {
            value = value + "px";
        } else if (!allCSSProperties.includes(property)) {
            const nestedTag = property.startsWith(":")
                ? `${tag}${property}`
                : `${tag} ${property}`;

            return createStyle(nestedTag, value);
        }

        tempElement.style[property] = value;
    });

    const cssString = tempElement.style.cssText;
    tempElement.remove();

    style.innerText += `${tag}{${cssString}}`;
}

export function createClass(name: string, cssProperties: CSSProperties) {
    createStyle("." + name, cssProperties);
    return name;
}
