import { ErrorBuilder } from './error.builder';

describe('ErrorBuilder', () => {
  describe('buildError', () => {
    it('Should return object according to input', () => {
      const testCaller1 = 'TestCaller1';
      const testName1 = 'TestName1';
      const testMessage1 = 'TestMessage1';
      const testError1 = {
        name: testCaller1 + ': ' + testName1,
        message: testMessage1
      };

      expect(ErrorBuilder.buildError(testName1, testMessage1, testCaller1)).toEqual(testError1);
    });
  });
});
