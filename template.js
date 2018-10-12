$.getJSON("events.json", function(data) {
      $.each(data.events, function(index, value) {

          if (value.size === "l") {
            if (value.type === "critical") {
              var largeCard = `
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
				<img class="large-card-image" src="assets2/bitmap.jpg" alt="${value.title}"></img>
				<div class="large-card-onlitouch-line">
          <div class="large-card-zoom"><span>Приближение:</span><span class="large-card-zoom-value">100%</span></div>
          <div class="large-card-light"><span>Яркость:</span> <span class="large-card-light-value">100%</span></div>
			</div>
			</div>
		</div>
	</div>
						   `;
              $(".menu-container-grid").append(largeCard);

					}else {
                var largeCard = `
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
                $(".menu-container-grid").append(largeCard);
              }
            } else if (value.size === "s") {
              var smallCard = `
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
              $(".menu-container-grid").append(smallCard);
            } else if (value.size === "m") {
              if (value.type === "critical") {
								var mediumCard = `
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
								<img src="assets2/cross-white.svg" class="card-hovered-icon card-hovered-icon-close">
								<img src="assets2/Next.svg" class="card-hovered-icon  card-next-icon-next">
							</div>
						</div>
					</div>
					`;
								$(".menu-container-grid").append(mediumCard);
              } else if (value.data !== undefined) {
                if (value.source === "Сенсор микроклимата") {
                  var mediumCard = `
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
                  $(".menu-container-grid").append(mediumCard);
							}else if (value.source === "Яндекс.Станция") {
                  var mediumCard = `
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
					<input type="range" min="1" max="100" value="50" class="medium-card-music-slider" id="myRange">
										</div>
					<div class="medium-card-music-buttons">
						<div class="medium-card-music-controlls">
						<a href="" class="prev-icon"></a>
						<a href="" class="next-icon"></a>
						</div>
						<div class="medium-card-volume-slider-container">
						<input type="range" min="1" max="100" value="50" class="medium-card-volume-slider" id="myRange">
					</div>
				</div>

						`;
                  $(".menu-container-grid").append(mediumCard);
                } else if (value.source === "Холодильник") {
                  var mediumCard = `
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
                  $(".menu-container-grid").append(mediumCard);
                }

              }
            }

          });
      });
