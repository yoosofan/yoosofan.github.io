/*
	*this file consists of functions which are needed for time scheduling algorithms
	*each algorithm has a function with the same name (function RR() and etc), which renews and fills timeLine array. we use this timeLine array
	*to draw gantt diagram.
	*there are 4 other functions : 1) process: the prototype of processes. 2) initialize: initializes some of MyNameSpace variables needed in scheduling
	algorithms. 3) OrderBy: sorts processes array based on given parameter and order. 4) AllProcessesAreDone: checks if all processes are done!!!!
*/
var MyNameSpace={};
var idleTime;
var busyTime;
MyNameSpace.numberOfProcesses=0;
MyNameSpace.timeLine;
MyNameSpace.processes;
MyNameSpace.storedProcesses=[];
MyNameSpace.queues;
MyNameSpace.timePassed;
MyNameSpace.lastID=1;
MyNameSpace.Part="";
MyNameSpace.Quantum=2;
MyNameSpace.averageWaiting=0;
MyNameSpace.cpuBusyPercentage=0;
MyNameSpace.minimumWaitTime=0;
MyNameSpace.minimumResponseTime=0;
MyNameSpace.process=function(name,entranceTime,serviceTime)
{
	this.id=MyNameSpace.lastID;
	this.name=name||"p"+MyNameSpace.lastID;
	this.startTime=-1;
	this.waitTime=0;
	this.responseTime=0;
	this.entranceTime=0||entranceTime;
	this.serviceTime=serviceTime||0;
	this.remainingTime=this.serviceTime;
	this.lastResponseTime=-1;
	this.done=false;
	MyNameSpace.numberOfProcesses++;
	MyNameSpace.lastID++;
}
MyNameSpace.timeEntry=function(id,remainingTime)
{
	this.id=id;
	this.waitingTime=MyNameSpace.CalculateWaitingTime(id);
	this.remainingTime=remainingTime||0;
}
MyNameSpace.CalculateWaitingTime=function(id)
{
	var index,result,found;
	if(MyNameSpace.calculateWaiting==false||id==-1)
		return 0;
	index=parseInt(MyNameSpace.FindProcessById(id),10)-1;
	if(index==-1)
		return 0;
	result=0;
	found=false;
	for(var i=(parseInt(MyNameSpace.timePassed,10)-1);parseInt(i,10)>=0&&found==false;i--)
	{
		if(MyNameSpace.timeLine[i].id==id)
		{
			found=true;
			var allied=true;
			for(var s=i;parseInt(s,10)<parseInt(MyNameSpace.timeLine.length,10)&&allied==true;s++)
			{
				if(MyNameSpace.timeLine[s].id!=id){allied=false;}
			}
			if(allied==false){result=MyNameSpace.timePassed-i-1;}
			else{result=MyNameSpace.timeLine[i].waitingTime;}
		}
	}
	if(found==false)
		result=MyNameSpace.timePassed-MyNameSpace.processes[index].entranceTime;
	
	return result;
}
MyNameSpace.UpdateProcess=function(id,name,enterance,service){
	var i;
	for(i=0;parseInt(i,10)<parseInt(MyNameSpace.numberOfProcesses,10);i++)
	{
		if(MyNameSpace.processes[i].id==id)
		{
			MyNameSpace.processes[i].name=name;
			MyNameSpace.processes[i].entranceTime=enterance;
			MyNameSpace.processes[i].serviceTime=service;
			MyNameSpace.processes[i].remainingTime=service;
			MyNameSpace.processes[i].lastResponseTime=-1;
			MyNameSpace.processes[i].startTime=-1;
			MyNameSpace.processes[i].done=false;
			break;
		}
	}
}

