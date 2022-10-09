const validate = (values) => {
  const errors = {};
  console.log(values)
  if (!values.amount) {
    errors.amount = "Required";
  } else if (values.amount < 50) {
    errors.amount = "Minimum withdraw amount is 50";
  } else if (values.amount % 1 !== 0) {
    errors.amount = "Withdraw amount shoud not be in fraction (eg: 50, 56, 100)";
  } else if (values.amount > values.balance) {
    errors.amount = "Withdraw amount shoud be less than Current Balance.";
  }

  return errors;
};

export default validate;