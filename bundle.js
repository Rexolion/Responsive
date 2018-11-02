(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = require("./template/template");
const peppa_1 = require("./pointerEvents/peppa");
function json(response) {
    return response.json();
}
fetch('data/events.json')
    .then(json)
    .then(value => {
    template_1.getCards(value);
})
    .then(() => {
    peppa_1.initCriticalCam();
})
    .catch((error) => {
    console.log('Json parsing is failed', error);
});

},{"./pointerEvents/peppa":2,"./template/template":4}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCriticalCam = () => {
    const evCache = new Array();
    const cam = document.querySelector('.large-card-image');
    let startPosY;
    let startPosX;
    let startBackX;
    let startBackY;
    let prevAngle;
    let prevDiff = 0;
    let filter = 100;
    let backSize = 100;
    cam.style.backgroundPosition = '0px 0px';
    cam.style.backgroundSize = '100%';
    cam.style.filter = 'brightness(100%)';
    const diff = (num1, num2) => num1 > num2 ? num1 - num2 : num2 - num1;
    const dist = (x1, y1, x2, y2) => {
        const deltaX = diff(x1, x2);
        const deltaY = diff(y1, y2);
        const distanse = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
        return (distanse);
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
            prevAngle = Math.atan2(evCache[1].clientY - evCache[0].clientY, evCache[1].clientX - evCache[0].clientX) * (180 / Math.PI);
        cam.addEventListener('pointermove', onmove);
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
            cam.style.backgroundPosition = (startBackX + ev.clientX - startPosX) + 'px ' + (startBackY + ev.clientY - startPosY) + 'px';
        // если два нажатия
        if (evCache.length === 2) {
            // рассчет дистанции между двумя пальцами
            const fingerDiff = dist(evCache[0].clientX, evCache[0].clientY, evCache[1].clientX, evCache[1].clientY);
            if (fingerDiff > prevDiff) {
                backSize = backSize + 1;
                cam.style.backgroundSize = backSize + '%';
                prevDiff = fingerDiff;
            }
            else {
                backSize = backSize - 1;
                cam.style.backgroundSize = backSize + '%';
                prevDiff = fingerDiff;
            }
            // zoomText.textContent = backSize;
            const angle = Math.atan2(evCache[1].clientY - evCache[0].clientY, evCache[1].clientX - evCache[0].clientX) * (180 / Math.PI);
            if (angle > prevAngle) {
                filter = filter + 2;
                cam.style.filter = 'brightness(' + filter + '%)';
                prevAngle = angle;
            }
            else {
                filter = filter - 2;
                cam.style.filter = 'brightness(' + filter + '%)';
                prevAngle = angle;
            }
            //  brightText.textContent = filter;
        }
    };
    const onup = (ev) => {
        cam.removeEventListener('pointermove', onmove);
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
    cam.addEventListener('pointerdown', ondown);
    document.addEventListener('pointerup', onup);
    cam.addEventListener('onpointerup', onup);
};

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cards {
    getLargeCardCritical(value) {
        let largeCardCritical = `
				<div class="large-card card-critical">
		<div class="critical-card-container">
			<div class="card-critical-block">
				<div class="card-title-line">
					<div class="${value.icon}-icon"></div>
					<div class="medium-card-critical-title">${value.title}</div>
				</div>
				<div class="card-small-list-critical">
					<div class="card-small-text-sensors">${value.source}</div>
					<div class="card-small-text-date">${value.time}</div>
				</div>
			</div>
			<div class="card-white-block">
        <div class="large-card-details">${value.description}</div>
        <div class="large-card-image-container">
        <img class="large-card-image" id="cam" src="/style/assets2/bitmap.jpg" alt="${value.title}"></img>
        </div>
			</div>
			</div>
		</div>
	</div>
    `;
        return largeCardCritical;
    }
    getLargeCardGraph(value) {
        let largeCardGraph = `
        <div class="large-card">
<div class="large-card-container">
<div class="card-title-line">
<div class="${value.icon}-icon"></div>
<div class="large-card-heading">
${value.title}
</div>
        </div>
<ul class="card-small-list">
<li class="card-small-text-sensors">${value.source}</li>
<li class="card-small-text-date">${value.time}</li>
</ul>
<div class="large-card-details">
${value.description}
</div>
<div class="large-card-graph">
</div>
</div>
</div>`;
        return largeCardGraph;
    }
    getSmallCardStandart(value) {
        let smallCardStandart = `
					   <div class="small-card">
        <div class="small-card-information">
            <div class="card-title-line">
						<div class="${value.icon}-icon"></div>
              <div class="small-card-title">
                ${value.title}
              </div>
            </div>
            <div class="small-card-details">
              ${value.source}
            </div>
            <ul class="small-card-cell-container">
              <li class="small-card-cell-date">
                ${value.time}
              </li>
              <li class="small-card-cell-arrow">
              </li>
            </ul>
          </div>
        </div>
        `;
        return smallCardStandart;
    }
    getMediumCardCritical(value) {
        let mediumCardCritical = `
								<div class="medium-card card-critical">
						<div class="critical-card-container">
							<div class="card-critical-block">
								<div class="card-title-line">
									<div class="${value.icon}-icon"></div>
									<div class="medium-card-critical-title">${value.title}</div>
								</div>
								<div class="medium-card-cell-container">
									<div class="medium-card-critical-sensors">${value.source}</div>
									<div class="medium-card-critical-cell-date">${value.time}</div>
								</div>
							</div>
							<div class="card-white-block">
								<div class="medium-card-details">${value.description}</div>
								<img src="/style/assets2/cross-white.svg" class="card-hovered-icon card-hovered-icon-close">
								<img src="/style/assets2/Next.svg" class="card-hovered-icon  card-next-icon-next">
							</div>
						</div>
					</div>
                    `;
        return mediumCardCritical;
    }
    getMediumCardSensor(value) {
        let mediumCardSensor = `
						<div class="medium-card">
			   <div class="medium-card-information">
            <div class="card-title-line">
						<div class="${value.icon}-icon"></div>
              <div class="medium-card-title">
				${value.title}
              </div>
            </div>
            <ul class="medium-card-cell-container">
              <li class="medium-card-cell-sensors">
                ${value.source}
              </li>
              <li class="medium-card-cell-date">
                ${value.time}
              </li>
            </ul>
            <div class="medium-card-details">
              ${value.description}
            </div>
            <ul class="medium-card-cell-container">
              <li class="medium-card-cell-temperature">
                Температура: <b>${value.data.temperature} C</b>
              </li>
              <li class="medium-card-cell-humidity">
                Влажность: <b>${value.data.humidity}%</b>
              </li>
            </ul>
          </div>
          </div>
                        `;
        return mediumCardSensor;
    }
    getMediumCardMusic(value) {
        let mediumCardMusic = `
						<div class="medium-card">
			   <div class="medium-card-information">
            <div class="card-title-line">
						<div class="${value.icon}-icon">
						</div>
              <div class="medium-card-title">
				${value.title}
              </div>
            </div>
            <ul class="medium-card-cell-container">
              <li class="medium-card-cell-sensors">
                ${value.source}
              </li>
              <li class="medium-card-cell-date">
                ${value.time}
              </li>
            </ul>
            <div class="medium-card-music-now-playing">
              ${value.description}
            </div>
            <div class="medium-card-music-information">
				<div class="medium-card-music-cover"></div>
				</div>
				<div class="medium-card-music-title-container">
					<div class="medium-card-music-title">
						${value.data.artist} ${value.data.track.name}
					</div>
					<input type="range" min="1" max="100" value="50" class="medium-card-music-slider">
										</div>
					<div class="medium-card-music-buttons">
						<div class="medium-card-music-controlls">
						<a href="" class="prev-icon"></a>
						<a href="" class="next-icon"></a>
						</div>
						<div class="medium-card-volume-slider-container">
						<input type="range" min="1" max="100" value="50" class="medium-card-volume-slider">
					</div>
				</div>

                        `;
        return mediumCardMusic;
    }
    getMediumCardFridge(value) {
        let mediumCardFridge = `
							<div class="medium-card">
			   <div class="medium-card-information">
            <div class="card-title-line">
						<div class="${value.icon}-icon"></div>
              <div class="medium-card-title">${value.title}</div>
            </div>
            <ul class="medium-card-cell-container">
              <li class="medium-card-cell-sensors">
                ${value.source}
              </li>
              <li class="medium-card-cell-date">
                ${value.time}
              </li>
            </ul>
            <div class="medium-card-details">
              ${value.description}
            </div>
            <div class="medium-card-buttons-container">

					<ul class="medium-card-buttons-list">
						<li class="medium-card-buttons-yes --selected">${value.data.buttons[0]}</li>
						<li class="medium-card-buttons-no">${value.data.buttons[1]}</li>
						</ul>

            </div>
          </div>
          </div>
          `;
        return mediumCardFridge;
    }
}
exports.Cards = Cards;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cards_1 = require("./cards");
const cards = new cards_1.Cards;
function getCards(value) {
    value.events.forEach(value => {
        const grid = document.querySelector('.menu-container-grid');
        if (!!grid) {
            if (value.size === "l") {
                if (value.type === "critical") {
                    grid.insertAdjacentHTML('beforeend', cards.getLargeCardCritical(value));
                }
                else {
                    grid.insertAdjacentHTML('beforeend', cards.getLargeCardGraph(value));
                }
            }
            else if (value.size === "s") {
                grid.insertAdjacentHTML('beforeend', cards.getSmallCardStandart(value));
            }
            else if (value.size === "m") {
                if (value.type === "critical") {
                    grid.insertAdjacentHTML('beforeend', cards.getMediumCardCritical(value));
                }
                else if (value.data !== undefined) {
                    if (value.source === "Сенсор микроклимата") {
                        grid.insertAdjacentHTML('beforeend', cards.getMediumCardSensor(value));
                    }
                    else if (value.source === "Яндекс.Станция") {
                        grid.insertAdjacentHTML('beforeend', cards.getMediumCardMusic(value));
                    }
                    else if (value.source === "Холодильник") {
                        grid.insertAdjacentHTML('beforeend', cards.getMediumCardFridge(value));
                    }
                }
            }
        }
    });
}
exports.getCards = getCards;

},{"./cards":3}]},{},[1]);
