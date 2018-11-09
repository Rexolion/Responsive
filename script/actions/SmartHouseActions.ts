import SmartHouseDispatcher from "../dispatcher/SmartHouseDispatcher";
import {SmartHouseActionID} from "./SmartHouseActionID";

export const SmartHouseButtonAction = {

    transitionToCards: () => {
        SmartHouseDispatcher.dispatch("SMARTHOUSE_CARDS_TRANSITION", {
            actionType: "SMARTHOUSE_CARDS_TRASMARTHOUSE_CARDS_TRANSITION",
        });
    },

    transtionToMultimedia: () => {
        SmartHouseDispatcher.dispatch("SMARTHOUSE_MULTIMEDIA_TRANSITION", {
            actionType: "SMARTHOUSE_MULTIMEDIA_TRANSITION",
        });
    },

};
