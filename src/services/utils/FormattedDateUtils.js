const formattedDate = (data) => {
  const originalDate = new Date(data.release_date || data.first_air_date);
  const day = originalDate.getDate().toString().padStart(2, "0");
  const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
  const year = originalDate.getFullYear();
  const formattedDateString = `${day}/${month}/${year}`;
  return formattedDateString;
};

export default formattedDate;
