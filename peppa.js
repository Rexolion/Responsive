window.onload = function() {

    let eventCache = new Array();
    let cardImage = document.querySelector(".large-card-image");
    let zoomContext = document.querySelector(".large-card-zoom-value");
    let brightContext = document.querySelector(".large-card-light-value");
    let startPosY, startPosX, startBackX, startBackY, prevAngle;
    let prevDiff = 0;
    let filter = 100;
    let backgroundSizeValue = 100;
    cardImage.style.backgroundPosition = "0px 0px";
    cardImage.style.backgroundSize = "100%";
    cardImage.style.filter = "brightness(100%)";


    const diff = (num1, num2) => {
        if (num1 > num2) {
            return (num1 - num2);
        } else {
            return (num2 - num1);
        }
    }

    const dist = (x1, y1, x2, y2) => {
        var deltaX = diff(x1, x2);
        var deltaY = diff(y1, y2);
        var dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
        return (dist);
    }



    const ondown = (ev) => {

        eventCache.push(ev);
        startPosX = ev.clientX;
        startPosY = ev.clientY;
        startBackX = parseInt((cardImage.style.backgroundPositionX), 10);
        startBackY = parseInt(cardImage.style.backgroundPositionY, 10);
        if (eventCache.length == 2) {
            prevAngle = Math.atan2(eventCache[1].clientY - eventCache[0].clientY, eventCache[1].clientX - eventCache[0].clientX) * (180 / Math.PI);
        }


        cardImage.addEventListener("pointermove", onmove);
    }

    const onmove = (ev) => {

        // Write touch to cache
        for (let i = 0; i < eventCache.length; i++) {
            if (ev.pointerId == eventCache[i].pointerId) {
                eventCache[i] = ev;
                break;
            }
        }


        // If one touch
        if (eventCache.length == 1) {
            cardImage.style.backgroundPosition = (startBackX + ev.clientX - startPosX) + "px " + (startBackY + ev.clientY - startPosY) + "px";
            console.log("One touch");
        }

        // If two touches
        if (eventCache.length == 2) {
          console.log("Multiple touches")
            // рассчет дистанции между двумя пальцами
            let diff = dist(eventCache[0].clientX, eventCache[0].clientY, eventCache[1].clientX, eventCache[1].clientY)
            if (diff > prevDiff) {
                backgroundSizeValue = backgroundSizeValue + 1;
                cardImage.style.backgroundSize = backgroundSizeValue + "%";
                prevDiff = diff;

            } else {
                backgroundSizeValue = backgroundSizeValue - 1;
                cardImage.style.backgroundSize = backgroundSizeValue + "%";
                prevDiff = diff;
            }

            zoomContext.textContent = backgroundSizeValue;

            let angle = Math.atan2(eventCache[1].clientY - eventCache[0].clientY, eventCache[1].clientX - eventCache[0].clientX) * (180 / Math.PI);

            if (angle > prevAngle) {
                filter = filter + 2;
                cardImage.style.filter = "brightness(" + filter + "%)";
                prevAngle = angle;

            } else {
                filter = filter - 2;
                cardImage.style.filter = "brightness(" + filter + "%)";
                prevAngle = angle;
            }

            brightContext.textContent = filter;

        }
    }


    const onup = (ev) => {
        cardImage.removeEventListener("pointermove", onmove)
        remove_event(ev);
    }

    const remove_event = (ev) => {
        for (var i = 0; i < eventCache.length; i++) {
            if (eventCache[i].pointerId == ev.pointerId) {
                eventCache.splice(i, 1);
                break;
            }
        }
    }


    cardImage.addEventListener("pointerdown", ondown);
    document.addEventListener("pointerup", onup);
    cardImage.addEventListener("onpointerup", onup);
};
