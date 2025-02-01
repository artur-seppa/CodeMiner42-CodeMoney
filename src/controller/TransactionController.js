import { TransactionCollection } from '../collection/TransactionCollection.js';
import { Transaction } from '../model/Transaction.js';
import { TransactionView } from '../view/TransactionView.js';

export class TransactionController {
    constructor() {
        this.TransactionCollection = new TransactionCollection();
        this.transactionView = new TransactionView();
    }

    createTransaction(fromAccountId, toAccountId, value, type) {
        try {
            const transaction = new Transaction(
                type,
                value,
                fromAccountId,
                toAccountId
            );

            return this.TransactionCollection.addTransaction(transaction);
        } catch (error) {
            throw error;
        }
    }

    getTransactionsById(accountId) {
        try {
            const transactions = this.TransactionCollection.getTransactionsByAccountId(accountId);
            return this.transactionView.renderTransactionsDetails(transactions);
        } catch (error) {
            throw error;
        }
    }
}