const rateting = (data) => {
  const rateting = Math.round(data.vote_average * 10);
  return rateting;
};

export default rateting;
