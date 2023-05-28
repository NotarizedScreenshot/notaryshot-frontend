import { expect, test, describe } from '@jest/globals';

import {
  convertImageSize,
  getOffset,
  isValidBigInt,
  validateBigInt,
  isTweetBodyElementEmpty,
  validateTweetLinkOrTweetId,
} from 'utils';
import stamps from '__fixtures__/stamps';
import { tweetBodyStubEmpty1, tweetBodyStubFull1 } from '__fixtures__/tweetdata';

describe('isTweetBodyElemetEmpty', () => {
  test('if card then not epmty', () => {
    expect(isTweetBodyElementEmpty('card', tweetBodyStubEmpty1)).toBe(false);
    expect(isTweetBodyElementEmpty('card', tweetBodyStubFull1)).toBe(false);
  });
  test('if elements empty', () => {
    expect(isTweetBodyElementEmpty('full_text', tweetBodyStubEmpty1)).toBe(true);
    expect(isTweetBodyElementEmpty('urls', tweetBodyStubEmpty1)).toBe(true);
    expect(isTweetBodyElementEmpty('hashtags', tweetBodyStubEmpty1)).toBe(true);
    expect(isTweetBodyElementEmpty('media', tweetBodyStubEmpty1)).toBe(true);
    expect(isTweetBodyElementEmpty('symbols', tweetBodyStubEmpty1)).toBe(true);
    expect(isTweetBodyElementEmpty('user_mentions', tweetBodyStubEmpty1)).toBe(true);
  });
  test('if elements not empty', () => {
    expect(isTweetBodyElementEmpty('full_text', tweetBodyStubFull1)).toBe(false);
    expect(isTweetBodyElementEmpty('urls', tweetBodyStubFull1)).toBe(false);
    expect(isTweetBodyElementEmpty('hashtags', tweetBodyStubFull1)).toBe(false);
    expect(isTweetBodyElementEmpty('media', tweetBodyStubFull1)).toBe(false);
    expect(isTweetBodyElementEmpty('symbols', tweetBodyStubFull1)).toBe(false);
    expect(isTweetBodyElementEmpty('user_mentions', tweetBodyStubFull1)).toBe(false);
  });
});

describe('validateBigin', () => {
  test('get error if invalid', async () => {
    await expect(validateBigInt('')).rejects.toEqual(new Error('should not be empty'));
    await expect(validateBigInt('1234asdfsaf')).rejects.toEqual(new Error('should contain only digits'));
    await expect(validateBigInt('9631031262847836161199')).rejects.toEqual(new Error('should be a valid 64-bit UInt'));
  });
  test('if valid', async () => {
    expect(await validateBigInt('16310312628478361611')).toBe(true);
    expect(await validateBigInt('1631653001248268289')).toBe(true);
  });
});

describe('test isValidBigInt', () => {
  test('if invalid', () => {
    expect(isValidBigInt('')).toBe(false);
    expect(isValidBigInt('aasd')).toBe(false);
    expect(isValidBigInt('999999999999999999999999999')).toBe(false);
    expect(isValidBigInt('-1')).toBe(false);
  });
  test('if valid', () => {
    expect(isValidBigInt('0')).toBe(true);
    expect(isValidBigInt('123421125125123512')).toBe(true);
    expect(isValidBigInt('12342112512512351212')).toBe(true);
  });
});

describe('test validateTweetLinkOrTweetId', () => {
  test('valid', async () => {
    expect(await validateTweetLinkOrTweetId('1661997848689352')).toBe('1661997848689352');
    expect(await validateTweetLinkOrTweetId('https://twitter.com/LibertyCappy/status/1661997848689352705')).toBe(
      '1661997848689352705',
    );
    expect(await validateTweetLinkOrTweetId('https://twitter.com/twitter/status/1661997848689352705')).toBe(
      '1661997848689352705',
    );
    expect(await validateTweetLinkOrTweetId('http://twitter.com/LibertyCappy/status/1661997848689352705')).toBe(
      '1661997848689352705',
    );
  });
  test('invalid', async () => {
    function tweetError(data: string): Error {
      return new Error('expected a valid tweet link or a tweet id, actual value: ' + data)
    }
    const invalidStrings: string[] = [
      '',
      'some random string',
      '1661997848689352705a',
      '166199784868935270504',
      'LibertyCappy/status/1661997848689352705',
      'ftp://twitter.com/LibertyCappy/status/1661997848689352705',
      'https://titter.com/LibertyCappy/status/1661997848689352705',
      'https://twitter.com/LibertyCappy/status/16619978486893a52705',
      'http://twitter.com/LibertyCappy/1661997848689352705',
      'http://twitter.com/LibertyCappy/not_status/1661997848689352705',
      'http://twitter.com/LibertyCappy/status/166199784868930052705'
    ];
    invalidStrings.forEach((invalidString) => {
      expect(validateTweetLinkOrTweetId(invalidString)).rejects.toEqual(
          tweetError(invalidString),
      );
    });
  });
});

