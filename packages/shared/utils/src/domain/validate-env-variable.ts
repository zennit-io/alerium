export const validateEnvVariable = (name: string) => {
  if (process.env[name] === undefined) {
    throw new Error(`Environment variable ${name} is missing`);
  }
};
