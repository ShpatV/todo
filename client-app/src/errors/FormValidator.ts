class FormValidator {
  static validateField(fieldName: string, value: string, maxLength: number, minLength: number): string | undefined {
    if (value.trim() === '') {
      return `${fieldName} is required.`;
    }

    if (value.length > maxLength) {
      return `${fieldName} should be less than ${maxLength} characters.`;
    }

    if (value.length < minLength) {
      return `${fieldName} should be at least ${minLength} characters long.`;
    }

    return undefined;
  }

  static validateDateField(fieldName: string, value: string): string | undefined {
    const selectedDate = new Date(value);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      return `${fieldName} should not be in the past.`;
    }

    return undefined;
  }
}

export default FormValidator;
