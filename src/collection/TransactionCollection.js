export class TransactionCollection {
  #transactions = [];

  addTransaction(transaction) {
    this.#transactions.push(transaction);
    return transaction;
  }

  getTransactionsByAccountId(accountId) {
    const results = this.#transactions.filter(
      transaction =>
        transaction.getFromAccountNumber() === accountId ||
        transaction.getToAccountNumber() === accountId
    );

    if (!results) {
      throw new Error('Transactions not found');
    }

    return results;
  }

  getAllTransactions() {
    return [...this.#transactions];
  }
}