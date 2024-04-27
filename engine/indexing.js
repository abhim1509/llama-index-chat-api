import "dotenv/config";
import { storageContextFromDefaults, VectorStoreIndex } from "llamaindex";

import { getData } from "./loader.js";

const keys = process.env.OPENAI_API_KEY; // read API key from .env
const DIRECTORY_PATH = process.env.DIRECTORY_PATH;

export const getIndex = async (serviceContext) => {
  const storageContext = await storageContextFromDefaults({
    persistDir: process.env.STORAGE_CACHE_DIR,
  });

  const documents = await getData(DIRECTORY_PATH);
  //* High level API: split documents, get keywords, and build index.
  return await VectorStoreIndex.fromDocuments(documents, {
    storageContext,
    serviceContext,
  });
};
