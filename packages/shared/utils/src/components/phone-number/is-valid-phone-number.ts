import type { ISO } from "./country-formatters";
import { createPhoneNumber, phoneNumberMap } from "./create-phone-number";

export const isValidPhoneNumber = (phoneNumber: string) => {
  const digits = phoneNumber.replace(/^00/, "").replace(/\D/g, "");

  let countryIso: ISO = "US";
  for (const [iso, country] of Object.entries(phoneNumberMap)) {
    if (digits.startsWith(country.metadata.countryCode)) {
      countryIso = country.iso;
      break;
    }
  }

  const isValidPhoneNumber = createPhoneNumber(countryIso).parse(phoneNumber);

  return isValidPhoneNumber;
};
