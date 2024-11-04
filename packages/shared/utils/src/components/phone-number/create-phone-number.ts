import {
  AlbaniaPhoneNumber,
  GermanyPhoneNumber,
  type ISO,
  ItalyPhoneNumber,
  type PhoneNumber,
  UKPhoneNumber,
  USPhoneNumber,
} from "./country-formatters";

export const phoneNumberMap: Record<ISO, PhoneNumber<ISO>> = Object.freeze({
  AL: new AlbaniaPhoneNumber(),
  US: new USPhoneNumber(),
  UK: new UKPhoneNumber(),
  IT: new ItalyPhoneNumber(),
  DE: new GermanyPhoneNumber(),
});

export const createPhoneNumber = <T extends ISO>(iso: T): PhoneNumber<T> => {
  return phoneNumberMap[iso] as PhoneNumber<T>;
};
