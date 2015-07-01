index = function(router) {
    this.router = router;
    router.get('/', function(request, response) {
           
        response.sendFile('/var/unical/unicalNode/html/index.html');
    });
};

module.exports = index;

