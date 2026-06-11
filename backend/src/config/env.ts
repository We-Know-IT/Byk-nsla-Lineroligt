import "dotenv/config";

type WeatherProviderName = "mock";

const toWeatherProvider = (value: string | undefined): WeatherProviderName =>
  value === "mock" ? value : "mock";

const toPort = (value: string | undefined): number => {
  const parsed = Number(value);
  if (Number.isFinite(parsed) && parsed > 0) {
    return parsed;
  }
  return 4000;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: toPort(process.env.PORT),
  weatherProvider: toWeatherProvider(process.env.WEATHER_PROVIDER),
} as const;
