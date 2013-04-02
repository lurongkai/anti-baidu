// Author: http://weibo.com/fanweixiao
// Revision: http://weibo.com/lengleng3898
// Version: 0.5

(function(){
	"use strict";
	
	var js_files = ["http://lib.sinaapp.com/js/jquery/1.9.1/jquery-1.9.1.min.js", "http://lurongkai.github.com/anti-baidu/js/jquery.bpopup-0.8.0.min.js"] ;	
	
	var jQueryLoader = function(loadSuccessCallback){
		// Only do anything if jQuery isn't defined
		if (typeof jQuery === 'undefined') {
			var getScript = function(url, successFunction) {
				var script = document.createElement('script');
				script.src = url;

				var head = document.getElementsByTagName('head')[0],
					done = false;
				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function() {
					if (!done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
						done = true;
						// callback function provided as param
						successFunction(jQuery);
						script.onload = script.onreadystatechange = null;
						head.removeChild(script);
					}
				};
				head.appendChild(script);
			};

			getScript(js_files[0], function() {
				if (typeof jQuery === 'undefined') { // Super failsafe - still somehow failed...
					return;
				} else{
					loadSuccessCallback(jQuery);					
				}
			});
		}
	};
	
	var antiBaiduPopup = function($){
		$.getScript(js_files[1]);
		$(document).ready(function(){
			var antiDiv = '<div id="nobaidu_dlg" style="background-color:#fff; border-radius:15px;color:#000;display:none;padding:20px;min-width:450px;min-height:180px;"><img src="http://lurongkai.github.com/anti-baidu/images/nobaidu.jpg" align="left"><p style="margin-left:200px;margin-top: 20px; line-height: 30px;">检测到你还在使用百度这个搜索引擎，<br>作为一个程序员，这是一种自暴自弃！<br><br></p><p align="center" style="margin-top:20px;"><b><a href="http://coolshell.cn/articles/9308.html">做环保的程序员，从不用百度开始！</a></b></p></div>';
			$("body").append(antiDiv);
			// Actually, When antiBaidu Popup function be invoked, it is already proved that refer is Baidu.
			$('#nobaidu_dlg').bPopup();
		});
	};
	
	var antiBaiduHandler = function(){
		jQueryLoader(antiBaiduPopup);
	};
	
	var isReferBaidu = function(){
		var url=document.referrer;
		if (url && url.search("http://")>-1) {
			var refurl =  url.match(/:\/\/(.[^/]+)/)[1];
			if(refurl.indexOf("baidu.com")>-1){
				return true;
			}
		}
		return false;
	};
	
	if (isReferBaidu) {
		antiBaiduHandler();
	}
})();
