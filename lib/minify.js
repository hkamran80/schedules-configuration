import { readdir, readFile, writeFile } from "fs/promises";

const basePath = new URL(import.meta.url).pathname
    .split("/")
    .slice(0, -1)
    .join("/")
    .replace("/lib", "/");

const files = (await readdir(basePath)).filter(
    (filename) =>
        !filename.startsWith(".") &&
        !filename.startsWith("_") &&
        !filename.includes("schema") &&
        filename.endsWith("json") &&
        filename !== "package.json"
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
