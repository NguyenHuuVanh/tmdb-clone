const expense = (money) => {
  const formattedBudget = money.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  const result = money === 0 ? "-" : formattedBudget;
  return result;
};

export default expense;
