define(["jquery","underscore","commonView",'text!modules/index/template/foot.html'],function($,_,commonView,footer){
	var header=require(["text!modules/index/template/head.html"]);

	return  commonView.extend({
		init:function(){
			alert("hha");
			console.log(footer);
			console.log(header);
		}
	})
});