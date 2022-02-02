import { expect } from 'chai';
import Sinon from 'sinon';
import { generateToken } from '../auth/token';

describe('Testing utils functions', () => {
  describe('Testing generate jwt token', () => {
    it('Should return a jwt Token', () => {
      const token = generateToken({ account: '01', password: '12' });
      expect(typeof token).to.be.equal('string');
    });
  });
});
