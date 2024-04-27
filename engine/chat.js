import "dotenv/config";
import {
  OpenAI,
  OpenAIEmbedding,
  serviceContextFromDefaults,
  SimpleResponseBuilder,
  ResponseSynthesizer,
  ContextChatEngine,
} from "llamaindex";
import { getIndex } from "./indexing.js";

export const chatEngine = async () => {
  const keys = process.env.OPENAI_API_KEY; // read API key from .env

  let customLLM = new OpenAI();
  let customEmbedding = new OpenAIEmbedding();

  let customServiceContext = new serviceContextFromDefaults({
    llm: customLLM,
    embedModel: customEmbedding,
  });

  const index = await getIndex(customServiceContext);

  let customQaPrompt = function ({ context = "", query = "" }) {
    return `
              ---------------------
              ${context}
              ---------------------
              ${process.env.PROMPT}
              Query: ${query}
              Answer:`;
  };

  const retriever = index.asRetriever();
  retriever.similarityTopK = process.env.SIMILARITY_TOP_K;

  return new ContextChatEngine({
    chatModel: customLLM,
    retriever,
    contextSystemPrompt: customQaPrompt,
  });
};
