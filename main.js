      let dataIndex = 0



			function willBaseTextChange(direction) {
        console.log(dataIndex)
				if (dataIndex === 0 && direction == "back") {
					return false
				}

				const div1 = document.createElement("div");
				div1.innerHTML = data[dataIndex];
				const text1 = div1.textContent || div1.innerText || "";

				const div2 = document.createElement("div");
				div2.innerHTML = direction = "fwd" ? data[dataIndex+1] : data[dataIndex-1];
				const text2 = div2.textContent || div2.innerText || "";

				return (text1.replace(/\s/g,'') !== text2.replace(/\s/g,''))

			}

			function changeSlideContent() {
				document.querySelector(".panel").innerHTML = data[dataIndex]
				document.querySelector("#hiddenMeasure").innerHTML = data[dataIndex]
				document.querySelector("aside").innerHTML = data2[dataIndex]
			}

      function checkChangeText(direction) {
        console.log(dataIndex)
        if (willBaseTextChange()) {
          const el = document.querySelector(".panel")
        					el.classList.add('animate__animated', 'animate__fadeOut');
				          const zoomContainer = document.getElementById('zoomContainer')

        					el.addEventListener('animationend', () => {
				          zoomContainer.style.transition = `all 1ms`;
				            zoomContainer.style.transform = `scale(1)`;
                    zoomContainer.style.marginTop = 0;
                    animate(direction)
        						el.classList.remove('animate__fadeOut', 'animate__animated', 'animate__fadeIn')
        						el.classList.add('animate__animated', 'animate__fadeIn');
        						// el.classList.remove('animate__animated', 'animate__zoomIn');

        					}, { once: true });

        				}

else {
                    animate(direction)

}



      }


      function animate(direction) {
        const panelWidth = document.querySelector("#contentContainer").offsetWidth
        // document.querySelector(".panel").style.width = `${panelWidth}px`
        // document.querySelector("#hiddenMeasure").style.width = `${panelWidth}px`
        //


				if (direction === "fwd") {
        	dataIndex++
          gtag("event", "select_content", {
            content_type: "slide",
            content_id: dataIndex
          });
          gtag("event", "advance_content");
				}
				else if (direction === "back") {
        	dataIndex--
          gtag("event", "previous_content");

				}

        if (dataIndex < 0) {
          dataIndex = 0;
        }

        if (dataIndex >= data.length) {
          dataIndex = data.length - 1;
        }


				const zoomContainer = document.getElementById('zoomContainer')
				const el = document.querySelector(".panel")
				const hm = document.querySelector("#hiddenMeasure")
				const el2 = document.querySelector("aside")

				if (direction) {changeSlideContent()}

				const contentContainer = document.querySelector("#contentContainer")

				const zoomContainerBbox = zoomContainer.getBoundingClientRect()
				const containerBbox = contentContainer.getBoundingClientRect()
				const panelBox = el.getBoundingClientRect()
				const contentBbox = hm.getBoundingClientRect()
				const zoomBbox = el.querySelector(".zoom").getBoundingClientRect()
				const hmZoomBbox = hm.querySelector(".zoom").getBoundingClientRect()

				// console.log("contentContainer", containerBbox)
				// console.log("zoomContainerBbox", zoomContainerBbox)
				// console.log("panelBox", panelBox)
				// console.log("zoomBbox", zoomBbox)
				// console.log("contentBbox", contentBbox)
				// console.log("hmZoomBbox", hmZoomBbox)




				const zw = (containerBbox.width/hmZoomBbox.width)
				const zh = (containerBbox.height/hmZoomBbox.height)

        const paddingMultiplyer = 0.8
				const zoom = zh < zw ? zh : zw * paddingMultiplyer
				// const zoom = zh < zw ? zh : zw

				console.log("zoom", zoom)

				zoomContainer.style.transition = `all 2s ease-in-out`;
				// zoomContainer.style.transition = `all ${willBaseTextChange() ? '500ms' : '2s'} ease-in-out`;

        zoomContainer.style.marginTop = `${contentBbox.top-hmZoomBbox.top*zoom}px`


				zoomContainer.style.transformOrigin = `50% 0px 0px`;
				zoomContainer.style.transform = `scale(${zoom})`;

        setTimeout(() => {
				  console.log("zoomBbox", zoomBbox)
				  console.log("panelBox", panelBox)
        }, 2500);



      }
