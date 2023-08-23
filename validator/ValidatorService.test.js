// ValidatorService.test.js
const { expect } = require('chai');
const { validateToken } = require('./ValidatorService'); // Adjust the path as needed

describe('ValidatorService', () => {
  it('should return true for a valid token', () => {
    const validToken = '2249-4472-0279-9420';
    const isValid = validateToken(validToken);
    expect(isValid).to.be.true;
  });

  it('should return false for an invalid token', () => {
    const invalidToken = '1234-5678-9012-3456';
    const isValid = validateToken(invalidToken);
    expect(isValid).to.be.false;
  });
  
  // Add more test cases as needed
});
