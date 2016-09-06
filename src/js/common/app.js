(function(window){
	var script=document.create("script");
	var configMap={
		SRC:"js/src",
		DIST:"js/dist"
	}
	var libconfig={
		"text":"common/text.js",
		"underscore":"common/underscore.js"
	}
	var base_url="http://localhost"+""
	var root=""
	function loadScript(){
		var text=document.createElement("script");
		text.setAttribute("type","text/javascript");
		text.setAttribute("src",configMap.SRC+'common/text.js');
		document.documentElement.appendChild(text);
	}
	window.app=function(){
        

	};

	loadScript.call(window);
})(window)