MyNameSpace.UpdateAllProcesses=function()
{
	for(i=0;parseInt(i,10)<parseInt(MyNameSpace.numberOfProcesses,10);i++)
	{
		MyNameSpace.processes[i].remainingTime=MyNameSpace.processes[i].serviceTime;
		MyNameSpace.processes[i].lastResponseTime=-1;
		MyNameSpace.processes[i].done=false;
		MyNameSpace.processes[i].startTime=-1;
		MyNameSpace.processes[i].waitTime=0;
		MyNameSpace.processes[i].responseTime=0;
	}
	MyNameSpace.OrderBy("init","");
}
MyNameSpace.RunSchedule=function()
{
	var waitSum=0;
	MyNameSpace.timePassed=0;
	idleTime=0;
	busyTime=0;
	MyNameSpace.timeLine=[];
	MyNameSpace.queues=[];
	MyNameSpace.UpdateAllProcesses();
	MyNameSpace.minimumWaitTime=0;
	MyNameSpace.minimumResponseTime=0;
	if(MyNameSpace.Algorithm=="FCFS"){MyNameSpace.FCFS();}
	else if(MyNameSpace.Algorithm=="RR"){MyNameSpace.RR();}
	else if (MyNameSpace.Algorithm=="LCFS"){MyNameSpace.LCFS();}
	else if(MyNameSpace.Algorithm=="SJF"){MyNameSpace.SJF();}
	else if(MyNameSpace.Algorithm=="SRTN"){MyNameSpace.SRTN();}
	else if(MyNameSpace.Algorithm=="HRRN"){MyNameSpace.HRRN();}
	MyNameSpace.minimumWaitTime=MyNameSpace.processes[0].waitTime;
	MyNameSpace.minimumResponseTime=MyNameSpace.processes[0].responseTime;
	for(var i=1;i<MyNameSpace.processes.length;i++)
	{
		waitSum+=MyNameSpace.processes[i].waitTime;
		if(MyNameSpace.minimumWaitTime > MyNameSpace.processes[i].waitTime)
		{
			MyNameSpace.minimumWaitTime = MyNameSpace.processes[i].waitTime;
		}
		if(MyNameSpace.minimumResponseTime > MyNameSpace.processes[i].responseTime)
		{
			MyNameSpace.minimumResponseTime = MyNameSpace.processes[i].responseTime;
		}
	}
	MyNameSpace.averageWaiting=Math.floor(waitSum/MyNameSpace.numberOfProcesses).toFixed(2);
	MyNameSpace.cpuBusyPercentage=Math.floor(busyTime*100/MyNameSpace.timePassed).toFixed(2)+"%";
}
MyNameSpace.FCFS=function()
{
	try
	{
		MyNameSpace.UpdateAllProcesses();
		MyNameSpace.OrderBy("start","ascending");
	}
	catch(err)
	{
		alert(err.message);
	}
	for(var index=0;parseInt(index,10)<parseInt(MyNameSpace.numberOfProcesses,10);index++)
	{
		for(;parseInt(MyNameSpace.processes[index].entranceTime,10)>parseInt(MyNameSpace.timePassed,10);MyNameSpace.timePassed++)
		{
			MyNameSpace.queues.push(new Array());
			var te=new MyNameSpace.timeEntry(-1,-1);
			MyNameSpace.timeLine.push(te);
			idleTime++;
			
		}
		MyNameSpace.processes[index].waitTime=MyNameSpace.timePassed-MyNameSpace.processes[index].entranceTime;
		MyNameSpace.processes[index].startTime = MyNameSpace.timePassed;
		for(var t=MyNameSpace.timePassed;parseInt(t,10)<parseInt(MyNameSpace.timePassed+parseInt(MyNameSpace.processes[index].serviceTime,10),10);t++)
		{
			MyNameSpace.CreateQueueForTime(t);
			if(parseInt(MyNameSpace.processes[index].startTime,10)==-1)MyNameSpace.processes[index].startTime=MyNameSpace.timePassed;
			var te=new MyNameSpace.timeEntry(MyNameSpace.processes[index].id,MyNameSpace.processes[index].remainingTime);
			MyNameSpace.timeLine.push(te);
			MyNameSpace.processes[index].remainingTime--;
			busyTime++;
		}
		MyNameSpace.timePassed+=parseInt(MyNameSpace.processes[index].serviceTime,10);
		MyNameSpace.processes[index].responseTime = MyNameSpace.processes[index].startTime + MyNameSpace.processes[index].serviceTime;
		MyNameSpace.processes[index].done=true;
	}
}

