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
            account.deposit(value);
        }

        return account;
    }
}