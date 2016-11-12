
function loadComplete(){
	//alert("debug1");

	document.getElementById("saveCfg").addEventListener('click',function(){
		//alert("debug");
		alert(document.getElementById("method").value);
	});
}
window.addEventListener('load',loadComplete);