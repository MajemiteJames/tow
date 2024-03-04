export function generateOTP(): string {
  // Implement your OTP generation logic (e.g., using a library)
  // For simplicity, you can use a random 6-digit number here
  return Math.floor(100000 + Math.random() * 900000).toString();
}
