import { refinePhoneNumber } from "./refine-phone-number";

type PhoneNumberMap = {
  AL: AlbaniaPhoneNumber;
  US: USPhoneNumber;
  UK: UKPhoneNumber;
  IT: ItalyPhoneNumber;
  DE: GermanyPhoneNumber;
};

export type ISO = keyof PhoneNumberMap;

export type PhoneNumberMetadataType = {
  countryCode: string;
  countryName: string;
  phoneNumberLength?: number;
};
export class PhoneNumberMetadata<
  CountryCode extends string,
  CountryName extends string,
> implements PhoneNumberMetadataType
{
  countryCode: CountryCode;
  countryName: CountryName;

  constructor(countryCode: CountryCode, countryName: CountryName) {
    this.countryCode = countryCode;
    this.countryName = countryName;
  }
}

export type FormattedPhoneNumber = {
  significantNumber: string;
  fullNumber: string;
};

export type PhoneNumberType = {
  iso: ISO;
  metadata: PhoneNumberMetadataType;
  format(phoneNumber: string): FormattedPhoneNumber;
  parse(phoneNumber: string): boolean;
};
export type PhoneNumber<I extends ISO> = {
  iso: I;
  metadata: PhoneNumberMetadata<
    PhoneNumberMap[I]["metadata"]["countryCode"],
    PhoneNumberMap[I]["metadata"]["countryName"]
  >;
} & PhoneNumberType;

export class USPhoneNumber implements PhoneNumber<"US"> {
  iso = "US" as const;
  metadata = new PhoneNumberMetadata("1", "United States of America");
  format(phoneNumber: string) {
    const significantNumberLength = 10;
    const significantNumber = refinePhoneNumber(
      phoneNumber,
      this.metadata.countryCode,
    ).slice(0, significantNumberLength);

    let formattedSignificantNumber: string;

    switch (true) {
      case significantNumber.length === 0:
        formattedSignificantNumber = "";
        break;
      case significantNumber.length <= 3:
        formattedSignificantNumber = `(${significantNumber}`;
        break;
      case significantNumber.length <= 6:
        formattedSignificantNumber = `(${significantNumber.slice(0, 3)}) ${significantNumber.slice(3)}`;
        break;
      default:
        formattedSignificantNumber = `(${significantNumber.slice(0, 3)}) ${significantNumber.slice(3, 6)}-${significantNumber.slice(6, 10)}`;
        break;
    }

    return {
      significantNumber: formattedSignificantNumber,
      fullNumber: `+${this.metadata.countryCode}${significantNumber}`,
    };
  }
  parse(phoneNumber: string) {
    const phoneNumberDigits = refinePhoneNumber(phoneNumber).replace(/^00/, "");

    if (!phoneNumberDigits.startsWith(this.metadata.countryCode)) return false;

    return phoneNumberDigits.length === 11;
  }
}

export class AlbaniaPhoneNumber implements PhoneNumber<"AL"> {
  iso = "AL" as const;
  metadata = new PhoneNumberMetadata("355", "Albania");

  format(phoneNumber: string) {
    const significantNumberLength = 9;
    let significantNumber = refinePhoneNumber(
      phoneNumber,
      this.metadata.countryCode,
    );
    let formattedSignificantNumber: string;
    const startsWithZero = significantNumber.startsWith("0");
    const startsWithFormattedZero = significantNumber.startsWith("(0)");

    if (startsWithFormattedZero) {
      significantNumber = significantNumber.replace("(0)", "");
    } else if (startsWithZero) {
      significantNumber = significantNumber.replace("0", "");
    }

    significantNumber = significantNumber.slice(0, significantNumberLength);

    switch (true) {
      case significantNumber.length === 0:
        formattedSignificantNumber = "";
        break;
      case significantNumber.length <= 2:
        formattedSignificantNumber = significantNumber;
        break;
      case significantNumber.length <= 5:
        formattedSignificantNumber = `${significantNumber.slice(0, 2)} ${significantNumber.slice(2)}`;
        break;
      default:
        formattedSignificantNumber = `${significantNumber.slice(0, 2)} ${significantNumber.slice(2, 5)} ${significantNumber.slice(5, significantNumberLength)}`;
        break;
    }

    if (startsWithZero || startsWithFormattedZero) {
      formattedSignificantNumber = `(0) ${formattedSignificantNumber}`;
    }

    return {
      significantNumber: formattedSignificantNumber,
      fullNumber: `+${this.metadata.countryCode}${significantNumber}`,
    };
  }
  parse(phoneNumber: string) {
    const { countryCode } = this.metadata;
    const phoneNumberDigits = refinePhoneNumber(phoneNumber).replace(/^00/, "");

    if (!phoneNumberDigits.startsWith(countryCode)) return false;

    const significantNumber = phoneNumberDigits.slice(countryCode.length);
    const providerCodes = ["67", "68", "69"];
    const isValidProviderCode = providerCodes.some((providerCode) =>
      significantNumber.startsWith(providerCode),
    );

    if (!isValidProviderCode) return false;

    return phoneNumberDigits.length === 12;
  }
}

