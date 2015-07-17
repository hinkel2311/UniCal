var jsonfile = require('jsonfile');
var exec = require('child_process').exec;

var CronJob = require('cron').CronJob;

schedule = function (onRdy) {
    var _this = this;
    var file = './cron.json';
    this.jobs = {};
   

    this.loadSoppedCrons = function (onRdy) {
        jsonfile.readFile(file, function (err, obj) {
            _this.jobs = obj;
            onRdy();
            for (var job in obj) {
                var cronobj = obj[job];
                _this.startCron(cronobj);
            }
        });
    };
    
    this.loadSoppedCrons(onRdy);
    
    this.startCron = function (cronobj) {
        
        var job = new CronJob({
            cronTime: cronobj.time,
            onTick: function () {
                var internRoom = cronobj.room.slice(0);
                var internWeek = cronobj.weeks.slice(0);
                var dynamic = cronobj.dynamic ? true : false;
                _this.createIcal(internRoom, internWeek, dynamic, function (data) {

                });
            },
            start: false
        });
        job.start();
    };

    this.startAndScheduleIcal = function (room, weeks, dynamic, time, onError, onSuccess) {

        var cronobj = {room: room, weeks: weeks, dynamic: dynamic, time: time};

        if (this.jobs && this.jobs['' + room + weeks + dynamic + time]) {

        } else {
            if (!this.jobs) this.jobs = {};
            this.jobs['' + room + weeks + dynamic + time] = cronobj;
        }

        jsonfile.writeFile(file, this.jobs, function (err) {
            console.error(err);
        });

        this.startCron(cronobj);

        this.createIcal(room, weeks, dynamic, onError, onSuccess);
    };


    this.createIcal = function (room, weeks, dynamic, onError, onSuccess) {
        function out(error, stdout, stderr) {
//            console.log(error);
//            console.log("out");
//            console.log(stdout);
//            console.log("err");
//            console.log(stderr);
            if (stderr) {
                onError(stderr);
            } else if (error) {
                onError(error);
            } else {
                onSuccess();
            }

        }
        
		
		var output = scriptPath+'save/schedule.ics';
		
        if (dynamic) {
        
            exec("python "+scriptPath+"unical.py -rid " + room + " -nw " + weeks + " -o "+output, out);
        } else {
            exec("python "+scriptPath+"unical.py -rid " + room + " -w " + weeks + " -o "+output, out);
        }
    }

}

module.exports = schedule;