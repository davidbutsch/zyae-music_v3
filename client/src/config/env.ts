const createEnv = () => {
  // remove .env variable 'VITE_APP_' prefix
  const envVars = Object.entries(import.meta.env).reduce<
    Record<string, string>
  >((acc, curr) => {
    const [key, value] = curr;
    if (key.startsWith("VITE_APP_")) {
      acc[key.replace("VITE_APP_", "")] = value;
    }
    return acc;
  }, {});

  return envVars;
};

export const env = createEnv();