MyNameSpace.SJF=function()
{
	try
	{
		MyNameSpace.UpdateAllProcesses();
		MyNameSpace.OrderBy("service","ascending");
		while(MyNameSpace.AllProcessesAreDone()==false)
		{
			var foundAProcess=false;
			var index;
			for(index=0;parseInt(index,10)<parseInt(MyNameSpace.numberOfProcesses,10);index++)
			{
				if(parseInt(MyNameSpace.processes[index].entranceTime,10)<=parseInt(MyNameSpace.timePassed,10)&&MyNameSpace.processes[index].done==false)
				{
					foundAProcess=true;
					break;
				}
			}
			if(foundAProcess==false)
			{
				MyNameSpace.queues.push(new Array());
				var te=new MyNameSpace.timeEntry(-1,-1);
				MyNameSpace.timeLine.push(te);
				MyNameSpace.timePassed++;
				idleTime++;
			}
			else
			{
				var tmp=MyNameSpace.processes[index].serviceTime;
				MyNameSpace.processes[index].waitTime=MyNameSpace.timePassed-MyNameSpace.processes[index].entranceTime;
				MyNameSpace.processes[index].startTime=MyNameSpace.timePassed;
				for(var i=MyNameSpace.timePassed;parseInt(i,10)<parseInt(parseInt(MyNameSpace.timePassed,10)+parseInt(tmp,10),10);i++)
				{
					MyNameSpace.CreateQueueForTime(i);
					if(parseInt(MyNameSpace.processes[index].startTime,10)==-1)MyNameSpace.processes[index].startTime=MyNameSpace.timePassed;
					var te=new MyNameSpace.timeEntry(MyNameSpace.processes[index].id,MyNameSpace.processes[index].remainingTime);
					MyNameSpace.timeLine.push(te);
					MyNameSpace.processes[index].remainingTime--;
					busyTime++;
				}
				MyNameSpace.timePassed+=parseInt(tmp,10);
				MyNameSpace.processes[index].responseTime = MyNameSpace.processes[index].startTime + MyNameSpace.processes[index].serviceTime;
				MyNameSpace.processes[index].done=true;
			}
		}
	}
	catch(err)
	{
		alert(err.message);
	}
}

