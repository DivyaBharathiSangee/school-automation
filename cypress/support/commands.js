

import './commands'



const ExcelJS = require('exceljs');

Cypress.Commands.add('convertExcelToJson', (fileName, worksheetName, outputFileName) => {
  // Load the Excel fixture as an ArrayBuffer for ExcelJS
  cy.fixture(fileName, null).then((arrayBuffer) => {
    const workbook = new ExcelJS.Workbook();
    return workbook.xlsx.load(arrayBuffer).then(() => {
      const worksheet = workbook.getWorksheet(worksheetName);

      // Guard: worksheet must exist
      if (!worksheet) {
        const availableSheets = workbook.worksheets.map((w) => w.name).join(', ');
        throw new Error(`Worksheet "${worksheetName}" not found in ${fileName}. Available sheets: ${availableSheets}`);
      }

      const jsonData = [];

      // Find the column index of To_be_tested/TO_BE_TESTED (case-insensitive)
      let toBeTestedColumnIndex = null;
      const headerRow = worksheet.getRow(1);
      for (let col = 1; col <= headerRow.cellCount; col++) {
        const headerCell = headerRow.getCell(col);
        const headerValue = (headerCell && headerCell.value != null)
          ? headerCell.value.toString().trim().toLowerCase()
          : '';
        if (headerValue === 'to_be_tested') {
          toBeTestedColumnIndex = col;
          break;
        }
      }

      if (toBeTestedColumnIndex === null) {
        throw new Error(`Required header "To_be_tested" not found in sheet "${worksheetName}" of ${fileName}`);
      }

      // Convert each row to a JSON object if To_be_tested is set to YES
      worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber <= 1) return; // skip header

        const toBeTestedCell = row.getCell(toBeTestedColumnIndex);
        const toBeTestedValue = toBeTestedCell && toBeTestedCell.value != null
          ? toBeTestedCell.value.toString().trim().toUpperCase()
          : '';

        if (toBeTestedValue === 'YES') {
          const jsonObject = {};
          row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            const headerCell = headerRow.getCell(colNumber);
            const header = headerCell && headerCell.value != null
              ? headerCell.value.toString().trim()
              : `Column_${colNumber}`;
            const value = cell && cell.value != null ? cell.value : '';
            jsonObject[header] = value;
          });
          jsonData.push(jsonObject);
        }
      });

      const jsonContent = JSON.stringify(jsonData, null, 2);
      const filePath = `cypress/fixtures/${outputFileName}`;
      cy.writeFile(filePath, jsonContent);

      return jsonData;
    });
  });
});
