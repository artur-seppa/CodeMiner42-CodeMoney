export class Transaction {
    #id;
    #type;
    #amount;
    #fromAccountNumber;
    #toAccountNumber;

    constructor(
        type,
        amount,
        fromAccountNumber,
        toAccountNumber = null,
    ) {
        this.#id = this.generateUniqueId();
        this.#type = type;
        this.#amount = amount;
        this.#fromAccountNumber = fromAccountNumber;
        this.#toAccountNumber = toAccountNumber;
    }

    generateUniqueId() {
        return Date.now().toString() + Math.random().toString(36).substr(2, 9);
    }

    // Getters
    getId() {
        return this.#id;
    }

    getType() {
        return this.#type;
    }

    getAmount() {
        return this.#amount;
    }

    getFromAccountNumber() {
        return this.#fromAccountNumber;
    }

    getToAccountNumber() {
        return this.#toAccountNumber;
    }

    getPropsTransaction() {
        return {
            id: this.#id,
            type: this.#type,
            amount: this.#amount,
            fromAccountNumber: this.#fromAccountNumber,
            toAccountNumber: this.#toAccountNumber
        };
    }
}