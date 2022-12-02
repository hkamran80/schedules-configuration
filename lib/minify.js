import { readdir, readFile, writeFile } from "fs/promises";

const basePath = new URL(import.meta.url).pathname
    .split("/")
    .slice(0, -1)
    .join("/")
    .replace("/lib", "/");
const files = (await readdir(basePath)).filter(
    (file) =>
        !file.startsWith(".") &&
        !file.startsWith("_") &&
        file.endsWith("json") &&
        file !== "package.json"
);

files.forEach(
    async (filename) =>
        await writeFile(
            `${basePath}/${filename}`,
            JSON.stringify(
                JSON.parse(await readFile(`${basePath}/${filename}`))
            )
        )
);
