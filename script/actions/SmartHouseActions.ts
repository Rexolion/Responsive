import SmartHouseDispatcher from "../dispatcher/SmartHouseDispatcher";
import {SmartHouseActionID} from "./SmartHouseActionID";

class SmartHouseActionsStatic {

    public transition(link: string): void {
        SmartHouseDispatcher.addListener("SMARTHOUSE_TRANSITION", {

        });
    }
}
