"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SmartHouseDispatcher_1 = __importDefault(require("../dispatcher/SmartHouseDispatcher"));
exports.SmartHouseButtonAction = {
    transitionToCards: () => {
        SmartHouseDispatcher_1.default.dispatch("SMARTHOUSE_CARDS_TRANSITION", {
            actionType: "SMARTHOUSE_CARDS_TRASMARTHOUSE_CARDS_TRANSITION",
        });
    },
    transtionToMultimedia: () => {
        SmartHouseDispatcher_1.default.dispatch("SMARTHOUSE_MULTIMEDIA_TRANSITION", {
            actionType: "SMARTHOUSE_MULTIMEDIA_TRANSITION",
        });
    },
};
