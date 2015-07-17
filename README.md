# UniCal

A complete solution for gettings the occupancy of rooms of the Universitiy Hannover as calendar data.
The Project is devided into two parts. A node js backend which supplies the webinterface and a Python script for creating the calendar data. 
The calendar data is parsed from a HTML table out of the [HIS-QIS System](https://qis.verwaltung.uni-hannover.de/) from the University of Hannover.
The data is supplied in iCal format which can be importet by copying the downloaded file or adding the url into your calendar to be aware of changes.
The second options is what we recommend.

UniCal was developed during a student porject at the University of Hannover in the curse "Labor-Webtechnologien" in summer semester 2015 headed by [Prof. Dr. rer. nat. Robert Jäschke](https://github.com/rjoberon)

The Project can be adoped in further student work. If you are intereset in it, please contact Prof. Jäschke.


##Dependencies:
- [jsonfile](https://www.npmjs.com/package/jsonfile)
- [node-cron](https://github.com/ncb000gt/node-cron)
- [express](https://www.npmjs.com/package/express)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [unical python](https://github.com/knoxz/unical)

## Installation

    $ git clone https://github.com/hinkel2311/UniCal.git
    $ cd <UniCal node dir>
    $ npm install
    $ git clone https://github.com/knoxz/unical.git
    $ cd <unical python dir>
    $ pip install -r requirements.txt

## Usage
Starting the server:

    $ node server.js -port \<port\> -sp \<path to unical python folder\>



## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

