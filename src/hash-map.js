class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.nextNode = null;
  }
}

export class HashMap {
  #length = 0;
  #array = new Array(16);
  #capacity = 16;
  #loadFactor = 0.75;

  #hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);

      // prevent from exceeding the maximum integer value allowed in javascript
      // also keeps it in the array bounds
      hashCode %= this.#capacity;
    }

    return hashCode;
  }
}
