function DateToFormat(date) {
  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;
  let mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;
  let yy = date.getFullYear();
  return yy + '-' + mm + '-' + dd;
}
function getData() {
  const timestamp = new Date().getTime();
  const date = DateToFormat(new Date(timestamp));
  const dateWeekAgo = DateToFormat(new Date(timestamp  - 604800000));
  return {date, dateWeekAgo}
}

module.exports = getData;
