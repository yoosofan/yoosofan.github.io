var MyNameSpace={};
MyNameSpace.numberOfProcesses=0;
MyNameSpace.memoryView;//current state of memory
MyNameSpace.memoryLog;//all of memory states
MyNameSpace.processes;
MyNameSpace.storedProcesses=[];
MyNameSpace.queues;
MyNameSpace.timePassed;
MyNameSpace.lastID=1;
MyNameSpace.Part="";
MyNameSpace.totalMemory=32;
MyNameSpace.prevLoc=-1;
MyNameSpace.externalFragment;
var lastPos;
MyNameSpace.process=function(name,entranceTime,needTime,memory)
{
	this.id=MyNameSpace.lastID;
	this.name=name||"p"+MyNameSpace.lastID;
	this.alocTime=-1;
	this.entranceTime=0||entranceTime;
	this.needTime=needTime||0;
	this.locStartPos=-1;
	this.memory=memory;
	this.state="waiting";//enum{waiting,inside,gone}
	MyNameSpace.numberOfProcesses++;
	MyNameSpace.lastID++;
}
MyNameSpace.UpdateProcess=function(id,name,enterance,need,memory){
	var i;
	for(i=0;parseInt(i,10)<parseInt(MyNameSpace.numberOfProcesses,10);i++)
	{
		if(MyNameSpace.processes[i].id==id)
		{
			MyNameSpace.processes[i].name=name;
			MyNameSpace.processes[i].entranceTime=enterance;
			MyNameSpace.processes[i].alocTime=-1;
			MyNameSpace.processes[i].locStartPos=-1;
			MyNameSpace.processes[i].needTime=need;
			MyNameSpace.processes[i].memory=memory;
			MyNameSpace.processes[i].state="waiting";
			break;
		}
	}
}
MyNameSpace.UpdateAllProcesses=function()
{
	for(i=0;parseInt(i,10)<parseInt(MyNameSpace.numberOfProcesses,10);i++)
	{
		//MyNameSpace.processes[i].remainingTime=MyNameSpace.processes[i].serviceTime;
		MyNameSpace.processes[i].state="waiting";
		MyNameSpace.processes[i].alocTime=-1;
		MyNameSpace.processes[i].locStartPos=-1;
	}
	MyNameSpace.OrderBy("init","");
}
MyNameSpace.AllProcessesAreAllocated=function()
{
	for(var i=0;i<MyNameSpace.numberOfProcesses;i++)
		if(MyNameSpace.processes[i].state=="waiting")
			return false;
	return true;
}
MyNameSpace.OrderBy=function(param,order)
{
	try
	{
		for(var i=0;i<MyNameSpace.numberOfProcesses-1;i++)
		{
			for(var j=i+1;j<MyNameSpace.numberOfProcesses;j++)
			{
				if(param=="init"&&(MyNameSpace.processes[i].id>MyNameSpace.processes[j].id))
				{
					var t=MyNameSpace.processes[j];
					MyNameSpace.processes[j]=MyNameSpace.processes[i];
					MyNameSpace.processes[i]=t;
				}
			}
		}
	}
	catch(er)
	{
		alert(er.message);
	}
}
MyNameSpace.RunAllocation=function()
{
	lastPos=0;
	MyNameSpace.externalFragment=0;
	MyNameSpace.prevLoc=-1;
	MyNameSpace.UpdateAllProcesses();
	MyNameSpace.memoryLog=[];
	MyNameSpace.memoryView=[];
	for(var i=0;parseInt(i,10)<parseInt(MyNameSpace.totalMemory,10);i++)
	{
		MyNameSpace.memoryView[i]=-1;
	}
	MyNameSpace.OrderBy("init","");
	for(MyNameSpace.timePassed=0;!MyNameSpace.AllProcessesAreAllocated();MyNameSpace.timePassed++)
	{
		var hasChanged=false;
		for(var i=0;parseInt(i,10)<parseInt(MyNameSpace.numberOfProcesses,10);i++)
		{
			if(MyNameSpace.processes[i].state=="inside"&&(parseInt(MyNameSpace.processes[i].alocTime,10)+parseInt(MyNameSpace.processes[i].needTime,10)==parseInt(MyNameSpace.timePassed,10)))
			{
				hasChanged=true;
				//free memory and change state to gone
				for(var j=0;parseInt(j,10)<parseInt(MyNameSpace.processes[i].memory,10);j++)
				{
					MyNameSpace.memoryView[MyNameSpace.processes[i].locStartPos+j]=-1;
				}
				MyNameSpace.processes[i].state="gone";
			}
		}
		for(var i=0;parseInt(i,10)<parseInt(MyNameSpace.numberOfProcesses,10);i++)
		{
			if(MyNameSpace.processes[i].state=="waiting"&&parseInt(MyNameSpace.processes[i].entranceTime,10)<=parseInt(MyNameSpace.timePassed,10))
			{
				var startPos=0;
				if(MyNameSpace.Algorithm=="first"){startPos=MyNameSpace.FirstFit(i);}
				if(MyNameSpace.Algorithm=="next"){startPos=MyNameSpace.NextFit(i);}
				if(MyNameSpace.Algorithm=="best"){startPos=MyNameSpace.BestFit(i);}
				if(MyNameSpace.Algorithm=="worst"){startPos=MyNameSpace.WorstFit(i);}
				if(MyNameSpace.Algorithm=="body"){startPos=MyNameSpace.SystemBuddy(i);}
				if(startPos>=0)
				{
					hasChanged=true;
					for(var j=0;parseInt(j,10)<parseInt(MyNameSpace.processes[i].memory,10);j++)
					{
						MyNameSpace.memoryView[startPos+j]=MyNameSpace.processes[i].id;
					}
					MyNameSpace.processes[i].state="inside";
					MyNameSpace.processes[i].locStartPos=startPos;
					MyNameSpace.processes[i].alocTime=MyNameSpace.timePassed;
					lastPos=parseInt(MyNameSpace.processes[i].locStartPos,10)+parseInt(MyNameSpace.processes[i].memory,10);
				}
			}
		}
		if(hasChanged==true)
		{
			var s=[];
			s[0]=MyNameSpace.timePassed;
			s[1]=[];
			for(var k=0;parseInt(k,10)<parseInt(MyNameSpace.memoryView.length,10);k++)
			{
				s[1][k]=MyNameSpace.memoryView[k];
			}
			MyNameSpace.memoryLog.push(s);
		}
	}
}
MyNameSpace.FirstFit=function(index)
{
	var locStart=-1;
	var first=0,last=0;
	var success=false;
	for(;parseInt(first,10)<parseInt(MyNameSpace.totalMemory,10)&&success==false;first++)
	{
		fail=false;
		if(parseInt(MyNameSpace.memoryView[first],10)==-1)
		{
			for(var i=0;parseInt(i,10)<MyNameSpace.processes[index].memory;i++)
			{
				if(parseInt(MyNameSpace.memoryView[first+i],10)!=-1)
				{
					fail=true;
					break;
				}
			}
			if(fail==false)
			{
				success=true;
				locStart=first;
			}
		}
	}
	return locStart;
}
MyNameSpace.NextFit=function(index)
{
	var locStart=-1;
	var first=lastPos,last=lastPos;
	var success=false;
	var i=0;
	for(;parseInt(first,10)<parseInt(MyNameSpace.totalMemory,10)&&success==false;first++)
	{
		fail=false;
		if(parseInt(MyNameSpace.memoryView[first],10)==-1)
		{
			for(i=0;((first+i)<parseInt(MyNameSpace.totalMemory,10))&&(parseInt(i,10)<parseInt(MyNameSpace.processes[index].memory,10));i++)
			{
				if(parseInt(MyNameSpace.memoryView[first+i],10)!=-1)
				{
					break;
				}
			}
			if(i==parseInt(MyNameSpace.processes[index].memory,10))
			{
				success=true;
				locStart=first;
			}
		}
	}
	if((i<parseInt(MyNameSpace.processes[index].memory,10))&&success==false&&lastPos>0)
	{
		for(first=0;parseInt(first,10)<parseInt(lastPos,10)&&success==false;first++)
		{
			if(parseInt(MyNameSpace.memoryView[first],10)==-1)
			{
				for(i=0;((first+i)<parseInt(MyNameSpace.totalMemory,10))&&parseInt(i,10)<MyNameSpace.processes[index].memory;i++)
				{
					if(parseInt(MyNameSpace.memoryView[first+i],10)!=-1)
					{
						break;
					}
				}
				if(i==parseInt(MyNameSpace.processes[index].memory,10))
				{
					success=true;
					locStart=first;
				}
			}
		}
	}
	return locStart;
}
MyNameSpace.BestFit=function(index)
{
	var first=0,last=0;
	var success=false;
	var minSize=MyNameSpace.totalMemory+1,minPos=-1;
	for(;parseInt(first,10)<parseInt(MyNameSpace.totalMemory,10);first++)
	{
		fail=false;
		if(parseInt(MyNameSpace.memoryView[first],10)==-1)
		{
			var size=0;
			for(var i=first;parseInt(i,10)<parseInt(MyNameSpace.totalMemory,10)&&parseInt(MyNameSpace.memoryView[i],10)==-1;i++)
			{
				size++;
			}
			if(parseInt(size,10)<parseInt(minSize,10)&&parseInt(size,10)>=parseInt(MyNameSpace.processes[index].memory,10))
			{
				minSize=size;
				minPos=first;
			}
			first+=size;
		}
	}
	return minPos;
}
MyNameSpace.WorstFit=function(index)
{
	var first=0,last=0;
	var success=false;
	var maxSize=0,maxPos=-1;
	for(;parseInt(first,10)<parseInt(MyNameSpace.totalMemory,10);first++)
	{
		fail=false;
		if(parseInt(MyNameSpace.memoryView[first],10)==-1)
		{
			var size=0;
			for(var i=first;parseInt(i,10)<parseInt(MyNameSpace.totalMemory,10)&&parseInt(MyNameSpace.memoryView[i],10)==-1;i++)
			{
				size++;
			}
			if(parseInt(size,10)>parseInt(maxSize,10)&&parseInt(size,10)>=parseInt(MyNameSpace.processes[index].memory,10))
			{
				maxSize=size;
				maxPos=first;
			}
			first+=size;
		}
	}
	return maxPos;
}
MyNameSpace.BuddySystem=function(index){return 0;}
MyNameSpace.GetMemoryLogAsJson=function()
{
	var resultObj = [];
	for(var i=0;parseInt(i,10)<parseInt(MyNameSpace.memoryLog.length,10);i++)
	{
		var valuesObj=[],statis="",memory,timee;
		timee=MyNameSpace.memoryLog[i][0];
		memory=MyNameSpace.memoryLog[i][1];
		for(var j=0;parseInt(j,10)<parseInt(memory.length,10);)
		{
			if(parseInt(memory[j],10)!=-1)
			{
				var index=parseInt(MyNameSpace.FindProcessById(memory[j]),10)-1;
				var k=parseInt(j,10)+parseInt(MyNameSpace.processes[index].memory,10);
				valuesObj.push({"from" : "/String(" + j + ")/" , "to" : "/String(" + (k-1) + ")/" , "desc" : "<b>"+MyNameSpace.processes[index].id + "</b>" });
				j=k;
			}
			else j++;
		}
		resultObj.push({"id" : "" , "name" : MyNameSpace.memoryLog[i][0] , "statistic" : statis , "values" : valuesObj});
	}
	return resultObj;
}