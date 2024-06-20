const LoginValidation = (values) => {
  const errors = {};

  if (!values.phone_number) errors.phone_number = "Enter your phone number";
  if (!values.password) errors.password = "Enter your password";
  if (!values.club_id) errors.club_id = "Enter club id";

  return errors;
};

export default LoginValidation;
