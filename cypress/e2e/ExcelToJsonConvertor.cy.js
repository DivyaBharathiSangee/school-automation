describe('Excel to JSON converter', function () {
    it('should convert Excel data to JSON based on To_be_tested column', function () {  
        cy.convertExcelToJson('AutomationTestData2.xlsx', 'Login', 'LoginPage.json')
        cy.log('Excel to JSON conversion completed successfully.')
    })
})