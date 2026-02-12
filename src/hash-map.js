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

  table() {
    return this.#array;
  }

  capacity() {
    return this.#capacity;
  }

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
    // prevNode is null for headNode
    let { node, prevNode, hashCode } = this.#getNode(key);

    // update its value
    if (node) {
      node.value = value;
      return;
    }

    // no entry at hashCode
    if (!prevNode) {
      this.#array[hashCode] = new Node(key, value);
    } else {
      prevNode.nextNode = new Node(key, value);
    }

    this.#length++;
    if (this.#isSizeExceedLimit()) this.#doubleSize();
  }

  get(key) {
    let { node } = this.#getNode(key);
    return node ? node.value : null;
  }

  has(key) {
    let { node } = this.#getNode(key);
    return node ? true : false;
  }

  remove(key) {
    let { node, prevNode, hashCode } = this.#getNode(key);

    if (!node) return false;

    if (!prevNode) {
      // is it the only node
      if (!node.nextNode) {
        // create a hole so it act as initially created
        delete this.#array[hashCode];
      } else {
        this.#array[hashCode] = node.nextNode;
      }
    } else {
      prevNode.nextNode = node.nextNode;
    }

    this.#length--;
    return true;
  }

  #getNode(key) {
    const hashCode = this.#hash(key);
    let node = this.#array[hashCode];
    let prevNode = null;

    // traverse over the list
    while (node) {
      if (node.key === key) {
        return { node, prevNode, hashCode };
      }

      prevNode = node;
      node = node.nextNode;
    }

    return { node: null, prevNode, hashCode };
  }

  clear() {
    this.#array = new Array(16);
    this.#length = 0;
    this.#capacity = 16;
  }

  keys() {
    return this.#getData(true, false);
  }

  values() {
    return this.#getData(false, true);
  }

  entries() {
    return this.#getData(true, true);
  }

  #getData(key = false, value = false) {
    const data = [];

    for (const bucket of this.#array) {
      if (!bucket) continue;

      let node = bucket;
      while (node) {
        if (key && value) data.push([node.key, node.value]);
        else if (key) data.push(node.key);
        else if (value) data.push(node.value);

        node = node.nextNode;
      };
    }

    return data;
  }

  #doubleSize() {
    this.#capacity *= 2;
    this.#length = 0;

    const copyArray = [...this.#array];
    this.#array = new Array(this.#capacity);

    // rehashing
    for (const bucket of copyArray) {
      if (!bucket) continue;

      let node = bucket;
      while(node) {
        this.set(node.key, node.value);
        node = node.nextNode;
      }
    }
  }

  #isSizeExceedLimit() {
    return this.#length > this.#capacity * this.#loadFactor;
  }
}
