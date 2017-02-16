export const sortByName = (item1, item2) => {
   return sortByField(item1, item2, 'name')
}

export const sortByMail = (item1, item2) => {
   return sortByField(item1, item2, 'mail')
}

const sortByField = (item1, item2, field) => {
    var field1 = item1[field];
    var field2 = item2[field];
    if(field1 < field2) {
      return -1;
    } else if(field1 > field2) {
      return 1;
    } else {
      return 0;
    }
}
