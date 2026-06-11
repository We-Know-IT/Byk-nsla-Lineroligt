export default function WeatherInfoBar() {
    //TODO: Fetch real data
    const temperature = 14;
    const weatherDescription = "Växlande molnighet";


    return(
        <div className="flex flex-row items-center bg-surface rounded-l-xl gap-1 md:gap-2  p-2 md:p-3">
            <div className="">
                <img src="/icons/sun-light.svg" alt="Dagens väder" className="w-6 md:w-8 h-6 md:h-8 mr-1 md:mr-2"/>
            </div>

            <div className="text-md md:text-2xl font-semibold">
                <p className="text-foreground">{temperature || '?'}°C</p>
            </div>

            <div className="hidden md:block text-sm">
                <p className="text-foreground">{weatherDescription || '?'}</p>
            </div>
        </div>

    );
    
}