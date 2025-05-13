import Link from "next/link";

function IgnoreLoginButton() {
  const inlineStyle = {
    position: "fixed",
    top: "20px",
    left: "20px",
    color: "#454545",
    fontSize: "14px",
    fontWeight: "900",
    textDecoration: "none",
  };

  return (
    <Link href="/start-game" style={inlineStyle}>
      تخطي تسجيل الدخول
    </Link>
  );
}

export default IgnoreLoginButton;
