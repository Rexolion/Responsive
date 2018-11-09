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
