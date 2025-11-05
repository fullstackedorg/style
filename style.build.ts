import {
    allCSSProperties,
    propertiesDefaultingToPxArr,
    CSSProperties,
} from "./style.types";

type StyleItem = {
    cssString?: string;
    children: StyleTree;
};

type StyleTree = {
    [name: string]: StyleItem;
};

const styles: StyleTree = {};

function getOrCreateParentFromPath(path: string[], parent = styles): StyleTree {
    if (path.length === 0) {
        return parent;
    }

    const child = path.shift();
    if (!parent[child]) {
        parent[child] = {
            children: {},
        };
    }

    return getOrCreateParentFromPath(path, parent[child].children);
}

function createStyle(cssProperties: CSSProperties, path: string[]): StyleItem {
    const styleItem = {
        cssString: "",
        children: {},
    };

    const tempElement = document.createElement("div");

    Object.entries(cssProperties).forEach(([property, value]) => {
        if (
            propertiesDefaultingToPxArr.includes(property) &&
            value &&
            typeof value === "number"
        ) {
            value = value + "px";
        } else if (!allCSSProperties.includes(property)) {
            if (property.startsWith("@media")) {
                const parentPath = [property, ...path];
                _createClass(
                    parentPath,
                    value,
                    getOrCreateParentFromPath(parentPath.slice(0, -1)),
                );
            } else {
                _createClass([...path, property], value, styleItem.children);
            }
        }

        tempElement.style[property] = value;
    });

    styleItem.cssString = tempElement.style.cssText;
    tempElement.remove();

    return styleItem;
}

function _createClass(
    path: string[],
    cssProperties: CSSProperties,
    parent = styles,
) {
    parent[path.at(-1)] = createStyle(cssProperties, path);
}

export function createClass(name: string, cssProperties: CSSProperties) {
    _createClass(["." + name], cssProperties);
    return name;
}

function constructClassName(path: string[]) {
    return path.reduce(
        (str, item) =>
            str + (item.startsWith("&") ? item.slice(1) : ` ${item}`),
        "",
    );
}

function generateStyleRecusively(path: string[] = [], parent = styles) {
    return Object.entries(parent)
        .map(([tag, styleItem]) => {
            let css = "";

            const currentPath = [...path, tag];

            if (styleItem.cssString) {
                css += `${constructClassName(currentPath)} { ${styleItem.cssString} } `;
            }

            if (styleItem.children) {
                if (tag.startsWith("@media")) {
                    css += `${tag} { ${generateStyleRecusively(
                        currentPath.slice(1),
                        styleItem.children,
                    )} }`;
                } else {
                    css += generateStyleRecusively(
                        currentPath,
                        styleItem.children,
                    );
                }
            }

            return css;
        })
        .flat()
        .join("");
}

export function exportStyles() {
    return generateStyleRecusively();
}
