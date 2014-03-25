var app = {

    //findByName: function() {
    //    var self = this;
    //    this.store.findByName($('.search-key').val(), function (employees) {
    //        $('.employee-list').html(self.employeeLiTpl(employees));
    //    });
    //},

    showAlert: function (message, title){
        if(navigator.notification){
            navigator.notification.alert(message, null, tile, 'OK');
        } else {
            alert(title? (title+": "+message):message);
        }
    },

    //renderHomeView: function(){
    //    $('body').html(this.homeTpl());
    //    $('.search-key').on('keyup', $.proxy(this.findByName, this));
    //},

    route: function() {
        var hash = window.location.hash;
        if (!hash) {
            $('body').html(new HomeView(this.store).render().el);
            return;
        }
        var match = hash.match(app.detailsURL);
        if (match) {
            this.store.findById(Number(match[1]), function(employee) {
                $('body').html(new EmployeeView(employee).render().el);
            });
        }
    },

    registerEvents: function () {
        var self = this;
        // Check of browser supports touch events...
        if (document.documentElement.hasOwnProperty('ontouchstart')) {
            // ... if yes: register touch event listener to change the "selected" state of the item
            $('body').on('touchstart', 'a', function (event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('touchend', 'a', function (event) {
                $(event.target).removeClass('tappable-active');
            });
        } else {
            // ... if not: register mouse events instead
            $('body').on('mousedown', 'a', function (event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('mouseup', 'a', function (event) {
                $(event.target).removeClass('tappable-active');
            });
        }
        $(window).on('hashchange', $.proxy(this.route, this));
    },

    initialize: function () {
        var self = this;
        this.detailsURL = /^#employees\/(\d{1,})/;
        this.registerEvents();
        this.store = new MemoryStore(function () {
            self.route();
        });
    }

};

app.initialize();