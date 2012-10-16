// ABC Japon : Ver. 1.9 //

function CSClickReturn () {
	var bAgent = window.navigator.userAgent; 
	var bAppName = window.navigator.appName;
	if ((bAppName.indexOf("Explorer") >= 0) && (bAgent.indexOf("Mozilla/3") >= 0) && (bAgent.indexOf("Mac") >= 0))
		return true; // dont follow link
	else return false; // dont follow link
}

CSStopExecution=false;
function CSAction(array) {return CSAction2(CSAct, array);}
function CSAction2(fct, array) { 
	var result;
	for (var i=0;i<array.length;i++) {
		if(CSStopExecution) return false; 
		var aa = fct[array[i]];
		if (aa == null) return false;
		var ta = new Array;
		for(var j=1;j<aa.length;j++) {
			if((aa[j]!=null)&&(typeof(aa[j])=="object")&&(aa[j].length==2)){
				if(aa[j][0]=="VAR"){ta[j]=CSStateArray[aa[j][1]];}
				else{if(aa[j][0]=="ACT"){ta[j]=CSAction(new Array(new String(aa[j][1])));}
				else ta[j]=aa[j];}
			} else ta[j]=aa[j];
		}			
		result=aa[0](ta);
	}
	return result;
}
CSAct = new Object;

CSAg = window.navigator.userAgent; CSBVers = parseInt(CSAg.charAt(CSAg.indexOf("/")+1),10);
CSIsW3CDOM = ((document.getElementById) && !(IsIE()&&CSBVers<6)) ? true : false;
function IsIE() { return CSAg.indexOf("MSIE") > 0;}
function CSIEStyl(s) { return document.all.tags("div")[s].style; }
function CSNSStyl(s) { if (CSIsW3CDOM) return document.getElementById(s).style; else return CSFindElement(s,0);  }
CSIImg=false;
function CSInitImgID() {if (!CSIImg && document.images) { for (var i=0; i<document.images.length; i++) { if (!document.images[i].id) document.images[i].id=document.images[i].name; } CSIImg = true;}}
function CSFindElement(n,ly) { if (CSBVers<4) return document[n];
	if (CSIsW3CDOM) {CSInitImgID();return(document.getElementById(n));}
	var curDoc = ly?ly.document:document; var elem = curDoc[n];
	if (!elem) {for (var i=0;i<curDoc.layers.length;i++) {elem=CSFindElement(n,curDoc.layers[i]); if (elem) return elem; }}
	return elem;
}
function CSGetImage(n) {if(document.images) {return ((!IsIE()&&CSBVers<5)?CSFindElement(n,0):document.images[n]);} else {return null;}}
CSDInit=false;
function CSIDOM() { if (CSDInit)return; CSDInit=true; if(document.getElementsByTagName) {var n = document.getElementsByTagName('DIV'); for (var i=0;i<n.length;i++) {CSICSS2Prop(n[i].id);}}}
function CSICSS2Prop(id) { var n = document.getElementsByTagName('STYLE');for (var i=0;i<n.length;i++) { var cn = n[i].childNodes; for (var j=0;j<cn.length;j++) { CSSetCSS2Props(CSFetchStyle(cn[j].data, id),id); }}}
function CSFetchStyle(sc, id) {
	var s=sc; while(s.indexOf("#")!=-1) { s=s.substring(s.indexOf("#")+1,sc.length); if (s.substring(0,s.indexOf("{")).toUpperCase().indexOf(id.toUpperCase())!=-1) return(s.substring(s.indexOf("{")+1,s.indexOf("}")));}
	return "";
}
function CSGetStyleAttrValue (si, id) {
	var s=si.toUpperCase();
	var myID=id.toUpperCase()+":";
	var id1=s.indexOf(myID);
	if (id1==-1) return "";
	s=s.substring(id1+myID.length+1,si.length);
	var id2=s.indexOf(";");
	return ((id2==-1)?s:s.substring(0,id2));
}
function CSSetCSS2Props(si, id) {
	var el=document.getElementById(id);
	if (el==null) return;
	var style=document.getElementById(id).style;
	if (style) {
		if (style.left=="") style.left=CSGetStyleAttrValue(si,"left");
		if (style.top=="") style.top=CSGetStyleAttrValue(si,"top");
		if (style.width=="") style.width=CSGetStyleAttrValue(si,"width");
		if (style.height=="") style.height=CSGetStyleAttrValue(si,"height");
		if (style.visibility=="") style.visibility=CSGetStyleAttrValue(si,"visibility");
		if (style.zIndex=="") style.zIndex=CSGetStyleAttrValue(si,"z-index");
	}
}

