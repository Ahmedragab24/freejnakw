export default function detectLanguage(text) {
  const arabicRegex = /[\u0600-\u06FF]/; // Matches Arabic script
  const englishRegex = /^[A-Za-z\s]+$/; // Matches English letters and spaces

  if (arabicRegex.test(text)) {
    return "ar";
  } else if (englishRegex.test(text)) {
    return "en";
  } else {
    return "none";
  }
}
