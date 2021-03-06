MyNameSpace.langKey=1;
MyNameSpace.currentDiagram=0;
MyNameSpace.showHelp=true;
MyNameSpace.calculateWaiting=true;
MyNameSpace.initialize=function()
{
	MyNameSpace.processes=[];
	if(MyNameSpace.Part=="schedule")
	{
		MyNameSpace.Algorithm="FCFS";
		MyNameSpace.AddRow(-1,"fences",0,3);
		MyNameSpace.AddRow(-1,"calculator",10,5);
		MyNameSpace.AddRow(-1,"chess master",8,8);
		MyNameSpace.AddRow(-1,"mines wipper",11,2);
		MyNameSpace.AddRow(-1,"visual studio",0,4);
		/*AddRow("p0",4,5);
		MyNameSpace.AddRow(-1,"p1",2,3);
		MyNameSpace.AddRow(-1,"p2",1,11);
		MyNameSpace.AddRow(-1,"p3",0,2);
		MyNameSpace.AddRow(-1,"p4",2,5);*/
	}
	else if(MyNameSpace.Part="memory")
	{
		MyNameSpace.Algorithm="first";
		MyNameSpace.AddRow(-1,"fences",0,3,5);
		MyNameSpace.AddRow(-1,"calculator",10,7,3);
		//MyNameSpace.AddRow("chess master",8,15,10);
		MyNameSpace.AddRow(-1,"chess master",8,3,10);
		MyNameSpace.AddRow(-1,"mines wipper",11,2,4);
		MyNameSpace.AddRow(-1,"visual studio",0,7,2);
	}
}
MyNameSpace.ChoosePart=function(p)
{
	MyNameSpace.Part=p;
	MyNameSpace.DrawAlgorithmList(p);
}
MyNameSpace.checkAlgor=function()
{
	var algorRadioList=document.getElementsByClassName('radio_btmRtl');
	if(algorRadioList.length==0)
	{
		algorRadioList=document.getElementsByClassName('radio_btmLtr');
	}
	$.each(algorRadioList, function(index, value) {
		if($(value).is(":checked")){
			MyNameSpace.Algorithm=$(value).val();
		}
	});
}
MyNameSpace.FindProcessById=function(id)
{
	var i=0;
	var found=false;
	for(var index=0;parseInt(index,10)<parseInt(MyNameSpace.numberOfProcesses,10)&&found==false;index++)
	{
		if(MyNameSpace.processes[index].id==id)
		{
			found=true;
			i=index+1;
		}
	}
	return i;
}

MyNameSpace.Start=function()
{
	MyNameSpace.checkAlgor();
	MyNameSpace.ClearPreviousDiagram();
	if(MyNameSpace.Part=="schedule")
	{
		MyNameSpace.Quantum=$('input[id=quanNum]').val();
		MyNameSpace.RunSchedule();
		if(MyNameSpace.currentDiagram==0){MyNameSpace.DrawGantt();}
		else if(MyNameSpace.currentDiagram==1){MyNameSpace.DrawTimeLine();}
	}
	else if(MyNameSpace.Part=="memory")
	{
		MyNameSpace.totalMemory=$('input[id=quanNum]').val();
		MyNameSpace.RunAllocation();
		if(MyNameSpace.currentDiagram==0){MyNameSpace.DrawGantt();}
	}
}

MyNameSpace.ChooseLanguage = function (key)
{
	MyNameSpace.CurrentLang = MyNameSpace.GetLanguageItems(parseInt(key)-1);
	MyNameSpace.langKey=parseInt(key);
	MyNameSpace.SetStaticLanguage(MyNameSpace.CurrentLang);
	MyNameSpace.ChangeDirection();
}

