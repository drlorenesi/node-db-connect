// (currentPage - 1) * listPerPage = getOffset
// page 1 - (records 01-10)
// (1 - 1) * 10 = 0
// LIMIT 0, 10
// page 2 - (records 11-20)
// (2 - 1) * 10 = 10
// LIMIT 10, 10
// page 3 - (records 21-30)
// (3 - 1) * 10 = 20
// LIMIT 20, 10

function getPagination(currentPage, listPerPage = 10) {
  let offset = (currentPage - 1) * listPerPage;
  return `LIMIT ${offset}, ${listPerPage}`;
}

module.exports = getPagination;
