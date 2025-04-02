import { callPromptWithUserMessage, closeConnection } from './client.js';


const mainFuntion = async () => {
const myimput = 'Tjena tjena';
await callPromptWithUserMessage(myimput);
// timeout for 5 seconds
setTimeout(async () => {
    console.log('Closing connection');
    await closeConnection();
}, 5000);
}


mainFuntion();
