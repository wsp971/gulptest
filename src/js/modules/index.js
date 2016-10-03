define(['jquery','underscore','ejs','text!template/test.html','view'],function($,_,ejs,text,view){
  $(document).ready(function(){
    data={'name':'wsp'}
   var name='<%=name%>';
   var data={'name':'wsp'};
   $("#template").html(_.template(name,data));
  });
  // console.log('view'+view().viewname);
  view.fun1();
  // var text=require("text!./test.html");
  console.log(_.template(text,{'name':"hahha"}));
  require(['js/modules/model/data'],function(data){
        debugger;
  });
  // var math=require(['js/modules/model/data2']);
  // math.add(1,2);
  require(['js/modules/model/data2'],function(data2){

  })
})
  
    