MyNameSpace.RR=function()
{
	try
	{
		MyNameSpace.UpdateAllProcesses();
		MyNameSpace.OrderBy("start","ascending");
		while(MyNameSpace.AllProcessesAreDone()==false)
		{
			var foundAProcess=false;
			var index;
			for(index=0;parseInt(index,10)<parseInt(MyNameSpace.numberOfProcesses,10);index++)
			{
				if(parseInt(MyNameSpace.processes[index].entranceTime,10)<=parseInt(MyNameSpace.timePassed,10)&&MyNameSpace.processes[index].done==false)
				{
					foundAProcess=true;
					break;
				}
			}
			if(foundAProcess==false)
			{
				MyNameSpace.queues.push(new Array());
				var te=new MyNameSpace.timeEntry(-1,-1);
				MyNameSpace.timeLine.push(te);
				MyNameSpace.timePassed++;
				idleTime++;
			}
			else
			{
				var lessThanQuantom=false;
				if(parseInt(MyNameSpace.processes[index].remainingTime,10)<parseInt(MyNameSpace.Quantum,10))
				{
					lessThanQuantom=true;
				}
				if(lessThanQuantom)
				{
					var tmp=MyNameSpace.processes[index].remainingTime;
					for(var i=MyNameSpace.timePassed;parseInt(i,10)<parseInt(MyNameSpace.timePassed+tmp,10);i++)
					{
						MyNameSpace.CreateQueueForTime(i);
						if(parseInt(MyNameSpace.processes[index].startTime,10)==-1)MyNameSpace.processes[index].startTime=MyNameSpace.timePassed;
						var te=new MyNameSpace.timeEntry(MyNameSpace.processes[index].id,MyNameSpace.processes[index].remainingTime);
						MyNameSpace.timeLine.push(te);
						MyNameSpace.processes[index].remainingTime--;
						busyTime++;
					}
					MyNameSpace.timePassed+=parseInt(tmp,10);
				}
				else
				{
					for(var i=MyNameSpace.timePassed;parseInt(i,10)<parseInt(MyNameSpace.timePassed+parseInt(MyNameSpace.Quantum,10),10);i++)
					{
						MyNameSpace.CreateQueueForTime(i);
						if(parseInt(MyNameSpace.processes[index].startTime,10)==-1)MyNameSpace.processes[index].startTime=MyNameSpace.timePassed;
						var te=new MyNameSpace.timeEntry(MyNameSpace.processes[index].id,MyNameSpace.processes[index].remainingTime);
						MyNameSpace.timeLine.push(te);
						MyNameSpace.processes[index].remainingTime--;
						busyTime++;
					}
					MyNameSpace.timePassed+=parseInt(MyNameSpace.Quantum,10);
				}
				MyNameSpace.processes[index].lastResponseTime=parseInt(MyNameSpace.timePassed,10);
				if(parseInt(MyNameSpace.processes[index].remainingTime,10)===0)
					MyNameSpace.processes[index].done=true;
			}
			MyNameSpace.OrderBy("response","ascending");
		}
		for(var i=0;i<MyNameSpace.timePassed;i++)
		{
			var id=MyNameSpace.timeLine[i].id;
			var index = parseInt(MyNameSpace.FindProcessById(id),10)-1;
			if(index!=-1)
			{
				if((MyNameSpace.processes[index].responseTime==0)&&(MyNameSpace.timeLine[i+1].id!=id))
				{
					MyNameSpace.processes[index].responseTime=i+1;
				}
				if(i==0||(MyNameSpace.timeLine[i-1].id!=id))
				{
					MyNameSpace.processes[index].waitTime+=MyNameSpace.timeLine[i].waitingTime;
				}
			}
		}
	}
	catch(err)
	{
		alert(err.message);
	}
}
MyNameSpace.HRRN=function()
{
	var index;
	try
	{
		MyNameSpace.UpdateAllProcesses();
		MyNameSpace.OrderBy("hrrn","ascending");
	}
	catch(er)
	{
		alert(er.message);
	}
	try
	{
		while(MyNameSpace.AllProcessesAreDone()==false)
		{
			var foundAProcess=false;
			
			for(index=0;parseInt(index,10)<parseInt(MyNameSpace.numberOfProcesses,10);index++)
			{
				if(parseInt(MyNameSpace.processes[index].entranceTime,10)<=parseInt(MyNameSpace.timePassed,10)&&MyNameSpace.processes[index].done==false)
				{
					foundAProcess=true;
					break;
				}
			}
			if(foundAProcess==false)
			{
				MyNameSpace.queues.push(new Array());
				var te=new MyNameSpace.timeEntry(-1,-1);
				MyNameSpace.timeLine.push(te);
				MyNameSpace.timePassed++;
				idleTime++;
			}
			else
			{
				MyNameSpace.processes[index].waitTime=parseInt(MyNameSpace.timePassed,10)-parseInt(MyNameSpace.processes[index].entranceTime,10);
				for(var i=MyNameSpace.timePassed;parseInt(i,10)<parseInt(parseInt(MyNameSpace.timePassed,10)+parseInt(MyNameSpace.processes[index].serviceTime,10),10);i++)
				{
					MyNameSpace.CreateQueueForTime(MyNameSpace.timePassed);
					if(parseInt(MyNameSpace.processes[index].startTime,10)==-1)MyNameSpace.processes[index].startTime=MyNameSpace.timePassed;
					var te=new MyNameSpace.timeEntry(MyNameSpace.processes[index].id,MyNameSpace.processes[index].remainingTime);
					MyNameSpace.timeLine.push(te);
					MyNameSpace.processes[index].remainingTime--;
					busyTime++;
				}
				MyNameSpace.timePassed+=parseInt(MyNameSpace.processes[index].serviceTime,10);
				MyNameSpace.processes[index].responseTime=MyNameSpace.timePassed;
				if(parseInt(MyNameSpace.processes[index].remainingTime,10)==0)
					MyNameSpace.processes[index].done=true;
			}
			//calculate wait time for all processes
			for(var i=0;parseInt(i,10)<parseInt(MyNameSpace.numberOfProcesses,10);i++)
			{
				if(parseInt(MyNameSpace.processes[i].entranceTime,10)<=parseInt(MyNameSpace.timePassed,10)&&MyNameSpace.processes[i].done==false)
				{
					MyNameSpace.processes[i].waitTime=parseInt(MyNameSpace.timePassed,10)-parseInt(MyNameSpace.processes[i].entranceTime,10);
				}
			}
			MyNameSpace.OrderBy("hrrn","ascending");
		}
	}
	catch(er)
	{
		alert(er.message);
	}
}
MyNameSpace.SRTN=function()
{
	var index;
	try
	{
		MyNameSpace.UpdateAllProcesses();
		MyNameSpace.OrderBy("remaining","ascending");
	}
	catch(er)
	{
		alert(er.message);
	}
	try
	{
		while(MyNameSpace.AllProcessesAreDone()==false)
		{
			var foundAProcess=false;
			
			for(index=0;parseInt(index,10)<parseInt(MyNameSpace.numberOfProcesses,10);index++)
			{
				if(parseInt(MyNameSpace.processes[index].entranceTime,10)<=parseInt(MyNameSpace.timePassed,10)&&MyNameSpace.processes[index].done==false)
				{
					foundAProcess=true;
					break;
				}
			}
			if(foundAProcess==false)
			{
				MyNameSpace.queues.push(new Array());
				var te=new MyNameSpace.timeEntry(-1,-1);
				MyNameSpace.timeLine.push(te);
				idleTime++;
			}
			else
			{
				MyNameSpace.CreateQueueForTime(MyNameSpace.timePassed);
				if(parseInt(MyNameSpace.processes[index].startTime,10)==-1)MyNameSpace.processes[index].startTime=MyNameSpace.timePassed;
				var te=new MyNameSpace.timeEntry(MyNameSpace.processes[index].id,MyNameSpace.processes[index].remainingTime);
				MyNameSpace.timeLine.push(te);
				MyNameSpace.processes[index].remainingTime--;
				busyTime++;
				if(parseInt(MyNameSpace.processes[index].remainingTime,10)==0)
					MyNameSpace.processes[index].done=true;
				MyNameSpace.OrderBy("remaining","ascending");
			}
			MyNameSpace.timePassed++;
		}
		for(var i=0;i<MyNameSpace.timePassed;i++)
		{
			var id=MyNameSpace.timeLine[i].id;
			var index = parseInt(MyNameSpace.FindProcessById(id),10)-1;
			if(index!=-1)
			{
				if((MyNameSpace.processes[index].responseTime==0)&&(i==(MyNameSpace.timePassed-1)||MyNameSpace.timeLine[i+1].id!=id))
				{
					MyNameSpace.processes[index].responseTime=i+1;
				}
				if(i==0||(MyNameSpace.timeLine[i-1].id!=id))
				{
					MyNameSpace.processes[index].waitTime+=MyNameSpace.timeLine[i].waitingTime;
				}
			}
		}
	}
	catch(er)
	{
		alert(er.message);
	}
}
MyNameSpace.LCFS=function()
{
	try
	{
		MyNameSpace.OrderBy("start","descending");
		while(MyNameSpace.AllProcessesAreDone()==false)
		{
			var foundAProcess=false;
			var index;
			for(index=0;parseInt(index,10)<parseInt(MyNameSpace.numberOfProcesses,10);index++)
			{
				if(parseInt(MyNameSpace.processes[index].entranceTime,10)<=parseInt(MyNameSpace.timePassed,10)&&MyNameSpace.processes[index].done==false)
				{
					foundAProcess=true;
					break;
				}
			}
			if(foundAProcess==false)
			{
				MyNameSpace.queues.push(new Array());
				var te=new MyNameSpace.timeEntry(-1,-1);
				MyNameSpace.timeLine.push(te);
				MyNameSpace.timePassed++;
				idleTime++;
			}
			else
			{
				MyNameSpace.processes[index].waitTime=MyNameSpace.timePassed-MyNameSpace.processes[index].entranceTime;
				MyNameSpace.processes[index].startTime=MyNameSpace.timePassed;
				for(var i=MyNameSpace.timePassed;parseInt(i,10)<parseInt(MyNameSpace.timePassed+parseInt(MyNameSpace.processes[index].serviceTime,10),10);i++)
				{
					MyNameSpace.CreateQueueForTime(i);
					var te=new MyNameSpace.timeEntry(MyNameSpace.processes[index].id,MyNameSpace.processes[index].remainingTime);
					MyNameSpace.timeLine.push(te);
					MyNameSpace.processes[index].remainingTime--;
					busyTime++;
				}
				MyNameSpace.timePassed+=parseInt(MyNameSpace.processes[index].serviceTime,10);
				MyNameSpace.processes[index].responseTime = MyNameSpace.processes[index].startTime + MyNameSpace.processes[index].serviceTime;
				MyNameSpace.processes[index].done=true;
			}
		}
	}
	catch(err)
	{
		alert(err.message);
	}	
}
MyNameSpace.OrderBy=function(param,order)
{
	try
	{
		for(var i=0;i<MyNameSpace.numberOfProcesses-1;i++)
		{
			for(var j=i+1;j<MyNameSpace.numberOfProcesses;j++)
			{
				if(
				   (param==="start"&&((order==="ascending"&&(parseInt(MyNameSpace.processes[j].entranceTime,10)<parseInt(MyNameSpace.processes[i].entranceTime,10))||(parseInt(MyNameSpace.processes[j].entranceTime,10)==parseInt(MyNameSpace.processes[i].entranceTime,10)&&MyNameSpace.processes[j].id<MyNameSpace.processes[i].id))||
						(order==="descending"&&(parseInt(MyNameSpace.processes[j].entranceTime,10)>parseInt(MyNameSpace.processes[i].entranceTime,10)||(parseInt(MyNameSpace.processes[j].entranceTime,10)==parseInt(MyNameSpace.processes[i].entranceTime,10))&&(MyNameSpace.processes[j].id<MyNameSpace.processes[i].id)))))||
				   (param==="service"&&((order==="ascending"&&parseInt(MyNameSpace.processes[j].serviceTime,10)<parseInt(MyNameSpace.processes[i].serviceTime,10))||
						(order==="descending"&&parseInt(MyNameSpace.processes[j].serviceTime,10)>parseInt(MyNameSpace.processes[i].serviceTime,10))))||
				   (param==="remaining"&&((order==="ascending"&&parseInt(MyNameSpace.processes[j].remainingTime,10)<parseInt(MyNameSpace.processes[i].remainingTime,10))||
						(order==="descending"&&parseInt(MyNameSpace.processes[j].remainingTime,10)>parseInt(MyNameSpace.processes[i].remainingTime,10))))||
				   (param==="response"&&(
						(parseInt(MyNameSpace.processes[i].lastResponseTime,10)>-1&&parseInt(MyNameSpace.processes[j].lastResponseTime,10)>-1&&
							(order==="ascending"&&parseInt(MyNameSpace.processes[j].lastResponseTime,10)<parseInt(MyNameSpace.processes[i].lastResponseTime,10))||
							(order==="descending"&&parseInt(MyNameSpace.processes[j].lastResponseTime,10)>parseInt(MyNameSpace.processes[i].lastResponseTime,10)))||
						(parseInt(MyNameSpace.processes[i].lastResponseTime,10)>-1&&parseInt(MyNameSpace.processes[j].lastResponseTime,10)===-1&&
							(order==="ascending"&&parseInt(MyNameSpace.processes[j].entranceTime,10)<parseInt(MyNameSpace.processes[i].lastResponseTime,10))||
							(order==="descending"&&parseInt(MyNameSpace.processes[j].entranceTime,10)>parseInt(MyNameSpace.processes[i].lastResponseTime,10)))||
						(parseInt(MyNameSpace.processes[i].lastResponseTime,10)===-1&&parseInt(MyNameSpace.processes[j].lastResponseTime,10)>-1&&
							(order==="ascending"&&parseInt(MyNameSpace.processes[j].lastResponseTime,10)<parseInt(MyNameSpace.processes[i].entranceTime,10))||
							(order==="descending"&&parseInt(MyNameSpace.processes[j].lastResponseTime,10)>parseInt(MyNameSpace.processes[i].entranceTime,10)))||	
						(parseInt(MyNameSpace.processes[i].lastResponseTime,10)===-1&&parseInt(MyNameSpace.processes[j].lastResponseTime,10)===-1&&
							(order==="ascending"&&parseInt(MyNameSpace.processes[j].entranceTime,10)<parseInt(MyNameSpace.processes[i].entranceTime,10))||
							(order==="descending"&&parseInt(MyNameSpace.processes[j].entranceTime,10)>parseInt(MyNameSpace.processes[i].entranceTime,10)))))
				)/*put other conditions*/
				{
					var t=MyNameSpace.processes[j];
					MyNameSpace.processes[j]=MyNameSpace.processes[i];
					MyNameSpace.processes[i]=t;
				}
				if(param=="hrrn")
				{
					var t1=(parseFloat(MyNameSpace.processes[i].waitTime)+parseFloat(MyNameSpace.processes[i].serviceTime))/parseFloat(MyNameSpace.processes[i].serviceTime);
					var t2=(parseFloat(MyNameSpace.processes[j].waitTime)+parseFloat(MyNameSpace.processes[j].serviceTime))/parseFloat(MyNameSpace.processes[j].serviceTime);
					if(t2>t1)
					{
						var t=MyNameSpace.processes[j];
						MyNameSpace.processes[j]=MyNameSpace.processes[i];
						MyNameSpace.processes[i]=t;
					}
				}
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
MyNameSpace.AllProcessesAreDone=function()
{
	for(var i=0;i<MyNameSpace.numberOfProcesses;i++)
		if(MyNameSpace.processes[i].done==false)
			return false;
	return true;
}
MyNameSpace.CreateQueueForTime=function(moment)
{
	var queue=new Array();
	for(var i=0;i<MyNameSpace.processes.length;i++)
	{
		var s1,s2;
		s1=parseInt(MyNameSpace.processes[i].entranceTime,10);
		s2=parseInt(moment,10);
		if((s1<=s2)&&(MyNameSpace.processes[i].done===false))
		{
			
			queue.push(MyNameSpace.processes[i]);
		}
	}
	MyNameSpace.queues.push(queue);
}
MyNameSpace.GetTimelineAsJson=function()
{
	var resultObj = [];
	for(var i=0;parseInt(i,10)<parseInt(MyNameSpace.timeLine.length,10);i++)
	{
		var found=false;
		for(var j=0;parseInt(j,10)<parseInt(resultObj.length,10)&&found==false;j++)
		{
			if(resultObj[j].id==MyNameSpace.timeLine[i].id){found=true;}
		}
		if(found==false)
		{
			var index , name , id = MyNameSpace.timeLine[i].id,valuesObj,start,wait,response,enter,statis;
			index = parseInt(MyNameSpace.FindProcessById(id),10)-1;
			if(index!=-1)
			{
				name = MyNameSpace.processes[index].name;
				start = MyNameSpace.processes[index].startTime;
				wait = MyNameSpace.processes[index].waitTime;
				response = MyNameSpace.processes[index].responseTime;
				enter = MyNameSpace.processes[index].entranceTime;
				valuesObj= [];
				isBegin2 = true;
				for(var j=i;parseInt(j,10)<parseInt(MyNameSpace.timeLine.length,10);j++)//&&MyNameSpace.timeLine[j].id==id
				{
					var first=j,last=j;
					if(parseInt(last,10)<parseInt(MyNameSpace.timeLine.length,10)&&MyNameSpace.timeLine[last].id==id)
					{
						for(;parseInt(last,10)<parseInt(MyNameSpace.timeLine.length,10)&&MyNameSpace.timeLine[last].id==id;last++);
						last--;
						j=last;
						valuesObj.push({"from" : "/String(" + first + ")/" , "to" : "/String(" + last + ")/" , "desc" : "<b>"+MyNameSpace.CurrentLang[33] + " :</b> " + MyNameSpace.timeLine[first].waitingTime });
					}
				}
				statis="<b>"+MyNameSpace.CurrentLang[9]+" :</b> "+enter+"<br/><b>"+MyNameSpace.CurrentLang[43]+" :</b> "+start+"<br/><b>"+MyNameSpace.CurrentLang[44]+" :</b> "+wait+"<br/><b>"+MyNameSpace.CurrentLang[45]+" :</b> "+response;
				resultObj.push({"id" : id , "name" : name , "statistic" : statis , "values" : valuesObj});
			}
		}
	}
	for(var i=0;parseInt(i,10)<(parseInt(resultObj.length,10)-1);i++)
	{
		for(var j=i+1;parseInt(j,10)<parseInt(resultObj.length,10);j++)
		{
			if(resultObj[i].id>resultObj[j].id)
			{
				var tmp=resultObj[i];
				resultObj[i]=resultObj[j];
				resultObj[j]=tmp;
			}
		}
	}
    return resultObj;
}