export default function validateForm(data) {
  const errors = {};

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) {
    errors.email = "البريد الإلكتروني مطلوب.";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "صيغة البريد الإلكتروني غير صحيحة.";
  }

  // Validate OTP (One-Time Password)
  const otpRegex = /^[0-9]{4}$/; // Ensures the OTP is exactly 4 digits
  if (!data.otp.trim()) {
    errors.otp = "رمز التحقق مطلوب.";
  } else if (!otpRegex.test(data.otp)) {
    errors.otp = "يجب أن يتكون رمز التحقق من 4 أرقام.";
  }

  return errors;
}
