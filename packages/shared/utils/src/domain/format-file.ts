import { v4 as uuid } from "uuid";

export type FormattedFile = File & {
  id: string;
  preview: string;
};

export const formatFile = (file: File): FormattedFile => {
  return Object.assign(file, {
    id: uuid(),
    preview: URL.createObjectURL(file),
  });
};
