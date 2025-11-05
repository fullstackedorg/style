import fs from "fs";
import { exportStyles } from "./style.build";

document.title = "Fullstacked Style";

await import("./test.s");
await import("./test-button.s");

await fs.mkdir("data");
const style = exportStyles();
console.log(style);
await fs.writeFile("data/index.css", style);

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "/data/index.css";
document.head.append(link);

globalThis.runtime = true;

await import("./test");
