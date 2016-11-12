
var date = new Date();
var loaded = true;
var intervalId1;
var intervalId2;
var intervalId3;
var intervalId4;

var timeOut10m;
var timeOut1m;
var intervalRefresh;

/**
* 选择选座方式
*
*/
function method(which){
		var event = document.createEvent('MouseEvent');  
		event.initEvent('click', false, false); 

		var map = document.getElementsByClassName("menu fl");
		var childUL = map[0].getElementsByTagName("ul");
		var lis = map[0].getElementsByTagName("li");
		var child;
		switch(which){
			case 0:child = lis[0].getElementsByTagName("a");break;//����ѡ��
			case 1:child = lis[1].getElementsByTagName("a");break;//����ѡ��
			case 2:child = lis[2].getElementsByTagName("a");break;//
			case 3:child = lis[3].getElementsByTagName("a");break;
			case 4:child = lis[4].getElementsByTagName("a");break;
			default:break;
		}	
		child[0].dispatchEvent(event); 
}

//选择阅览室
function swicth2des(){
		document.getElementById("onDate")
			.value=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()+1);
		document.getElementById("building").value="1";	
		chrome.runtime.sendMessage({info:"getFloor"});
}
function loadCompleteCallback(){


	//get server time
	var currentTime = document.getElementById("currentTime").innerText;
	var timeArr = currentTime.split(":");
	// calculate how much time still left 
	var timeLeft = (14*60+60) - (timeArr[0]*60)-timeArr[1];

	// we act like that just to ensure that we always connect with the server
	if (timeLeft > 2)
	{
		setTimeout(function(){
			location.reload(true);
			console.log("2m刷新一次");
			},2*60*1000);
		
	}
	else if (timeLeft > 1)
	{
		setTimeout(function(){
			console.log("1m刷新一次");
			location.reload(true);
			},60*1000);
	}
	else if (timeLeft  == 1 )
	{
		setTimeout(function(){
			console.log("200ms刷新一次"+timeLeft);
			location.reload(true);
		},1000);
		//alert("1m刷新一次"+timeLeft);
	}
	else if (timeLeft == 0)
	{
		setTimeout(function(){
			console.log("200ms刷新一次"+timeLeft);
			method(2);
		},60*1000+200);
		
	}

	
	if (document.URL.search("http://202.206.242.87/map") >-1)
	{
		swicth2des();
		intervalId1=setInterval(function(){
			if (document.getElementById("roomList").getElementsByTagName("li").length!=0)
			{
				chrome.runtime.sendMessage({info:"getRoom"});
				clearInterval(intervalId1);
			}
			
		},20);
		intervalId2=setInterval(function(){
			//comfirm content has been loaded
			var ul = document.getElementById("seatLayout").getElementsByTagName("ul");
			if (ul.length!=0)
			{
				if (ul[0].getElementsByTagName("li").length!=0)
				{
					console.log("ddd");
					chrome.runtime.sendMessage({info:"getSeat"});
					clearInterval(intervalId2);
				}
			}		
		},20);
		intervalId3=setInterval(function(){
			//comfirm content has been loaded
			var st = document.getElementById("startTime").getElementsByTagName("dl")[0]
				.getElementsByTagName("ul");
			if (st.length!=0)
			{
				if (st[0].getElementsByTagName("li").length!=0)
				{
					///console.log("ddd");
					chrome.runtime.sendMessage({info:"getStartTime"});
					clearInterval(intervalId3);
				}
			}		
		},20);
		intervalId4=setInterval(function(){
			//comfirm content has been loaded
			var st = document.getElementById("endTime").getElementsByTagName("dl")[0]
				.getElementsByTagName("ul");
			if (st.length!=0)
			{
				if (st[0].getElementsByTagName("li").length!=0)
				{
					///console.log("ddd");
					chrome.runtime.sendMessage({info:"getEndTime"});
					clearInterval(intervalId4);
				}
			}		
		},20);
			
		
	}
	else if (document.URL.search("http://202.206.242.87/selfRes") >-1)
	{

	}
	//alert("debug");
	
}

window.addEventListener("load",loadCompleteCallback);
chrome.runtime.onMessage.addListener(function(msg,sender,response){

		
		//window.info.seat = msg.seat; 
		//loadCompleteCallback();
		if (msg.command=="chooseSeat")
		{
			var event = document.createEvent('MouseEvent');  
			event.initEvent('click', true, false); 
			var child = document.getElementById(msg.info).getElementsByTagName("a");
			child[0].dispatchEvent(event);
		}
		else if (msg.command=="chooseRoom")
		{
			document.getElementById(msg.info).click();
		}
		else if (msg.command=="chooseFloor")
		{
			document.getElementById("floor").value=msg.info;
			document.getElementById("findRoom").click();
			//document.getElementById(msg.info).click();
		}
		else if (msg.command=="chooseStartTime")
		{
			//
			var slis = document.getElementById("startTime")
				.getElementsByTagName("dl")[0]
				.getElementsByTagName("ul")[0]
				.getElementsByTagName("li");
			var ele;
			for (var i=0; i<slis.length; i++)
			{
				if (slis[i].getElementsByTagName("a")[0].innerText==msg.info)
				{
//					ele = li[i].getElementsByTagName("a")[0]
					var event = document.createEvent('MouseEvent');  
					event.initEvent('click', true, false); 
					var child = slis[i].getElementsByTagName("a");
					child[0].dispatchEvent(event);
					break;
				}
			}
		}
		else if (msg.command=="chooseEndTime")
		{
			var slis = document.getElementById("endTime")
				.getElementsByTagName("dl")[0]
				.getElementsByTagName("ul")[0]
				.getElementsByTagName("li");
			var ele;
			for (var i=0; i<slis.length; i++)
			{
				if (slis[i].getElementsByTagName("a")[0].innerText==msg.info)
				{
//					ele = li[i].getElementsByTagName("a")[0]
					var event = document.createEvent('MouseEvent');  
					event.initEvent('click', true, false); 
					var child = slis[i].getElementsByTagName("a");
					child[0].dispatchEvent(event);
					break;
				}
			}
			//document.getElementById("reserveBtn").click();
		}

});