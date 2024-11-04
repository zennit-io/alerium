export const refinePhoneNumber = (phoneNumber: string, countryCode = "") => {
  const phoneNumberDigits = phoneNumber.replace("(0)", "").replace(/\D/g, "");
  return phoneNumberDigits;
};
