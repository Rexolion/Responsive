import { cn } from "@bem-react/classname";
import * as React from "react";
import { IMusicPlayerData } from "../_interface/card.interface";
import "./player.scss";

interface IPlayerProps {
    playerData?: IMusicPlayerData;
    className?: string;
    device?: string;
}

export const player = cn("Player");

export class MusicPlayer extends React.Component<{}, any> {
    public props: IPlayerProps;
    public state: {
        volume: number,
    };

    constructor(props: IPlayerProps) {
        super(props);
        this.state = {
            volume: props.playerData.volume,
        };
    }

    public render() {
        const { albumcover, artist, track } = this.props.playerData;
        const { volume } = this.state;

        return (
            <div className={this.props.className || player()}>
                <div className={player("Track")}>
                    <img className={player("Cover")} src={albumcover} alt="album cover" />
                    <span className={player("Artist")}>{`${artist} - ${track.name}`}</span>
                    <div className={player("RangeBox")}>
                        <input className={player("Range", { type: "time" })} type="range" defaultValue="23" />
                        <span className={player("RangeVal")}>{track.length}</span>
                    </div>
                </div>
                <div className={player("Control")}>
                    <div className={player("BtnBox")}>
                        <span className={player("Btn")}><img src="images/Prev.svg" alt="prev" /></span>
                        <span className={player("Btn")}><img src="images/Next.svg" alt="next" /></span>
                    </div>
                    <div className={player("RangeBox")}>
                        <input className={player("Range", { type: "volume" })}
                            type="range"
                            defaultValue={String(volume)}
                            onChange={this.handleChange} />
                        <span className={player("RangeVal")}>{volume + "%"}</span>
                    </div>
                </div>
            </div>
        );
    }

    public handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ volume: ev.target.value });
    }
}
