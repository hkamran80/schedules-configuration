import {
    basePath,
    baseOutputPath,
    moveFiles,
    moveFolder,
    minifyJSON,
} from "@hkamran/utility-assets";
import { join } from "path";

await moveFiles(
    basePath,
    baseOutputPath,
    ["schema"],
    ["json", "css", "toml", "md", "ipynb", "yaml"],
);

await moveFolder(
    join(basePath, "helpcenter-topics"),
    join(baseOutputPath, "helpcenter-topics"),
);

await minifyJSON(basePath, baseOutputPath);
