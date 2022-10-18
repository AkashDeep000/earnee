const validate = (values) => {
  const errors = {};
  if (!values.amount) {
    errors.amount = "Required"
  }
  if (values.amount % 1 !== 0) {
    errors.amount = "Amount should not include point (.). Eg- 50, 400 etc."
  }
  if (values.balance < (values.amount - 1)) {
    errors.amount = "Not enough banance"
  }
  if (values.amount < 50) {
    errors.amount = "Minimum withdraw amount is 50 rupees"
  }
  return errors;
};

export default validate;