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

  deposit(deposit) {
    if (deposit <= 0) {
      throw new Error('O deposito tem que ser de valor maior do que zero.');
    }

    if (isNaN(deposit) || typeof deposit === 'string') {
      throw new Error('O valor do deposito deve ser apenas do tipo Number.');
    }

    const newBalance = deposit + this.getBalance()

    this.setBalance(newBalance);
  }

  transfer(transfer) {
    if (isNaN(transfer) || typeof transfer === 'string') {
      throw new Error('A transferência deve ser apenas do tipo Number.');
    }

    if (transfer <= 0) {
      throw new Error('A transferência tem que ser de valor maior do que zero.');
    }

    if (this.getBalance() < transfer) {
      throw new Error('Fundo insuficiente');
    }

    const newBalance = this.getBalance() - transfer;

    this.setBalance(newBalance);
  }

  //setters
  setNumAccount(numAccount) {
    this.#numAccount = numAccount;
  }

  setName(name) {
    if (name == '' || name == ' ' || name == undefined) {
      throw new Error('O valor de nome do proprietário não deve ser vazio.');
    }

    this.#name = name;
  }

  setBalance(balance) {
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