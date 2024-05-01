function SignupValidation(values) {
  let errors = {};

  if (values.email === "") {
    errors.email = "Email shouldn't be empty.";
  }

  if (values.username === "") {
    errors.username = "Username should be between 3 or 20 characters.";
  }

  if (values.password === "") {
    errors.password = "Password cannot be empty";
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords are not the same";
  }

  return errors;
}

export default SignupValidation;