function CSSetStylePos(s,d,p) {
	if (CSIsW3CDOM)d==0?document.getElementById(s).style.left=p+"px":document.getElementById(s).style.top=p+"px";
	else if(IsIE())(d==0)?CSIEStyl(s).posLeft=p:CSIEStyl(s).posTop=p;
	else (d==0)?CSNSStyl(s).left=p:CSNSStyl(s).top=p;
}
function CSGetStylePos(s,d) {
	if (CSIsW3CDOM){CSIDOM();return parseInt((d==0)?document.getElementById(s).style.left:document.getElementById(s).style.top);}
	else if (IsIE()) {CSIEWinInit();return(d==0)?CSIEStyl(s).posLeft:CSIEStyl(s).posTop;}
	else {return (d==0)?CSNSStyl(s).left:CSNSStyl(s).top;}
}
CSIEWInit=false;
function CSIEWinInit() { if(CSIEWInit==true) return; else CSIEWInit=true; if (IsIE()&&(CSAg.indexOf("Win")!=-1)&&CSBVers==4) { var i=0; var lyr=document.all.tags("div")[i++]; while(lyr) {lyr.style.posLeft=lyr.offsetLeft; lyr.style.posTop=lyr.offsetTop; lyr=document.all.tags("div")[i++];}}}

CSLoopIsRunning = false; CSFctArray = new Array; CSTimeoutID = null;
function CSLoop() {	
	CSLoopIsRunning = false;
	for (i=0;i<CSFctArray.length;i++) {
		var curFct = CSFctArray[i];
		if (curFct)	{
			if (curFct.DoFunction(curFct)) { CSLoopIsRunning = true; curFct.counter++; }
			else CSFctArray[i] = 0;
		}
	}
	if (CSLoopIsRunning) CSTimeoutID = setTimeout("CSLoop()", 1);
}
function CSStartFunction(fct,data) {
	if (!CSLoopIsRunning) { CSFctArray = 0; CSFctArray = new Array; }
	var fctInfo = new Object;
	fctInfo.DoFunction = fct; fctInfo.counter = 0; fctInfo.data = data;
	CSFctArray[CSFctArray.length] = fctInfo; 
	if (!CSLoopIsRunning) CSLoop();
}
function CSStopFunction(sceneName) {
	var i;
	for (i=0;i<CSFctArray.length;i++) {
		var curFct = CSFctArray[i];
		if (curFct){ if (curFct.data.name == sceneName){ CSFctArray[i] = 0; return; } }
	}
}
function CSStopComplete() {
	if (CSTimeoutID == null) return;
	clearTimeout (CSTimeoutID); CSLoopIsRunning = false; CSTimeoutID = null;
}

function CSMoveLoop(fInf) {
	var ticks = 60 * (((new Date()).getTime()) - fInf.data.startTime)/1000;
	var f = ticks/fInf.data.ticks;
	if (f < 1) { CSSetStylePos(fInf.data.layer,0,fInf.data.start[0] * (1-f) + fInf.data.end[0] * f);
		CSSetStylePos(fInf.data.layer,1,fInf.data.start[1] * (1-f) + fInf.data.end[1] * f); return true; }
	else { CSSetStylePos(fInf.data.layer,0,fInf.data.end[0]);
		CSSetStylePos(fInf.data.layer,1,fInf.data.end[1]); }
	return false;
}
function CSSlideObj (layer,start,end,ticks,startTime) {
	this.layer=layer;this.start=start;this.end=end;this.ticks=ticks;this.startTime=startTime;
}
function CSSlideLayer(l,pos,anim,ticks) {
	var x = pos[0]; var y = pos[1];

	if (l == '') return;
	if (!anim) { CSSetStylePos(l,0,x); CSSetStylePos(l,1,y); }
	else {  var fctData = new CSSlideObj(l,new Array(CSGetStylePos(l,0),CSGetStylePos(l,1)),new Array(x,y),ticks,(new Date()).getTime()); CSStartFunction(CSMoveLoop,fctData); }
}

