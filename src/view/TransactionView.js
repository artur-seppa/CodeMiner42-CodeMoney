export class TransactionView {
    renderTransactionsDetails(transactions) {
        const formattedTransactions = transactions.map(transaction => ({
            id: transaction.getId(),
            type: transaction.getType(),
            amount: transaction.getAmount().toFixed(2),
            fromAccountNumber: transaction.getFromAccountNumber(),
            toAccountNumber: transaction.getToAccountNumber() || 'N/A'
        }));

        return formattedTransactions;
    }

    renderError(error) {
        return {
            error: true,
            message: error.message
        };
    }
}