describe('getOffset', () => {
  test('if throw when image bigger than canvas', () => {
    expect(() => getOffset(1000, 1000, 1500, 1500)).toThrow();
  });
  test('if image size equal to canvas', () => {
    expect(getOffset(1000, 1000, 1000, 1000)).toStrictEqual({ x: 0, y: 0 });
    expect(() => getOffset(1000, 1000, 1000, 1000, 1)).toThrow();
    expect(() => getOffset(1000, 1000, 1000, 1000, 0, -1)).toThrow();
  });
  test('if image smaller than canvas, offset ratio default 0', () => {
    expect(getOffset(1000, 1000, 1000, 500)).toStrictEqual({ x: 0, y: 250 });
    expect(getOffset(1000, 1000, 1000, 800)).toStrictEqual({ x: 0, y: 100 });
    expect(getOffset(1000, 1000, 600, 1000)).toStrictEqual({ x: 200, y: 0 });
    expect(getOffset(1000, 1000, 900, 1000)).toStrictEqual({ x: 50, y: 0 });
  });

  test('if image smaller than canvas, offset not default', () => {
    expect(() => getOffset(2000, 1000, 1000, 1000, -2, 0)).toThrow();
    expect(() => getOffset(2000, 1000, 1000, 1000, 0, 3)).toThrow();
    expect(getOffset(2000, 1500, 1500, 1500, 0, 0)).toStrictEqual({ x: 250, y: 0 });
    expect(getOffset(2000, 1500, 1500, 1500, 1, 0)).toStrictEqual({ x: 500, y: 0 });
    expect(getOffset(2000, 1500, 1500, 1500, -1, 0)).toStrictEqual({ x: 0, y: 0 });
    expect(getOffset(2000, 1500, 1500, 1500, 0.5, 0)).toStrictEqual({ x: 375, y: 0 });
    expect(getOffset(2000, 1500, 1500, 1500, -0.3, 0)).toStrictEqual({ x: 175, y: 0 });
    expect(getOffset(1500, 2000, 1500, 1500, 0, 0.75)).toStrictEqual({ x: 0, y: 437.5 });
    expect(getOffset(1500, 2000, 1500, 1500, 0, -0.25)).toStrictEqual({ x: 0, y: 187.5 });
  });
});