export class ItalyPhoneNumber implements PhoneNumber<"IT"> {
  iso = "IT" as const;
  metadata = new PhoneNumberMetadata("39", "Italy");
  format(phoneNumber: string) {
    const { countryCode } = this.metadata;
    const significantNumberLength = 10;
    const significantNumber = refinePhoneNumber(
      phoneNumber,
      this.metadata.countryCode,
    ).slice(0, significantNumberLength);
    let formattedSignificantNumber: string;
    // max length 10 without country code

    switch (true) {
      case significantNumber.length === 0:
        formattedSignificantNumber = "";
        break;
      case significantNumber.length <= 3:
        formattedSignificantNumber = significantNumber;
        break;
      case significantNumber.length <= 6:
        formattedSignificantNumber = `${significantNumber.slice(0, 3)} ${significantNumber.slice(3)}`;
        break;
      default:
        formattedSignificantNumber = `${significantNumber.slice(0, 3)} ${significantNumber.slice(3, 6)} ${significantNumber.slice(6, significantNumberLength)}`;
        break;
    }

    return {
      significantNumber: formattedSignificantNumber,
      fullNumber: `+${countryCode}${significantNumber}`,
    };
  }
  parse(phoneNumber: string) {
    const { countryCode } = this.metadata;
    const phoneNumberDigits = refinePhoneNumber(phoneNumber).replace(/^00/, "");

    if (!phoneNumberDigits.startsWith(countryCode)) return false;

    return phoneNumberDigits.length === 12;
  }
}

export class UKPhoneNumber implements PhoneNumber<"UK"> {
  iso = "UK" as const;
  metadata = new PhoneNumberMetadata("44", "United Kingdom");
  format(phoneNumber: string) {
    const significantNumberLength = 10;
    const significantNumber = refinePhoneNumber(
      phoneNumber,
      this.metadata.countryCode,
    ).slice(0, significantNumberLength);
    let formattedSignificantNumber: string;

    switch (true) {
      case significantNumber.length === 0:
        formattedSignificantNumber = "";
        break;
      case significantNumber.length <= 4:
        formattedSignificantNumber = significantNumber;
        break;
      default:
        formattedSignificantNumber = `${significantNumber.slice(0, 4)} ${significantNumber.slice(4, significantNumberLength)}`;
        break;
    }

    return {
      significantNumber: significantNumber,
      fullNumber: `+${this.metadata.countryCode}${significantNumber}`,
    };
  }
  parse(phoneNumber: string) {
    const phoneNumberDigits = refinePhoneNumber(phoneNumber).replace(/^00/, "");

    if (!phoneNumberDigits.startsWith(this.metadata.countryCode)) return false;

    return phoneNumberDigits.length === 12;
  }
}

export class GermanyPhoneNumber implements PhoneNumber<"DE"> {
  iso = "DE" as const;
  metadata = new PhoneNumberMetadata("49", "Germany");
  format(phoneNumber: string) {
    const significantNumberLength = 10;
    const significantNumber = refinePhoneNumber(
      phoneNumber,
      this.metadata.countryCode,
    ).slice(0, significantNumberLength);
    let formattedSignificantNumber: string;

    switch (true) {
      case significantNumber.length === 0:
        formattedSignificantNumber = "";
        break;
      case significantNumber.length <= 3:
        formattedSignificantNumber = significantNumber;
        break;
      case significantNumber.length <= 7:
        formattedSignificantNumber = `${significantNumber.slice(0, 3)} ${significantNumber.slice(3)}`;
        break;
      default:
        formattedSignificantNumber = `${significantNumber.slice(0, 3)} ${significantNumber.slice(3, 7)} ${significantNumber.slice(7, significantNumberLength)}`;
        break;
    }

    if (formattedSignificantNumber.length > 0) {
      const startsWithZero = formattedSignificantNumber[0] === "0";
      const phoneNumberStartsWithZero = phoneNumber.startsWith("(0)");

      if (startsWithZero || phoneNumberStartsWithZero) {
        formattedSignificantNumber = `(0) ${startsWithZero ? formattedSignificantNumber.slice(1) : formattedSignificantNumber}`;
      }
    }

    return {
      significantNumber: formattedSignificantNumber,
      fullNumber: `+${this.metadata.countryCode}${significantNumber}`,
    };
  }
  parse(phoneNumber: string) {
    const phoneNumberDigits = refinePhoneNumber(phoneNumber).replace(/^00/, "");

    if (!phoneNumberDigits.startsWith(this.metadata.countryCode)) return false;

    return phoneNumberDigits.length === 12;
  }
}
