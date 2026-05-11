import React from 'react'
import PasswordValidator from 'password-validator'

var schema = new PasswordValidator();

// Add properties to it
schema
  .is().min(8)                                    // Minimum length 8
  .is().max(100)                                  // Maximum length 100
  .has().uppercase(1)                             // Must have at least 1 uppercase letter
  .has().lowercase(1)                             // Must have at least 1 lowercase letter
  .has().digits(1)                                // Must have at least 1 digit
  .has().symbols(1)                               // Must have at least 1 special character
  .has().not().spaces()                           // Should not have spaces
  .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

export default function TextValidators(e) {
  let { name, value } = e.target
  switch (name) {
    case "name":
    case "username":
      if (!value || value.length === 0)
        return name + " Field is Mendatory"
      else if (value.length < 3 || value.length > 100)
        return name + " Field Length Must Be 3-100 Characters"
      else
        return ""

    case "email":
      if (!value || value.length === 0)
        return name + " Field is Mendatory"
      else if (value.length < 13 || value.length > 100)
        return name + " Field Length Must Be 13-100 Characters"
      else
        return ""

    case "password":
      if (!value || value.length === 0)
        return name + " Field is Mendatory"
      else if (!schema.validate(value))
        return schema.validate(value, { details: true }).map(x => x.message.replaceAll("string", "password")).join("|")
      else
        return ""

    case "phone":
      if (!value || value.length === 0)
        return name + " Field is Mendatory"
      else if (value.length < 10 || value.length > 10)
        return name + " Field Length Must Be 10 Characters"
      else if (!(["6", "7", "8", "9"].includes(value[0])))
        return "Phone Field Must Be Start With 6,7,8 or 9"
      else
        return ""

    case "basePrice":
      if (!value || value.length === 0)
        return name + " Field is Mendatory"
      else if (parseInt(value) < 1)
        return "Price Must Be 1 or More Then 1"
      else
        return ""

    case "discount":
      if (!value || value.length === 0)
        return name + " Field is Mendatory"
      else if (parseInt(value) < 0 || parseInt(value) > 100)
        return "Discount Must Be In Range 0-100"
      else
        return ""

    case "stockQuantity":
      if (!value || value.length === 0)
        return name + " Field is Mendatory"
      else if (parseInt(value) < 0)
        return "Price Must Be 0 or More Then 0"
      else
        return ""

    case "description":
    case "answer":
      if (!value || value.length === 0)
        return name + " Field is Mendatory"
      else if (value.length < 50)
        return name + " Field Length Must Be 50 Character or More"
      else
        return ""

    case "question":
      if (!value || value.length === 0)
        return name + " Field is Mendatory"
      else if (value.length < 20)
        return name + " Field Length Must Be 20 Character or More"
      else
        return ""

    default:
      return ""
  }
}
