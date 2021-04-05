# node-stock-data
[![Build Status](https://travis-ci.com/bbialke/node-stock-data.svg?branch=main)](https://travis-ci.com/bbialke/node-stock-data)

Node-stock-data is a simple, easy to implement stock tracking API for Node.js that uses [marketstack](https://marketstack.com/) to quickly get current or historical data on any stock.

## Features
#### Stock Lookup

- End of day stock data lookup (multiple stocks at a time)
- 1 year of historical stock data
- Filter by specific stock exchange (70 in total)
- Up to 100 simultaneous stock lookups
##### Plus, the following features with a paid plan from marketstack:
- Intraday stock information lookup (presently supported on United States stock exchanges only)
- HTTPS connection to the marketstack API endpoint
## Installing

```bash
git clone https://github.com/bbialke/node-stock-data.git
```
## API Token
Head to [marketstack](https://marketstack.com/) and obtain a free API token by creating an account.  
With a free account, you can make a maximum of 1000 API calls per month. You can check your usage from their dashboard.
## Usage
Since the API token is private, it's recommended to keep it in a separate configuration file or use it as an environment variable.  
## Contributing
#### Want to contribute? That's great!  
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Disclaimer
All data gathered comes from the [marketstack](https://marketstack.com/) API. They could choose to modify their terms of service at any time. Please see their [website](https://marketstack.com/) and [documentation](https://marketstack.com/documentation) for the most accurate information about their service.

## License
[MIT](https://choosealicense.com/licenses/mit/)
