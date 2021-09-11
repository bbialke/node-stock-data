const moment = require('moment');

const VISIT = 'Visit https://marketstack.com/documentation for more information';
const DATE_ERROR = 'must be in the valid format YYYY-MM-DD.';

function validDate(date) {
  return moment(date, 'YYYY-MM-DD', true).isValid();
}

function checkCorrectOptions(options) {
  const {
    limit, symbols, exchange, sort, date_from, date_to, offset
  } = options;
  if (limit !== undefined && (Number(limit) < 1 || Number(limit) > 100)) {
    throw new Error(`limit value should be between 1-100 ${VISIT}`);
  }
  if(symbols == undefined){
    throw new Error(`no symbols were specified. ${VISIT}`)
  }
  if (exchange !== undefined && (exchange.length > 4)) {
    throw new Error(`exchange code should be 4 characters long. ${VISIT}`);
  }
  if (sort !== undefined && ['DESC', 'ASC'].indexOf(sort) === -1) {
    throw new Error(`sort does not have a valid option. ${VISIT}`);
  }
  if (date_from !== undefined && !validDate(date_from)) {
    throw new Error(`date_from ${DATE_ERROR} ${VISIT}`);
  }
  if (date_to !== undefined && !validDate(date_to)) {
    throw new Error(`date_to ${DATE_ERROR} ${VISIT}`);
  }
  if (offset !== undefined && (Number(offset) < 1 || Number(offset) > 100)) {
    throw new Error(`offset value should be between 1-100 ${VISIT}`);
  }
}

function formatOptions(options) {
  let query = '&';
  if (options === undefined) {
    throw new Error(`Please specify options for the query. ${VISIT}`)
  }
  try {
    checkCorrectOptions(options);
  } catch (error) {
    throw error;
  }
  const {
    limit, symbols, exchange, sort, date_from, date_to, offset
  } = options;
  query += limit !== undefined ? `limit=${limit}&` : '';
  query += symbols !== undefined ? `symbols=${symbols}&` : '';
  query += exchange !== undefined ? `exchange=${exchange}&` : '';
  query += sort !== undefined ? `sort=${sort}&` : '';
  query += date_from !== undefined ? `date_from=${date_from}&` : '';
  query += date_to !== undefined ? `date_to=${date_to}&` : '';
  query += offset !== undefined ? `offset=${offset}&` : '';
  return query;
}

module.exports = formatOptions;
