export type ExternalEvent = {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl?: string;
  url?: string;
  locationLabel?: string;
};

export interface EventsAdapter {
  getEvents(): Promise<ExternalEvent[]>;
}
