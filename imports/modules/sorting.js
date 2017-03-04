const sortByField = (item1, item2, field) => {
  const field1 = item1[field];
  const field2 = item2[field];
  if (field1 < field2) {
    return -1;
  } else if (field1 > field2) {
    return 1;
  }
  return 0;
};

export const sortByName = (item1, item2) => sortByField(item1, item2, 'name');

export const sortByMail = (item1, item2) => sortByField(item1, item2, 'mail');

export const sortByEndDate = (item1, item2) => sortByField(item1, item2, 'endDate');
