export interface IJsonEvents {
  events: IJsonEventsObject[];
}
export interface IJsonEventsObject {
  type: string;
  title: string;
  source: string;
  time: string;
  description: string;
  icon: string;
  data: IAdditionalData;
  size: string;
}
interface IAdditionalData {
  albumcover: string;
  artist: string;
  track: IMusicTrack;
  volume: number;
  buttons: string[];
  image: string;
  temperature: number;
  humidity: number;
}
interface IMusicTrack {
  name: string;
  length: string;
}
