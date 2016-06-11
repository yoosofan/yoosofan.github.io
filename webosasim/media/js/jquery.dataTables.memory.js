/*this file consists of codes i wrote to personalize dataTables plugin. */
/*Time between each scrolling frame*/
$.fn.dataTableExt.oPagination.iTweenTime = 100;

/*this is nesting EditRow functions, too.*/
MyNameSpace.AddRow=function(id,name,start,needTime,memory)
{
	/*create a new process and add it to processes Array and dataTable. then go to last page to see new row*/
	var proc=new MyNameSpace.process(name,start,needTime,memory);
	if(id!=-1)
		proc.id=id;
	var editValFailure=false;
	MyNameSpace.processes.push(proc);
	MyNameSpace.oTable.fnAddData( [proc.id,proc.name,proc.entranceTime,proc.needTime,proc.memory,'<a href="javascript:void(0);" onclick="fnClickDeleteRow(this);">حذف</a>'] );
	MyNameSpace.oTable.fnPageChange( 'last' );
	/*
	*/
	/*these methods will be called first when user attempts to edit a row*/
	var EditableCallback = function(v, s) {
		var column= MyNameSpace.oTable.fnGetPosition( this )[2];
		/*check if new value is valied*/
		if(column==0||(column==1&&v.length>20)||(column==2&&isNaN(v))||(column==2&&v.length>2)||(column==3&&isNaN(v))||(column==3&&v.length>2)||(column==4&&isNaN(v))||(column==4&&v.length>3))
		{
			editValFailure=true;
		}
		else
		{
			editValFailure=false;
        	console.debug("Element", this);
        	console.debug("New value:", v);
        	console.debug("Setting object:",s);
        }
        return v;
    };
	$('td[class!="readonly"]', MyNameSpace.oTable.fnGetNodes()).editable(EditableCallback, {
		"callback": function( sValue, y ) {
			var aPos = MyNameSpace.oTable.fnGetPosition( this );
			var aData = MyNameSpace.oTable.fnGetData( aPos[0] );
			
			/*if new value is valied, update dataTable and processes array with new value*/
			if(editValFailure==false)
			{
				MyNameSpace.oTable.fnUpdate( sValue, aPos[0], aPos[1] );
				MyNameSpace.UpdateProcess(aData[0], aData[1], aData[2], aData[3], aData[4]);
			}
			/*else fill row with previous valied data, from MyNameSpace.processes Array*/
			else
			{
				for(var i=0;parseInt(i,10)<parseInt(MyNameSpace.numberOfProcesses,10);i++)
				{
					if(MyNameSpace.processes[i].id==aData[0])
					{
						var v=[];
						v[0]=MyNameSpace.processes[i].id;
						v[1]=MyNameSpace.processes[i].name;
						v[2]=MyNameSpace.processes[i].entranceTime;
						v[3]=MyNameSpace.processes[i].needTime;
						v[4]=MyNameSpace.processes[i].memory;
						MyNameSpace.oTable.fnUpdate( v, aPos[0]);
						break;
					}
				}
			}
			/*this way or another, stay on current page*/
			var page=Math.floor((aPos[0]+1)/5);
			MyNameSpace.oTable.fnPageChange( 'first' );
			for(var i=0;parseInt(i,10)<page;i++)
			{
				MyNameSpace.oTable.fnPageChange( 'next' );
			}
		},
		"submitdata": function ( value, settings ) {
			return {
				"row_id": this.parentNode.getAttribute('id'),
				"column": MyNameSpace.oTable.fnGetPosition( this )[2]
			};
		},
		"height": "14px"
	} );
}

/*obviously this will be called when a user clicks on "Create A New Process" link, or something like that */
function fnClickAddRow() {
	var randomStart=Math.floor(Math.random()*21);
	var randomEnd=Math.floor(Math.random()*20)+1;
	var randomMemory=Math.floor(Math.random()*20)+1;
	var name="proc"+(MyNameSpace.numberOfProcesses+1);
	MyNameSpace.AddRow(-1,name,randomStart,randomEnd,randomMemory);
}

