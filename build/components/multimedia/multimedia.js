"use strict";
const initCamObserv = () => {
    let activeVideoBrightness = 100;
    let activeVideoContrast = 100;
    const onup = () => {
        document.removeEventListener("pointermove", setBrightness);
        document.removeEventListener("pointermove", setContrast);
    };
    // Positioning
    const toPos = (cam, x, y) => {
        if (x === undefined)
            x = cam.getBoundingClientRect().left;
        if (y === undefined)
            y = cam.getBoundingClientRect().top;
        cam.style.top = -y + "px";
        cam.style.left = -x + "px";
    };
    // Zoom video
    function zoom(ev) {
        const bg = document.querySelector("html");
        const controls = (document.querySelector(".video-controls"));
        const cam = ev.target;
        if (cam.parentNode) {
            const analyserPar = cam.parentNode;
            const analyser = (analyserPar.querySelector(".analyser"));
            // Click on active video
            if (cam.classList.contains("video_active")) {
                controls.classList.remove("video-controls_active");
                analyser.classList.remove("analyser_active");
                cam.style.width = "100%";
                cam.style.height = "300px";
                toPos(cam, 0, 0);
                setTimeout(() => {
                    cam.classList.remove("video_active");
                    bg.style.overflow = "scroll";
                }, 500);
            }
            else {
                // set controlls
                if (cam.style.filter === "") {
                    setControls("100", "100");
                }
                else if (cam.style.filter) {
                    const filterVal = cam.style.filter;
                    const regBr = /brightness\(([^)]+)%\)/;
                    const regCn = /contrast\(([^)]+)%\)/;
                    let bra;
                    let cnn;
                    bra = regBr.exec(filterVal);
                    cnn = regCn.exec(filterVal);
                    if (bra && cnn)
                        setControls(bra[1], cnn[1]);
                }
                bg.style.overflow = "hidden";
                controls.classList.add("video-controls_active");
                cam.classList.add("video_active");
                analyser.classList.add("analyser_active");
                cam.style.width = window.innerWidth + "px";
                cam.style.height = window.innerHeight + "px";
                toPos(cam);
            }
        }
    }
    // Set filter
    const setFilter = () => {
        const activeVideo = (document.querySelector(".video_active"));
        activeVideo.style.filter =
            "brightness(" +
                activeVideoBrightness +
                "%) contrast(" +
                activeVideoContrast +
                "%)";
    };
    const setControls = (b, c) => {
        const brInput = (document.querySelector(".popup__slider--light"));
        const conInput = (document.querySelector(".popup__slider--temperature"));
        brInput.value = b;
        conInput.value = c;
    };
    // Brightness
    const setBrightness = (ev) => {
        const br = ev.target;
        activeVideoBrightness = parseInt(br.value, 10);
        setFilter();
    };
    // Contrast
    const setContrast = (ev) => {
        const cn = ev.target;
        activeVideoContrast = parseInt(cn.value, 10);
        setFilter();
    };
    // Set brightness and contrast
    const videoSet = (ev) => {
        const control = ev.target;
        if (control.classList.contains("popup__slider--light"))
            document.addEventListener("pointermove", setBrightness);
        if (control.classList.contains("popup__slider--temperature "))
            document.addEventListener("pointermove", setContrast);
    };
    // Increase / decrease volume
    const toggleVolume = (ev) => {
        const mt = ev.target;
        if (mt.dataset.video) {
            const mtId = mt.dataset.video;
            const video = (document.getElementById(mtId));
            video.muted = !video.muted;
            mt.classList.toggle("video-volume_unmuted");
        }
    };
    // Analyzer
    const analyse = (cam) => {
        const context = new AudioContext();
        const source = context.createMediaElementSource(cam);
        const analyser = context.createAnalyser();
        analyser.smoothingTimeConstant = 0.1;
        analyser.fftSize = 32;
        const analyserBuffer = analyser.frequencyBinCount;
        const bands = new Uint8Array(analyserBuffer);
        setInterval(() => {
            analyser.getByteFrequencyData(bands);
            let v = 0;
            v = bands.reduce((a, b) => (a > b ? a : b), 0);
            if (cam.parentNode) {
                const analyserPar = cam.parentNode;
                const analyserBlock = (analyserPar.querySelector(".analyser"));
                analyserBlock.style.height = v + "px";
            }
        }, 100);
        source.connect(analyser);
        analyser.connect(context.destination);
    };
    const camsMas = document.getElementsByClassName("video");
    const cams = Array.prototype.slice.call(camsMas);
    cams.forEach((cam) => {
        cam.addEventListener("pointerdown", x => {
            zoom(x);
        });
        analyse(cam);
    });
    const controlInputs = [
        ...document.getElementsByClassName("video-control")
    ];
    controlInputs.forEach((control) => {
        control.addEventListener("pointerdown", x => {
            videoSet(x);
        });
    });
    const volumeControls = [
        ...document.getElementsByClassName("video-volume")
    ];
    volumeControls.forEach((control) => {
        control.addEventListener("pointerdown", x => {
            toggleVolume(x);
        });
    });
    document.addEventListener("pointerup", onup);
};
initCamObserv();