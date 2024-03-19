(()=>{

	let yOffset = 0;  // window.pageYOffset 대신 쓸 변수 
	let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
	let currentScene = 0; // 현재 활성화 된 (눈 앞에 보고있는 )씬 
	const sceneInfo = [
		{
			//0
			heigthNum : 5,
			scrollHeight: 0,
			type: 'sticky',
			obj: {
				container : document.querySelector("#scroll-section-0")
			}

		},
		{
			//1
			type: 'nomal',
			heigthNum : 5,
			scrollHeight: 0,
			obj: {
				container : document.querySelector("#scroll-section-1")
			}
			
		},
		{
			//2
			type: 'sticky',
			heigthNum : 5,
			scrollHeight: 0,
			obj: {
				container : document.querySelector("#scroll-section-2")
			}


		},
		{
			//3
			type: 'sticky',
			heigthNum : 5,
			scrollHeight: 0,
			obj: {
				container : document.querySelector("#scroll-section-3")
			}
		}
	]

	
	function setLayout(){
		//각 스크롤 섹션의 높이 세팅 
		for(let i = 0 ; i< sceneInfo.length ; i++){
			sceneInfo[i].scrollHeight = sceneInfo[i].heigthNum * window.innerHeight;
			sceneInfo[i].obj.container.style.height = `${sceneInfo[i].scrollHeight}px`

		}
		let totalScrollHeight = 0;
		for(let i = 0 ; i< sceneInfo.length ; i++){
			totalScrollHeight+= sceneInfo[i].scrollHeight
			if(totalScrollHeight >= pageYOffset){
				currentScene = i
				break;
			}
		}
		document.body.setAttribute('id',`show-scene-${currentScene}`)
	}

	function scrollLoop(){
		prevScrollHeight = 0
		for(let i = 0 ; i< currentScene; i++){
			prevScrollHeight += sceneInfo[currentScene].scrollHeight;
		}
		if(yOffset > prevScrollHeight+ sceneInfo[currentScene].scrollHeight){
			 currentScene++
			 document.body.setAttribute('id',`show-scene-${currentScene}`)
			
		}
		if(yOffset < prevScrollHeight){
			if(currentScene === 0) return;
			currentScene--
			document.body.setAttribute('id',`show-scene-${currentScene}`)
		}
		
	}


	window.addEventListener('resize', setLayout);
	window.addEventListener('load', setLayout);
	window.addEventListener('scroll', ()=>{
		yOffset = window.pageYOffset; 
		scrollLoop();

	})
	setLayout()




})();