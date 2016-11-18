
function loadComplete(){
	//alert("debug1");

	var floor = document.getElementById("floor");
	var room = document.getElementById("room");
	var seat = document.getElementById("seat");
	var startTime = document.getElementById("startTime");
	chrome.storage.local.get(null,function(items){
		//alert(items.floor);
		floor.value = items.floor;
		room.value = items.room;
		seat.value = items.seat;
		startTime.value = items.startTime;
		
	});

	document.getElementById("saveCfg").addEventListener('click',function(){
		//alert("debug");
//		alert(document.getElementById("method").value);


		chrome.storage.local.set(
			{"floor":floor.value,
			"room":room.value,
			"seat":seat.value,
			"startTime":startTime.value},
			function(){
			//alert("ddddddd");
		});
	});
}
window.addEventListener('load',loadComplete);