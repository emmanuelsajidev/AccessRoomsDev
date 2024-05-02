isStartDatePassed(ordate) {
  const startDate = new Date(ordate);
  const currentDate = new Date();
  
  return currentDate > startDate;
},
v-if="isStartDatePassed(item.startDate)"