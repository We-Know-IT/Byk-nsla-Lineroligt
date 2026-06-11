import {fetchCurrentWeather} from "@/app/api/weather/weather-api";

export default async function WeatherInfoBar() {

    const { weather } = await fetchCurrentWeather();
    const { location, temperatureC, condition } = weather[0] ?? {};

    return(
        <div className="flex flex-row items-center bg-surface rounded-l-xl gap-1 md:gap-2  p-2 md:p-3">
            <div className="">
                <img src="/icons/sun-light.svg" alt="Dagens väder" className="w-6 md:w-8 h-6 md:h-8 mr-1 md:mr-2"/>
            </div>

            <div className="text-md md:text-2xl font-semibold">
                <p className="text-foreground">{temperatureC || '?'}°C</p>
            </div>

            <div className="hidden md:block text-sm">
                <p className="text-foreground">{condition || '?'}</p>
            </div>
        </div>

    );
    
}