// Author: http://weibo.com/fanweixiao

(function () {
    var jQuery_cdn = "http://lib.sinaapp.com/js/jquery/1.9.1/jquery-1.9.1.min.js";
    var jquery_bpopup = "http://lurongkai.github.com/anti-baidu/js/jquery.bpopup-0.8.0.min.js";

    var isBaiduReferrer = (function () {
        var url=document.referrer;
        if (url && (url.search("http://") > -1 || url.search("https://") > -1)) {
            var refurl = url.match(/:\/\/(.[^/]+)/)[1];
            if (refurl.indexOf("baidu.com") > -1) {
                return true;
            }
        }

        return false;
    })();

    var loader = function () {
        var anti_baidu = function () {
            jQuery.getScript(jquery_bpopup)
                .done(function () {
                    (function ($) {
                        $(document).ready(function () {
                            var antiDiv = '<div id="nobaidu_dlg" style="background-color:#fff; border-radius:15px;color:#000;display:none;padding:20px;min-width:450px;min-height:180px;"><img src="http://lurongkai.github.com/anti-baidu/images/nobaidu.jpg" align="left"><p style="margin-left:200px;margin-top: 20px; line-height: 30px;">检测到你还在使用百度这个搜索引擎，<br>作为一个程序员，这是一种自暴自弃！<br><br></p><p align="center" style="margin-top:20px;"><b><a href="http://coolshell.cn/articles/9308.html">做环保的程序员，从不用百度开始！</a></b></p></div>';
                            $("body").append(antiDiv);
                            if (isBaiduReferrer) {
                                $('#nobaidu_dlg').bPopup();
                            }
                        });
                    })(jQuery);
                })
                .fail(function () { });
        };

        if (typeof jQuery === 'undefined') {
            function getScript(url, success) {
                var script = document.createElement('script');
                script.src = url;

                var head = document.getElementsByTagName('head')[0],
                    done = false;

                script.onload = script.onreadystatechange = function () {
                    if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                        done = true;

                        success();
                        script.onload = script.onreadystatechange = null;
                        head.removeChild(script);
                    };
                };
                head.appendChild(script);
            };

            getScript(jQuery_cdn, function () {
                if (typeof jQuery == 'undefined') {
                    return;
                } else {
                    anti_baidu();
                }
            });
        } else {
            anti_baidu();
        };
    };

    if (isBaiduReferrer) {
        loader();
    }
})();
