import { afterEach, describe, expect, it } from 'vitest';
import { generateGrid, getLimit, generateItem, generateRow } from './puzzle';

describe('getLimit', () => {
  const originalMathRandom = Math.random;

  afterEach(() => {
    // Restore the original Math.random after each test
    Math.random = originalMathRandom;
  });

  it('should be able to return 0.3', () => {
    Math.random = () => 0
    const limit = getLimit();
    expect(limit).toBe(0.3);
  })

  it('should be able to return 0.4', () => {
    Math.random = () => 0.2000
    const limit = getLimit();
    expect(limit).toBe(0.4);
  })

  it('should be able to return 0.5', () => {
    Math.random = () => 0.4
    const limit = getLimit();
    expect(limit).toBe(0.5);
  })

  it('should be able to return 0.6', () => {
    Math.random = () => 0.6
    const limit = getLimit();
    expect(limit).toBe(0.6);
  })

  it('should be able to return 0.7', () => {
    Math.random = () => 0.8
    const limit = getLimit();
    expect(limit).toBe(0.7);
  })
});

describe('generateItem', () => {
  const originalMathRandom = Math.random;

  afterEach(() => {
    // Restore the original Math.random after each test
    Math.random = originalMathRandom;
  });

  it('should generate object', () => {
    const item = generateItem();

    expect(item).toHaveProperty('value');
    expect(item).toHaveProperty('status');
    expect(item).toHaveProperty('used');
    expect(item).toHaveProperty('error');
  });

  it('should have valid types', () => {
    const item = generateItem();

    expect(item.value).toBeTypeOf('number');
    expect(item.status).toBeTypeOf('string');
    expect(item.used).toBeTypeOf('boolean');
    expect(item.error).toBeTypeOf('boolean');
  })

  it('should generate max value as 9', () => {
    Math.random = () => 0.99999999;
    const item = generateItem();

    expect(item.value).toBe(9);
  })

  it('should generate lowest value as 1', () => {
    Math.random = () => 0.00000001;
    const item = generateItem();

    expect(item.value).toBe(1);
  })
});

describe('generateRow', () => {
  it('should generate a row of 8 items', () => {
    const row = generateRow();
    expect(row.length).toBe(8);
  });

  it('each item should be a valid CellState', () => {
    const row = generateRow();
    row.forEach((item) => {
      expect(item).toHaveProperty('value');
      expect(item).toHaveProperty('status');
      expect(item).toHaveProperty('used');
      expect(item).toHaveProperty('error');
    });
  });
})

describe('generateGrid', () => {
  it('should generate an 8x8 grid', () => {
    const grid = generateGrid();
    expect(grid.length).toBe(8);
  });


});