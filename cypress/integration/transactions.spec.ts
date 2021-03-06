import { TransactionStatus } from '../../src/payments/shared/services/transactions/transactions.service';
import { Transactions } from '../pages/Transactions';

const transactions = new Transactions();

describe('Transactions page', () => {
  beforeEach('login', () => {
    cy.visit('');
    cy.get('input[id=username]').type('user');
    cy.get('input[id=password]').type('userPass');
    cy.get('button[type=submit]').click();
  })

  beforeEach('navigate to transactions page', () => {
    transactions.navigate();
  });

  it('should display 5 transactions by default', () => {
    transactions.validateDefaultNumberOfDisplayedTransactions();
  })

  it('should filter by Failed status', () => {
    const status: TransactionStatus = TransactionStatus[TransactionStatus.FAILED];
    transactions.filterByStatus(status);
    transactions.validateIsFilteredByStatus(status);
  })

  context('Desktop viewport', () => {
    beforeEach('720p resolution', () => {
      cy.viewport(1280, 720);
    });
    it('should display the correct columns= headers', () => {
      const expectedHeaders = ['ID', 'Amount', 'Currency', 'Description', 'Status', 'Created At'];
      transactions.validateTableHeadersConfiguration(expectedHeaders);
    });

    it('should NOT display the column titles on each row', () => {
      transactions.validateResponsiveColumnTitleVisibility(false);
    });
  });

  context('Mobile viewport', () => {
    beforeEach('Mobile resolution', () => {
      cy.viewport('iphone-8');
    });
    it('should display the column titles on each row', () => {
      transactions.validateResponsiveColumnTitleVisibility(true);
    });
  });
});
