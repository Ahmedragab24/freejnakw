export default function validateForm(data) {
  const errors = {};

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) {
    errors.email = "البريد الإلكتروني مطلوب.";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "صيغة البريد الإلكتروني غير صحيحة.";
  }

  // Validate password
  if (!data.password.trim()) {
    errors.password = "كلمة المرور مطلوبة.";
  } else if (data.password.length < 8) {
    errors.password = "يجب أن تكون كلمة المرور 8 أحرف على الأقل.";
  }

  return errors;
}
