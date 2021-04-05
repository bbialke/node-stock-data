const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const stocks = require('../functions/stocksIntraday');
const assert = require('assert');
require('dotenv').config();
const apiToken = process.env.API_TOKEN;

chai.use(chaiAsPromised);
const { expect } = chai;

describe('testing errors in parameters- intraday stock lookup', () => {
  it('should be rejected with error because API_TOKEN was not supplied', () => {
    return expect(stocks({API_TOKEN: '', options: {limit: 1}})).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because API_TOKEN is invalid', () => {
    return expect(stocks({API_TOKEN: 'thisisntvalid', options: {limit: 1}})).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because LIMIT is >100', () => {
    return expect(stocks({API_TOKEN: apiToken, options: {limit: 1000}})).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because no symbols are specified', () => {
    return expect(stocks({API_TOKEN: apiToken})).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because EXCHANGE is > 4 characters', () => {
    return expect(stocks({API_TOKEN: apiToken, options: {limit: 1, symbols: 'BA', exchange: 'ZNYSE'}})).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because the INTERVAL option is invalid', () => {
    return expect(stocks({API_TOKEN: apiToken, options: {limit: 1, symbols: 'BA', interval: '0min'}})).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because the SORT option is invalid', () => {
    return expect(stocks({API_TOKEN: apiToken, options: {limit: 1, symbols: 'BA', sort: 'NONE'}})).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because DATE_FROM is in an incorrect format', () => {
    return expect(stocks({API_TOKEN: apiToken, options: {limit: 1, symbols: 'BA', date_from: '05-25-2020'}})).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because DATE_TO is in an incorrect format', () => {
    return expect(stocks({API_TOKEN: apiToken, options: {limit: 1, symbols: 'BA', date_to: '05-25-2020'}})).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because OFFSET is >100', () => {
    return expect(stocks({API_TOKEN: apiToken, options: {limit: 1, symbols: 'BA', offset: 1000}})).to.be.rejectedWith(Error);
  });
});
describe('testing successful queries', () => {
  it('should return data of BA stock without error, with an interval of 1 hour', async () => {
    const data = await stocks({API_TOKEN: apiToken, options: {limit: 1, symbols: 'BA', interval: '1hour'}});
    expect(data.count).to.be.equals(1);
    expect(data['data']).to.be.length(1);
  });
});
