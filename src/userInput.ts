import {
    callPromptWithUserMessage,
    closeConnection,
    createChatCompletion,
    uploadfile
  } from './client.js';
  
  const mainFunction = async () => {
    // Initiera konversationen med ett första meddelande
    let conversationHistory: { role: "user" | "assistant" | "system"; content: string }[] = [
      { role: "user", content: `Kan du tolka detta: EmployeeCode	DepartmentCode	ProjectCode	SalaryTypeCode	Quantity	PeriodStart	PeriodEnd
  3			3	7.50	2024-11-01	2024-11-01` }
    ];
    
    // Första anropet
    const conversation = await createChatCompletion(conversationHistory);
    const response = conversation.choices[0].message.content;
    console.log("Första svar:", response);
    
    // Lägg till assistentens svar i historiken
    conversationHistory.push({ role: "assistant", content: response });
    
    // Lägg till nästa användarmeddelande
    conversationHistory.push({ role: "user", content: `Kommer du ihåg vad jag precis frågade dig?` });
    
    // Andra anropet med hela kontexten
    const conversation2 = await createChatCompletion(conversationHistory);
    const response2 = conversation2.choices[0].message.content;
    console.log("Andra svar:", response2);
    
    // Uppdatera historiken med det nya svaret
    conversationHistory.push({ role: "assistant", content: response2 });
    
    // Timeout för att stänga anslutningen efter 15 sekunder
    setTimeout(async () => {
      console.log('Stänger anslutningen');
      await closeConnection();
    }, 15000);
  }
  
  mainFunction();
  