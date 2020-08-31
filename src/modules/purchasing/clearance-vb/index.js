export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Posting' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'Realisasi VB' }
        ]);

        this.router = router;
    }
}