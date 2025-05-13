export default function validateEmail(email) {
  let emailError = "";

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) {
    emailError = "البريد الإلكتروني مطلوب.";
  } else if (!emailRegex.test(email)) {
    emailError = "صيغة البريد الإلكتروني غير صحيحة.";
  }

  return emailError;
}