function fnClickDeleteRow(obj) {
	var par=obj.parentNode; 
	while(par.nodeName.toLowerCase()!='tr'){ 
		par=par.parentNode; 
	} 
	MyNameSpace.processes.splice(par.rowIndex-1,1);
	MyNameSpace.oTable.fnDeleteRow(par.rowIndex-1);
	MyNameSpace.numberOfProcesses--;
}
MyNameSpace.fnCliclEmtyTable=function()
{
	MyNameSpace.processes=[];
	MyNameSpace.numberOfProcesses=0;
	MyNameSpace.lastID=1;
	MyNameSpace.oTable.fnClearTable();
}
/*ok, this seems comlicated and i know it. but if you look carefully, you'll see its very easy to understand*/
function fnCreateOtable() {
	/*it was for showing a notification for each row on mouse over, but for now i suspended it.*/
	/*
	$('#procTable tbody tr').each( function() {
		
		var nTds = $('td', this);
    	var sTitle= $(nTds[1]).text()+ "...."+ $(nTds[2]).text()+ "...."+ $(nTds[3]).text()+ "....";
        this.setAttribute( 'title', sTitle );
    } );
    */

    MyNameSpace.oTable=$('#procTable').dataTable({
    	"sPaginationType": "scrolling",
		"oLanguage": {
        	"sLengthMenu": "showing _MENU_ records in each page",
        	"sZeroRecords": "no record found",
        	"sInfo": "records _START_ to _END_ of _TOTAL_ records",
        	"sInfoEmpty": "records 0 to 0 of 0 records",
            "sInfoFiltered": "",
            "sSearch":"Search",
        	"oPaginate": {"sPrevious": "prev","sNext":"next"}
        },
    	"sDom": '<"break"><"break"><"top"f<"break"><"break"><"clear"><"break">>t<"bottom"ip<"clear"><"break"><"toolbar">>',
    	"iDisplayLength": 10,
    	"aLengthMenu": [[10], [10]],
    	"aoColumnDefs": [
    		{ 'bSortable': false, 'aTargets': [ 4 ] },
  			{ 'sClass': 'readonlylinks', 'aTargets': [4] }]
    });
    $("div.break").html('</br>');
    //$("div.toolbar").html('<ul class="control"><li class="add" style="padding-right:25px;width:200px;text-align:right;display:inline;"><a id="addA" href="javascript:void(0);" onclick="fnClickAddRow();">ایجاد فرآیند جدید</a></li><li class="empty" style="padding-right:25px;width:200px;text-align:right;display:inline;"><a id="emptyA" href="javascript:void(0);" onclick="fnCliclEmtyTable();">حذف همه رکوردها</a></li></ul>');
    $("div.toolbar").html('<div id="addDiv" class="control"><a id="addA" href="javascript:void(0);" onclick="fnClickAddRow();">ایجاد فرآیند جدید</a></div><div id="emptyDiv" class="control"><a id="emptyA" href="javascript:void(0);" onclick="MyNameSpace.fnCliclEmtyTable();">حذف همه رکوردها</a></div></br><div id="saveDiv" class="control"><a id="saveA" href="javascript:void(0);" onclick="MyNameSpace.SaveProcesses();">ذخیره فرآیندها</a></div><div id="restoreDiv" class="control"><a id="restoreA" href="javascript:void(0);" onclick="MyNameSpace.RestoreProcesses();">بازیابی فرآیندها</a></div>');
}

