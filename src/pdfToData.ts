import PDFParser from "pdf2json";

export const pdfToJson = async (pdfPath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();
    const outputLines: string[] = [];

    pdfParser.on("pdfParser_dataError", (errData: any) => {
      reject(errData.parserError);
    });

    pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
      pdfData.Pages.forEach((page: any, pageIndex: number) => {
        // Lägg till en separator per sida (valfritt)
        page.Texts.forEach((text: any, textIndex: number) => {
          // Extrahera och avkoda T-värdena
          const tValues = text.R.map((r: any) => decodeURIComponent(r.T));
          const combinedText = tValues.join(" ").trim();
          // Lägg bara till om texten inte är tom
          if (combinedText !== "") {
            outputLines.push(`${combinedText}, `);
          }
        });
      });
      
      // Slå ihop alla rader till en enda sträng
      const combinedOutput = outputLines.join("\n");
      resolve(combinedOutput);
    });

    pdfParser.loadPDF(pdfPath);
  });
};
