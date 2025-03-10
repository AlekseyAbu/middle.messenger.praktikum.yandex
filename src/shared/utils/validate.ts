export default class Validator {
  first_name(name: string): boolean {
    const regex = /^[A-ZА-ЯЁ][A-Za-zа-яёЁ-]*$/u;
    return regex.test(name);
  }

  second_name(name: string): boolean {
    return this.first_name(name);
  }

  login(login: string): boolean {
    const regex = /^(?=.*[A-Za-z])[A-Za-z0-9_-]{3,20}$/;
    return regex.test(login);
  }

  email(email: string): boolean {
    const emailRegex = /^[A-Za-z0-9_-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+$/i;
    if (!emailRegex.test(email)) return false;

    const domainPart = email.split('@')[1];
    const beforeFirstDot = domainPart.split('.')[0];
    return /[A-Za-z]/.test(beforeFirstDot);
  }

  password(password: string): boolean {
    const isLengthValid = password.length >= 8 && password.length <= 40;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    return isLengthValid && hasUpperCase && hasDigit;
  }

  phone(phone: string): boolean {
    const regex = /^\+?\d+$/;
    if (!regex.test(phone)) return false;

    const { length } = phone;
    if (phone.startsWith('+')) {
      return length >= 11 && length <= 15;
    }
    return length >= 10 && length <= 15;
  }

  message(message: string): boolean {
    return message.trim() !== '';
  }

  _validateField(name:string, value:string) {
    switch (name) {
      case 'email':
        return this.email(value);

      case 'login':
        return this.login(value);

      case 'first_name':
      case 'second_name':
        return this.first_name(value);

      case 'phone':
        return this.phone(value);

      case 'password':
        return this.password(value);

      case 'password_repeat':
        return this.password(value);

      case 'password_old':
        return this.password(value);
      default:
        return false;
    }
  }

  validateForm(formState: Record<string, string>): boolean {
    let error = false;
    Object.keys(formState).forEach((name) => {
      if (!this._validateField(name, formState[name])) {
        error = true;
      }
    });

    return error;
  }
}
