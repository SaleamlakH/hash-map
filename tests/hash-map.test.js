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
    })
  });
});
