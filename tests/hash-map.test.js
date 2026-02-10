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
    })
  });
});
