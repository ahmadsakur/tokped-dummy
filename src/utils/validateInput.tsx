type TFormData = {
  first_name: string;
  last_name: string;
  phones: string[];
};
export const validateInput = (formData: TFormData) => {
  const nameRegex = /^[a-zA-Z0-9 ]{1,50}$/;
  const errors = [];
  if (!nameRegex.test(formData.first_name)) {
    errors.push("First name is cannot contain special characters");
  }
  if (!nameRegex.test(formData.last_name)) {
    errors.push("Last name is cannot contain special characters");
  }

  return errors;
};
