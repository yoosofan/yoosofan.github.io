MyNameSpace.Color = ["ffffff", "eb4f4f", "841385", "e0a7df", "1062a8", "4fa2e1", "a6d3f5", "28c02b", "f7f41a", "92d55c", "90a282"];
MyNameSpace.CurrentLang = new Array();
MyNameSpace.colorIndex=0;
MyNameSpace.index=0;
MyNameSpace.ganttData = location.href.substring(0, location.href.lastIndexOf('/')+1) + "media/js/data.js";
var panelBuilderStr =
$(document).ready(function ()
{
    MyNameSpace.CurrentDiagram=1;
    MyNameSpace.InitialLanguages();
    MyNameSpace.CurrentLang = MyNameSpace.GetLanguageItems(0);
	fnCreateOtable();
	MyNameSpace.initialize();
	MyNameSpace.SetStaticLanguage(MyNameSpace.CurrentLang);
});

MyNameSpace.DrawAlgorithmList=function()
{
	MyNameSpace.ClearAlgorPanel();
	if(MyNameSpace.Part=="schedule")
	{
	    MyNameSpace.fnAddRadioToAlgor("chooseAlgorithm", "FCFS", MyNameSpace.CurrentLang[11], true);
	    MyNameSpace.fnAddRadioToAlgor("chooseAlgorithm", "HRRN", MyNameSpace.CurrentLang[12], false);
	    MyNameSpace.fnAddRadioToAlgor("chooseAlgorithm", "SJF", MyNameSpace.CurrentLang[13], false);
	    MyNameSpace.fnAddRadioToAlgor("chooseAlgorithm", "SRTN", MyNameSpace.CurrentLang[14], false);
	    MyNameSpace.fnAddRadioToAlgor("chooseAlgorithm", "LCFS", MyNameSpace.CurrentLang[15], false);
	    MyNameSpace.fnAddRadioToAlgor("chooseAlgorithm", "RR", MyNameSpace.CurrentLang[16], false);
	}
	else if(MyNameSpace.Part=="memory")
	{
	    MyNameSpace.fnAddRadioToAlgor("chooseAlgorithm", "first", MyNameSpace.CurrentLang[17], true);
	    MyNameSpace.fnAddRadioToAlgor("chooseAlgorithm", "next", MyNameSpace.CurrentLang[18], false);
	    MyNameSpace.fnAddRadioToAlgor("chooseAlgorithm", "best", MyNameSpace.CurrentLang[19], false);
	    MyNameSpace.fnAddRadioToAlgor("chooseAlgorithm", "worst", MyNameSpace.CurrentLang[20], false);
	    //MyNameSpace.fnAddRadioToAlgor("chooseAlgorithm", "buddy", MyNameSpace.CurrentLang[50], false);
	}
	var secondSegment,quantum,qLabel,qSelect,qNum;
	secondSegment=document.getElementById("algo");
	quantum = document.createElement('div');
	quantum.setAttribute("id","Quantum");
	//quantum.setAttribute("style","float:right;");
	qLabel = document.createElement('div');
	qLabel.setAttribute("class","setLable");
	qLabel.setAttribute("style","padding:0 5px;");
	qSelect = document.createElement('div');
	qSelect.setAttribute("id","QuantumSelect");
	qSelect.setAttribute("class","setContent");
	qNum = document.createElement('input');
	qNum.setAttribute("id","quanNum");
	qNum.setAttribute("type","number");
	qNum.setAttribute("min","1");
	if(MyNameSpace.Part=="schedule"){
		qLabel.setAttribute("id","QuantumLabel");
		qLabel.innerHTML="&nbsp;کوانتوم زمانی";
		qNum.setAttribute("max","100");
		qNum.setAttribute("value","2");
	}
	else if(MyNameSpace.Part=="memory"){
		qLabel.setAttribute("id","MemoryLabel");
		qLabel.innerHTML="&nbsp;اندازه حافظه";
		qNum.setAttribute("max","1024");
		//qNum.setAttribute("value","512");
		qNum.setAttribute("value","10");
	}
	qNum.setAttribute("required","true");
	secondSegment.appendChild(quantum);
	quantum.appendChild(qLabel);
	quantum.appendChild(qSelect);
	qSelect.appendChild(qNum);
	MyNameSpace.SetStaticLanguage(MyNameSpace.CurrentLang);
	//var list=$('#algo').children().filter('input');
}

