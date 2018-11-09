export const initCriticalCam = (): void => {
  const evCache = new Array();
  const cam: HTMLElement = (
    document.querySelector(".large-card-image")
  ) as HTMLElement;
  let startPosY: number;
  let startPosX: number;
  let startBackX: number;
  let startBackY: number;
  let prevAngle: number;
  let prevDiff = 0;
  let filter = 100;
  let backSize = 100;
  cam.style.backgroundPosition = "0px 0px";
  cam.style.backgroundSize = "100%";
  cam.style.filter = "brightness(100%)";

  const diff = (num1: number, num2: number): number =>
    num1 > num2 ? num1 - num2 : num2 - num1;

  const dist = (x1: number, y1: number, x2: number, y2: number): number => {
    const deltaX: number = diff(x1, x2);
    const deltaY: number = diff(y1, y2);
    const distanse = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    return distanse;
  };

  const ondown = (ev: PointerEvent): void => {
    evCache.push(ev);
    startPosX = ev.clientX;
    startPosY = ev.clientY;
    if (cam.style.backgroundPositionX && cam.style.backgroundPositionY) {
      const bgx: string = cam.style.backgroundPositionX;
      const bgy: string = cam.style.backgroundPositionY;
      startBackX = parseInt(bgx, 10);
      startBackY = parseInt(bgy, 10);
    }
    if (evCache.length === 2) {
      prevAngle =
        Math.atan2(
          evCache[1].clientY - evCache[0].clientY,
          evCache[1].clientX - evCache[0].clientX,
        ) *
        (180 / Math.PI);
    }
    cam.addEventListener("pointermove", onmove);
  };

  const onmove = (ev: PointerEvent): void => {
    // запись касания в кеш
    for (let i = 0; i < evCache.length; i++) {
      if (ev.pointerId === evCache[i].pointerId) {
        evCache[i] = ev;
        break;
      }
    }
    // если одно нажатие
    if (evCache.length === 1) {
      cam.style.backgroundPosition =
        startBackX +
        ev.clientX -
        startPosX +
        "px " +
        (startBackY + ev.clientY - startPosY) +
        "px";
    }

    // если два нажатия
    if (evCache.length === 2) {
      // рассчет дистанции между двумя пальцами
      const fingerDiff: number = dist(
        evCache[0].clientX,
        evCache[0].clientY,
        evCache[1].clientX,
        evCache[1].clientY,
      );
      if (fingerDiff > prevDiff) {
        backSize = backSize + 1;
        cam.style.backgroundSize = backSize + "%";
        prevDiff = fingerDiff;
      } else {
        backSize = backSize - 1;
        cam.style.backgroundSize = backSize + "%";
        prevDiff = fingerDiff;
      }

      // zoomText.textContent = backSize;

      const angle: number =
        Math.atan2(
          evCache[1].clientY - evCache[0].clientY,
          evCache[1].clientX - evCache[0].clientX,
        ) *
        (180 / Math.PI);

      if (angle > prevAngle) {
        filter = filter + 2;
        cam.style.filter = "brightness(" + filter + "%)";
        prevAngle = angle;
      } else {
        filter = filter - 2;
        cam.style.filter = "brightness(" + filter + "%)";
        prevAngle = angle;
      }

      //  brightText.textContent = filter;
    }
  };

  const onup = (ev: PointerEvent): void => {
    cam.removeEventListener("pointermove", onmove);
    removeEvent(ev);
  };

  const removeEvent = (ev: PointerEvent): void => {
    for (let i = 0; i < evCache.length; i++) {
      if (evCache[i].pointerId === ev.pointerId) {
        evCache.splice(i, 1);
        break;
      }
    }
  };
  cam.addEventListener("pointerdown", ondown);
  document.addEventListener("pointerup", onup);
  cam.addEventListener("onpointerup", onup as EventHandlerNonNull);
};
