import { createClass as createClassRuntime } from "./style.runtime";
import { createClass as createClassBuild } from "./style.build";
import { CSSProperties } from "./style.types";

export function createClass(
    name: string,
    cssProperties: CSSProperties,
): string {
    if (globalThis.runtime) {
        return createClassRuntime(name);
    }

    return createClassBuild(name, cssProperties);
}
