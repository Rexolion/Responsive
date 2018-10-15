import {resetCanvas, Analyze} from "./analyzer.js";

class ExpandedCamera {
	constructor(video, properties, streamSelectors, canvas) {

		this._video = video;
		this._properties = properties;
		this._canvas = canvas;
		this._streamSelectors = streamSelectors;

		//web audio api analyzer
		this._analyzer = new Analyze(this._video.element);

		this._eventsHandling();
		this._expand();
		this._analyzer.draw();
	}

	//setting events listeners
	_eventsHandling() {
		this._streamSelectors.closeBtn.addEventListener("click", this._close.bind(this));
		this._properties.brightness.addEventListener("change", () => this._updateView());
		this._properties.contrast.addEventListener("change", () => this._updateView());
	}

	//set filters for video
	_updateView() {
		this._video.element.style.filter = `brightness(${this._properties.brightness.value}%) contrast(${this._properties.contrast.value}%)`;
	}

	//delete filters from video and set input ranges to initial values
	_resetView() {
		this._video.element.style.filter = "";
		this._properties.brightness.value = 100;
		this._properties.contrast.value = 100;
		resetCanvas();
	}

	//delete video from parent node and add to popup node
	_expand() {
		this._streamSelectors.videoContainers[this._video.id].removeChild(this._video.element);
		this._streamSelectors.streamContainer.appendChild(this._video.element);
		
		this._animateVideo();
		this._video.element.muted = false;
		this._video.element.controls = true;
		this._video.element.play();
	}

	//animation of expanding
	_animateVideo() {
		const streamBoundingRect = this._streamSelectors.streamContainer.getBoundingClientRect();

		this._streamSelectors.streamContainer.animate([
			{ // from
				width: `${this._video.boundingClientRect.width}px`,
				height: `${this._video.boundingClientRect.height}px`,
				top: `${this._video.boundingClientRect.top}px`,
				left: `${this._video.boundingClientRect.left}px`,
			},
			{ // to
				width: `${streamBoundingRect.width}px`,
				height: `${streamBoundingRect.height}px`,
				top: `${streamBoundingRect.top}px`,
				left: `${streamBoundingRect.left}px`,
			},
		], 200);
	}

	//delete video from popup and add to previous parent element then delete this class instance
	_close() {
		this._resetView();
		this._streamSelectors.closeBtn.removeEventListener("click", this._close.bind(this));
		this._streamSelectors.videoContainers[this._video.id].appendChild(this._video.element);
		if (this._streamSelectors.streamContainer.children.length) this._streamSelectors.streamContainer.removeChild(this._streamSelectors.streamContainer.children[0]);
		
		this._analyzer.isDrawing = false;
		this._video.element.muted = true;
		this._video.element.controls = false;
		this._video.element.play();
		delete this;
	}
}

export {ExpandedCamera};