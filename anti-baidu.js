;
function($){
	$(document).ready(function(){
		var antiDiv = '
<div id="nobaidu_dlg" style="background-color:#fff; border-radius:15px;color:#000;display:none;padding:20px;min-width:450px;min-height:180px;">
    <!--<span class="bClose" style="cursor:pointer; position:absolute; right:10px;top:5px;">x<span/>-->
    <img src="http://coolshell.cn//wp-content/themes/inove/img/nobaidu.jpg" align="left">
		<p style="margin-left:200px;margin-top: 20px; line-height: 30px;">
			检测到你还在使用百度这个搜索引擎，<br>
			做为一个程序员，这是一种自暴自弃！<br>
     	   	<br>
     </p>
     <p align="center" style="margin-top:20px;">
     	<b><a href="http://coolshell.cn/articles/7186.html">做环保的程序员，从不用百度开始！</a></b>
     </p>
</div>
';
		$(document).append(antiDev);
		var url=document.referrer;
		if (url && url.search("http://")>-1) {
		    var refurl =  url.match(/:\/\/(.[^/]+)/)[1];
		    if(refurl.indexOf("baidu.com")>-1){
		        $('#nobaidu_dlg').bPopup();
		    }
		}
	});
}(jQuery);