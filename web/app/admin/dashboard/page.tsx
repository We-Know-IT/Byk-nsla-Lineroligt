"use client";

import { AdminSectionPage } from "../../modules/admin";
import StatsBox from "../../modules/admin/components/dashboard/stats-box";
import BarChart from "../../modules/admin/components/dashboard/bar-chart";
import InfoBox from "../../modules/admin/components/dashboard/info-box";
import StatsList from "../../modules/admin/components/dashboard/stats-list";

// Example data for BarChart
const mockData = [
    { label: 'Januari', value: 30 },
    { label: 'Februari', value: 20 },
    { label: 'Mars', value: 50 },
    { label: 'April', value: 60 },
    { label: 'Maj', value: 60 },
    { label: 'Juni', value: 20 },
    { label: 'Juli', value: 32 },
];

// Example data for InfoBox
const mockInfoData = [
    { label: 'Eventet loppmarknad har 50+ anmälda', text: 'Rekordhögt deltagande - 58 totalt', borderColor: 'border-green-800', bgColor: 'bg-green-100' },
    { label: 'Rapport för maj är klar', text: 'Sista rapporten för maj är nu klar, väntas på att publiceras', borderColor: 'border-blue-800', bgColor: 'bg-blue-100' },
    { label: 'Problem med inloggning', text: 'Flera användare har rapporterat problem med att logga in, undersöker problemet', borderColor: 'border-amber-800', bgColor: 'bg-amber-100' },
    { label: 'Teater i folkparken - 1200+ intresserade', text: 'Rekordhögt intresserade för ett event - 1278 totalt', borderColor: 'border-green-800', bgColor: 'bg-green-100' },
];

// Example columns and data for StatsList
const productColumns = [
    { key: 'townpart', label: 'Stadsdel' },
    { key: 'residents', label: 'Invåndare' },
    { key: 'post', label: 'Inlägg' },
    { key: 'event', label: 'Event' },
    { key: 'growth', label: 'Tillväxt' },
];

// Example data for StatsList
const productListData = [
    { townpart: 'Innerstaden', residents: 2495, post: 120, event: 5, growth: '5%' },
    { townpart: 'Södra', residents: 205, post: 12, event: 2, growth: '10%' },
    { townpart: 'Västra', residents: 1200, post: 80, event: 3, growth: '8%' },
    { townpart: 'Östra', residents: 800, post: 50, event: 1, growth: '3%' },
    { townpart: 'Norr', residents: 400, post: 30, event: 0, growth: '2%' },
];

export default function Page() {
  return (
    <AdminSectionPage>
      <div className="relative flex flex-col md:flex-row md:gap-4">
        <StatsBox title="Totala användare" value={1424} goal={2000} previousValue={1300} iconSrc="/icons/Frame.svg" />
        <StatsBox title="Aktiva byar & städer" value={18} iconSrc="/icons/House.svg" />
        <StatsBox title="Inlägg denna månad" value={836} goal={950} goalText="Jämfört med förra månaden" previousValue={950} iconSrc="/icons/Message.svg" />
        <StatsBox title="Kommande event" value={27} iconSrc="/icons/Calendar_detailed.svg" />

      </div>


      <div className="flex flex-col md:grid md:grid-cols-10 gap-4">
        <div className="md:col-span-7 gap-4 flex flex-col">

        <BarChart data={mockData} title="Nya användare per månad" text="Registreringar under 2026" dataTitle="Användare" />

        <StatsList title="Byar & städer" text="Top 5 mest aktiva byar & städer" columns={productColumns} data={productListData} />

        </div>

        <div className="md:col-span-3">
        <InfoBox title="Notiser" text="" data={mockInfoData} showCounter={true} />
        </div>

      </div>


    </AdminSectionPage>
  );
}
