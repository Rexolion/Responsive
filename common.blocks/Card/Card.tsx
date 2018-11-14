import { cn } from "@bem-react/classname";
import * as React from "react";
import { IButtons, IClimate, IJsonEventData, IMusicPlayerData } from "./_interface/card.interface";
import { MusicPlayer } from "./_musicPlayer/musicPlayer";
import "./Card.css";

export const card = cn("Card");

export interface ICardProps {
cardData: IJsonEventData;
className?: string;
}

export class Card extends React.Component {
public props: ICardProps;

public render() {
const { cardData, className } = this.props;
const { size, type, icon, title, source, time, description, data } = cardData;

return (
    <article className={`${className} ${card({ size, type })}`}>
    <header className={card("Title")}>
        <img className={card("Icon")} src={`images/${icon}.svg`} alt={icon} />
        <span>{title}</span>
    </header>
    <section className={card("Meta")}>
        <span className={card("Source")}>{source}</span>
        <span className={card("Time")}>{time}</span>
    </section>
    {description ? this.getDescription(description, icon, data) : null}
    <img className={card("Close")} src="images/close.svg" alt="close" />
    <img className={card("Shape")} src="images/Shape.svg" alt="shape" />
    </article>
);
}

public getDescription(description: string, icon: string, data: IClimate | IMusicPlayerData | IButtons) {
return (
    <section className={card("Info")}>
    <div className={card("Description")}>{description}</div>
    {icon === "stats" ? <img className={card("Image")} alt="chart" src="images/Richdata@2x.png"/> : null}
    {icon === "thermal" ? this.getTermalContent(data as IClimate) : null}
    {icon === "fridge" ? this.getButtons(data as IButtons) : null}
    {icon === "cam" ? this.getCamera() : null}
    {icon === "music" ? <MusicPlayer playerData={data as IMusicPlayerData}/> : null}
    </section>
);
}

public getTermalContent(data: IClimate) {
if (!data) { return null; }

const thermal = cn("Thermal");
return (
    <div className={card("Thermal")}>
    <span className={thermal("Data", { type: "temp" })} data-value={data.temperature + "C"}>Температура</span>
    <span className={thermal("Data", { type: "hum" })} data-value={data.humidity + "%"}>Влажность</span>
    </div>
);
}

public getCamera() {
    return <img className={card("Image")} src="images/bitmap2x.png" alt="cam image" />;
}

public getButtons(data: IButtons) {
if (!data) { return null; }
const btns = data.buttons.map((btn, i) => {
    const mod = btn === "Да" ? "true" : "false";
    return <button className={card("Btn", { mod })} key={i} type="button" name="button">{btn}</button>;
});
return <div className={card("BtnGroup")}>{btns}</div>;
}
}
