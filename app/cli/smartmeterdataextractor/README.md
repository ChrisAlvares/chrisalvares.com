SmartMeterTexasPhantomJS
========================

www.smartmetertexas.com crawler script to get your data via phantomjs

to run

``phantomjs smartmeter.js [daily|monthly] [username in CAPS] [password] [startdate in mm/dd/YYYY] [enddate in mm/dd/YYYY]``

``phantomjs smartmeter.js "monthly" "USERNAME" "password" "12/09/2013" "12/10/2013"``

your output will be

>logged in
>
>---start payload---
>
>[{"date":"12/09/2013","endreading":"2816.604","startreading":"2792.198","wattage":"24.408"},{"date":"12/10/2013","endreading":"2840.011","startreading":"2816.604","wattage":"23.407"}]
>
>---end payload---``
