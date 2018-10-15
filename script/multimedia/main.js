import {ExpandedCamera} from "./ExpandedCamera.js";
import {CANVAS} from "./Analyse.js";

const CONTROLS = {
	brightness: document.querySelector("#input-brightness"),
	contrast: document.querySelector("#input-contrast"),

};
const STREAMSELECTORS = {
	closeBtn: document.querySelector("#close-btn"),
	streamContainer: document.querySelector(".stream__expanded"),
	videoContainers: document.querySelectorAll(".stream__video__container"),
};

//class for holding videos info
class streamControl {
	constructor(videoSelector) {
	
		this._videoList = [];

		//get videos from html
		document.querySelectorAll(videoSelector).forEach((video, num) => {
			const expandBtn = document.querySelectorAll(".stream__btn-expand")[num];
			this._videoList.push({
				id: num,
				element: document.querySelector(`#video-${num + 1}`),
				expandBtn,
			});
		});

		//saving additional info && adding click event to expand
		this._videoList.forEach((videoItem) => {
			videoItem.boundingClientRect = videoItem.element.getBoundingClientRect();
			videoItem.expandBtn.addEventListener("click", this._expandVideo.bind(videoItem));
		});
	}

	// init video opening
	_expandVideo() {
		this._expandedCamera = new ExpandedCamera(this, CONTROLS,streamSELECTORS, CANVAS);
	}
}

let streamControlSystem = new streamControl(".stream__video");
