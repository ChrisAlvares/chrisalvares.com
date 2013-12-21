(function($) {
	
	var DataGrabber = function(page)
	{
		this.page = page;	
	}
	
	DataGrabber.prototype.getMonthlyData = function(startdate, enddate)
	{
	   var dataGrabber = this;
    	var retVal = this.page.evaluate(function(startdate, enddate) {
        	document.querySelector('select[name="tag_reporttype"] option[value="DAILY"]').selected = true;
        	document.querySelector('input[name="tag_startdate"]').value = startdate;
        	document.querySelector('input[name="tag_enddate"]').value = enddate;
        	document.querySelector('input[name="tag_updatereport"]').click();
        	return true;
    	}, startdate, enddate);

    	if(!retVal) {
        	console.log("unknown error occured");
        	phantom.exit();
    	}
    	
    	setTimeout(function() {
        	dataGrabber.parseMonthlyData();
    	}, 5000)
	}
		
	DataGrabber.prototype.getDailyData = function(startdate)
	{
	   var dataGrabber = this;
	   this.page.render("/Users/chrisalvares/Desktop/test.png");
    	var retVal = this.page.evaluate(function(startdate) {
        	document.querySelector('select[name="tag_reporttype"] option[value="INTERVAL"]').selected = true;
        	document.querySelector('input[name="tag_startdate"]').value = startdate;
        	document.querySelector('input[name="tag_enddate"]').value = startdate;
        	document.querySelector('input[name="tag_updatereport"]').click();
        	return true;
    	}, startdate);
    	if(!retVal) {
        	console.log("unknown error occured");
        	phantom.exit();
    	}
    	
    	setTimeout(function() {
        	dataGrabber.parseDailyData();
    	}, 5000)
	}	
	
	DataGrabber.prototype.parseDailyData = function()
	{
    	var data = this.page.evaluate(function() {
        	var data = [];
        	var rows = document.querySelectorAll('tr[name="DataContainer"]');
        	for(var index in rows) {
            	var row = rows[index];
            	var d = {};
            	try {
                	d.starttime = row.querySelector('span[name="USAGE_GRID_START_TIME"]').innerHTML;
                	d.endtime = row.querySelector('span[name="USAGE_GRID_END_TIME"]').innerHTML;
                	d.wattage = row.querySelector('span[name="READING"]').innerHTML;
                	data.push(d);
            	}   
            	catch(e) {
                	console.log(e);
            	}
        	}
        	return data;
    	});
    	console.log('---start payload---');
    	console.log(JSON.stringify(data));
    	console.log('---end payload---');
    	phantom.exit();
	}
		
	DataGrabber.prototype.parseMonthlyData = function()
	{

    	var data = this.page.evaluate(function() {
        	var data = [];
        	var rows = document.querySelectorAll('tr[name="DataContainer"]');
        	for(var index in rows) {
            	var row = rows[index];
            	var d = {};
            	try {
                	d.date = row.querySelector('span[name="dpDaily_RowSet_Row_USAGE_DATE"]').innerHTML;
                	d.startreading = row.querySelector('span[name="START_READING"]').innerHTML;
                	d.endreading = row.querySelector('span[name="END_READING"]').innerHTML;
                	d.wattage = row.querySelector('span[name="dpDaily_RowSet_Row_READING"]').innerHTML;
                	data.push(d);
            	}   
            	catch(e) {
                	console.log(e);
            	}
        	}
        	return data;
    	});
    	console.log('---start payload---');
    	console.log(JSON.stringify(data));
    	console.log('---end payload---');
    	phantom.exit();
	}

	DataGrabber.prototype.success = function(status)
	{
		if (status != 'success')
		{
			return false;
		}
		return true;
	}
	
	window.DataGrabber = DataGrabber;

})(jQuery);