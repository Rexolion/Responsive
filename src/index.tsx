import * as React from "react";
import { isMobile } from 'react-device-detect'
import * as ReactDOM from "react-dom";
import { Root as DesktopApp } from "./desktop.blocks/Root/Root";
import { events } from "./events.json";
import { Root as MobileApp } from "./mobile.blocks/Root/Root";
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(
    isMobile
    ? <MobileApp events={events} device='mobile' />
    : <DesktopApp events={events} device='desktop' />,
    document.getElementById('root')
)

registerServiceWorker();