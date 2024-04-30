combineDateTime(dateString, timeString) {
  const formattedDate = `${dateString}T${timeString}:00`;
  return formattedDate;
},
startTime: this.combineDateTime(this.checkInDate, this.checkInTime),
endTime: this.combineDateTime(this.checkInDate, this.checkOutTime),