import { TransactionStatus } from '../../src/payments/shared/services/transactions/transactions.service';

export class Transactions {
  navigate() {
    cy.visit('transactions');
  }

  filterByStatus(status: TransactionStatus) {
    cy.get('.p-autocomplete-dropdown').click();
    cy.get(`.p-autocomplete-item .status.${status}`).click()
  }

  validateIsFilteredByStatus(status: TransactionStatus) {
    cy.get(`.transactions-table .p-column-field.status.${status}`)
      .should('have.text', status)
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
