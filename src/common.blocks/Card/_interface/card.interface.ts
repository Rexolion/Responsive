export interface IClimate {
    temperature: number;
    humidity: number;
}

export interface IMusicPlayerData {
    albumcover: string;
    artist: string;
    track: { name: string, length: string };
    volume: number;
}

export interface IButtons {
    buttons: string[];
}

export interface IJsonEventData {
    type: string;
    title: string;
    source: string;
    time: string;
    description: string | null;
    icon: string;
    size: string;
    data?: IClimate | IMusicPlayerData | IButtons;
}
