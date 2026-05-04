require(["dojo/query", "esri/widgets/Swipe"], (query, Swipe) => {
    app.nastavitSwipe = {};
    app.nastavitSwipe.load = () => {
        var mamVrstvy = false;
        var mamPocet = 0;
        var prvniSelectSwipe = document.getElementById("swipeZdroj0");
        if (prvniSelectSwipe.options.length > 0) {
            prvniSelectSwipe.options.length = 0;
        }
        var druhySelectSwipe = document.getElementById("swipeZdroj1");
        if (druhySelectSwipe.options.length > 0) {
            druhySelectSwipe.options.length = 0;
        }
        if (prvniSelectSwipe.options.length == 0 && druhySelectSwipe.options.length == 0) {
            var seznam = app.activeView.map.layers.toArray();
            for (var i = 0; i < seznam.length; i++) {
                if (seznam[i].type != "graphics" && seznam[i].visible == true) {
                    var opt = document.createElement('option');
                    opt.value = seznam[i].title;
                    opt.innerHTML = seznam[i].title;
                    prvniSelectSwipe.appendChild(opt);
                    mamVrstvy = true;
                    mamPocet++;
                }
            }
            if (mamPocet >= 1) {
                for (var ii = 0; ii < seznam.length; ii++) {
                    if (seznam[ii].type != "graphics" && seznam[ii].visible == true) {
                        var opt = document.createElement('option');
                        opt.value = seznam[ii].title;
                        opt.innerHTML = seznam[ii].title;
                        druhySelectSwipe.appendChild(opt);
                        mamVrstvy = true;
                    }
                }
            } else if (mamPocet == 1) {
                for (var ii = 0; ii < seznam.length; ii++) {
                    if (seznam[ii].type != "graphics" && seznam[ii].visible == true) {
                        var opt = document.createElement('option');
                        opt.value = seznam[ii].title;
                        opt.innerHTML = seznam[ii].title;
                        druhySelectSwipe.appendChild(opt);
                        mamVrstvy = true;
                        var opt2 = document.createElement('option');
                        opt2.value = "empty";
                        opt2.selected = true;
                        opt2.innerHTML = label[173];
                        druhySelectSwipe.appendChild(opt2);
                    }
                }
            }
        }
        if (mamVrstvy == false) {
            alert(label[172]);
            var opt1 = document.createElement('option');
            opt1.value = "empty";
            opt1.innerHTML = label[406];
            prvniSelectSwipe.appendChild(opt1);
            var opt2 = document.createElement('option');
            opt2.value = "empty";
            opt2.innerHTML = label[406];
            druhySelectSwipe.appendChild(opt2);
        } else {
            var opt1 = document.createElement('option');
            opt1.value = "empty";
            opt1.innerHTML = label[173];
            prvniSelectSwipe.appendChild(opt1);
            var opt2 = document.createElement('option');
            opt2.value = "empty";
            opt2.innerHTML = label[173];
            druhySelectSwipe.appendChild(opt2);
            if (prvniSelectSwipe.value == druhySelectSwipe.value) {
                druhySelectSwipe.value = druhySelectSwipe.options[1].value;
            }
        }
        if (document.getElementById("useSwipe").classList.contains("hidden") && mamVrstvy == true) {
            query(".useSwipe").toggleClass("hidden");
        }
    };

    app.nastavitSwipe.use = () => {
        if (!app.nastavitSwipe.widget || app.nastavitSwipe.widget == null) {
            var seznam = app.activeView.map.layers.toArray();
            for (var i = 0; i < seznam.length; i++) {
                if (seznam[i].title == document.getElementById("swipeZdroj0").value) {
                    var layer1 = seznam[i];
                } else if (document.getElementById("swipeZdroj0").value == "empty") {
                    var layer1 = undefined;
                }
                if (seznam[i].title == document.getElementById("swipeZdroj1").value) {
                    var layer2 = seznam[i];
                } else if (document.getElementById("swipeZdroj1").value == "empty") {
                    var layer2 = undefined;
                }
            }
            var swipeOrientace = document.getElementById("swipeOrientace").value;
            var swipeOdsazeni = document.getElementById("swipeOdsazeni").value;
            app.nastavitSwipe.widget = new Swipe({
                view: app.mapView,
                id: "swipe",
                leadingLayers: [layer1],
                trailingLayers: [layer2],
                direction: swipeOrientace,
                position: swipeOdsazeni
            });
            app.mapView.ui.add(app.nastavitSwipe.widget);
        } else {
            var seznam = app.activeView.map.layers.toArray();
            for (var i = 0; i < seznam.length; i++) {
                if (seznam[i].title == document.getElementById("swipeZdroj0").value) {
                    var layer1 = seznam[i];
                }
                if (seznam[i].title == document.getElementById("swipeZdroj1").value) {
                    var layer2 = seznam[i];
                }
            }
            app.nastavitSwipe.widget.leadingLayers = [layer1];
            app.nastavitSwipe.widget.trailingLayers = [layer2];
        }
        query(".removeSwipe, .obsahSwipe").toggleClass("hidden");
        document.getElementById('swipeZdroj0').disabled = true;
        document.getElementById('swipeZdroj1').disabled = true;
    };

    app.nastavitSwipe.remove = () => {
        app.nastavitSwipe.widget.destroy();
        app.mapView.ui.remove(app.nastavitSwipe.widget);
        app.nastavitSwipe.widget = null;
        query(".removeSwipe, .obsahSwipe").toggleClass("hidden");
        document.getElementById('swipeZdroj0').disabled = false;
        document.getElementById('swipeZdroj1').disabled = false;
    }
});