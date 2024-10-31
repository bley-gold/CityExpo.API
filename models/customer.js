class Customer {
  constructor(customer_id, FirstName, LastName, PhoneNumber, Address, Email, Password) {
      this._customer_id = customer_id;
      this._FirstName = FirstName;
      this._LastName = LastName;
      this._PhoneNumber = PhoneNumber;
      this._Address = Address;
      this._Email = Email;
      this._Password = Password;
  }

  get customer_id() { return this._customer_id; }
  set FirstName(value) { this.validateNonEmptyString(value, 'FirstName'); this._FirstName = value; }
  set LastName(value) { this.validateNonEmptyString(value, 'LastName'); this._LastName = value; }
  set PhoneNumber(value) { this.validatePhoneNumber(value); this._PhoneNumber = value; }
  set Address(value) { this.validateNonEmptyString(value, 'Address'); this._Address = value; }
  set Email(value) { this.validateEmail(value); this._Email = value; }
  set Password(value) { this.validatePassword(value); this._Password = value; }

  validateNonEmptyString(value, fieldName) {
      if (typeof value !== 'string' || !value.trim()) throw new Error(`${fieldName} must be a non-empty string`);
  }

  validatePhoneNumber(value) {
      if (!/^[0-9]{10}$/.test(value)) throw new Error('PhoneNumber must be a 10-digit number');
  }

  validateEmail(value) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) throw new Error('Invalid email format');
  }

  validatePassword(value) {
      if (typeof value !== 'string' || value.length < 8) throw new Error('Password must be at least 8 characters');
  }
}

module.exports = Customer;
