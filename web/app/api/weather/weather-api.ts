
export type WeatherResponse = {
  location: string;
  temperatureC: number;
  condition: string;
};

type WeatherApiSuccess = {
  success: true;
  data: WeatherResponse;
};

type WeatherApiError = {
  success: false;
  error: {
    message: string;
  };
};

type WeatherApiResponse = WeatherApiSuccess | WeatherApiError;

const getAppBaseUrl = () => process.env.APP_URL ?? "http://localhost:3000";

export async function fetchCurrentWeather(): Promise<{
    weather: WeatherResponse[];
}> {
    try {
    const response = await fetch(new URL("/api/weather", getAppBaseUrl()).toString(), {
      cache: "no-store",
    });

    const payload: WeatherApiResponse = await response.json();

    if (!response.ok || !payload.success) {
      return {
        weather: [
          {
            location: "",
            temperatureC: 0,
            condition: "",
          }
        ]
      };
    }

    return { weather: [payload.data] };
  } catch {
    return {
      weather: [
        {
          location: "",
          temperatureC: 0,
          condition: "",
        }
      ]
    };
  }
}    