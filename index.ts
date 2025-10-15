import { createClass, exportStyles } from "./build";
import { redClassDef, run } from "./test";
import fs from "fs";

document.title = "Fullstacked Style";

createClass(...redClassDef);

await fs.mkdir("data");
await fs.writeFile("data/index.css", exportStyles());

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "/data/index.css";
document.head.append(link);

run();
