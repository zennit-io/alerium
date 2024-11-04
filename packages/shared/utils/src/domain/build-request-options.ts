export const buildRequestOptions = (XSRFToken: string): RequestInit => {
  return {
    credentials: "include",
    headers: {
      "X-XSRF-TOKEN": XSRFToken,
    },
  };
};
