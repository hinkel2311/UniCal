index = function(router) {
    this.router = router;
    router.get('/', function(request, response) {
           
        response.sendFile(__dirname + '/html/index.html');
    });
};

module.exports = index;

