import * as React from "react";
import * as ReactDOM from "react-dom";
import { events } from "./common.blocks/Events/events.json";
import { Root } from "./common.blocks/Root/Root";

ReactDOM.render(
    <Root events={events} />,
    document.getElementById("root"),
);
