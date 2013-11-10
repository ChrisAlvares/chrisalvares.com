var app = express();
var provider = require('../app/providers/provider');

provider.setConfigVariables(app);
//run the phantomjs process here