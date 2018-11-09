import { appendCards } from "../components/template/appendCards";
import { MultimediaTemplate } from "../components/template/appendMultimedia";
import { Store } from "../utils/fluxi/fluxiStore";

const multimedia = new MultimediaTemplate();

export class SmartHouseStore extends Store {
    public getCards() {
        appendCards();
    }
    public getMultimedia() {
        multimedia.appendMultimedia();
    }
}
