import moment from "moment";
const dateTimeFormatter = (dateTime) => {
  const date = moment.utc(dateTime);

  const formattedDate = date.format("DD/MM/YY");
  const formattedTime = date.format("HH:mm");
  return "Date: " + formattedDate + " Time: " + formattedTime;
};

export default dateTimeFormatter;
