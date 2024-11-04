export type Result<T = string, E = Error> =
  | {
      data: T;
      success: true;
    }
  | {
      success: false;
      error: E;
    };
