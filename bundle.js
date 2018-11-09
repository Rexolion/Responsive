(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SmartHouseActions_1 = require("./actions/SmartHouseActions");
document.getElementById("svodka").addEventListener("click", SmartHouseActions_1.SmartHouseButtonAction.transitionToCards);
document.getElementById("multimedia").addEventListener("click", SmartHouseActions_1.SmartHouseButtonAction.transtionToMultimedia);

},{"./actions/SmartHouseActions":2}],2:[function(require,module,exports){
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

},{"../dispatcher/SmartHouseDispatcher":8}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const peppa_1 = require("../pointerEvents/peppa");
const template_1 = require("./template");
function json(response) {
    return response.json();
}
function appendCards() {
    fetch("data/events.json")
        .then(json)
        .then((value) => {
        template_1.getCards(value);
    })
        .then(() => {
        peppa_1.initCriticalCam();
    })
        .catch((error) => {
        console.log("Json parsing is failed", error);
    });
}
exports.appendCards = appendCards;

},{"../pointerEvents/peppa":3,"./template":7}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MultimediaTemplate {
    getVideo() {
        return ` <div className="multimedia-menu-container">
                <div className="events-heading">
                    Видеонаблюдение
    </div>
                <div className="menu-container-grid">
                    <section className="stream">
                        <div className="stream__row">
                            <div className="stream__video__container">
                                <video id="video-1" className="stream__video" controls muted autoplay></video>
                                <a href="#popup-stream" className="stream__btn-expend">+</a>
                            </div>
                            <div className="stream__video__container">
                                <video id="video-2" className="stream__video" controls muted autoplay></video>
                                <a href="#popup-stream" className="stream__btn-expend">+</a>
                            </div>
                            <div className="stream__video__container">
                                <video id="video-3" className="stream__video" controls muted autoplay></video>
                                <a href="#popup-stream" className="stream__btn-expend">+</a>
                            </div>
                            <div className="stream__video__container">
                                <video id="video-4" className="stream__video" controls muted autoplay></video>
                                <a href="#popup-stream" className="stream__btn-expend">+</a>
                            </div>
                        </div>
                    </section>
                </div>
            </div>`;
    }
    getPopup() {
        return `<div className="popup" id="popup-stream">

                <div className="popup__container popup__container--stream">
                    <div className="stream__expanded">
                    </div>
                    <div className="popup__content">
                        <div className="stream__controls">
                            <div className="stream__controls__row">
                                <div className="popup__controls">
                                    <input id="input-contrast"
                                    type="range"
                                    min="1"
                                    max="200"
                                    value="100"
                                    className="popup__slider popup__slider--temperature"></input>
                                    </div>
                                    <div className="popup__controls">
                                        <input id="input-brightness"
                                        type="range"
                                        min="1"
                                        max="200"
                                        value="100"
                                        className="popup__slider popup__slider--light"></input>
                                    </div>
                                    </div>
                                    <div className="stream__volume">
                                        <canvas id="analyzer" width="30" height="150"></canvas>
                                    </div>

                                </div>
                            </div>
                            <div className="popup__buttons--container">
                                <div className="popup__buttons--content">

                                    <a href="#" className="btn" id="close-btn">
                                        <h3 className="heading--button">
                                            Закрыть
                    </h3>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>`;
    }
    appendMultimedia() {
        const grid = document.querySelector(".menu-container-grid");
        grid.insertAdjacentHTML("beforeend", this.getVideo());
        grid.insertAdjacentHTML("beforeend", this.getPopup());
    }
}
exports.MultimediaTemplate = MultimediaTemplate;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cards {
    getLargeCardCritical(value) {
        const largeCardCritical = `
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
        const largeCardGraph = `
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
        const smallCardStandart = `
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
        const mediumCardCritical = `
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
        const mediumCardSensor = `
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
        const mediumCardMusic = `
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
        const mediumCardFridge = `
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

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getCards_1 = require("./getCards");
const cards = new getCards_1.Cards();
function getCards(values) {
    values.events.forEach((value) => {
        const grid = document.querySelector(".menu-container-grid");
        if (!!grid) {
            if (value.size === "l") {
                if (value.type === "critical") {
                    grid.insertAdjacentHTML("beforeend", cards.getLargeCardCritical(value));
                }
                else {
                    grid.insertAdjacentHTML("beforeend", cards.getLargeCardGraph(value));
                }
            }
            else if (value.size === "s") {
                grid.insertAdjacentHTML("beforeend", cards.getSmallCardStandart(value));
            }
            else if (value.size === "m") {
                if (value.type === "critical") {
                    grid.insertAdjacentHTML("beforeend", cards.getMediumCardCritical(value));
                }
                else if (value.data !== undefined) {
                    if (value.source === "Сенсор микроклимата") {
                        grid.insertAdjacentHTML("beforeend", cards.getMediumCardSensor(value));
                    }
                    else if (value.source === "Яндекс.Станция") {
                        grid.insertAdjacentHTML("beforeend", cards.getMediumCardMusic(value));
                    }
                    else if (value.source === "Холодильник") {
                        grid.insertAdjacentHTML("beforeend", cards.getMediumCardFridge(value));
                    }
                }
            }
        }
    });
}
exports.getCards = getCards;

},{"./getCards":6}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SmartHouseStore_1 = require("../stores/SmartHouseStore");
const fluxi_1 = require("../utils/fluxi/fluxi");
const SmartHouseDispatcher = new fluxi_1.Dispatcher();
const store = new SmartHouseStore_1.SmartHouseStore();
SmartHouseDispatcher.addListener("SMARTHOUSE_CARDS_TRANSITION", (action) => {
    store.addEventHandler(action.text);
    store.getCards();
    store.emitChange();
});
SmartHouseDispatcher.addListener("SMARTHOUSE_MULTIMEDIA_TRANSITION", (action) => {
    store.addEventHandler(action.text);
    store.getMultimedia();
    store.emitChange();
});
exports.default = SmartHouseDispatcher;

},{"../stores/SmartHouseStore":9,"../utils/fluxi/fluxi":10}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fluxiStore_1 = require("../utils/fluxi/fluxiStore");
const appendCards_1 = require("../components/template/appendCards");
const appendMultimedia_1 = require("../components/template/appendMultimedia");
const multimedia = new appendMultimedia_1.MultimediaTemplate();
class SmartHouseStore extends fluxiStore_1.Store {
    getCards() {
        appendCards_1.appendCards();
    }
    getMultimedia() {
        multimedia.appendMultimedia();
    }
}
exports.SmartHouseStore = SmartHouseStore;

},{"../components/template/appendCards":4,"../components/template/appendMultimedia":5,"../utils/fluxi/fluxiStore":11}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Dispatcher {
    constructor() {
        this.events = {};
    }
    addListener(event, callback) {
        // Check and push event to listeners array
        if (this.events[event] === undefined) {
            this.events[event] = {
                listeners: [],
            };
        }
        this.events[event].listeners.push(callback);
    }
    removeListener(event, callback) {
        // Check for existing
        if (this.events[event] === undefined) {
            throw Error;
        }
        this.events[event].listeners = this.events[event].listeners.filter((listener) => {
            return listener.toString() !== callback.toString();
        });
    }
    dispatch(event, data) {
        if (this.events[event] === undefined) {
            throw Error;
        }
        this.events[event].listeners.forEach((listener) => {
            listener(data);
        });
    }
}
exports.Dispatcher = Dispatcher;

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class Store extends events_1.EventEmitter {
    constructor() {
        super();
        this.getData = () => {
            return this.items;
        };
        this.addEventHandler = (text) => {
            this.items.push(text);
        };
        this.emitChange = () => {
            this.emit("change");
        };
        this.addChangeListener = (callback) => {
            this.on("change", callback);
        };
        this.removeChangeListener = (callback) => {
            this.removeListener("change", callback);
        };
        this.items = [];
    }
}
exports.Store = Store;

},{"events":12}],12:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var objectCreate = Object.create || objectCreatePolyfill
var objectKeys = Object.keys || objectKeysPolyfill
var bind = Function.prototype.bind || functionBindPolyfill

function EventEmitter() {
  if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
    this._events = objectCreate(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

var hasDefineProperty;
try {
  var o = {};
  if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });
  hasDefineProperty = o.x === 0;
} catch (err) { hasDefineProperty = false }
if (hasDefineProperty) {
  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      // check whether the input is a positive number (whose value is zero or
      // greater and not a NaN).
      if (typeof arg !== 'number' || arg < 0 || arg !== arg)
        throw new TypeError('"defaultMaxListeners" must be a positive number');
      defaultMaxListeners = arg;
    }
  });
} else {
  EventEmitter.defaultMaxListeners = defaultMaxListeners;
}

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    if (arguments.length > 1)
      er = arguments[1];
    if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Unhandled "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
      // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
      // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = objectCreate(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
          listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
          prepend ? [listener, existing] : [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
            existing.length + ' "' + String(type) + '" listeners ' +
            'added. Use emitter.setMaxListeners() to ' +
            'increase limit.');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        if (typeof console === 'object' && console.warn) {
          console.warn('%s: %s', w.name, w.message);
        }
      }
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    switch (arguments.length) {
      case 0:
        return this.listener.call(this.target);
      case 1:
        return this.listener.call(this.target, arguments[0]);
      case 2:
        return this.listener.call(this.target, arguments[0], arguments[1]);
      case 3:
        return this.listener.call(this.target, arguments[0], arguments[1],
            arguments[2]);
      default:
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i)
          args[i] = arguments[i];
        this.listener.apply(this.target, args);
    }
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = bind.call(onceWrapper, state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = objectCreate(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else
          spliceOne(list, position);

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = objectCreate(null);
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = objectCreate(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = objectKeys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = objectCreate(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (!events)
    return [];

  var evlistener = events[type];
  if (!evlistener)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function objectCreatePolyfill(proto) {
  var F = function() {};
  F.prototype = proto;
  return new F;
}
function objectKeysPolyfill(obj) {
  var keys = [];
  for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {
    keys.push(k);
  }
  return k;
}
function functionBindPolyfill(context) {
  var fn = this;
  return function () {
    return fn.apply(context, arguments);
  };
}

},{}]},{},[1]);
