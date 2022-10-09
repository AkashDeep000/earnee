const validate = (values) => {
  const errors = {};
  console.log(values)
  if (!values.amount) {
    errors.amount = "Required";
  } else if (values.amount < 50) {
    errors.amount = "Minimum withdraw amount is 50";
  } else if (values.amount > values.balance) {
    errors.amount = "Withdraw amount shoud be less than Current Balance.";
  }

  return errors;
};

export default validate;