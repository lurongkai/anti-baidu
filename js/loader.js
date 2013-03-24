// Author: http://weibo.com/fanweixiao

(function(){
	var jQuery_cdn = "http://lib.sinaapp.com/js/jquery/1.9.1/jquery-1.9.1.min.js";
	var js_files = ["http://lurongkai.github.com/anti-baidu/js/jquery.bpopup-0.8.0.min.js","http://lurongkai.github.com/anti-baidu/js/anti-baidu.min.js"];
	
  // Anti baidu
	var anti_baidu = function(){
    	jQuery.getScript(js_files[0])
	    	.done(function(){
				jQuery.getScript(js_files[1])
					.fail(function(){});
	    	})
	    	.fail(function(){});
	};
	
  var loader = function(){
    // Only do anything if jQuery isn't defined
    if (typeof jQuery === 'undefined') {
      function getScript(url, success) {
        var script = document.createElement('script');
        script.src = url;

        var head = document.getElementsByTagName('head')[0],
        done = false;
        // Attach handlers for all browsers
        script.onload = script.onreadystatechange = function() {
          if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
            done = true;
            // callback function provided as param
            success();
            script.onload = script.onreadystatechange = null;
            head.removeChild(script);
          };
        };
        head.appendChild(script);
      };

      getScript(jQuery_cdn, function() {
        if (typeof jQuery=='undefined') { // Super failsafe - still somehow failed...
          return;
        } else {
          anti_baidu();
        }
      });
    } else {
      // jQuery was already loaded
      anti_baidu();
    };
  }
	
  var url=document.referrer;
  if (url && url.search("http://")>-1) {
      var refurl =  url.match(/:\/\/(.[^/]+)/)[1];
      if(refurl.indexOf("baidu.com") > -1){
        loader();
      }
  }
})();
