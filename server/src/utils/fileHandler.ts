import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { Movie } from "../interfaces/movieInterface.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, "../data");
const filePath = path.join(dataDir, "favorites.json");

type FavoritesStore = Record<string, Movie[]>;

const ensureFileExists = async () => {
    try {
        await fs.mkdir(dataDir, { recursive: true });
        try {
            await fs.access(filePath);
        } catch {
            await fs.writeFile(filePath, JSON.stringify({}, null, 2), "utf-8");
        }
    } catch (err) {
        console.error("Error initializing favorites store:", err);
    }
};

const readStore = async (): Promise<FavoritesStore> => {
    await ensureFileExists();
    const raw = await fs.readFile(filePath, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
        return {};
    }
    return parsed as FavoritesStore;
};

const writeStore = async (store: FavoritesStore): Promise<void> => {
    await ensureFileExists();
    await fs.writeFile(filePath, JSON.stringify(store, null, 2), "utf-8");
};

export const readFavorites = async (sessionId: string): Promise<Movie[]> => {
    const store = await readStore();
    return store[sessionId] ?? [];
};

export const writeFavorites = async (sessionId: string, data: Movie[]): Promise<void> => {
    const store = await readStore();
    store[sessionId] = data;
    await writeStore(store);
};