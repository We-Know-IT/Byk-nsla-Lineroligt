import BackgroundImage from "./background-image";
import Greeting from "./greeting";
import InfoBar from "./info-bar";
import WeatherInfoBar from "./weather-info-bar";
import { siteConfig } from "../../../../shared/config/site.config";

type HeroProps = {
    title?: string;
    description?: string;
    weatherInfo?: boolean;
    infoBar?: boolean;
    greeting?: boolean;
};

export default function Hero(
    { title, description, weatherInfo, infoBar, greeting }: HeroProps
) {
    return (
        <div className="relative h-auto min-h-48 w-full rounded-2xl overflow-hidden flex flex-col justify-end shadow-md">
            <div className="absolute inset-0 z-0">
                <BackgroundImage />
            </div>

            <div className="relative z-10 flex flex-col items-start gap-2 px-2 pt-16 pb-4 md:px-4">
                {greeting && <Greeting />}
                <h1 className="text-5xl font-bold text-surface">{title || siteConfig.areaName}</h1>
                {description && (
                    <div className="gap-y-1 max-w-100 overflow-hidden text-surface text-sm w-xs md:w-md">
                        {description}
                    </div>
                )}
            </div>

            {infoBar && (
                <div className="relative z-10 flex my-0 md:my-4 md:px-4">
                    <InfoBar />
                </div>
            )}


            {weatherInfo && (
                <div className="absolute z-10 top-0 right-0 flex md:mb-8 mt-4">
                    <WeatherInfoBar />
                </div>
            )}
        </div>
    );
}

