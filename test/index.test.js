const { expect } = require('chai');
const stockdata = require('../index');
describe('testing objects created by index.js', () => {
  it('should have a stock lookup function', () => {
    expect(stockdata.stocks).to.be.a('function');
  });
  it('should have an intraday stock lookup function', () => {
    expect(stockdata.stocksIntraday).to.be.a('function');
  });
  it('should have an exchange lookup function', () => {
    expect(stockdata.exchanges).to.be.a('function');
  });
});
