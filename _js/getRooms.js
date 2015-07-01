var links = $('.regular');
var rooms = {};
for (pos in links) {
    var link = links[pos];
    if (link.href) {
        var roomid = link.href.match(/rgid=([0-9]*)/);
        if (roomid) {
            rooms[roomid[1]] = link.text
        }
    }
}
var rooms = [];
for (pos in links) {
    var link = links[pos];
    if (link.href) {
        var roomid = link.href.match(/rgid=([0-9]*)/);
        if (roomid) {
            rooms.push(link.text)
        }
    }
}

(function (console) {

    console.save = function (data, filename) {

        if (!data) {
            console.error('Console.save: No data')
            return;
        }

        if (!filename)
            filename = 'console.json'

        if (typeof data === "object") {
            data = JSON.stringify(data, undefined, 4)
        }

        var blob = new Blob([data], {type: 'text/json'}),
                e = document.createEvent('MouseEvents'),
                a = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
})(console)