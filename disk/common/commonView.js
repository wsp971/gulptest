define([
    "jquery",
    "underscore"
],function($, _){
    var $body = $('body');
    var views = function(options) {
        this.options = options;
        this.init();
    }
    views.prototype = {
        _init: function() {
            this.events = this.events || {};
            this.handlers = this.handlers || {};
            this.container = this.container || $body;
            this._setAttr();
            this._bindEvents();
        },
        _setAttr: function() {
            this.query = this.getQSObject(true);
        },
        _bindEvents: function() {
            var self = this;
            _.each(this.events, function(handlerName, key) {
                var eventName = '';
                var selector = key.replace(/\w+\s/, function(match) {
                    eventName = $.trim(match);
                    return '';
                });
                var handler = self.handlers[handlerName];
                if (!handler) {
                    throw new Error('Can not find method [' + handlerName + '] in handlers');
                }
                self.container.on(eventName, selector, (function(oldFunc) {
                    return function(event) {
                        oldFunc.apply(self, [event, $(this)]);
                    };
                })(handler));
            });
            // 针对iphone iPad 输入框不失焦的bug，点击其他区域手动触发blur事件
            if (/iPhone|iPad|iPod|iOS/i.test(navigator.userAgent)) {
                $('body').on('touchstart.inputBlur', function(e) {
                    var target = e.srcElement || e.target;
                    if (!$(target).hasClass("textfield-clean") && !/input/i.test(target.tagName)) {
                        $("input").blur();
                    }
                });
            }
        },
        getQSObject: function(str, decode) {
            if (typeof str === 'boolean') {
                decode = str;
                str = location.search;
            }
            str = str || location.search;
            decode = !!decode;
            var pairs = str.replace('?', '').split('&'),
                ret = {};
            for (var i = 0; i < pairs.length; i++) {
                var kv = pairs[i].split('=');
                if (kv.length > 1) {
                    ret[kv[0]] = decode ? decodeURIComponent(kv[1]) : kv[1];
                }
            }
            return ret;
        },
        request: function(options) {
            var url = options.url,
                oldSuccess = options.success,
                self = this;
 
            // if (url && !options.debug) {
            //     options.url = C.Api.prefix + url;
            // }
            options.success = function(res) {
                oldSuccess.call(self, res);
            };
            options.error = options.error || function(){
                $.msg.tip("请求失败，请稍候重试")
            };
            options.type = options.type || "GET",
            options.dataType = options.dataType || "json",
            $.ajax(options);
        },
        _templates: {},
        render: function (id, data, container, isAppend) {
            var self = this;
            var templates = self._templates;
            var tpl = templates[id], html;
 
            if (!tpl) {
                tpl = _.template($(id).html());
                templates[id] = tpl;
            }
 
            html = tpl(data);
 
            if (container) {
                if (!isAppend) {
                    container.html(html);
                } else {
                    container.append(html);
                }
            }
            //表格隔行变色
            var item = $("table tr");
            for(var i=0;i<item.length;i++){
                if(i%2===0){
                    item[i].style.backgroundColor="#f3f3f3";
                }
            }
 
            return html;
        }
        // ,
        // super: function(method, args) {
        //     var func = this.constructor.prototype[method];
 
        //     if (func && typeof args === 'object') {
        //         args = args || [];
        //         func.apply(this, args);
        //     } else {
        //         throw new Error('Arguments error in [super].')
        //     }
        // }
    }
    // 扩展
    views.extend = function(props) {
        var Child = function() {
            var self = this;
            views.prototype._init.call(self);
            self.init && self.init();
        };
        var  newViews = function() {};
        newViews.prototype = views.prototype;
        Child.prototype = new newViews();
        Child.prototype.constructor = views;
        _.extend(Child.prototype, props);
        return Child;
    } 
    return views;
});