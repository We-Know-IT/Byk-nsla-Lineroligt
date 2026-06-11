export default function InfoBar() {
    //TODO: Fetch real data
    const numberOfEvents = 7;
    const numberOfVolunteerTasks = 5;
    const numberOfOngoingProjects = 3;

    return (
        <div className ="flex flex-row items-center bg-surface md:rounded-xl py-2 px-4 md:px-8 gap-4 overflow-x-auto overflow-scroll md:overflow-auto">

            <div className="flex flex-row py-2 items-center min-w-max">
                <a href="/event" className="flex flex-row gap-2 items-center hover:scale-102 transition-transform">
                <img src="/icons/calendar.svg" alt="Dagens event" className="w-8 h-8 mr-2" />
                <div className="flex flex-col">
                    <span className="text-sm font-bold">{numberOfEvents || '?'} event idag</span>
                    <div className="flex flex-row gap-2 items-center">
                    <span className="text-sm font-light">Se vad som händer</span>
                    <img src="/icons/arrow-right.svg" alt="->" className="w-4 h-4" />
                    </div>
                </div> 
                 </a>
            </div>

            <hr className="h-8 border-l border-border" />  


            <div className="flex flex-row py-2 items-center min-w-max">
                <a href="/hjalptill" className="flex flex-row gap-2 items-center hover:scale-102 transition-transform">
                <img src="/icons/heart.svg" alt="Hjälp till" className="w-8 h-8 mr-2" />
                <div className="flex flex-col">
                    <span className="text-sm font-bold">{numberOfVolunteerTasks || '?'} volotäruppdrag</span>
                    <div className="flex flex-row gap-2 items-center">
                    <span className="text-sm font-light">Gör skillnad</span>
                    <img src="/icons/arrow-right.svg" alt="->" className="w-4 h-4" />
                    </div>
                </div> 
                 </a>
            </div>

            <hr className="h-8 border-l border-border" />  

            <div className="flex flex-row py-2 items-center min-w-max">
                <a href="/bygg" className="flex flex-row gap-2 items-center hover:scale-102 transition-transform">
                <img src="/icons/hammer.svg" alt="Bygg och utveckling" className="w-8 h-8 mr-2" />
                <div className="flex flex-col">
                    <span className="text-sm font-bold">{numberOfOngoingProjects || '?'} pågående projekt</span>
                    <div className="flex flex-row gap-2 items-center">
                    <span className="text-sm font-light">Se vad som byggs</span>
                    <img src="/icons/arrow-right.svg" alt="->" className="w-4 h-4" />
                    </div>
                </div> 
                 </a>
            </div>



        </div>
    )
}