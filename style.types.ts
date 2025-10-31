import CSS from "csstype";

const propertiesDefaultingToPx = {
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
    borderRadius: true,
} as const;

export type CSSProperties =
    | {
          [property in keyof CSS.Properties]: property extends keyof typeof propertiesDefaultingToPx
              ? number | CSS.Properties[property]
              : CSS.Properties[property];
      }
    | {
          [child: string]: CSSProperties;
      };

export const propertiesDefaultingToPxArr = Object.keys(
    propertiesDefaultingToPx,
);
export const allCSSProperties = [];
for (const property in document.body.style) {
    allCSSProperties.push(property);
}
