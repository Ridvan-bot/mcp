import { closeConnection, createChatCompletion } from './client.js';
import { convertCsvToJsonl } from './csvtojsonl.js';
import { pdfToJson } from './pdfToData.js';

const mainFunction = async () => {
  // Initiera konversationen med ett första meddelande
  let conversationHistory: { role: "user" | "assistant" | "system"; content: string }[] = [
    { role: "user", content: `` }
  ];
  
  const pdfPath = './flexhrm.pdf';
  const csvPath = './data.csv';
  console.log('Läser in filer....');
    const jsonData = await pdfToJson(pdfPath);
    const svar = await convertCsvToJsonl(csvPath);
    conversationHistory.push({ role: "user", content: 'Detta är data1: ' + svar + 'Här är data2: ' + jsonData + 'Jag vill kunna matcha headers i data1 med någon header ifrån data2'});

    //Skicka det första meddelandet till OpenAI:s API
    console.log('Skickar första meddelandet till OpenAI....');
    const response = await createChatCompletion(conversationHistory);
    console.log(response.choices[0].message.content);

  // Timeout för att stänga anslutningen efter 15 sekunder
  setTimeout(async () => {
    console.log('Stänger anslutningen');
    await closeConnection();
  }, 15000);
}

mainFunction();
