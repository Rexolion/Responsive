"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCriticalCam = () => {
    const evCache = new Array();
    const cam = (document.querySelector(".large-card-image"));
    let startPosY;
    let startPosX;
    let startBackX;
    let startBackY;
    let prevAngle;
    let prevDiff = 0;
    let filter = 100;
    let backSize = 100;
    cam.style.backgroundPosition = "0px 0px";
    cam.style.backgroundSize = "100%";
    cam.style.filter = "brightness(100%)";
    const diff = (num1, num2) => num1 > num2 ? num1 - num2 : num2 - num1;
    const dist = (x1, y1, x2, y2) => {
        const deltaX = diff(x1, x2);
        const deltaY = diff(y1, y2);
        const distanse = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
        return distanse;
    };
    const ondown = (ev) => {
        evCache.push(ev);
        startPosX = ev.clientX;
        startPosY = ev.clientY;
        if (cam.style.backgroundPositionX && cam.style.backgroundPositionY) {
            const bgx = cam.style.backgroundPositionX;
            const bgy = cam.style.backgroundPositionY;
            startBackX = parseInt(bgx, 10);
            startBackY = parseInt(bgy, 10);
        }
        if (evCache.length === 2)
            prevAngle =
                Math.atan2(evCache[1].clientY - evCache[0].clientY, evCache[1].clientX - evCache[0].clientX) *
                    (180 / Math.PI);
        cam.addEventListener("pointermove", onmove);
    };
    const onmove = (ev) => {
        // запись касания в кеш
        for (let i = 0; i < evCache.length; i++) {
            if (ev.pointerId === evCache[i].pointerId) {
                evCache[i] = ev;
                break;
            }
        }
        // если одно нажатие
        if (evCache.length === 1)
            cam.style.backgroundPosition =
                startBackX +
                    ev.clientX -
                    startPosX +
                    "px " +
                    (startBackY + ev.clientY - startPosY) +
                    "px";
        // если два нажатия
        if (evCache.length === 2) {
            // рассчет дистанции между двумя пальцами
            const fingerDiff = dist(evCache[0].clientX, evCache[0].clientY, evCache[1].clientX, evCache[1].clientY);
            if (fingerDiff > prevDiff) {
                backSize = backSize + 1;
                cam.style.backgroundSize = backSize + "%";
                prevDiff = fingerDiff;
            }
            else {
                backSize = backSize - 1;
                cam.style.backgroundSize = backSize + "%";
                prevDiff = fingerDiff;
            }
            // zoomText.textContent = backSize;
            const angle = Math.atan2(evCache[1].clientY - evCache[0].clientY, evCache[1].clientX - evCache[0].clientX) *
                (180 / Math.PI);
            if (angle > prevAngle) {
                filter = filter + 2;
                cam.style.filter = "brightness(" + filter + "%)";
                prevAngle = angle;
            }
            else {
                filter = filter - 2;
                cam.style.filter = "brightness(" + filter + "%)";
                prevAngle = angle;
            }
            //  brightText.textContent = filter;
        }
    };
    const onup = (ev) => {
        cam.removeEventListener("pointermove", onmove);
        removeEvent(ev);
    };
    const removeEvent = (ev) => {
        for (let i = 0; i < evCache.length; i++) {
            if (evCache[i].pointerId === ev.pointerId) {
                evCache.splice(i, 1);
                break;
            }
        }
    };
    cam.addEventListener("pointerdown", ondown);
    document.addEventListener("pointerup", onup);
    cam.addEventListener("onpointerup", onup);
};
