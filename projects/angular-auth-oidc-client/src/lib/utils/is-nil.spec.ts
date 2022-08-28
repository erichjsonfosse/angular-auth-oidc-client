import { isNil } from './is-nil';

describe('isNil', () => {
  it('Should return true if value is null', () => {
    const test = null;
    expect(isNil(test)).toBeTrue();
    expect(isNil(null)).toBeTrue();
  });

  it('Should return true if value is undefined', () => {
    const test = {};
    expect(isNil(test['doot'])).toBeTrue();
    expect(isNil(undefined)).toBeTrue();
  });
});
