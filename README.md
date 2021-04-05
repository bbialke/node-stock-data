# node-stock-data
[![Build Status](https://travis-ci.com/bbialke/node-stock-data.svg?branch=main)](https://travis-ci.com/bbialke/node-stock-data)

Node-stock-data is a simple, easy to implement stock tracking API for Node.js that uses [marketstack](https://marketstack.com/) to quickly get current or historical data on any stock.

## Features
#### Stock Lookup

- End of day stock data lookup (multiple stocks at a time)
- 1 year of historical stock data
- Filter by specific stock exchange
- Up to 100 simultaneous stock lookups
- Detailed information on stock highs, lows, trading volume, and more
#### Stock Exchange Lookup
- Country, city, and timezone information for any world stock exchange.
#### Plus, with a paid plan from marketstack:
- Intraday stock information lookup (presently supported on United States stock exchanges only)
## Installing

```bash
npm install node-stock-data
```
## API Token
Head to [marketstack](https://marketstack.com/) and obtain a free API token by creating an account.  
With a free account, you can make a maximum of 1000 API calls per month. You can check your usage from their dashboard.
## Usage
Since the API token is private, it's recommended to keep it in a separate configuration file or use it as an environment variable.
Each example uses:
```js
const stockdata = require('node-stock-data');
```
### End of day stock lookup
```js
// Get the latest end of day stock information for Boeing (BA)
stockdata.stocks(
{
  API_TOKEN: 'YOUR API TOKEN',
  options: {
    limit: 1,
    symbols: 'BA'
  }
})
.then(response => {
    ...
  })
.catch(error => {
    ...
});
```
### Stock exchange information lookup
```js
// Get the latest information on the NASDAQ stock exchange (XNAS)
stockdata.exchanges(
{
  API_TOKEN: 'YOUR API TOKEN',
  options: {
    limit: 1,
    search: 'XNAS'
  }
})
.then(response => {
    ...
  })
.catch(error => {
    ...
});
```
When using the `search` parameter, both the exchange's name and their Market Identification Code (MIC) is accepted. For a full list of MICs, look at [this list](https://www.tradinghours.com/mic).
### Intraday stock lookup
- Note: This feature requires a paid plan on marketstack.
```js
// Get today's stock information for Boeing (BA), with intervals of 1 hour.
stockdata.stocksIntraday(
{
  API_TOKEN: 'YOUR API TOKEN',
  options: {
    limit: 5,
    interval: '1hour',
    symbols: 'BA'
  }
})
.then(response => {
    ...
  })
.catch(error => {
    ...
});
```
### Historical stock data lookup
```js
// Get the stock information for Boeing (BA) from January 7th, 2021 to January 9th, 2021
stockdata.stocks(
{
  API_TOKEN: 'YOUR API TOKEN',
  options: {
    limit: 2,
    date_from: '2021-01-07',
    date_to: '2021-01-09',
    symbols: 'BA'
  }
})
.then(response => {
    ...
  })
.catch(error => {
    ...
});
```
### Using results
```js
// Get the high price for Boeing (BA) on March 8th, 2021
stockdata.stocks(
{
  API_TOKEN: 'YOUR API TOKEN',
  options: {
    limit: 1,
    date_from: '2021-03-08',
    symbols: 'BA'
  }
})
.then(response => {
    response.data.forEach(element => {
      console.log(element['high'])
    })
  })
.catch(error => {
    ...
});
```
#### A couple notes for dealing with stock lookup results:
The stock lookup module returns a JSON array with this structure:
```js
{
  count: 1,
  data: [
    {
      "date": "2020-05-21T00:00:00+0000",
      "symbol": "AAPL",
      "exchange": "XNAS",
      "open": 318.66,
      "high": 320.89,
      "low": 315.87,
      "close": 316.85,
      "volume": 25672211.0,
      "adj_open": 318.66,
      "adj_high": 320.89,
      "adj_low": 315.87,
      "adj_close": 316.85,
      "adj_volume": 25672211.0
    }
  ]
}
```
This format of return means that to access the stock data, you'll need to use `response.data` instead of just using `response`. You can access the count of responses returned by using `response.count`.
## Contributing
#### Want to contribute? That's great!  
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Disclaimers
All data gathered comes from the [marketstack](https://marketstack.com/) API. They could choose to modify their terms of service at any time. Please see their [website](https://marketstack.com/) and [documentation](https://marketstack.com/documentation) for the most accurate information about their service.
### Important:
- The author and any contributors to this software are not affiliated in any form with marketstack or its affiliates. This software does not endorse any products sold by marketstack and does not receive any compensation from purchases of paid plans.
- This software is meant for informational purposes only, and is not intended to serve as a recommendation to buy or sell any security, nor is it an offer or sale of a security. This data is not intended to serve as a research report, or the basis of any financial decision. 

## License
[MIT](https://choosealicense.com/licenses/mit/)
