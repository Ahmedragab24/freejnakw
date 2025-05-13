import { parsePhoneNumberFromString } from "libphonenumber-js";

// Function to validate a phone number
function validatePhoneNumber(phoneNumber, defaultCountry) {
  const phoneNumberObj = parsePhoneNumberFromString(
    phoneNumber,
    defaultCountry
  );
  if (phoneNumberObj && phoneNumberObj.isValid()) {
    return {
      isValid: true,
      country: phoneNumberObj.country, // Detected country
      formatted: phoneNumberObj.formatInternational(), // Formatted number
    };
  }
  return { isValid: false, country: null, formatted: null };
}

export default function validateForm(data) {
  const errors = {};

  // Validate name
  if (!data.name.trim()) {
    errors.name = "الاسم مطلوب.";
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) {
    errors.email = "البريد الإلكتروني مطلوب.";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "صيغة البريد الإلكتروني غير صحيحة.";
  }

  // Validate phone
  const phoneRegex = /^[0-9]{10,15}$/; // Adjust regex as per your requirements
  if (!data.phone.trim()) {
    errors.phone = "رقم الهاتف مطلوب.";
  } else if (!validatePhoneNumber(data.countryCode + data.phone).isValid) {
    errors.phone = "رقم الهاتف غير صحيح.";
  }

  // Validate message
  if (!data.message.trim()) {
    errors.message = "الرسالة مطلوبة.";
  }

  return errors;
}
