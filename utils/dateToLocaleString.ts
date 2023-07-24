const dateToLocaleString = (date: string, extended: boolean = false) => {
  const fixtureDate = new Date(date);
  let formattedDate: string;
  if (extended) {
    formattedDate = fixtureDate.toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return formattedDate;
  }
  formattedDate = fixtureDate.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formattedDate;
};

export default dateToLocaleString;
