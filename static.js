static = function (router) {
    this.router = router;
    router.get('/_js/:file', function (request, response) {

        response.sendFile('/var/unical/unicalNode/_js/' + request.params.file);
    });


    router.get('/_css/:file', function (request, response) {

        response.sendFile('/var/unical/unicalNode/_css/' + request.params.file);
    });

    router.get('/_font/:file', function (request, response) {

        response.sendFile('/var/unical/unicalNode/_font/' + request.params.file);
    });
    router.get('/fonts/:file', function (request, response) {

        response.sendFile('/var/unical/unicalNode/_font/' + request.params.file);
    });
    router.get('/locals/:file', function (request, response) {

        response.sendFile('/var/unical/unicalNode/locals/' + request.params.file);
    });

    router.get('/_json/:file', function (request, response) {

        response.sendFile('/var/unical/unicalNode/_json/' + request.params.file);
    });
};

module.exports = static;




