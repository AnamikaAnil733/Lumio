import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, "../data");
const filePath = path.join(dataDir, "favorites.json");

const ensureFileExists = async () => {
    try {
        await fs.mkdir(dataDir, { recursive: true });
        try {
            await fs.access(filePath);
        } catch {
            await fs.writeFile(filePath, JSON.stringify([], null, 2), "utf-8");
        }
    } catch (err) {
        console.error("Error initializing favorites store:", err);
    }
};

export const readFavorites = async () => {
    await ensureFileExists();
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
};

export const writeFavorites = async (data: unknown) => {
    await ensureFileExists();
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
};