describe('convertImageSize', () => {
  test('if canvas vertical', () => {
    const w1 = 1000;
    const h1 = 2000;

    const { squareStamp1, squareStamp2 } = stamps;
    const sqResult1 = convertImageSize(squareStamp1.width, squareStamp1.height, w1, h1);
    expect(sqResult1.height).toBeGreaterThan(0);
    expect(sqResult1.width).toBeGreaterThan(0);
    expect(sqResult1.height).toBeLessThanOrEqual(h1);
    expect(sqResult1.width).toBe(w1);
    expect(sqResult1.height / sqResult1.width).toBe(1);

    const sqResult2 = convertImageSize(squareStamp2.width, squareStamp2.height, w1, h1);
    expect(sqResult2.height).toBeGreaterThan(0);
    expect(sqResult2.width).toBeGreaterThan(0);
    expect(sqResult2.height).toBeLessThanOrEqual(h1);
    expect(sqResult2.width).toBe(w1);
    expect(sqResult2.height / sqResult2.width).toBe(1);

    const { horizStamp1, horizStamp2, horizStamp3, horizStamp4 } = stamps;

    const horResult1 = convertImageSize(horizStamp1.width, horizStamp1.height, w1, h1);
    expect(horResult1.height).toBeGreaterThan(0);
    expect(horResult1.width).toBeGreaterThan(0);
    expect(horResult1.height).toBeLessThanOrEqual(h1);
    expect(horResult1.width).toBe(w1);
    expect(horResult1.height / horResult1.width).toBe(horizStamp1.height / horizStamp1.width);

    const horResult2 = convertImageSize(horizStamp2.width, horizStamp2.height, w1, h1);
    expect(horResult2.height).toBeGreaterThan(0);
    expect(horResult2.width).toBeGreaterThan(0);
    expect(horResult2.height).toBeLessThanOrEqual(h1);
    expect(horResult2.width).toBe(w1);
    expect(horResult2.height / horResult2.width).toBe(horizStamp2.height / horizStamp2.width);

    const horResult3 = convertImageSize(horizStamp3.width, horizStamp3.height, w1, h1);
    expect(horResult3.height).toBeGreaterThan(0);
    expect(horResult3.width).toBeGreaterThan(0);
    expect(horResult3.height).toBeLessThanOrEqual(h1);
    expect(horResult3.width).toBe(w1);
    expect(horResult3.height / horResult3.width).toBe(horizStamp3.height / horizStamp3.width);

    const horResult4 = convertImageSize(horizStamp4.width, horizStamp4.height, w1, h1);
    expect(horResult4.height).toBeGreaterThan(0);
    expect(horResult4.width).toBeGreaterThan(0);
    expect(horResult4.height).toBeLessThanOrEqual(h1);
    expect(horResult4.width).toBe(w1);
    expect(horResult4.height / horResult4.width).toBe(horizStamp4.height / horizStamp4.width);

    const { verticalStamp1, verticalStamp2, verticalStamp3, verticalStamp4, verticalStamp5 } = stamps;

    const vertResult1 = convertImageSize(verticalStamp1.width, verticalStamp1.height, w1, h1);
    expect(vertResult1.height).toBeGreaterThan(0);
    expect(vertResult1.width).toBeGreaterThan(0);
    expect(vertResult1.height).toBe(h1);
    expect(vertResult1.width).toBeLessThanOrEqual(w1);
    expect(vertResult1.height / vertResult1.width).toBe(verticalStamp1.height / verticalStamp1.width);

    const vertResult2 = convertImageSize(verticalStamp2.width, verticalStamp2.height, w1, h1);
    expect(vertResult2.height).toBeGreaterThan(0);
    expect(vertResult2.width).toBeGreaterThan(0);
    expect(vertResult2.height).toBe(h1);
    expect(vertResult2.width).toBeLessThanOrEqual(w1);
    expect(vertResult2.height / vertResult2.width).toBe(verticalStamp2.height / verticalStamp2.width);

    const vertResult3 = convertImageSize(verticalStamp3.width, verticalStamp3.height, w1, h1);
    expect(vertResult3.height).toBeGreaterThan(0);
    expect(vertResult3.width).toBeGreaterThan(0);
    expect(vertResult3.height).toBe(h1);
    expect(vertResult3.width).toBeLessThanOrEqual(w1);
    expect(vertResult3.height / vertResult3.width).toBe(verticalStamp3.height / verticalStamp3.width);

    const vertResult4 = convertImageSize(verticalStamp4.width, verticalStamp4.height, w1, h1);
    expect(vertResult4.height).toBeGreaterThan(0);
    expect(vertResult4.width).toBeGreaterThan(0);
    expect(vertResult4.height).toBeLessThanOrEqual(h1);
    expect(vertResult4.width).toBeLessThanOrEqual(w1);
    expect(vertResult4.height / vertResult4.width).toBe(verticalStamp4.height / verticalStamp4.width);

    const vertResult5 = convertImageSize(verticalStamp5.width, verticalStamp5.height, w1, h1);
    expect(vertResult5.height).toBeGreaterThan(0);
    expect(vertResult5.width).toBeGreaterThan(0);
    expect(vertResult5.height).toBe(h1);
    expect(vertResult5.width).toBeLessThanOrEqual(w1);
    expect(vertResult5.height / vertResult5.width).toBe(verticalStamp5.height / verticalStamp5.width);
  });

  test('if canvas horizontal', () => {
    const w2 = 2000;
    const h2 = 1000;

    const { squareStamp1, squareStamp2 } = stamps;
    const sqResult1 = convertImageSize(squareStamp1.width, squareStamp1.height, w2, h2);
    expect(sqResult1.height).toBeGreaterThan(0);
    expect(sqResult1.width).toBeGreaterThan(0);
    expect(sqResult1.height).toBe(h2);
    expect(sqResult1.width).toBeLessThanOrEqual(w2);
    expect(sqResult1.height / sqResult1.width).toBe(1);

    const sqResult2 = convertImageSize(squareStamp2.width, squareStamp2.height, w2, h2);
    expect(sqResult2.height).toBeGreaterThan(0);
    expect(sqResult2.width).toBeGreaterThan(0);
    expect(sqResult2.height).toBe(h2);
    expect(sqResult2.width).toBeLessThanOrEqual(w2);
    expect(sqResult2.height / sqResult2.width).toBe(1);

    const { horizStamp1, horizStamp2, horizStamp3, horizStamp4 } = stamps;

    const horResult1 = convertImageSize(horizStamp1.width, horizStamp1.height, w2, h2);
    expect(horResult1.height).toBeGreaterThan(0);
    expect(horResult1.width).toBeGreaterThan(0);
    expect(horResult1.height).toBe(h2);
    expect(horResult1.width).toBeLessThanOrEqual(w2);
    expect(horResult1.height / horResult1.width).toBe(horizStamp1.height / horizStamp1.width);

    const horResult2 = convertImageSize(horizStamp2.width, horizStamp2.height, w2, h2);
    expect(horResult2.height).toBeGreaterThan(0);
    expect(horResult2.width).toBeGreaterThan(0);
    expect(horResult2.height).toBeLessThanOrEqual(h2);
    expect(horResult2.width).toBeLessThanOrEqual(w2);
    expect(horResult2.height / horResult2.width).toBe(horizStamp2.height / horizStamp2.width);

    const horResult3 = convertImageSize(horizStamp3.width, horizStamp3.height, w2, h2);
    expect(horResult3.height).toBeGreaterThan(0);
    expect(horResult3.width).toBeGreaterThan(0);
    expect(horResult3.height).toBe(h2);
    expect(horResult3.width).toBeLessThanOrEqual(w2);
    expect(horResult3.height / horResult3.width).toBe(horizStamp3.height / horizStamp3.width);

    const horResult4 = convertImageSize(horizStamp4.width, horizStamp4.height, w2, h2);
    expect(horResult4.height).toBeGreaterThan(0);
    expect(horResult4.width).toBeGreaterThan(0);
    expect(horResult4.height).toBe(h2);
    expect(horResult4.width).toBeLessThanOrEqual(w2);
    expect(horResult4.height / horResult4.width).toBe(horizStamp4.height / horizStamp4.width);

    const { verticalStamp1, verticalStamp2, verticalStamp3, verticalStamp4, verticalStamp5 } = stamps;
    const vertResult1 = convertImageSize(verticalStamp1.width, verticalStamp1.height, w2, h2);
    expect(vertResult1.height).toBeGreaterThan(0);
    expect(vertResult1.width).toBeGreaterThan(0);
    expect(vertResult1.height).toBe(h2);
    expect(vertResult1.width).toBeLessThanOrEqual(w2);
    expect(vertResult1.height / vertResult1.width).toBe(verticalStamp1.height / verticalStamp1.width);

    const vertResult2 = convertImageSize(verticalStamp2.width, verticalStamp2.height, w2, h2);
    expect(vertResult2.height).toBeGreaterThan(0);
    expect(vertResult2.width).toBeGreaterThan(0);
    expect(vertResult2.height).toBe(h2);
    expect(vertResult2.width).toBeLessThanOrEqual(w2);
    expect(vertResult2.height / vertResult2.width).toBe(verticalStamp2.height / verticalStamp2.width);

    const vertResult3 = convertImageSize(verticalStamp3.width, verticalStamp3.height, w2, h2);
    expect(vertResult3.height).toBeGreaterThan(0);
    expect(vertResult3.width).toBeGreaterThan(0);
    expect(vertResult3.height).toBe(h2);
    expect(vertResult3.width).toBeLessThanOrEqual(w2);
    expect(vertResult3.height / vertResult3.width).toBe(verticalStamp3.height / verticalStamp3.width);

    const vertResult4 = convertImageSize(verticalStamp4.width, verticalStamp4.height, w2, h2);
    expect(vertResult4.height).toBeGreaterThan(0);
    expect(vertResult4.width).toBeGreaterThan(0);
    expect(vertResult4.height).toBe(h2);
    expect(vertResult4.width).toBeLessThanOrEqual(w2);
    expect(vertResult4.height / vertResult4.width).toBe(verticalStamp4.height / verticalStamp4.width);

    const vertResult5 = convertImageSize(verticalStamp5.width, verticalStamp5.height, w2, h2);
    expect(vertResult5.height).toBeGreaterThan(0);
    expect(vertResult5.width).toBeGreaterThan(0);
    expect(vertResult5.height).toBe(h2);
    expect(vertResult5.width).toBeLessThanOrEqual(w2);
    expect(vertResult5.height / vertResult5.width).toBe(verticalStamp5.height / verticalStamp5.width);
  });
});
