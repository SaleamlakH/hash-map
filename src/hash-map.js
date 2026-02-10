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
}
