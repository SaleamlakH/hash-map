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

  length() {
    return this.#length;
  }

  set(key, value) {
    const hashCode = this.#hash(key);

    // Add a new node if it is empty
    const bucket = this.#array[hashCode];
    if (!bucket) {
      const node = new Node(key, value);

      this.#array[hashCode] = node;
      this.#length++;
      return;
    }

    // traverse the linked list of the bucket
    let node = bucket;

    // track the last node to append a node if
    // there is no matching keys
    let lastNode = node;
    while (node) {
      if (node.key === key) {
        node.value = value;
        return;
      }

      lastNode = node;
      node = node.nextNode;
    }

    lastNode.nextNode = new Node(key, value);
    this.#length++;
  }

  get(key) {
    const hashCode = this.#hash(key);

    let node = this.#array[hashCode];
    if (!node) return null;

    // traverse over the list
    while (node) {
      if (node.key === key) {
        return node.value;
      }

      node = node.nextNode;
    }

    return null;
  }

  has(key) {
    //convert the result of get() into boolean
    return !!this.get(key);
  }

  remove(key) {
    const hashCode = this.#hash(key);

    const bucket = this.#array[hashCode];
    if (!bucket) return false;

    let headNode = bucket;
    if (headNode.key === key) {
      // is it the only element
      if (!headNode.nextNode) {
        // create a hole instead of setting to null/undefined;
        delete this.#array[hashCode];
      } else {
        this.#array[hashCode] = headNode.nextNode;
      }

      this.#length--;
      return true;
    }

    let prevNode = headNode;
    let node = prevNode.nextNode;
    while (node) {
      if (node.key === key) {
        prevNode.nextNode = node.nextNode;

        this.#length--;
        return true;
      }

      prevNode = node;
      node = node.nextNode;
    }

    return false;
  }

  clear() {
    this.#array = new Array(16);
    this.#length = 0;
    this.#capacity = 16;
  }

  keys() {
    const keys = [];

    for (const bucket of this.#array) {
      if (!bucket) continue;

      let node = bucket;
      do {
        keys.push(node.key);
        node = node.nextNode;
      } while (node);
    }

    return keys;
  }
}
