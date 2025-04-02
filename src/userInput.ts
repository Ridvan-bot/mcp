import { callPromptWithUserMessage, closeConnection, createChatCompletion } from './client.js';


const mainFuntion = async () => {
const myimput = 'Tjena tjena';
await callPromptWithUserMessage(myimput);
const messages: { role: "user" | "assistant" | "system"; content: string }[] = [
    { role: "user", content: "Kan du räkna ut 23 + 23?" }
  ];
const conversation = await createChatCompletion(messages);
const response = conversation.choices[0].message.content;
console.log(response);
// timeout for 5 seconds
setTimeout(async () => {
    console.log('Closing connection');
    await closeConnection();
}, 5000);
}


mainFuntion();
