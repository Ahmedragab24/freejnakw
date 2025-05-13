export default function validateForm(data) {
  const errors = {};

  // Validate current password
  if (!data.oldPassword.trim()) {
    errors.oldPassword = "كلمة السر الحالية مطلوبة.";
  }

  // Validate new password
  if (!data.newPassword.trim()) {
    errors.newPassword = "كلمة السر الجديدة مطلوبة.";
  } else if (data.newPassword.length < 8) {
    errors.newPassword = "يجب أن تكون كلمة السر الجديدة 8 أحرف على الأقل.";
  }

  // Validate confirm password
  if (!data.newPasswordConfirm.trim()) {
    errors.newPasswordConfirm = "تأكيد كلمة السر مطلوب.";
  } else if (data.newPassword !== data.newPasswordConfirm) {
    errors.newPasswordConfirm = "كلمتا السر غير متطابقتين.";
  }

  return errors;
}
