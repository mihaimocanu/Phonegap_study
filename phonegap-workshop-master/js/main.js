var app = {

    findByName: function() {
        var self = this;
        this.store.findByName($('.search-key').val(), function (employees) {
            $('.employee-list').html(self.employeeLiTpl(employees));
        });
    },

    showAlert: function (message, title){
        if (navigator.notification) {
            navigatior.notification.alert(message, null, title, 'OK')
        }
        else
        {
            alert(title ? (title + ": " + message) : message);
        }
    },

    renderHomeView: function () {
        
        $('body').html(this.homeTpl());
        this.showAlert('RenderHomeView-Body', 'Info');
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
        this.showAlert('RenderHomeView-Search', 'Info');
    },

    initialize: function () {
        this.showAlert('Initializare-Start', 'Info');
        this.homeTpl = Handlebars.compile($("#home-tpl").html());
        this.showAlert('Initializare-Added home Template', 'Info');
        this.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
        this.showAlert('Initializare-Added Employee Template', 'Info');
        var self = this;
        this.store = new MemoryStore(function () {
            self.showAlert('RenderHomeView-Start', 'Info');
            self.renderHomeView();
            self.showAlert('RenderHomeView-Finish', 'Info');
        });
        this.showAlert('Initializare-Finish', 'Info');
    }

};

app.initialize();