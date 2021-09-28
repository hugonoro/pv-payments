export class Transactions {
  navigate() {
    cy.visit('transactions');
  }

  validateDefaultNumberOfDisplayedTransactions() {
    cy.get('.transactions-table .p-datatable-tbody tr')
      .should('have.length', 5)
  }

  validateTableHeadersConfiguration(expectedColumnConfig: string[]) {
    expectedColumnConfig.forEach(column => {
      cy.get('.transactions-table .p-datatable-thead')
        .should('be.visible')
        .find('th').contains(column);
    });
  }

  validateResponsiveColumnTitleVisibility(isMobile: boolean) {
    const assert = isMobile ? 'be.visible' : 'not.exist';
    cy.get('.transactions-table .p-datatable-tbody .p-column-title').should(assert);
  }
}
