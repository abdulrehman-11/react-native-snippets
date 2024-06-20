const UpdateProfileValidation = (values) => {
  const errors = {};
  if (!values.name) errors.name = "Enter your full name";
  if (!values.phoneNumber) errors.phoneNumber = "Enter your phone number";

  return errors;
};

export default UpdateProfileValidation;
