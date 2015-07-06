Date.prototype.getWeek = function () {
    var d = new Date(+this);
    d.setHours(0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
};

var roomid;

$(document).ready(function () {
    $('.qisgrp').hide();
    $('._submit').unbind('click').click(function (ev) {
        ev.preventDefault();
        //var room = $('._room').val();
        var room = roomid;
        if (!room) {
            alert('Bitte Raum ID angeben!');
            return;
        }


        var post = function (obj) {


            $('._url').html('Loading...');
            $('#modal').modal('show');
            $.post("/api/ical", obj, function (data) {

                if (data.success) {
                    var url = "http://dev.qrizl.com:1339" + data.url;
                    $('._url').html('ical unter folgender url: <a href="' + url + '">' + url + ' </a>');
                } else {
                    $('._url').html('fehler: <p>' + data.error + ' </p>');
                }
            });
        };


        var checkedOpt = $('input[name=optionsRadios]:checked').val();
        switch (checkedOpt) {
            case "option1":
                var date = new Date();

                var month = date.getMonth();

                var start = date.getWeek();
                var end;

                if (month >= 3 && month < 9) {
                    // SOMMERSEMESTER
                    end = new Date(date.getFullYear(), 9, 1, 0, 0, 0, 0);
                    end = end.getWeek();

                } else {
                    // WINTERSEMESTER

                    var year = date.getFullYear();
                    if (month <= 2) {
                        year += 1;
                    }
                    end = new Date(year, 3, 1, 0, 0, 0, 0);
                    end = end.getWeek();
                }

                var weeks = [];


                if (start && end) {
                    if (end < start) {
                        var lastWeekYear = new Date(date.getFullYear(), 11, 30, 0, 0, 0, 0).getWeek();
                        for (var i = start; i <= lastWeekYear; i++) {
                            weeks.push(i);
                        }
                        for (var i = 1; i <= end; i++) {
                            weeks.push(i);
                        }

                    } else {
                        for (var i = start; i <= end; i++) {
                            weeks.push(i);
                        }
                    }

                } else {
                    alert('Unerwarteter Fehler aufgetreten');
                    return;
                }
                post({room: room, weeks: weeks});



                break;
            case "option2":
                var nweeks = 2;
                post({room: room, nweeks: nweeks});


                break;
            case "option3":

                var nweeks = 8;
                post({room: room, nweeks: nweeks});


                break;
            case "option4":
                var end = $('._end').val();
                var start = $('._start').val();
                var weeks = [];


                if (start && end) {
                    start = start.split('/');
                    start = new Date(start[2], start[1] - 1, start[0]);


                    end = end.split('/');
                    end = new Date(end[2], end[1] - 1, end[0]);

                    var startweek = start.getWeek();
                    var endweek = end.getWeek();


                    if (end < start) {
                        alert("Der Anfangszeitpunkt muss vor dem Endzeitpunkt liegen.");
                        return;
                    } else if (end.getFullYear() > start.getFullYear() && endweek >= startweek) {
                        alert("Die Maximale Zeitspanne beträgt 51 Wochen.");
                        return;
                    }

                    start = startweek;
                    end = endweek;

                    if (end < start) {
                        var lastWeekYear = new Date(new Date().getFullYear(), 11, 30, 0, 0, 0, 0).getWeek();
                        for (var i = start; i <= lastWeekYear; i++) {
                            weeks.push(i);
                        }
                        for (var i = 1; i <= end; i++) {
                            weeks.push(i);
                        }

                    } else {
                        for (var i = start; i <= end; i++) {
                            weeks.push(i);
                        }
                    }
                } else {
                    alert('Bitte Start und Endzeitpunkt angeben!');
                    return;
                }
                post({room: room, weeks: weeks});


                break;
            default:
                alert("optdefault");
        }
        ;


    });

    $('.datepicker').datepicker({
        format: 'dd/mm/yyyy'
    });


    $("._room").autocomplete({
        source: function (request, response) {
            var term = request.term.toString();

            console.log(term);

            $.get("/api/rooms", {term: term}, function (data) {
                $(".result").html(data);
                roomsobj = data.rooms;
                response(Object.keys(data.rooms));
            });

        },
        select: function (a, b) {
            $(this).val(b.item.value);
            roomid = roomsobj[b.item.value];
            var link = "https://qis.verwaltung.uni-hannover.de/qisserver/servlet/de.his.servlet.RequestDispatcherServlet?state=verpublish&status=init&vmfile=no&moduleCall=webInfo&publishConfFile=webInfoRaum&publishSubDir=raum&keep=y&raum.rgid="+roomid;
            $('.qislink').html('<a href="'+link+'">Raum im qis</a>');
            $('.qisgrp').show();
        }
    });

});
