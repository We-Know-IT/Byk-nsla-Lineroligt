export default function Greeting() {
    const currentHour = new Date().getHours();
    let greeting = "Hej";
    if (currentHour >= 5 && currentHour < 12) {
        greeting = "God morgon";
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = "God eftermiddag";
    } else if (currentHour >= 18 || currentHour < 5) {
        greeting = "God kväll";
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-surface">{greeting},</h1>
        </div>
    );
}