MyNameSpace.ChangeDirection = function()
{
	var algodivs = $("#algo").children().filter('div');
	var setdivs=$("#radio_set").children().filter('div');
	if(parseInt(MyNameSpace.langKey,10)==1||parseInt(MyNameSpace.langKey,10)==4)
	{
		var i,c;
		for(i=0;parseInt(i,10)<algodivs.length-1;i++)
		{
			algodivs[i].setAttribute("class","radioDivRtl");
			c=algodivs[i].childNodes;
			c[0].setAttribute("class","algoRadioLabelRtl");
			c[1].setAttribute("class","radio_btmRtl");
		}
		algodivs[i].setAttribute("class","radioDivRtl");
		var c= algodivs[i].childNodes;
		c[0].setAttribute("class","setLableRtl");
		c[1].setAttribute("class","setContentRtl");
		for(i=0;parseInt(i,10)<setdivs.length;i++)
		{
			c=setdivs[i].getElementsByTagName('div');
			c[0].setAttribute("class","setLableRtl");
			c[1].setAttribute("class","setContentRtl");
		}
		if(MyNameSpace.Part=="schedule")
		{
			
			document.getElementById("showQ").setAttribute("class","showQRtl");
			document.getElementById("showqLabel").setAttribute("class","showqLabelRtl");
		}
		/*
		else if(MyNameSpace.Part=="memory")
		{
			algodivs[i].setAttribute("class","radioDivRtl");
			c=algodivs[i].childNodes;
			c[0].setAttribute("class","algoRadioLabelRtl");
			c[1].setAttribute("class","radio_btmRtl");
		}*/
	}
	else
	{
		var i,c;
		for(i=0;parseInt(i,10)<algodivs.length-1;i++)
		{
			algodivs[i].setAttribute("class","radioDivLtr");
			c=algodivs[i].childNodes;
			c[0].setAttribute("class","algoRadioLabelLtr");
			c[1].setAttribute("class","radio_btmLtr");
		}
		algodivs[i].setAttribute("class","radioDivLtr");
		var c= algodivs[i].childNodes;
		c[0].setAttribute("class","setLableLtr");
		c[1].setAttribute("class","setContentLtr");
		for(i=0;parseInt(i,10)<setdivs.length;i++)
		{
			c=setdivs[i].getElementsByTagName('div');
			c[0].setAttribute("class","setLableLtr");
			c[1].setAttribute("class","setContentLtr");
		}
		if(MyNameSpace.Part=="schedule")
		{
			
			document.getElementById("showQ").setAttribute("class","showQLtr");
			document.getElementById("showqLabel").setAttribute("class","showqLabelLtr");
		}
		/*
		else if(MyNameSpace.Part=="memory")
		{
			algodivs[i].setAttribute("class","radioDivLtr");
			c=algodivs[i].childNodes;
			c[0].setAttribute("class","algoRadioLabelLtr");
			c[1].setAttribute("class","radio_btmLtr");
		}*/
	}
}

MyNameSpace.ChooseDiagram=function(key)
{
	MyNameSpace.currentDiagram=parseInt(key)-1;
}
MyNameSpace.ChooseTheme=function(key){}
MyNameSpace.SetStaticLanguage = function (listItem)
{
	if(MyNameSpace.Part=="schedule")
	{
		var i=7;
    	var childs = $("#procTable thead").children().first().children();
    	for (var j = 0; j < childs.length-1; j++) {
    	    $(childs[j]).html(listItem[i++]);
    	}
    }
    else if(MyNameSpace.Part=="memory")
	{
		var i=7,j;
    	var childs = $("#procTable thead").children().first().children();
    	for (j = 0; j < childs.length-3; j++) {
    	    $(childs[j]).html(listItem[i++]);
    	}
    	$(childs[j++]).html(listItem[53]);
    	$(childs[j]).html(listItem[51]);
	}
    $("#settingTrigger").html(listItem[1]);
    $("#algoTrigger").html(listItem[6]);
    $("#addA").html(listItem[21]);
    $("#emptyA").html(listItem[22]);
    $("#procTable tbody tr .readonlylinks a").html(listItem[24]);
    $("#LangLable").html(listItem[27]);
    $("#DiagramLable").html(listItem[28]);
    $("#QuantumLabel").html(listItem[31]);
    $("#MemoryLabel").html(listItem[52]);
    $("#title1").html(listItem[34]);
    $("#title2").html(listItem[34]);
    $("#help1").html(listItem[35]);
    $("#helpTrigger").html(listItem[35]);
    $("#displaySet").html(listItem[36]);
    $("#ThemeLable").html(listItem[40]);
    childs = $("#selectTheme").children();
    $(childs[1]).html(listItem[41]);
    //$(childs[2]).html(listItem[42]);
    var s1,s2,s3;
	if(document.getElementById("showQ").checked==false){cb1=false;}
	else{cb1=true;}
	s1='<input type="checkbox" id="showQ" value="showQ" style="float:right;width: 13px;height: 13px;padding: 0;margin:0 0 0 10px;vertical-align: bottom;position: relative;top: -1px;*overflow: hidden;" onclick="MyNameSpace.HandleCheckbox(this);"'; //;
	if(document.getElementById("showQ").checked==true){s1+='checked=true';}
	s1+='/>&nbsp;';
    $("#showqLabel").html(s1+listItem[37]);
    if (MyNameSpace.Part == "schedule") {
        var childs = $("#algo").children().filter('div');
        i = 11;
        for (var j = 0; j < childs.length; j++) {
            var tmp = $(childs[j]).children().filter('label');
            tmp.html(listItem[i++]);
        }
    }
    else if (MyNameSpace.Part == "memory")
    {
        i = 17,j;
        var childs = $("#algo").children().filter('div');
        for (j = 0; j < childs.length-1; j++) {
            var tmp = $(childs[j]).children().filter('label');
            tmp.html(listItem[i++]);
        }
        //var tmp = $(childs[j]).children().filter('label');
        //tmp.html(listItem[50]);
    }
    childs = $("#selectDiagram").children();
    $(childs[1]).html(listItem[29]);
    //$(childs[2]).html(listItem[30]);
    MyNameSpace.ChangeDirection();
};

