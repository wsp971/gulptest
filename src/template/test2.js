alert("加载成功");
require.config({
		baseUrl:"../",
　　　　paths: {
　　　　　　"jquery": "js/common/jquery",
　　　　　　"underscore": "js/common/underscore",
　　　　}
　
});
require(['template/math',"jquery",'underscore'],function(math,$,_){
	alert(math.add(1,1));
	$('body').html('rquire load success');
});
