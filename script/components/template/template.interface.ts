export interface jsonEvents {
  events: jsonEventsObject[];
}
export interface jsonEventsObject {
  type: string;
  title: string;
  source: string;
  time: string;
  description: string;
  icon: string;
  data: additionalData;
  size: string;
}
interface additionalData {
  albumcover: string;
  artist: string;
  track: musicTrack;
  volume: number;
  buttons: string[];
  image: string;
  temperature: number;
  humidity: number;
}
interface musicTrack {
  name: string;
  length: string;
}
