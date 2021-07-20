const VISIT =
  'Visit https://marketstack.com/documentation for more information';

function checkCorrectOptions(options) {
  const { limit, search, offset } = options;
  if (limit !== undefined && (Number(limit) < 1 || Number(limit) > 100)) {
    throw new Error(`limit value should be between 1-100 ${VISIT}`);
  }
  // if(search == undefined){
  //   throw new Error(`no search was specified. ${VISIT}`)
  // }
  if (offset !== undefined && (Number(offset) < 1 || Number(offset) > 100)) {
    throw new Error(`offset value should be between 1-100 ${VISIT}`);
  }
}

function formatOptions(options) {
  let query = '&';
  if (options === undefined) {
    throw new Error(`Please specify options for the query. ${VISIT}`);
  }
  try {
    checkCorrectOptions(options);
  } catch (error) {
    throw error;
  }
  const { limit, search, offset, exchange } = options;
  query += limit !== undefined ? `limit=${limit}&` : '';
  query += search !== undefined ? `search=${search}&` : '';
  query += offset !== undefined ? `offset=${offset}&` : '';
  query += exchange !== undefined ? `exchange=${exchange}&` : '';
  return query;
}

module.exports = formatOptions;
