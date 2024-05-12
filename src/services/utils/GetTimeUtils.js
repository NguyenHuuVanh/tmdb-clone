const getYear = (time, resultType) => {
  if (resultType === "movie") {
    const year = new Date(time.release_date).getFullYear().toString();
    return `(${year})`;
  }
  const year = new Date(time.first_air_date).getFullYear().toString();
  return `(${year})`;
};

export default getYear;