MyNameSpace.ClearAlgorPanel=function()
{
	var secondSegment=document.getElementById("algo");
	secondSegment.innerHTML = '';
}

MyNameSpace.fnRemoveAllRadios=function()
{
	var secondSegment=document.getElementById("algo");
	var radios = secondSegment.getElementsByTagName('input');
	for(var i=0; parseInt(i,10) <parseInt(radios.length,10); i++) 
	{ 
		secondSegment.removeChild(radios[i]);
	}
}

MyNameSpace.fnAddRadioToAlgor=function(Rname,Rvalue,str,checked)
{
	var secondSegment=document.getElementById("algo");
	var div1= document.createElement('div');
	var radio1= document.createElement('input');
	var label1= document.createElement('label');
	div1.setAttribute("class","radioDivRtl");
	radio1.setAttribute("type","radio");
	radio1.setAttribute("name",Rname);
	radio1.setAttribute("value",Rvalue);
	radio1.setAttribute("class","radio_btmRtl algorRadio");
	//radio1.setAttribute("float","right");
	
	if(checked==true)
	{
		radio1.setAttribute("checked","checked");
	}
	label1.innerHTML=str;
	label1.setAttribute("class","algoRadioLabelRtl");
	div1.appendChild(label1);
	div1.appendChild(radio1);
	secondSegment.appendChild(div1);
	//secondSegment.innerHTML+="<span>"+str+"</span>";
	secondSegment.appendChild(document.createElement('br'));
	secondSegment.appendChild(document.createElement('br'));
}
MyNameSpace.ClearPreviousDiagram=function()
{
	var element = document.getElementById("about");
  	if (element && element.parentNode) {element.parentNode.removeChild(element);}
    else
	{
		element = document.getElementById("ganttContainer");
		if (element && element.parentNode) {
    		element.parentNode.removeChild(element);
    	}
	}
}
MyNameSpace.DrawTimeLine=function()
{
	var mainContent=document.getElementById("mainContent");
	var timeline=document.createElement('div');
	var queue=document.createElement('div');
	var dates=document.createElement('ul');
	var issues=document.createElement('ul');
	var grad_top=document.createElement('div');
	var grad_bottom=document.createElement('div');
	var nextt=document.createElement('a');
	var prevv=document.createElement('a');
	timeline.setAttribute("id","timeline");
	queue.setAttribute("id","queue");
	queue.setAttribute("class","timelineQueue");
	if(document.getElementById("showQ").checked==false)
	{
		queue.setAttribute("style","display:none");
	}
	dates.setAttribute("id","dates");
	issues.setAttribute("id","issues");
	grad_top.setAttribute("id","grad_top");
	grad_bottom.setAttribute("id","grad_bottom");
	nextt.setAttribute("id","next");
	nextt.setAttribute("href","#");
	nextt.innerHTML = "+";
	prevv.setAttribute("id","prev");
	prevv.setAttribute("href","#");
	prevv.innerHTML = "-";
	mainContent.appendChild(queue);
	mainContent.appendChild(timeline);
	timeline.appendChild(dates);
	timeline.appendChild(issues);
	timeline.appendChild(grad_top);
	timeline.appendChild(grad_bottom);
	timeline.appendChild(nextt);
	timeline.appendChild(prevv);
	var first=true;
	for(MyNameSpace.index=0;parseInt(MyNameSpace.index,10)<parseInt(MyNameSpace.timeLine.length,10);MyNameSpace.index++)
	{
		MyNameSpace.DrawTimeEntry(first);
	}
	$().timelinr({
		orientation: 	'vertical',
		issuesSpeed: 	300,
		datesSpeed: 	100,
		arrowKeys: 		'true',
		startAt:		1
	});
}

