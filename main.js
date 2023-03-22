			// const panzoom = Panzoom(zoomContainer, {
			//   maxScale: 15,
			// 	cursor: 'default'
			// })

      let dataIndex = 0



			function willBaseTextChange() {
				if (dataIndex === 0) {
					return false
				}

				const div1 = document.createElement("div");
				div1.innerHTML = data[dataIndex];
				const text1 = div1.textContent || div1.innerText || "";

				const div2 = document.createElement("div");
				div2.innerHTML = data[dataIndex-1];
				const text2 = div2.textContent || div2.innerText || "";

				return (text1 !== text2)

			}

			function changeSlideContent() {
				document.querySelector(".panel").innerHTML = data[dataIndex]
				document.querySelector("#hiddenMeasure").innerHTML = data[dataIndex]
				document.querySelector("aside").innerHTML = data2[dataIndex]
			}


      function animate(direction) {
				if (direction === "fwd") {
        	dataIndex++
				}
				else if (direction === "back") {
        	dataIndex--
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

				console.log("contentContainer", containerBbox)
				console.log("zoomContainerBbox", zoomContainerBbox)
				console.log("panelBox", panelBox)
				console.log("zoomBbox", zoomBbox)
				console.log("contentBbox", contentBbox)
				console.log("hmZoomBbox", hmZoomBbox)




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


// if (willBaseTextChange()) {
				// 	el.classList.add('animate__animated', 'animate__zoomOut');
				//
				// 	el.addEventListener('animationend', () => {
				// 		el.classList.remove('animate__zoomOut', 'animate__animated', 'animate__zoomIn')
				// 		el.classList.add('animate__animated', 'animate__zoomIn');
				// 		panzoom.zoom(zoom, { animate: true, roundPixels: true })
				// 		el.classList.remove('animate__animated', 'animate__zoomIn');
				//
				// 	}, { once: true });
				//
				// }
				//

      }
