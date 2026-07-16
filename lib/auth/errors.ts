export function mapAuthError(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("email rate limit exceeded")) {
    return "Email sending is temporarily limited. Supabase's built-in email service allows only 2 auth emails per hour for the entire project (signup, password reset, and resend combined). Wait up to an hour before trying again.";
  }

  if (
    normalized.includes("only request this once every") ||
    normalized.includes("for security purposes")
  ) {
    return "Please wait at least 60 seconds before requesting another email for this address.";
  }

  if (normalized.includes("invalid login credentials")) {
    return "Incorrect email or password.";
  }

  if (normalized.includes("user already registered")) {
    return "An account with this email already exists.";
  }

  if (normalized.includes("password should be at least")) {
    return "Password must be at least 6 characters.";
  }

  if (normalized.includes("email not confirmed")) {
    return "Please verify your email before signing in.";
  }

  return message;
}
