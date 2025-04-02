import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { OpenAI } from 'openai';
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
console.log('Connected:', connection);
// List tools
const tools = await client.listTools();
console.log('Tools:', tools);

// List Prompts
const prompts = await client.listPrompts();
console.log('Prompts:', prompts);

// Call a tool
const result = await client.callTool({
  name: "echo",
  arguments: { message: "Testmeddelande" }
});
console.log('Tool Response:', result);