function CSFlipMove(action) {
	if (action[1] == '') return;
	var curX = CSGetStylePos(action[1],0); var curY = CSGetStylePos(action[1],1);
	var x1 = action[2][0];
	var y1 = action[2][1];
	if ((x1 != curX) || (y1 != curY)) CSSlideLayer(action[1],action[2],action[4],action[5]);
	else CSSlideLayer(action[1],action[3],action[4],action[5]);
}




var gCSIEDragObject = null;
var gDragX,gDragY;
function CSSetupDrag (layerName) {
	this.x = 0; this.y = 0;
	if (IsIE()) {
		this.canDrag=true; 
		this.layerObj=document.all.tags("div")[layerName];
		this.layerObj.dragObj = this;
		document.ondragstart = CSIEStartDrag;
		document.onmousedown = CSIEMouseDown;
		document.onmouseup = CSIEStopDrag;
	} else {
		if (CSBVers>=5)
			{
			this.layerObj=document.getElementById(layerName);
			this.layerObj.addEventListener("mousedown", CSNS6StartDrag, true);
			this.layerObj.addEventListener("mouseup", CSNS6StopDrag, true);
			}
		else
			{
			this.layer=CSNSStyl(layerName);this.onmousemove=null; 
			this.layer.document.theLayer=this;
			this.layer.document.captureEvents(Event.MOUSEDOWN);
			this.layer.document.onmousedown=CSNSStartDrag; 
			this.layer.document.onmouseup=CSNSStopDrag;
			}
	}
}
function CSNS6StartDrag (ev) {
	CSIDOM();
	ev.currentTarget.addEventListener("mousemove", CSNS6DoDrag, true);
	gDragX=ev.clientX;
	gDragY=ev.clientY;
	ev.preventDefault();
}
function CSNS6DoDrag (ev) {
	var style=ev.currentTarget.style;
	style.left = parseInt(style.left)+(ev.clientX-gDragX)+"px";
	style.top = parseInt(style.top)+(ev.clientY-gDragY)+"px";
	gDragX=ev.clientX;
	gDragY=ev.clientY;
}
function CSNS6StopDrag (ev) {	
	ev.target.removeEventListener("mousedown", CSNS6StartDrag, true);
	ev.target.removeEventListener("mouseup", CSNS6StopDrag, true);
	ev.currentTarget.removeEventListener("mousemove", CSNS6DoDrag, true);
	ev.preventDefault();
}
function CSNSStartDrag (ev) {
	var clickInMe = false;
	if (ev.target != this) {
		for (var i=0;i<this.images.length;i++) {
			if (this.images[i] == ev.target) { clickInMe = true; break;}
			}
		}
	else clickInMe = true;	
	if (clickInMe)
		{
		this.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP); 
		this.onmousemove=CSNSDoDrag;
		this.theLayer.x= ev.pageX;
		this.theLayer.y= ev.pageY;
		this.routeEvent(ev);
		return false;
		}
   this.onmousemove=null;this.releaseEvents(Event.MOUSEMOVE|Event.MOUSEUP);
	this.routeEvent(ev);
   return true; 
}
function CSNSStopDrag (ev) {
   this.onmousemove=null;this.releaseEvents(Event.MOUSEMOVE|Event.MOUSEUP);return false; 
}
function CSNSDoDrag (ev) {
	this.theLayer.layer.moveBy(ev.pageX-this.theLayer.x, ev.pageY-this.theLayer.y); 
	this.theLayer.x = ev.pageX; 
	this.theLayer.y = ev.pageY;
	this.routeEvent(ev);
}
function CSIEStartDrag () {
	if(gCSIEDragObject != null && (gCSIEDragObject.tagName==event.srcElement.tagName))
		event.returnValue=false;  
}
function CSIEStopDrag () { gCSIEDragObject=null; document.onmousemove=null; }
function CSIEMouseDown () {
	if(event.button==1) {
		dragLayer = event.srcElement;
		while (dragLayer!=null) 
			{
			if ((dragLayer.dragObj == null) && (dragLayer.tagName == "DIV"))
				break;
			if (dragLayer.dragObj != null)
				break;
			dragLayer=dragLayer.parentElement;
			}
			
		if (dragLayer == null) return;
		if (dragLayer.dragObj!=null && dragLayer.dragObj.canDrag) {
			gCSIEDragObject = dragLayer;
			gCSIEDragObject.dragObj.x=event.clientX;
			gCSIEDragObject.dragObj.y=event.clientY;
			document.onmousemove = CSIEMouseMove;
		}
	}
}
function CSIEMouseMove () {
	gCSIEDragObject.dragObj.layerObj.style.pixelLeft+=(event.clientX-gCSIEDragObject.dragObj.x);
	gCSIEDragObject.dragObj.layerObj.style.pixelTop+=(event.clientY-gCSIEDragObject.dragObj.y);
	gCSIEDragObject.dragObj.x=event.clientX;
	gCSIEDragObject.dragObj.y=event.clientY;
	event.returnValue = false;
	event.cancelBubble = true;
}
var gDragArray = new Array();
function CSDrag(action) { gDragArray[gDragArray.length] = new CSSetupDrag(action[1]); }


