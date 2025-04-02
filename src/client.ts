import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { OpenAI } from 'openai';
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import dotenv from 'dotenv';
import fs from 'fs';


dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Definiera en typ för meddelanden som inte kräver "name"
type ChatMessage = { role: "user" | "assistant" | "system"; content: string };


export const createChatCompletion = async (
  messages: ChatMessage[]
): Promise<any> => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages,
    max_tokens: 400,
    temperature: 0.7,
  });
  return response;
};

export const uploadfile = async () => {
const fileStream = fs.createReadStream('./csv.jsonl');
const uploadResponse = await openai.files.create({
  file: fileStream,
  purpose: 'fine-tune'
}
);
console.log(uploadResponse);
return uploadResponse;
}



const transport = new StdioClientTransport({
  command: "node",
  args: ["build/mcpServer.js"]
});

const client = new Client({
    name: "Aspia-client",
    version: "1.0.0"
  },
  {
    capabilities: {
      prompts: {},
      resources: {},
      tools: {}
    }
  }
);

const connection = await client.connect(transport);
// List tools
const tools = await client.listTools();

// List Prompts
const prompts = await client.listPrompts();

// call a prompt
export const callPromptWithUserMessage = async (userMessage: string): Promise<void> => {
  try {
    const callPrompt = await client.getPrompt({
      name: "echo",
      arguments: { message: userMessage }
    });
    console.log("Prompt Response:", callPrompt.messages);
  } catch (error) {
    console.error("Error calling prompt:", error);
  }
};

// close connection
export const closeConnection = async (): Promise<void> => {
  await client.close();
};

// Call a tool
const result = await client.callTool({
  name: "echo",
  arguments: { message: "Testmeddelande" }
});
console.log('Tool Response:', result);







