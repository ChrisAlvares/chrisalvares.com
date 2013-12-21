(function($) {
	
	var Login = function(page)
	{
		this.page = page;	
	}
	
	Login.prototype.login = function(username, password, callback)
	{
		var parser = this;
		this.page.open('https://www.smartmetertexas.com/CAP/public/', function(status) {

			if(!parser.success(status)) {
				console.log("{'error':'Unable to load the login page: "+status+"'}");
				phantom.exit();
			}
			
			parser.page.injectJs('lib/jquery.js');
			var results = parser.page.evaluate(function(username, password)
			{			
				jQuery('#username').val(username);
				jQuery('#txtPassword').val(password);
				jQuery('#Public_index').submit();
				return true;
			}, username, password);
			
			window.setTimeout(function() {
				if(parser.isLoggedIn()) {
				    //now go to the next page
				    var retVal = parser.page.evaluate(function() {
    				    var items = document.querySelectorAll("#divTabs a");
    				    for(var index in items) {
    				        if(typeof items[index].innerHTML !== 'undefined') {
            				    if(items[index].innerHTML.indexOf("Usage") != -1) {
                				    return items[index].href;
                				}
                            }
    				    }
    				    return false;
				    });

				    if(retVal === false) {
    					console.log("{'error':'Bad Username or Password'}");
    					phantom.exit();
				    }
				    
				    parser.page.open(retVal, function(status) {
            			if(!parser.success(status)) {
            				console.log("{'error':'Unable to load the login page: "+status+"'}");
            				phantom.exit();
            			}
    				    if(typeof callback !== 'undefined') callback(parser.page);
				    });

				} else {
					console.log("{'error':'Bad Username or Password'}");
					phantom.exit();
				}
			}, 5000);
		});			
	}
	
	Login.prototype.isLoggedIn = function() 
	{
		return this.page.evaluate(function(){
			return (
			 document.getElementById("divTabs") != null ||
			 typeof document.getElementById("divTabs") !== 'undefined');
		});
	}
	
	Login.prototype.isAtCorrrectWindow = function()
	{
    	return this.page.evaluate(function() {
        	return document.querySelectorAll('select[name="tag_reporttype"]').length > 0;
    	});
	}
	
	Login.prototype.success = function(status)
	{
		if (status != 'success')
		{
			return false;
		}
		return true;
	}
	
	window.Login = Login;

})(jQuery);