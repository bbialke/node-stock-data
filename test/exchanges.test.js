const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const exchanges = require('../functions/exchanges');
const assert = require('assert');
require('dotenv').config();
const apiToken = process.env.API_TOKEN;

chai.use(chaiAsPromised);
const { expect } = chai;

describe('testing errors in parameters- exchanges lookup', () => {
  it('should be rejected with error because API_TOKEN was not supplied', () => {
    return expect(exchanges({API_TOKEN: '', options: {limit: 1}})).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because API_TOKEN is invalid', () => {
    return expect(exchanges({API_TOKEN: 'thisisntvalid', options: {limit: 1}})).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because LIMIT is >100', () => {
    return expect(exchanges({API_TOKEN: apiToken, options: {limit: 1000}})).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because OFFSET is >100', () => {
    return expect(exchanges({API_TOKEN: apiToken, options: {limit: 1, offset: 1000}})).to.be.rejectedWith(Error);
  });
});
describe('testing successful queries', () => {
  it('should return data of the NASDAQ stock exchange without error', async () => {
    const data = await exchanges({API_TOKEN: apiToken, options: {limit: 1, search: 'XNAS'}});
    expect(data.count).to.be.equals(1);
    expect(data['data']).to.be.length(1);
  });
});
