/*www.abcjapon.co.jp Kyo ICHIDA ver:0.4*/
var body=document.getElementsByTagName("body")[0];
var scripts=body.getElementsByTagName("script");

for(var i=0; i<scripts.length; i++){
	var query=scripts[i].src;
}

var params=getQueryParams();
var user=params.user;
var count=params.count;
var css=params.css;
var width=params.width;
var height=params.height;

if(user) PosTWIT(user,count,css,width,height);

function getQueryParams(){
	var qs=query.slice(query.indexOf("?"));
	if(qs){
		var qsa=qs.substring(1).split('&');
		var params={};
		for(var i=0; i<qsa.length; i++){
			var pair=qsa[i].split('=');
			if(pair[0]){
				params[pair[0]]=pair[1];
			}
		}
		return params;
	}
	return null;
}

function PosTWIT(user,count,css,width,height){
if(!user.match(/^[a-zA-Z0-9_\-]+$/)){
	return;
}
if(css != 'none'){
	css='<style type="text/css"><!--\
#twitter_div{\
	z-index:9;\
	position:absolute;\
	top:16px;\
	left:0px;\
	margin:0 20px 0 30px;\
	padding:0;\
	color:#000;\
	text-align:left;\
	font-size:small;\
	font-family:serif;\
}\
#twitter_div *{\
	margin:0;\
	padding:0;\
}\
#twitter_div h2{\
display:none;\
	margin-left:1%;\
	color:#ffffaa;\
	zoom:1;\
	filter:alpha(opacity=75);\
	opacity:0.75;\
	-moz-opacity:0.75;\
}\
#twitter_div h2 a{\
	color:#fff;\
}\
#twitter_div a{\
	color:#ff335e;\
}\
.widget-content{\
	/*display:none;*/\
}\
#twitter_update_list{\
	display:block;}#twitter_update_list li{\
	background-color:#ffffaa;\
	float:left;\
	display:block;\
	padding:1%;\
	margin:1%;';

	if(!width){
		css+='width:16%;';
	}else{
		css+='width:'+width+';';
	}
	if(!height){
		css+='height:6em;';
	}else{
		css+='height:'+height+';';
	}

css+='overflow:hidden;\
	font-family:Courier;\
	zoom:1;\
	filter:alpha(opacity=50);\
	opacity:0.5;\
	-moz-opacity:0.5;\
	-webkit-box-shadow:#333 1px 1px 4px;\
	-moz-box-shadow:#333 1px 1px 4px;\
	box-shadow:#333 1px 1px 4px;\
}\
#twitter_update_list li:hover{\
	zoom:1;\
	filter:alpha(opacity=80);\
	opacity:0.8;\
	-moz-opacity:0.8;\
}';

//alert(css);

css+='--></style>';
}else{
	css='';
}
/*
	if(!width) width = 0; else width=parseInt(width);
	if(width <= 0 || width > 1280) width=425;
	if(height <= 0 || height > 745) height=344;
	if(start) id += '&start='+parseInt(start); else if(fmt){
		id += '&ap=%2526fmt%3D'+fmt;
		id += '&fs=1';
	}
	if(end) id += '&end='+parseInt(end);
	if(autoplay == 1) id += '&autoplay='+autoplay;
*/
if(!count) count=10; else count=parseInt(count);

var html=css+'<div id="twitter_div" class="widget"><h2 class="sidebar-title widget-header"><a href="http://twitter.com/'
+user
+'" id="twitter-link" rel="external">'
+user
+'<'
+'/a> update<'
+'/h2><div class="widget-content">'
+'<ul id="twitter_update_list" class="widget-list"></ul>&nbsp;</div>'
+'</div>'
+'<script type="text/javascript" src="http://twitter.com/javascripts/blogger.js"><'
+'/script><script type="text/javascript" src="https://api.twitter.com/1/statuses/user_timeline/'
+user
+'.json?callback=twitterCallback2&amp;count='
+count
+'"><'
+'/script>';
document.write(html);
}
