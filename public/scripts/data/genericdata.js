/*
 * This class is a generic data getter, it is not customized
 * When the time is right, it will send some events in this order
 * connnected with data object - before the connection is loaded
 * didRecieveResponse with data object and either a JSON object or string depending on the datatype
 * error with parameters DataGetter, error
 * sucesss with parameters DataGetter, this is like complete, butwill not fire if error has already fired
 * complete with parameters DataGetter
*/

define(['jquery'], function($) 
{
	//this object will contain anything called from the setKey function.
	//if an object sets a tag, any other data getter with that same object is cancelled. 
	//this prevents data from loading in the previous requests.
	var k = window;
	k.dataGetters = {};

	var GenericDataGetter = function(opts, tagid)
	{
		this.options = $.extend({}, this.options, opts);
		
		this.loading = false;
		this.data = null;
				
		if(this.options.url == '') {
			throw "Could not load Data URL from options, DataURL is required";			
		}
				
		if(typeof tagid !== 'undefined') 
			this.setTag(tagid);
	}
	
	
	GenericDataGetter.prototype.getData = function()
	{
		return this.data;
	}
	
	GenericDataGetter.prototype.isLoading = function()
	{
		return this.loading;
	}
	
	GenericDataGetter.prototype.cancel = function() 
	{
		if(this.isLoading() && this.xhr != null)
			this.xhr.abort();
	}
	
	GenericDataGetter.prototype.setTag = function(tagid)
	{
		if(typeof k.dataGetters[tagid] !== 'undefined') {
			if(k.dataGetters[tagid].isLoading()) {
				k.dataGetters[tagid].cancel();
			}
		}
		
		k.dataGetters[tagid] = this;
	}
	
	GenericDataGetter.prototype.canLoadMoreData = function()
	{
		return !(this.isLoading() || this.hasErroredOut || this.hasFinishedLoadingAllRows);
	}
	
	GenericDataGetter.prototype.get = function()
	{
		this.loading = true;
		this.hasErroredOut = false;
		
		
		var that = this;
        this.pushEvent("connected");
        this.xhr = $.ajax(this.options.url, {
           data:this.options.parameters,
           type:this.options.method
        })
        .done($.proxy(this.receieveData, this))
        .fail(function(obj, textStatus) {
			if(obj.status == 0) return;
			
			if(obj.responseJSON != null && typeof obj.responseJSON.message !== 'undefined') {
                 return that.receieveData(obj.responseJSON);	    
			}
			
			that.pushEvent("error", textStatus);
		})
		.always(function() {
			that.loading = false;
			if(!that.hasErroredOut) 
				that.pushEvent("success");

			that.pushEvent("complete");
		});		
	}
	
	GenericDataGetter.prototype.receieveData = function(data)
	{
		if(data == null) {
			this.pushEvent("error", "Could not fetch data");
			this.hasFinishedLoadingAllRows = true;
		} else if(typeof data.error !== 'undefined') {
            this.pushEvent("error", data.error);
		} else if(typeof data.status !== 'undefined' && Number(data.status) >= 300) {
    		this.pushEvent("error", ((typeof data.message !== 'undefined')?data.message:'Could not fetch data'));
		} else {
    		this.pushEvent("didRecieveResponse", data);
        }
        this.data = data;
        
		this.pushEvent("success", this);
	}
	
	GenericDataGetter.prototype.pushEvent = function(eventName, message)
	{
		if(eventName == "error") 
			this.hasErroredOut = true;
		$(this).trigger(eventName, [this, message]);
	}


	GenericDataGetter.prototype.options = {
	    method:'GET',
		url:'',
 		parameters:{}
	}

    return GenericDataGetter;
});