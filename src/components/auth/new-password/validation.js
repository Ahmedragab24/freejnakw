export default function validateForm(data) {
  const errors = {};

  // Validate password
  if (!data.password.trim()) {
    errors.password = "كلمة المرور مطلوبة.";
  } else if (data.password.length < 8) {
    errors.password = "يجب أن تكون كلمة المرور 8 أحرف على الأقل.";
  }

  // Validate password confirmation
  if (!data.passwordConfirm.trim()) {
    errors.passwordConfirm = "تأكيد كلمة المرور مطلوب.";
  } else if (data.password !== data.passwordConfirm) {
    errors.passwordConfirm = "كلمتا المرور غير متطابقتين.";
  }

  return errors;
}
