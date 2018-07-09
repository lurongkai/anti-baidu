// Author: http://weibo.com/fanweixiao

(function () {
    var jQuery_cdn = "https://cdn.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.min.js";
    var jQuery_bpopup_cdn = "https://cdn.jsdelivr.net/gh/dinbror/bpopup@0.11.0/jquery.bpopup.min.js";

    var isBaiduReferrer = (function () {
        var url=document.referrer;
	if ( typeof isTest !== 'undefined' ) {
	    url = TestURL;
	}

        if (url && (url.search("http[s]?://") > -1 )) {
            var refurl = url.match(/:\/\/(.[^/]+)/)[1];
            if (refurl.indexOf("baidu.com") > -1) {
                return true;
            }
        }
        return false;
    })();

    var loader = function () {
        var anti_baidu = function () {
            jQuery.getScript(jQuery_bpopup_cdn)
                .done(function () {
                    (function ($) {
                        $(document).ready(function () {
                            var css='<style type="text/css">'+
                                    '    * {'+
                                    '        box-sizing: border-box;'+
                                    '    }'+
                                    '    .anti-baidu-row::after {'+
                                    '        content: "";'+
                                    '        clear: both;'+
                                    '        display: table;'+
                                    '    }'+
                                    '    [class*="anti-baidu-col-"] {'+
                                    '        float: left;'+
                                    '        padding: 15px;'+
                                    '    }'+
                                    '    .anti-baidu-col-1 {width: 8.33%;}'+
                                    '    .anti-baidu-col-2 {width: 16.66%;}'+
                                    '    .anti-baidu-col-3 {width: 25%;}'+
                                    '    .anti-baidu-col-4 {width: 33.33%;}'+
                                    '    .anti-baidu-col-5 {width: 41.66%;}'+
                                    '    .anti-baidu-col-6 {width: 50%;}'+
                                    '    .anti-baidu-col-7 {width: 58.33%;}'+
                                    '    .anti-baidu-col-8 {width: 66.66%;}'+
                                    '    .anti-baidu-col-9 {width: 75%;}'+
                                    '    .anti-baidu-col-10 {width: 83.33%;}'+
                                    '    .anti-baidu-col-11 {width: 91.66%;}'+
                                    '    .anti-baidu-col-12 {width: 100%;}'+
                                    '    @media only screen and (max-width: 768px) {'+
                                    '        /* For mobile phones: */'+
                                    '        [class*="anti-baidu-col-"] {'+
                                    '            width: 100%;'+
                                    '        }'+
                                    '    }'+
                                    '</style>';

                            var antiDiv = '<div id="nobaidu_dlg" class="anti-baidu-col-4" style="background-color:#fff; border-radius:15px;color:#000;display:none;padding:20px;min-height:180px;">'+
                                          '  <div class="anti-baidu-row">' +
                                          '    <div class="anti-baidu-col-5" style="text-align:center;">' +
                                          '      <img src="https://cdn.jsdelivr.net/gh/lurongkai/anti-baidu/images/nobaidu.jpg">'+
                                          '    </div>' +
                                          '    <div class="anti-baidu-col-7" style="text-align:center;line-height: 30px;padding-top: 35px;">'+
                                          '      检测到你还在使用百度这个搜索引擎<br>作为一个程序员，这是一种自暴自弃'+
                                          '    </div>'+
                                          '  </div>' +
                                          '  <div class="anti-baidu-row">' +
                                          '    <div class=anti-baidu-col-12>'+
                                          '      <p align="center"><b><a href="http://coolshell.cn/articles/9308.html">做环保的程序员，从不用百度开始！</a></b></p>'+
                                          '    </div>'+
                                          '  </div>'+
                                          '</div>';
                            $("head").append(css);
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

