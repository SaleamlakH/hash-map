import { HashMap } from 'hash-map';

let hash = null;

describe('Hash map', () => {
  beforeEach(() => {
    hash = new HashMap();
  });

  describe('Set', () => {
    test('Increase the length of the hash', () => {
      hash.set('apple', 'red');
      expect(hash.length()).toBe(1);

      hash.set('banana', 'yellow');
      expect(hash.length()).toBe(2);
    });

    test('Keep the length the same when key exists', () => {
      hash.set('apple', 'red');
      hash.set('banana', 'yellow');

      hash.set('banana', 'orange');
      expect(hash.length()).toBe(2);
    });
  });

  describe('Get', () => {
    test('Return null for empty hash table', () => {
      expect(hash.get('apple')).toBe(null);
    });

    test('Return the value assigned to the key', () => {
      hash.set('apple', 'red');
      expect(hash.get('apple')).toBe('red');
    });

    test('Return the value of keys resulting the same index', () => {
      hash.set('grape', 'purple');
      hash.set('hat', 'black');

      expect(hash.get('grape')).toBe('purple');
      expect(hash.get('hat')).toBe('black');
    });

    test('Return null for non existing key', () => {
      hash.set('apple', 'red');

      expect(hash.get('banana')).toBe(null);
    });

    test('Return null for non existing key with index of filed bucket', () => {
      hash.set('grape', 'purple');

      expect(hash.get('hat')).toBe(null);
    });
  });

  // not necessary, just to make sure the boolean conversion
  describe('Has', () => {
    test('Returns true for existing key', () => {
      hash.set('apple', 'red');

      expect(hash.has('apple')).toBe(true);
    });

    test('Returns false for non existing key', () => {
      expect(hash.has('apple')).toBe(false);
    });
  });

  describe('Remove', () => {
    test('Remove existing entry with the key and return true', () => {
      hash.set('apple', 'red');
      hash.set('banana', 'yellow');

      expect(hash.remove('apple')).toBe(true);
      expect(hash.get('apple')).toBe(null);
    });

    test('Return false when the key does not exist', () => {
      expect(hash.remove('apple')).toBe(false);
    });

    test('Decrease the length after removing an entry', () => {
      hash.set('apple', 'red');
      hash.set('banana', 'yellow');
      hash.remove('apple');

      expect(hash.length()).toBe(1);
    });

    test('Remove only target entry node from a bucket', () => {
      hash.set('grape', 'purple');
      hash.set('appl', 'red'); //mis-spelled to get the same hash code
      hash.set('hat', 'black');

      expect(hash.remove('grape')).toBe(true);
      expect(hash.get('grape')).toBe(null);
    });

    test('Remove head entry keeps the rest entries of bucket', () => {
      hash.set('grape', 'purple');
      hash.set('appl', 'red'); //mis-spelled to get the same hash code
      hash.set('hat', 'black');
      hash.remove('grape');

      expect(hash.get('hat')).toBe('black');
    });

    test('Remove the tail node of the bucket', () => {
      hash.set('grape', 'purple');
      hash.set('appl', 'red'); //mis-spelled to get the same hash code
      hash.set('hat', 'black');

      expect(hash.remove('hat')).toBe(true);
      expect(hash.get('hat')).toBe(null);
    });

    test('Remove the tail node keeps rest entries of the bucket', () => {
      hash.set('grape', 'purple');
      hash.set('appl', 'red'); //mis-spelled to get the same hash code
      hash.set('hat', 'black');

      expect(hash.get('grape')).toBe('purple');
    });
  });

  describe('Clear', () => {
    beforeEach(() => {
      hash.set('apple', 'red');
      hash.set('banana', 'yellow');
      hash.set('hat', 'black');
      hash.set('grape', 'purple');
      hash.set('carrot', 'orange');
    });

    test('Remove all entries in the hash map', () => {
      expect(hash.length()).toBe(5);

      hash.clear();
      expect(hash.length()).toBe(0);
      expect(hash.get('grape')).toBe(null);
      expect(hash.get('banana')).toBe(null);
    });

    test('Able to add entry after clear', () => {
      hash.clear();

      hash.set('apple', 'red');
      hash.set('banana', 'yellow');

      expect(hash.get('apple')).toBe('red');
      expect(hash.get('banana')).toBe('yellow');
      expect(hash.get('grape')).toBe(null);
    });
  });
});
