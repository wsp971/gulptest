define(['jquery','underscore','text!template/test.html','commonView'],function($,_,test,commonview){
    return commonview.extend({
        init:function(){
            var data={'name':'test'};
            // var this.template(data);
            this.render('#info',data,$("#infoContainer"),true);
        },
        events:{
            "click #event": "_click"
        },
        handlers:{
            _click:function(e){
                alert("hello");
                console.log(e);
                var self=this;
                self.request({
                    url:"http://fic-web-stg.pingan.com.cn/fic_web/portal/product/lishun/queryLatestProduct",
                    success:function(response){
                        console.log(response);
                    },
                    error:function(response){
                        console.log(response);
                    }
                });
            }
        }
        // template:_.template(test)

    });
});

