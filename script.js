

$.getJSON("events.json", function (data) {
	    $.each(data.events, function (index, value) {
		           console.log(index);
		          console.log(value.data !== undefined);
		    	   if (value.size === "l"){
						var largeCard = `
						<div class="large-card">
          <div class="information-container">
            <div class="${value.icon}-icon"></div>
            <div class="large-card-heading">
              ${value.title}
            </div>
            <ul class="card-small-list">
              <li class="card-small-text-sensors">${value.source}</li>
              <li class="card-small-text-date">${value.time}</li>
            </ul>
            <div class="large-card-details">
              ${value.description}
            </div>
          </div>
          <div class="large-card-graph">
          </div>
        </div>`;
						$(".menu-container-grid").append(largeCard);
						
				   }else if (value.size === "s") { 
					  var smallCard = `
					   <div class="small-card">
        <div class="small-card-information">
            <div class="${value.icon}-icon"></div>
            <div class="small-card-title-container">
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
					   }else if (value.size === "m") {
						   if (value.data === null){
							   
							   }else if (value.data !== undefined){
						var mediumCard = `
						<div class="medium-card">
			   <div class="medium-card-information">
            <div class="${value.icon}-icon">
            </div>
            <div class="medium-card-title-container">


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
					}else if (value.data !== undefined) {
						console.log("EMPTY")
						}else if (value.data !== undefined){
							console.log("EMPTY")
							}
					   }
					   
		        });
});
