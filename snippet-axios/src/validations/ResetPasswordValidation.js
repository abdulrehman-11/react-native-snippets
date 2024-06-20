const ResetPasswordValidation = ({ password, confirmPassword }) => {
  const errors = {};

  if (!password) errors.password = "Enter your new password";
  if (password) {
    if (password.length < 6) {
      errors.password_length = "Password must be six characters long";
    }
  }

  if (!confirmPassword) errors.confirmPassword = "Enter confirm password";
  if (password !== confirmPassword)
    errors.password_mismatch = "Password mismatch";

  return errors;
};

export default ResetPasswordValidation;
