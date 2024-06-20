const SignUpValidation = (values) => {
  const errors = {};
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!values.name) errors.name = "Enter your full name";
  if (!values.phoneNumber) errors.phoneNumber = "Enter your phone number";
  if (!values.email) errors.email = "Enter your email";
  if (!re.test(values.email)) errors.valid_email = "Enter a valid email";
  if (!values.employee_type_id) errors.employee_type_id = "Select a department";
  if (!values.password) errors.password = "Enter your password";
  if (values.password) {
    if (values.password.length < 6) {
      errors.password = "Password must be six characters long";
    }
  }

  if (!values.check) errors.check = "Accept our terms and services";

  return errors;
};

export default SignUpValidation;
