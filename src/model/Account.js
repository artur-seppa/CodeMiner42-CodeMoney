export class Account {
  static #counter = 0;
  #numAccount;
  #name;
  #balance;
  #createdAt;

  constructor(name, initialBalance = 0) {

    if (!name || name.trim() === '') {
      throw new Error('O nome não pode ser vazio.');
    }

    if (initialBalance < 0) {
      throw new Error('O saldo inicial deve ser um número não negativo.');
    }

    if (isNaN(initialBalance) || typeof initialBalance === 'string') {
      throw new Error('O valor de saldo deve ser apenas de tipo Number.');
    }


    this.setNumAccount(this.generateNumberAccount());
    this.setName(name);
    this.setBalance(initialBalance);
    this.setCreatedAt(new Date());
  }

  generateNumberAccount() {
    Account.#counter++;
    return Account.#counter.toString().padStart(6, '0');
  }

  //setters
  setNumAccount(numAccount) {
    this.#numAccount = numAccount;
  }

  setName(name) {
    this.#name = name;
  }

  setBalance(balance = 0) {
    this.#balance = balance;
  }

  setCreatedAt(createdAt) {
    this.#createdAt = createdAt;
  }

  // getters
  getNumAccount() {
    return this.#numAccount;
  }

  getName() {
    return this.#name;
  }

  getBalance() {
    return this.#balance;
  }

  getCreatedAt() {
    return this.#createdAt;
  }

  getBalance() {
    return this.#balance;
  }

  getPropsAccount() {
    return {
      numAccount: this.#numAccount,
      name: this.#name,
      balance: this.#balance,
      createdAt: this.#createdAt
    };
  }
}