
const initCamObserv = () => {
  let activeVideoBrightness = 100;
  let activeVideoContrast = 100;

  const onup = () => {
    document.removeEventListener("pointermove", setBrightness);
    document.removeEventListener("pointermove", setContrast);
  };
  // Positioning
  const toPos = (cam: HTMLVideoElement, x?: number, y?: number): void => {
    if (x === undefined) { x = cam.getBoundingClientRect().left; }
    if (y === undefined) { y = cam.getBoundingClientRect().top; }
    cam.style.top = -y + "px";
    cam.style.left = -x + "px";
  };
  // Zoom video
  function zoom(ev: PointerEvent) {
    const bg: HTMLElement = document.querySelector("html") as HTMLElement;

    const controls: HTMLElement = (
      document.querySelector(".video-controls")
    ) as HTMLElement;
    const cam: HTMLVideoElement = ev.target as HTMLVideoElement;
    if (cam.parentNode) {
      const analyserPar: HTMLElement = cam.parentNode as HTMLElement;
      const analyser: HTMLElement = (
        analyserPar.querySelector(".analyser")
      ) as HTMLElement;
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
      } else {
        // set controlls
        if (cam.style.filter === "") {
          setControls("100", "100");
        } else if (cam.style.filter) {
          const filterVal: string = cam.style.filter;
          const regBr = /brightness\(([^)]+)%\)/;
          const regCn = /contrast\(([^)]+)%\)/;
          let bra: RegExpExecArray | null;
          let cnn: RegExpExecArray | null;
          bra = regBr.exec(filterVal);
          cnn = regCn.exec(filterVal);
          if (bra && cnn) { setControls(bra[1], cnn[1]); }
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
  const setFilter = (): void => {
    const activeVideo: HTMLVideoElement = (
      document.querySelector(".video_active")
    ) as HTMLVideoElement;
    activeVideo.style.filter =
      "brightness(" +
      activeVideoBrightness +
      "%) contrast(" +
      activeVideoContrast +
      "%)";
  };
  const setControls = (b: string, c: string): void => {
    const brInput: HTMLInputElement = (
      document.querySelector(".popup__slider--light")
    ) as HTMLInputElement;
    const conInput: HTMLInputElement = (
      document.querySelector(".popup__slider--temperature")
    ) as HTMLInputElement;
    brInput.value = b;
    conInput.value = c;
  };
  // Brightness
  const setBrightness = (ev: PointerEvent): void => {
    const br: HTMLInputElement = ev.target as HTMLInputElement;
    activeVideoBrightness = parseInt(br.value, 10);
    setFilter();
  };
  // Contrast
  const setContrast = (ev: PointerEvent): void => {
    const cn: HTMLInputElement = ev.target as HTMLInputElement;
    activeVideoContrast = parseInt(cn.value, 10);
    setFilter();
  };
  // Set brightness and contrast
  const videoSet = (ev: PointerEvent): void => {
    const control: HTMLInputElement = ev.target as HTMLInputElement;
    if (control.classList.contains("popup__slider--light")) {
      document.addEventListener("pointermove", setBrightness);
    }
    if (control.classList.contains("popup__slider--temperature ")) {
      document.addEventListener("pointermove", setContrast);
    }
  };
  // Increase / decrease volume
  const toggleVolume = (ev: PointerEvent): void => {
    const mt: HTMLElement = ev.target as HTMLElement;
    if (mt.dataset.video) {
      const mtId: string = mt.dataset.video;
      const video: HTMLVideoElement = (
        document.getElementById(mtId)
      ) as HTMLVideoElement;
      video.muted = !video.muted;
      mt.classList.toggle("video-volume_unmuted");
    }
  };
  // Analyzer

  const analyse = (cam: HTMLVideoElement): void => {
    const context: AudioContext = new AudioContext();
    const source = context.createMediaElementSource(cam);
    const analyser = context.createAnalyser();
    analyser.smoothingTimeConstant = 0.1;
    analyser.fftSize = 32;
    const analyserBuffer = analyser.frequencyBinCount;
    const bands: Uint8Array = new Uint8Array(analyserBuffer);
    setInterval(() => {
      analyser.getByteFrequencyData(bands);
      let v = 0;
      v = bands.reduce((a: number, b: number): number => (a > b ? a : b), 0);
      if (cam.parentNode) {
        const analyserPar: HTMLElement = cam.parentNode as HTMLElement;
        const analyserBlock: HTMLElement = (
          analyserPar.querySelector(".analyser")
        ) as HTMLElement;
        analyserBlock.style.height = v + "px";
      }
    }, 100);
    source.connect(analyser);
    analyser.connect(context.destination);
  };

  const camsMas = document.getElementsByClassName("video");
  const cams: Element[] = Array.prototype.slice.call(camsMas);

  cams.forEach(
    (cam: Element): void => {
      cam.addEventListener("pointerdown", (x) => {
        zoom(x as PointerEvent);
      });
      analyse(cam as HTMLVideoElement);
    },
  );

  const controlInputs: Element[] = [
    ...document.getElementsByClassName("video-control"),
  ];
  controlInputs.forEach((control: Element) => {
    control.addEventListener("pointerdown", (x) => {
      videoSet(x as PointerEvent);
    });
  });
  const volumeControls: Element[] = [
    ...document.getElementsByClassName("video-volume"),
  ];
  volumeControls.forEach((control: Element) => {
    control.addEventListener("pointerdown", (x) => {
      toggleVolume(x as PointerEvent);
    });
  });
  document.addEventListener("pointerup", onup);
};
initCamObserv();
