var CronJob = require('cron').CronJob;

var exec = require('child_process').exec;

var rooms = require('./rooms.js');

var schedule = require('./schedule.js');

api = function (router) {
    this.router = router;
    schedule = new schedule(function () {
        router.post('/api/ical', function (request, response) {
            var room = request.body.room;
            var weeks = request.body.weeks || [];
            var nweeks = request.body.nweeks || 1;

            var dynamicWeeks = false;

            var crontime = '*/30 * * * *';

            if (!room) {
                response.json({error: "wrong param"});
                return;
            }

            var weekstr = '';

            if (weeks.length > 1) {

                if (weeks.length > 3) {
                    crontime = '0 0 * * 0';
                }

                weekstr = weeks[0] + ',' + weeks[weeks.length - 1];
            } else if (weeks.length == 1) {
                weekstr = weeks[0] + ',' + weeks[0];
            } else {
                try {
                    var length = parseInt(nweeks);

                    if (length > 3) {
                        crontime = '0 0 * * 0';
                    }

                } catch (error) {
                    response.json({error: "wrong param"});
                    return;
                }
                dynamicWeeks = true;
                weekstr = nweeks;
            }

            schedule.startAndScheduleIcal(room, weekstr, dynamicWeeks, crontime, function (error) {
                response.json({error:error});
            }, function () {

                if (dynamicWeeks) {
                    response.json({success:1,url: "api/getCal/schedule.icsroom" + room + "nextweeks" + nweeks + ".ics"});
                } else {
                    var weekshortstr = weeks[0] + '-' + weeks[weeks.length - 1];
                    response.json({success:1,url: "api/getCal/schedule.icsroom" + room + "week" + weekshortstr + ".ics"});
                }

            });

        });

        router.get("/api/getCal/:file", function (request, response) {
            response.sendFile(scriptPath+'save/' + request.params.file);
        });

        router.get('/api/rooms', function (request, response) {
            
            var term = request.param('term');
            if (term) {

                var terms = term.trim().split(" ");

                response.json({rooms: rooms.getRooms(terms)});
            } else {
                response.json({error: "wrong param"});
            }

        });
    });
};

module.exports = api;


