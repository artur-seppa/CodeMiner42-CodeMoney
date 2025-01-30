export class AccountCollection {
    #accounts = [];

    create(account) {
        this.#accounts.push(account);
        return account;
    }

    renderLengthAccounts() {
        return this.#accounts.length;
    }

    findById(accountId) {
        const account = this.#accounts.find(acc => acc.getNumAccount() === accountId);
        if (!account) {
            throw new Error('Account not found');
        }
        return account;
    }

    update(accountId, value, type) {
        const account = this.findById(accountId);

        if (type == 'name') {
            account.setName(value);

        } else if (type == 'deposit') {
            if (value <= 0) {
                throw new Error('O deposito tem que ser de valor maior do que zero.');
            }

            if (isNaN(value) || typeof value === 'string') {
                throw new Error('O valor do deposito deve ser apenas do tipo Number.');
            }

            account.setBalance(account.getBalance() + value);
        }

        return account;
    }
}