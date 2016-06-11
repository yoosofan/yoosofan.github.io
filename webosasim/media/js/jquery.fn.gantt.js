/**
 *
 * JQuery fn.gantt gantt chart plugin v0.2
 * Copyright 2011 by Marek Bielańczuk
 * http://mbielanczuk.com/
 * Released under the MIT and GPL Licenses.
 *
 * Date: Tue Jun 21 00:18:16 +0200 2011
 */
var src,pos;
jQuery.fn.gantt = function (options) {
	var defaults = {
		source: null,
		itemsPerPage: 7,
		startPos: new Date(),
		showHint: true
	};
	var options = jQuery.extend(defaults, options);	
	var data = null;        // Recived data
	var pageNum = 0;        // Current page number
	var pageCount = 0;      // Aviable pages count
	var rowsOnLastPage = 0; // How many rows on last page
	var rowsNum = 0;        //
	var hPosition = 0;      // Current position on diagram (Horizontal)
	var dateStart = null;
	var dateEnd = null;	
	var createContainer = function() {
	/* Left panel */
	var ganttLeftPanel = jQuery('<div class="leftPanel"/>')
			.append(jQuery('<div class="row spacer"/>')
			.css("height", tools.getCellSize()+1+"px")
			.css("width", "100%"));
	jQuery.each(data, function(i, entry) {
		if (i >= pageNum*options.itemsPerPage && i < (pageNum*options.itemsPerPage+options.itemsPerPage))
		{
			var e1,e2;
			e1 = jQuery('<div class="row id"/>');
			e2 = jQuery('<div class="row name"/>');
			ganttLeftPanel
				.append(e1.append(jQuery('<span class="label"/>').html(entry.id)))
				.append(e2.append(jQuery('<span class="label"/>').html(entry.name)));
			if(MyNameSpace.Part=="schedule")
			{
				e1
					.mouseover(function(e){
						var hint = jQuery("<div class='fn-gantt-hint' />").html(entry.statistic);
				  		jQuery("body").append(hint);
				  		hint.css('left', e.pageX);
	    				hint.css('top', e.pageY);
				  		hint.show();
					})
					.mouseout(function(){
						jQuery(".fn-gantt-hint").remove();
					})
					.mousemove(function(e){
		    	  		jQuery('.fn-gantt-hint').css('left', e.pageX);
	    		  		jQuery('.fn-gantt-hint').css('top', e.pageY+15);
	   			   	});
	   			e2
					.mouseover(function(e){
						var hint = jQuery("<div class='fn-gantt-hint' />").html(entry.statistic);
				  		jQuery("body").append(hint);
				  		hint.css('left', e.pageX);
	    				hint.css('top', e.pageY);
				  		hint.show();
					})
					.mouseout(function(){
						jQuery(".fn-gantt-hint").remove();
					})
					.mousemove(function(e){
		    	  		jQuery('.fn-gantt-hint').css('left', e.pageX);
	    		  		jQuery('.fn-gantt-hint').css('top', e.pageY+15);
	   			   	});
	   		}
		}
	});
	/* Navigation panel */
	var ganttNavigate = jQuery('<div id="navigate" class="navigate" />')
		.append(jQuery('<a href="javascript:///" class="nav-link nav-page-back"/>')
			.html('&lt;')
			.click( function () {
				navigatePage(-1);
			}))
		.append(jQuery('<div class="page-number"/>')
				.append(jQuery('<span/>')
					.html(pageNum+1 + ' of ' + pageCount)))
		.append(jQuery('<a href="javascript:///" class="nav-link nav-page-next"/>')
			.html('&gt;')
			.click( function () {
				navigatePage(1);
			}))
		.append(jQuery('<a href="javascript:///" class="nav-link nav-begin"/>')
			.html('&#124;&lt;')
			.click( function () {
				navigateTo('begin');
			}))
		.append(jQuery('<a href="javascript:///" class="nav-link nav-prev-week"/>')
			.html('&lt;&lt;')
			.click( function () {
				navigateTo(tools.getCellSize()*7);
			}))
		.append(jQuery('<a href="javascript:///" class="nav-link nav-prev-day"/>')
			.html('&lt;')
			.click( function () {
				navigateTo(tools.getCellSize());
			}))
		.append(jQuery('<a href="javascript:///" class="nav-link nav-next-day"/>')
			.html('&gt;')
			.click( function () {
				navigateTo(tools.getCellSize() * -1);
			}))
		.append(jQuery('<a href="javascript:///" class="nav-link nav-next-week"/>')
			.html('&gt;&gt;')
			.click( function () {
				navigateTo(tools.getCellSize() * -7);
			}))
		.append(jQuery('<a href="javascript:///" class="nav-link nav-end"/>')
			.html('&gt;&#124;')
			.click( function () {
				navigateTo('end');
			}));
	/* Container */
	var gantt = jQuery('<div class="fn-gantt" />');
	gantt
		.append(
			jQuery('<div class="fn-content"/>')
				.append(ganttLeftPanel)
				.append(
					jQuery('<div class="rightPanel"/>')
					.append(createDataContainer())
				))
		.append(jQuery('<div class="bottom"/>')
			.append(ganttNavigate));
		return gantt;
	};
	// Creates Data container with header
	var createDataContainer = function() {
		var range = tools.parseDateRange(dateStart, dateEnd);
		var days = jQuery('<div class="row"/>');
		jQuery.each(range, function(i, rday) {
			var day_class = "wd";
			var s=jQuery('<div class="row day '+day_class+'" />').html(rday);
			days.append(s);
		});
		var dataPanel = jQuery("<div class='dataPanel'/>").css("width", range.length*tools.getCellSize()+"px");
		dataPanel.append(days);
		jQuery.each(data, function(i, entry) {
			if (i >= pageNum*options.itemsPerPage && i < (pageNum*options.itemsPerPage+options.itemsPerPage))
			{
				var dRow = jQuery('<div class="row" style="color:#CCCCCC;">');
				jQuery.each(range, function(j, day) {
					var todayCls = '';
					var s=jQuery('<div class="row day' + todayCls + '" id="d'+i+'-'+ day+'" />').html(day);
					if(MyNameSpace.Part=="memory"&&parseInt(day,10)>parseInt(MyNameSpace.totalMemory,10))
					{
						s.css('background-color', '#a3a3a3');
					}
					dRow.append(s);
				});
				dataPanel.append(dRow);
			}
		});
		return dataPanel; 
	};
	createProgressBar = function(days, cls, desc) {
		var cellWidth = tools.getCellSize();
		var barMarg = tools.getProgressBarMargin() || 0;
		var bar;
		if(MyNameSpace.Part=="schedule")
		{
			bar = jQuery("<div class='bar' />")
					.addClass( cls )
					.css({
						width: ((cellWidth * ++days) - barMarg)
					});
		}
		else if(MyNameSpace.Part=="memory")
		{
			var rem=parseInt(pos,10)%4;
			if(rem==0)
			{
				bar = jQuery("<div class='bar' />")
					.addClass( cls )
					.css({
						width: ((cellWidth * ++days) - barMarg)
					});
			}
			else if(rem==1)
			{
				bar = jQuery("<div class='bar' />")
					.addClass( "ganttGreen" )
					.css({
						width: ((cellWidth * ++days) - barMarg)
					});
			}
			else if(rem==2)
			{
				bar = jQuery("<div class='bar' />")
					.addClass( "ganttRed" )
					.css({
						width: ((cellWidth * ++days) - barMarg)
					});
			}
			else if(rem==3)
			{
				bar = jQuery("<div class='bar' />")
					.addClass( "ganttOrange" )
					.css({
						width: ((cellWidth * ++days) - barMarg)
					});
			}
		}
		if (desc&&options.showHint)
		{
			if(MyNameSpace.Part=="schedule")
			{
				bar
					.mouseover(function(e){
				  		var hint = jQuery("<div class='fn-gantt-hint' />").html(desc);
				  		jQuery("body").append(hint);
				  		hint.css('left', e.pageX);
	    				hint.css('top', e.pageY);
				  		hint.show();
					})
					.mouseout(function(){
						jQuery(".fn-gantt-hint").remove();
					})
					.mousemove(function(e){
		    	  		jQuery('.fn-gantt-hint').css('left', e.pageX);
	    		  		jQuery('.fn-gantt-hint').css('top', e.pageY+15);
	   			   	});
	   		}
	   		else if(MyNameSpace.Part=="memory")
	   		{
	   			bar.html(desc);
	   		}
		}
		return bar;
	};
	var fillData = function() {//creates a progress bar for each interval and appends it to a specific id
		jQuery.each(data, function(i, entry) {//hamoon data e json ke khoondim
			if (i >= pageNum * options.itemsPerPage && i < (pageNum*options.itemsPerPage+options.itemsPerPage))
			{
				jQuery.each(entry.values, function(j, day) {
					pos=j;
					var _bar = createProgressBar(
						(tools.dateDeserialize(day.to)- tools.dateDeserialize(day.from)),
						 day.customClass ? day.customClass : '',
						 day.desc ? day.desc : ''
					);
					var t1=parseInt(i,10);
					var t2=tools.dateDeserialize(day.from);
					jQuery('#d'+t1+'-'+ t2)
						.append(_bar
					);
				});
			}
		});
	};
	navigateTo = function(val) {
		switch (val) {
			case 'begin':
				jQuery('.fn-gantt .dataPanel').animate({
					'margin-left': '0px'
					}, 'fast', function() {repositionLabel();});
				break;
			case 'end':
				var mLeft = jQuery('.fn-gantt .dataPanel').width() - jQuery('.fn-gantt .rightPanel').width();
				jQuery('.fn-gantt .dataPanel').animate({
					'margin-left': '-' + mLeft + 'px'
				}, 'fast', function() {repositionLabel();});
				break;
			default:
				var max_left = (jQuery('.fn-gantt .dataPanel').width() - jQuery('.fn-gantt .rightPanel').width()) * -1;
				var cur_marg = jQuery('.fn-gantt .dataPanel').css('margin-left').replace('px','');
				var val = parseInt(cur_marg) + val;
				if (val <= 0 && val >= max_left)
					jQuery('.fn-gantt .dataPanel').animate({
						'margin-left': val + 'px'
					}, 'fast', repositionLabel);
				break;
		}
	};
	navigatePage = function(val) {
		if ((pageNum+val) >= 0 && (pageNum+val) < Math.ceil(rowsNum/options.itemsPerPage))
		{
			pageNum += val;
			hPosition = jQuery('.fn-gantt .dataPanel').css('margin-left').replace('px','');
			src.empty();
			create(src);
		}
	};
	repositionLabel = function() {
		jQuery('.fn-gantt .dataPanel').stop();
		var wrapper = { offset: jQuery('.fn-gantt .rightPanel').offset(),
						width: jQuery('.fn-gantt .rightPanel').width(),
						height: jQuery('.fn-gantt .rightPanel').height()};
		jQuery(".fn-gantt .rightPanel .year, .fn-gantt .rightPanel .month").each(function(i, obj) {
			var objDim = { offset: jQuery(obj).offset(),
						width: jQuery(obj).width(),
						height: jQuery(obj).height()};
			if (objDim.offset.left + objDim.width > wrapper.offset.left
			        && objDim.offset.left < wrapper.offset.left+wrapper.width)
			{
			   	var viewArea = {
			   		left: objDim.offset.left > wrapper.offset.left ? objDim.offset.left : wrapper.offset.left,
			  		right: objDim.offset.left+objDim.width < wrapper.offset.left + wrapper.width ? objDim.offset.left+objDim.width : wrapper.offset.left + wrapper.width 
			   	};
			   	jQuery(obj).children(".label").css("float", "left");
			   	var labelWidth = jQuery(obj).children(".label").width();
				var objMarg = objDim.offset.left < wrapper.offset.left ? wrapper.offset.left-objDim.offset.left : 0;
				if (viewArea.right-viewArea.left > labelWidth)
				   	jQuery(obj).children(".label")
				   		.css("margin-left", objMarg + (viewArea.right - viewArea.left)/2 - labelWidth/2 + "px");
			}
		});
	};
	var create = function(jQuerythis) {
		if (!options.source)
			return;

			data = options.source;
			rowsNum = data.length;
			pageCount = Math.ceil(rowsNum/options.itemsPerPage);
			rowsOnLastPage = rowsNum - (Math.floor(rowsNum/options.itemsPerPage) * options.itemsPerPage);

			dateStart = tools.getMinDate();
			dateEnd = tools.getMaxDate();

			var contTable = createContainer();
			jQuerythis.append(contTable);
			fillData();//create progress bars
			jQuerythis.css({
				height: jQuery(".fn-gantt").height() + "px"
			});
			jQuery('.fn-gantt .dataPanel').css({'margin-left': hPosition+'px'});
			src=jQuerythis;			
			//go back to begin
			var d = Math.round((options.startPos/1000 - dateStart/1000) / 86400 )-2;//seconds/seconds per day=days
			if (d > 0)
			{
				navigateTo(-1*d * tools.getCellSize());
			} else {
				repositionLabel();
			}
	};

	var tools = new function() {
		this.getMaxDate = function() {
			var maxDate = null;
			jQuery.each(data, function(i, entry) {
				jQuery.each(entry.values, function(i, date) {
					maxDate = maxDate < parseInt(tools.dateDeserialize(date.to),10) ? parseInt(tools.dateDeserialize(date.to),10) : maxDate;
				});
			});
			return maxDate;
		};
		this.getMinDate = function() {
			var minDate = null;
			jQuery.each(data, function(i, entry) {
				jQuery.each(entry.values, function(i, date) {
					minDate = minDate > parseInt(tools.dateDeserialize(date.from),10) || minDate == null ? parseInt(tools.dateDeserialize(date.from),10) : minDate;
				});
			});
			return minDate;
		};
		this.parseDateRange = function(from, to) {
			var cellWidth = tools.getCellSize();
			var maxCount;
			var ret = new Array();
			var i=0;
			maxCount=Math.floor(734/cellWidth);
			if(MyNameSpace.Part=="memory"&&(maxCount<parseInt(MyNameSpace.totalMemory,10))){maxCount=MyNameSpace.totalMemory;}
			do {
				ret[i] = i;
				i++;
			} while (i <= to);
			if(i<maxCount)
			{
				do {
					ret[i] = i;
					i++;
				} while (i <= maxCount);
			}
			return ret;
		};
		this.dateDeserialize = function (dateStr) {
			var s=eval('new' + dateStr.replace(/\//g, ' '));
			return s;
		};
		this.genId = function (ticks) {
			var t = Math.floor(ticks / 86400000);
			return t * 86400000;
		};
		var _getCellSize = null;
		this.getCellSize = function() {
			if (!_getCellSize)
			{
				jQuery("body").append(
					jQuery("<div style='display: none; position: absolute;' class='fn-gantt' id='measureCellWidth'><div class='row'></div></div>")
				);
				_getCellSize = jQuery('#measureCellWidth .row').height();
				jQuery('#measureCellWidth').empty().remove();
			}
			return _getCellSize;
		};
		this.getPageHeight = function() {
			return pageNum+1 == pageCount ? rowsOnLastPage*tools.getCellSize() : options.itemsPerPage*tools.getCellSize();
		};
		var _getProgressBarMargin = null;
		this.getProgressBarMargin = function() {
			if (!_getProgressBarMargin)
			{
				jQuery("body").append(
					jQuery("<div style='display: none; position: absolute;' id='measureBarWidth' ><div class='fn-gantt'><div class='rightPanel'><div class='dataPanel'><div class='row day'><div class='bar' /></div></div></div></div></div>")
				);
				_getProgressBarMargin = parseInt(jQuery('#measureBarWidth .fn-gantt .rightPanel .day .bar').css("margin-left").replace("px",""));
				_getProgressBarMargin += parseInt(jQuery('#measureBarWidth .fn-gantt .rightPanel .day .bar').css("margin-right").replace("px",""));
				jQuery('#measureBarWidth').empty().remove();
			}
			return _getProgressBarMargin;
		};
	};
	jQuery(this).empty();
	create(jQuery(this));
};
