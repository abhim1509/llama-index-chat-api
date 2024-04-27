import { chatEngine } from "../engine/chat.js";

export const chatRequest = async (req, res) => {
  try {
    console.log("Chat request");
    const { messages } = req.body;
    if (!messages) {
      return res.status(400).json({
        error: "messages are required in the request body",
      });
    }
    console.log("messages", messages);
    let engine = await chatEngine();
    const userMessage = messages.pop();

    const response = await engine.chat({
      message: userMessage.content,
      // chatHistory: userMessage.content,
    });

    return res.status(200).json({
      result: response.response,
    });
  } catch (error) {
    console.error("[LlamaIndex]", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};
