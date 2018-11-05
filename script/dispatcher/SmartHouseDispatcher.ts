import {Dispatcher} from "../framework/fluxi";
import {SmartHouseStore } from "../stores/SmartHouseStore";

const SmartHouseDispatcher = new Dispatcher();
SmartHouseDispatcher.addListener("SMARTHOUSE_TRANSITION", (action) => {
    SmartHouseStore.addEventHandler(action.text);
    SmartHouseStore.emitChange();
});

export default SmartHouseDispatcher;
