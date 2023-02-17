import {
    constants,
    copyFile,
    mkdir,
    readdir,
    readFile,
    writeFile,
} from "fs/promises";

/**
 * Minify all JSON files
 * @param {String} basePath The base path to use
 * @param {String} [outputDir] The output directory (optional)
 */
const minifyFiles = async (basePath, outputDir = null) => {
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
                `${outputDir || basePath}/${filename}`,
                JSON.stringify(
                    JSON.parse(await readFile(`${basePath}/${filename}`))
                )
            )
    );
};

/**
 * Move the help center topics
 * @param {String} basePath The base path to use
 * @param {String} [outputDir] The output directory (optional)
 */
const moveHelpCenterTopics = async (basePath, outputDir = null) => {
    await mkdir(`${outputDir}`);
    (await readdir(`${basePath}`)).forEach(
        async (filename) =>
            await copyFile(
                `${basePath}/${filename}`,
                `${outputDir}/${filename}`,
                constants.COPYFILE_EXCL
            )
    );
};

const basePath = new URL(import.meta.url).pathname
    .split("/")
    .slice(0, -1)
    .join("/")
    .replace("/lib", "/");

const baseOutputPath = `${basePath}/dist`;

await mkdir(`${baseOutputPath}`);
await copyFile(`${basePath}/index.html`, `${baseOutputPath}/index.html`);

// Help Center Topics
await moveHelpCenterTopics(
    `${basePath}/helpcenter-topics`,
    `${baseOutputPath}/helpcenter-topics`
);

// Minification
await minifyFiles(basePath, `${baseOutputPath}/`);
