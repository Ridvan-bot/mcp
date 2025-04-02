import csv from 'csvtojson';

export const convertCsvToJsonl = async (csvPath: string, ): Promise<string> => {
  try {
    // Läs in CSV-filen och konvertera till en array av JSON-objekt
    const jsonArray = await csv().fromFile(csvPath);
    
    // Konvertera varje objekt till en JSON-sträng och sammanfoga med radbrytningar
    const jsonlData = jsonArray.map(obj => JSON.stringify(obj)).join('\n');

    return jsonlData;

  } catch (error) {
    console.error("Fel vid konvertering:", error);
    return ''; // Return an empty string to satisfy the return type
  }
};