/*adds animation effect to paging. honestly, i just copied it. learning how it works and how to write it by my own, wastes too much time. */
$.fn.dataTableExt.oPagination.scrolling = {
    "fnInit": function ( oSettings, nPaging, fnCallbackDraw )
    {
        /* Store the next and previous elements in the oSettings object as they can be very
         * usful for automation - particularly testing
         */
        var nPrevious = document.createElement( 'div' );
        var nNext = document.createElement( 'div' );
        if ( oSettings.sTableId !== '' )
        {
            nPaging.setAttribute( 'id', oSettings.sTableId+'_paginate' );
            nPrevious.setAttribute( 'id', oSettings.sTableId+'_previous' );
            nNext.setAttribute( 'id', oSettings.sTableId+'_next' );
        }
         
        nPrevious.className = "paginate_disabled_previous";
        nNext.className = "paginate_disabled_next";
         
        nPrevious.title = oSettings.oLanguage.oPaginate.sPrevious;
        nNext.title = oSettings.oLanguage.oPaginate.sNext;
         
        nPaging.appendChild( nPrevious );
        nPaging.appendChild( nNext );
         
        $(nPrevious).click( function() {
            /* Disallow paging event during a current paging event */
            if ( typeof oSettings.iPagingLoopStart != 'undefined' && oSettings.iPagingLoopStart != -1 )
            {
                return;
            }
             
            oSettings.iPagingLoopStart = oSettings._iDisplayStart;
            oSettings.iPagingEnd = oSettings._iDisplayStart - oSettings._iDisplayLength;
             
            /* Correct for underrun */
            if ( oSettings.iPagingEnd < 0 )
            {
              oSettings.iPagingEnd = 0;
            }
             
            var iTween = $.fn.dataTableExt.oPagination.iTweenTime;
            var innerLoop = function () {
                if ( oSettings.iPagingLoopStart > oSettings.iPagingEnd ) {
                    oSettings.iPagingLoopStart--;
                    oSettings._iDisplayStart = oSettings.iPagingLoopStart;
                    fnCallbackDraw( oSettings );
                    setTimeout( function() { innerLoop(); }, iTween );
                } else {
                    oSettings.iPagingLoopStart = -1;
                }
            };
            innerLoop();
        } );
         
        $(nNext).click( function() {
            /* Disallow paging event during a current paging event */
            if ( typeof oSettings.iPagingLoopStart != 'undefined' && oSettings.iPagingLoopStart != -1 )
            {
                return;
            }
             
            oSettings.iPagingLoopStart = oSettings._iDisplayStart;
             
            /* Make sure we are not over running the display array */
            if ( oSettings._iDisplayStart + oSettings._iDisplayLength < oSettings.fnRecordsDisplay() )
            {
                oSettings.iPagingEnd = oSettings._iDisplayStart + oSettings._iDisplayLength;
            }
            var iTween = $.fn.dataTableExt.oPagination.iTweenTime;
            var innerLoop = function () {
                if ( oSettings.iPagingLoopStart < oSettings.iPagingEnd ) {
                    oSettings.iPagingLoopStart++;
                    oSettings._iDisplayStart = oSettings.iPagingLoopStart;
                    fnCallbackDraw( oSettings );
                    setTimeout( function() { innerLoop(); }, iTween );
                } else {
                    oSettings.iPagingLoopStart = -1;
                }
            };
            innerLoop();
        } );
         
        /* Take the brutal approach to cancelling text selection */
        $(nPrevious).bind( 'selectstart', function () { return false; } );
        $(nNext).bind( 'selectstart', function () { return false; } );
    },
     
    "fnUpdate": function ( oSettings, fnCallbackDraw )
    {
        if ( !oSettings.aanFeatures.p )
        {
            return;
        }
         
        /* Loop over each instance of the pager */
        var an = oSettings.aanFeatures.p;
        for ( var i=0, iLen=an.length ; i<iLen ; i++ )
        {
            if ( an[i].childNodes.length !== 0 )
            {
                an[i].childNodes[0].className =
                    ( oSettings._iDisplayStart === 0 ) ?
                    oSettings.oClasses.sPagePrevDisabled : oSettings.oClasses.sPagePrevEnabled;
                 
                an[i].childNodes[1].className =
                    ( oSettings.fnDisplayEnd() == oSettings.fnRecordsDisplay() ) ?
                    oSettings.oClasses.sPageNextDisabled : oSettings.oClasses.sPageNextEnabled;
            }
        }
    }
}