///* PREFERENCE *///

CSAct['MN1X'] = new Array(CSFlipMove,'LSCLNT',new Array(445,-484),new Array(445,0),true,64);
CSAct['MN2X'] = new Array(CSFlipMove,'LSCLNT2',new Array(445,-484),new Array(445,0),true,64);
CSAct['MN2Y'] = new Array(CSFlipMove,'MENU',new Array(-140,106),new Array(26,106),true,32);
CSAct['LOGO_ABC'] = new Array(CSDrag,'logo');
CSAct[/*CMP*/ 'B8C7B1F30'] = new Array(CSDrag,/*CMP*/ 'logo');
CSAct['MENU2'] = new Array(CSMoveTo,'MENU',new Array(26,106),true,32);
CSAct['MENU3'] = new Array(CSMoveTo,'MENU',new Array(-140,106),true,24);


///* Window Open *///

function OpenWin(fileN,w) {
if (w == "") w = "image";window.open(fileN,w,"toolbar=0,location=0,directories=0,scrollbars=yes,status=0,menubar=0,width=640,height=492,resizable,alwaysRaised")
}

function OpenPhoto(picN,Fwin,picSize) {
if (picSize == "") picSize = "width=670,height=670";
window.open(picN,Fwin,picSize,"toolbar=0,menubar=0,location=0,directories=0,status=0,resizable=1,scrollbars=auto")
}

function OpenDemo(fileN,Fwin) {
window.open(fileN,Fwin,"toolbar=0,location=0,directories=0,scrollbars=no,status=0,menubar=0,width=840,height=640,resizable=1,alwaysRaised")
}

///* Tab *///

function switchTab(id,y){
	var imgObj = (id + "_i");
//	var imgOpen = ("../xtr/" + id + "_o.gif");
//	var imgClose = ("../xtr/" + id + "_f.gif");
	var imgOpen = ("/xtr/pxt.gif");
	var imgClose = ("/xtr/pxt.gif");

//	alert(y);

	if(y == 0 || y < -50){
		document.images[imgObj].src = (imgOpen);
	} else {
		document.images[imgObj].src = (imgClose);
	}

	if (document.images[imgObj].style.cursor == "s-resize") document.images[imgObj].style.cursor = "n-resize";
	else if (document.images[imgObj].style.cursor == "n-resize") document.images[imgObj].style.cursor = "s-resize";
	else if (document.images[imgObj].style.cursor == "w-resize") document.images[imgObj].style.cursor = "e-resize";
	else if (document.images[imgObj].style.cursor == "e-resize") document.images[imgObj].style.cursor = "w-resize";
}

///* wide use functions *///

function getTOP(layName){
	if(document.all)                          //e4,e5,e6,o6
		return document.all(layName).style.pixelTop
	else if(document.getElementById){          //n6,m1
		return (document.getElementById(layName).style.top!="")
		?parseInt(document.getElementById(layName).style.top):""
	} else if(document.layers)                  //n4
		return document.layers[layName].top 
	else return ""
}

function getLEFT(layName){
	if(document.all)                     //e4,e5,e6,o6
		return document.all(layName).style.pixelLeft
	else if(document.getElementById){     //n6,m1
		return (document.getElementById(layName).style.left!="")
		?parseInt(document.getElementById(layName).style.left):""
	} else if(document.layers)             //n4
		return document.layers[layName].left 
	else return ""
}

function CSMoveTo(action) { CSSlideLayer(action[1],action[2],action[3],action[4]); }

function showMenu() {
	CSAction(new Array('MENU2'));
	document.images['MENU_i'].style.cursor = "w-resize";
}
function hideMenu() {
	CSAction(new Array('MENU3'));
	document.images['MENU_i'].style.cursor = "e-resize";
}

CSAction(new Array('MN2Y'));
