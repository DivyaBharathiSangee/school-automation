const { defineConfig } = require('cypress')
const ExcelJS = require('exceljs')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        excelToJson(filePath) {
          const workbook = new ExcelJS.Workbook()
          return workbook.xlsx.readFile(filePath).then(() => {
            const sheet = workbook.getWorksheet(1)
            const rows = []

            sheet.eachRow((row, rowNumber) => {
              if (rowNumber > 1) {
                rows.push(row.values)
              }
            })

            return rows
          })
        }
      })
    }
  }
})