MyNameSpace.HandleCheckbox=function(cb)
{
	if(cb.value=="showQ")
	{
		var element = document.getElementById("gantt");
  		if (element)
  		{
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
			if(cb.checked==true)
			{
				$("#queue").css({"display":"inline"});
				$("#gantt").gantt({
					source: MyNameSpace.ganttData,
					itemsPerPage: 5,
					showHint: showHintt
				});
			}
			else
			{
				$("#queue").css({"display":"none"});
				$("#gantt").gantt({
					source: MyNameSpace.ganttData,
					itemsPerPage: 10,
					showHint: showHintt
				});
			}
		}
	}
}
MyNameSpace.SaveProcesses=function()
{
	MyNameSpace.storedProcesses=[];
	if(MyNameSpace.Part=="memory")
	{
		for(var i=0;i<parseInt(MyNameSpace.processes.length,10);i++)
		{
			var s=new MyNameSpace.process(MyNameSpace.processes[i].name,MyNameSpace.processes[i].entranceTime,MyNameSpace.processes[i].needTime,MyNameSpace.processes[i].memory);
			MyNameSpace.numberOfProcesses--;
			s.id=MyNameSpace.processes[i].id;
			MyNameSpace.storedProcesses.push(s);
		}
	}
	else if(MyNameSpace.Part=="schedule")
	{
		for(var i=0;i<parseInt(MyNameSpace.processes.length,10);i++)
		{
			var s=new MyNameSpace.process(MyNameSpace.processes[i].name,MyNameSpace.processes[i].entranceTime,MyNameSpace.processes[i].serviceTime);
			MyNameSpace.numberOfProcesses--;
			s.id=MyNameSpace.processes[i].id;
			MyNameSpace.storedProcesses.push(s);
		}
	}
}
MyNameSpace.RestoreProcesses=function()
{
	MyNameSpace.processes=[];
	if(MyNameSpace.Part=="memory")
	{
		MyNameSpace.fnCliclEmtyTable();
		for(var i=0;i<parseInt(MyNameSpace.storedProcesses.length,10);i++)
		{
			var s=new MyNameSpace.process(MyNameSpace.storedProcesses[i].name,MyNameSpace.storedProcesses[i].entranceTime,MyNameSpace.storedProcesses[i].needTime,MyNameSpace.storedProcesses[i].memory);
			MyNameSpace.AddRow(MyNameSpace.storedProcesses[i].id,MyNameSpace.storedProcesses[i].name,MyNameSpace.storedProcesses[i].entranceTime,MyNameSpace.storedProcesses[i].needTime,MyNameSpace.storedProcesses[i].memory);
			MyNameSpace.numberOfProcesses--;
		}
	}
	else if(MyNameSpace.Part=="schedule")
	{
		MyNameSpace.fnCliclEmtyTable();
		for(var i=0;i<parseInt(MyNameSpace.storedProcesses.length,10);i++)
		{
			var s=new MyNameSpace.process(MyNameSpace.storedProcesses[i].name,MyNameSpace.storedProcesses[i].entranceTime,MyNameSpace.storedProcesses[i].serviceTime);
			MyNameSpace.AddRow(MyNameSpace.storedProcesses[i].id,MyNameSpace.storedProcesses[i].name,MyNameSpace.storedProcesses[i].entranceTime,MyNameSpace.storedProcesses[i].serviceTime);
			MyNameSpace.numberOfProcesses--;
		}
	}
}