MyNameSpace.DrawTimeEntry=function(first)
{
		var dates=document.getElementById("dates");
		var issues=document.getElementById("issues");
		var li1=document.createElement('li');
		var a1=document.createElement('a');
		var li2=document.createElement('li');
		var img1=document.createElement('img');
		var h11=document.createElement('h1');
		var p1=document.createElement('p');
		var p2=document.createElement('p');
		var id=MyNameSpace.timeLine[MyNameSpace.index].id;
		var code=-1;
		var palce;
		a1.setAttribute("href","#"+MyNameSpace.index);
		if(first==true){a1.setAttribute("class","selected");}
		a1.innerHTML=MyNameSpace.index;
		li2.setAttribute("id",MyNameSpace.index);
		if(parseInt(id,10)!=-1)
		{
			var remaining=parseInt(MyNameSpace.timeLine[MyNameSpace.index].remainingTime,10)-1;
			place=MyNameSpace.FindProcessById(id);
			place--;
			code=(parseInt(MyNameSpace.processes[place].serviceTime,10)-remaining)/parseInt(MyNameSpace.processes[place].serviceTime,10)*6;
			code=parseInt(code,10);
			h11.innerHTML=MyNameSpace.processes[place].name;
			p1.innerHTML=MyNameSpace.CurrentLang[32]+":\t"+remaining.toString();
			p2.innerHTML=MyNameSpace.CurrentLang[33]+":\t"+MyNameSpace.timeLine[MyNameSpace.index].waitingTime;
		}
		else
		{
			h11.innerHTML="free";
			p1.innerHTML="";
			p2.innerHTML="";
		}
		if(code==-1){img1.setAttribute("src","media/images/free.png");}
		else{img1.setAttribute("src","media/images/clock"+code.toString()+".png");}
		img1.setAttribute("width","160");
		img1.setAttribute("height","160");
		dates.appendChild(li1);
		issues.appendChild(li2);
		li1.appendChild(a1);
		li2.appendChild(img1);
		li2.appendChild(h11);
		li2.appendChild(p1);
		if(MyNameSpace.calculateWaiting==true){li2.appendChild(p2);}
}
MyNameSpace.DrawGantt=function()
{
	var mainContent=document.getElementById("mainContent");
	var gantt=document.createElement('div');
	var ganttContainer=document.createElement('div');
	var queue=document.createElement('div');
	var table=document.getElementById("table");
	gantt.setAttribute("id","gantt");
	gantt.setAttribute("class","gantt");
	ganttContainer.setAttribute("id","ganttContainer");
	ganttContainer.setAttribute("class","ganttContainer");
	queue.setAttribute("id","queue");
	queue.setAttribute("class","ganttQueue");
	if(document.getElementById("showQ").checked==false)
	{
		queue.setAttribute("style","display:none");
	}
	ganttContainer.appendChild(gantt);
	if(MyNameSpace.Part=="schedule")
	{
		var result=document.createElement('div');
		result.setAttribute("id","resultBox");
		result.setAttribute("class","resultBox");
		result.innerHTML = "<b>"+MyNameSpace.CurrentLang[46]+" :</b> "+MyNameSpace.averageWaiting+"<br/><b>"+MyNameSpace.CurrentLang[47]+" :</b> "+MyNameSpace.cpuBusyPercentage+"<br/><b>"+MyNameSpace.CurrentLang[48]+" :</b> "+MyNameSpace.minimumWaitTime+"<br/><b>"+MyNameSpace.CurrentLang[49]+" :</b> "+MyNameSpace.minimumResponseTime;
		ganttContainer.appendChild(result);
	}
	mainContent.appendChild(ganttContainer);
	$("html, body").animate({ scrollTop: $(document).height() }, "slow");
	if(MyNameSpace.Part=="schedule")
	{
		MyNameSpace.ganttData = MyNameSpace.GetTimelineAsJson();
	}
	else if(MyNameSpace.Part=="memory")
	{
		MyNameSpace.ganttData = MyNameSpace.GetMemoryLogAsJson();
	}
	var showHintt=false;
	if(MyNameSpace.calculateWaiting==true)
		showHintt=true;
	if(document.getElementById("showQ").checked==false)
	{
		$(".gantt").gantt({
			source: MyNameSpace.ganttData,
			itemsPerPage: 10,
			showHint: showHintt
		});
	}
	else
	{
		$(".gantt").gantt({
			source: MyNameSpace.ganttData,
			itemsPerPage: 5,
			showHint: showHintt
		});
	}
}