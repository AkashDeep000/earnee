
const validate = (values) => {
  const errors = {};
  if (!values.accountIFSC) {
    errors.accountIFSC = "Required"
  }
  if (!values.accountNumber) {
    errors.accountNumber = "Required"
  }
  if (!values.accountName) {
    errors.accountName = "Required"
  }
  if (!values.upi) {
    errors.upi = "Required"
  }
  return errors;
};

export default validate;