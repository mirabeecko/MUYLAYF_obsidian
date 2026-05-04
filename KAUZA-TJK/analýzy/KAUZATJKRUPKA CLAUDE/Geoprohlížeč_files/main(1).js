var app = {};
var myEsriId;
var myEsriConfig;
var sstransffce;
var myUrlParams = {};
var hasSecureAccess_g = false;
var lastExpiresG = 0;
var hasSecureAccess_r = false;
var lastExpiresR = 0;
var hasmapViewWhen = false;
var jeodsednuto_g = false;
var appstate = {};
appstate.online = navigator.onLine;
appstate.ohlasenproblemstokenem = false;
appstate.ohlasenproblemseserverem = false;
var controllerG;
var controllerR;
var zoomControl;
var zavriPrihlasovaciOknoListener;
var requireTokenG = false;
var requireTokenR = false;
var myStorage = '';
if ((localStorage.settings) && localStorage.settings != '') {
    myStorage = JSON.parse(localStorage.settings);
}

if (!navigator.onLine) {
    alert(label[603]);
} else {
    require([
        // ArcGIS
        "esri/core/Error",
        "esri/Map",
        "esri/config",
        "esri/views/MapView",
        "esri/views/SceneView",
        "esri/widgets/Popup",
        "esri/core/reactiveUtils",
        "dojo/query",
        'esri/geometry/SpatialReference',
        'esri/identity/IdentityManager',
        "esri/identity/ServerInfo",
        'esri/layers/MapImageLayer',
        "esri/Viewpoint",
        'dojo/dnd/Moveable',
        "esri/layers/support/TileInfo",
        "esri/request",
        "esri/geometry/Extent",
        "esri/layers/ImageryLayer",
        'esri/layers/ElevationLayer',
        "esri/layers/TileLayer",
        "esri/rest/geoprocessor",
        "dojo/dom-construct",
        "esri/core/promiseUtils",
        "esri/widgets/Slider",
        //"dojox/encoding/crypto/RSAKey",
        "dojo/json",
        "esri/geometry/Point",
        "esri/layers/support/RasterFunction",
        "esri/geometry/geometryEngine",

        // Calcite Maps
        "./js/calcitemaps-v0.10.js",
        "./js/calcitemaps-arcgis-support-v0.10.js",
        "./js/panelsettings.js",

        // Boostrap
        "bootstrap/Collapse",
        "bootstrap/Dropdown",
        "bootstrap/Tab",
        "bootstrap/Carousel",
        "bootstrap/Tooltip",
        "bootstrap/Modal",

        "./js/createTransfPointFunction.js",

        // Dojo
        "dojo/domReady!"
    ], (Error, Map, esriConfig, MapView, SceneView, Popup,
        reactiveUtils, query, SpatialReference,
        esriId, ServerInfo, MapImageLayer, Viewpoint, Moveable,
        TileInfo, esriRequest, Extent, ImageryLayer, ElevationLayer, TileLayer, geoprocessor, domConstruct,
        promiseUtils, Slider,/* RSAKeyModule,*/ JSON, Point, RasterFunction, geometryEngine, CalciteMapsSettings, CalciteMapsArcGISSupport, PanelSettings) => {
        esriConfig.request.trustedServers.push("ags.cuzk.gov.cz/arcgis");
        esriConfig.request.trustedServers.push("ags.cuzk.gov.cz/arcgis2");
        esriConfig.request.trustedServers.push("ags.cuzk.gov.cz/agsportal");
        esriConfig.request.trustedServers.push({ host: "geoportal.cuzk.gov.cz", withCredentials: false });
        esriConfig.request.trustedServers.push({ host: "services.arcgisonline.com", withCredentials: false });

        esriConfig.geometryServiceUrl = "https://ags.cuzk.gov.cz/arcgis/rest/services/Utilities/Geometry/GeometryServer";
        esriConfig.portalUrl = "https://ags.cuzk.gov.cz/agsportal";

        esriConfig.request.interceptors.push({
            urls: "https://ags.cuzk.gov.cz/arcgis/rest/services/Utilities/Geometry/GeometryServer/project",
            before: function (params) {
                if (params.requestOptions.query) {
                    if (params.requestOptions.query.outSR == 102067 && params.requestOptions.query.inSR == 4326) {
                        params.requestOptions.query.transformation = 1623;
                        params.requestOptions.query.transformForward = false;
                        console.log('Upravená transformace');
                    }
                }
            }
        });
        var myserversconfig = {};
        appConfig.getMytoken = (typ) => {
            var mfcpfc = (value, policko) => { return () => { var result = ""; for (i = 0; i < value.length; ++i) { result += String.fromCharCode(policko[i % policko.length] ^ value.charCodeAt(i)); }; return result; }; }
            var odpovedPromise = new Promise((resolve, reject) => {
                if (typ == 'g') {
                    var requestToken = "https://ags.cuzk.gov.cz/arcgis2/rest/services/GenerateToken/Token/GPServer/GenerateToken";
                    var requestOptions = { cacheBust: true, responseType: "json" }
                    var paramsObj = {
                        "GenerateTokenURL": "https://ags.cuzk.gov.cz/arcgis2/tokens/",
                        "referer": appConfig.referer,
                        "parametr": appConfig.parametr,
                        "expiration": myserversconfig.server_tokenValidity,
                        "f": "json"
                    };
                    if (window.location.href.indexOf(appConfig.referer) < 0) { alert("Nastav v konfigu správně referer."); }
                    if (window.location.href.toLowerCase().indexOf("ags.cuzk.gov.cz") > 0 && appConfig.parametr != "") { alert("Smaž parametr z konfigu."); }

                    geoprocessor.submitJob(requestToken, paramsObj, undefined, requestOptions).then((jobinfo) => {
                        var options = {};
                        options.signal = controllerG.signal;
                        jobinfo.waitForJobCompletion(options).then((results) => {
                            var provedregistracitokenu = (mToken) => {
                                console.log('Token G: OK');
                                var existCredential = -1;
                                for (var j = 0; j < myEsriId.credentials.length; j++) {
                                    for (var j2 = 0; j2 < myEsriId.credentials[j].resources.length; j2++) {
                                        if (myEsriId.credentials[j].userId == ((mfcpfc)("Dflsql`fpjmd", [3]))() && myEsriId.credentials[j].resources[j2].indexOf("arcgis2/rest/services/Vyjadreni") > 0) { existCredential = j; }
                                    }
                                }
                                if (existCredential == -1) {
                                    myEsriId.registerToken({ "expires": mToken.expires, "server": appConfig.domain + "/arcgis2/rest/services/Vyjadreni/", "ssl": true, "token": mToken.token, "userId": ((mfcpfc)("Dflsql`fpjmd", [3]))() });
                                    myEsriId.registerToken({ "expires": mToken.expires, "server": appConfig.domain + "/arcgis2/rest/services/Vydej/", "ssl": true, "token": mToken.token, "userId": ((mfcpfc)("Dflsql`fpjmd", [3]))() });
                                } else {
                                    myEsriId.credentials[existCredential].token = mToken.token;
                                    myEsriId.credentials[existCredential].expires = mToken.expires;
                                }
                                lastExpiresG = mToken.expires - (5 * 60 * 1000);
                                resolve({ status: "OK" });
                            }
                            if (((results)) && (results.messages)) {
                                let nactenyToken = {};
                                for (let i = 0; i < results.messages.length; i++) {
                                    if (results.messages[i].description.indexOf('Token je:') > -1) {
                                        nactenyToken.token = results.messages[i].description.replace("Token je:", "").trim();
                                    }
                                    if (results.messages[i].description.indexOf('Expiration je:') > -1) {
                                        nactenyToken.expires = Number(results.messages[i].description.replace("Expiration je:", "").trim());
                                    }
                                }
                                if (nactenyToken.token && nactenyToken.expires) {
                                    provedregistracitokenu(nactenyToken);
                                } else {
                                    reject(new Error("Invalid Token"));
                                }
                            }
                        }, (err) => {
                            console.log(err);
                            var merr = new Error(err.message);
                            reject(merr);
                        });
                    }, (err) => {
                        console.log(err);
                        var merr = new Error(err.message);
                        reject(merr);
                    });
                }

                if (typ == 'r') {
                    var requestToken = "https://ags.cuzk.gov.cz/arcgis2/rest/services/GenerateToken/Token/GPServer/GenerateToken";
                    var requestOptions = { cacheBust: true, responseType: "json" }
                    var paramsObj = {
                        "GenerateTokenURL": "https://ags.cuzk.gov.cz/arcgis/tokens/",
                        "referer": appConfig.referer,
                        "parametr": appConfig.parametr,
                        "expiration": myserversconfig.server_tokenValidity,
                        "f": "json"
                    };
                    geoprocessor.submitJob(requestToken, paramsObj, undefined, requestOptions).then((jobinfo) => {
                        var options = {};
                        options.signal = controllerR.signal;
                        jobinfo.waitForJobCompletion(options).then((results) => {
                            var provedregistracitokenu = (mToken) => {
                                console.log('Token R: OK');
                                var j;
                                var existCredential = -1;
                                for (j = 0; j < myEsriId.credentials.length; j++) {
                                    for (var j2 = 0; j2 < myEsriId.credentials[j].resources.length; j2++) {
                                        if (myEsriId.credentials[j].resources[j2].indexOf("/arcgis/rest/services/") > -1) { existCredential = j; }
                                    }
                                }
                                if (existCredential == -1) {
                                    myEsriId.registerToken({
                                        "expires": mToken.expires,
                                        "server": appConfig.domain + "/arcgis/rest/services/",
                                        "ssl": true,
                                        "token": mToken.token,
                                        "userId": ((mfcpfc)("QUL", [3]))()
                                    });
                                } else {
                                    myEsriId.credentials[existCredential].token = mToken.token;
                                    myEsriId.credentials[existCredential].expires = mToken.expires;
                                }
                                lastExpiresR = mToken.expires - (5 * 60 * 1000);
                                resolve({ status: "OK" });
                            }
                            if (((results)) && (results.messages)) {
                                let nactenyToken = {};
                                for (let i = 0; i < results.messages.length; i++) {
                                    if (results.messages[i].description.indexOf('Token je:') > -1) {
                                        nactenyToken.token = results.messages[i].description.replace("Token je:", "").trim();
                                    }
                                    if (results.messages[i].description.indexOf('Expiration je:') > -1) {
                                        nactenyToken.expires = Number(results.messages[i].description.replace("Expiration je:", "").trim());
                                    }
                                }
                                if (nactenyToken.token && nactenyToken.expires) {
                                    provedregistracitokenu(nactenyToken);
                                } else {
                                    reject(new Error("Invalid Token"));
                                }
                            }
                        }, (err) => {
                            console.log(err);
                            var merr = new Error(err.message);
                            reject(merr);
                        });
                    }, (err) => {
                        console.log(err);
                        var merr = new Error(err.message);
                        reject(merr);
                    });

                }

                if (typ == 'e') {
                    let genPortal = () => {
                        var requestToken = appConfig.domain + "/arcgis2/rest/services/GenerateToken/Token/GPServer/GenerateToken";
                        var requestOptions = { cacheBust: true, responseType: "json" };
                        geoprocessor.submitJob(requestToken, {
                            "GenerateTokenURL": appConfig.domain + "/agsportal/sharing/rest/generateToken",
                            "referer": appConfig.referer,
                            "ovladac": ((mfcpfc)("1AkC;7@uI4", [3]))(),
                            "parametr": appConfig.parametr,
                            "expiration": 1,
                            "f": "json"
                        }, undefined, requestOptions).then((jobinfo) => {
                            jobinfo.waitForJobCompletion().then((results) => {
                                var provedregistracitokenu = (mToken) => {
                                    console.log('Token E: OK');
                                    var existCredential = -1;
                                    for (var j = 0; j < myEsriId.credentials.length; j++) {
                                        for (var j2 = 0; j2 < myEsriId.credentials[j].resources.length; j2++) {
                                            if (myEsriId.credentials[j].userId == ((mfcpfc)("Fgjwlq", [3]))() && myEsriId.credentials[j].resources[j2].indexOf("arcgis3/rest/services/Hosted/Hlaseni_chyb") > 0) { existCredential = j; }
                                        }
                                    }
                                    if (existCredential == -1) {
                                        myEsriId.registerToken({ "expires": mToken.expires, "server": appConfig.domain + "/arcgis3/rest/services/Hosted/Hlaseni_chyb/", "ssl": true, "token": mToken.token, "userId": ((mfcpfc)("Fgjwlq", [3]))() });
                                    } else {
                                        myEsriId.credentials[existCredential].token = mToken.token;
                                        myEsriId.credentials[existCredential].expires = mToken.expires;
                                    }

                                    var existCredential = -1;
                                    for (var j = 0; j < myEsriId.credentials.length; j++) {
                                        for (var j2 = 0; j2 < myEsriId.credentials[j].resources.length; j2++) {
                                            if (myEsriId.credentials[j].userId == ((mfcpfc)("Fgjwlq", [3]))() && myEsriId.credentials[j].resources[j2].indexOf("agsportal/sharing/rest/content/") > 0) { existCredential = j; }
                                        }
                                    }
                                    if (existCredential == -1) {
                                        myEsriId.registerToken({ "expires": mToken.expires, "server": appConfig.domain + "/agsportal/sharing/rest/content/", "ssl": true, "token": mToken.token, "userId": ((mfcpfc)("Fgjwlq", [3]))() });
                                    } else {
                                        myEsriId.credentials[existCredential].token = mToken.token;
                                        myEsriId.credentials[existCredential].expires = mToken.expires;
                                    }
                                    resolve({ status: "OK" });
                                }
                                if (((results)) && (results.messages)) {
                                    let nactenyToken = {};
                                    for (let i = 0; i < results.messages.length; i++) {
                                        if (results.messages[i].description.indexOf('Token je:') > -1) {
                                            nactenyToken.token = results.messages[i].description.replace("Token je:", "").trim();
                                        }
                                        if (results.messages[i].description.indexOf('Expiration je:') > -1) {
                                            nactenyToken.expires = Number(results.messages[i].description.replace("Expiration je:", "").trim());
                                        }
                                    }
                                    if (nactenyToken.token && nactenyToken.expires) {
                                        provedregistracitokenu(nactenyToken);
                                    } else {
                                        reject(new Error("Invalid Token"));
                                    }
                                }
                            }, (err) => {
                                console.log(err);
                                var merr = new Error(err.message);
                                reject(merr);
                            });
                        }, (err) => {
                            console.log(err);
                            var merr = new Error(err.message);
                            reject(merr);
                        });
                    }

                    var requestToken = "https://ags.cuzk.gov.cz/arcgis2/rest/services/GenerateToken/Token/GPServer/GenerateToken";
                    var requestOptions = { cacheBust: true, responseType: "json" }
                    var paramsObj = {
                        "GenerateTokenURL": "https://ags.cuzk.gov.cz/agsportal/sharing/rest/generateToken",
                        "referer": appConfig.referer,
                        "parametr": appConfig.parametr,
                        "expiration": 1,
                        "f": "json"
                    };
                    geoprocessor.submitJob(requestToken, paramsObj, undefined, requestOptions).then((jobinfo) => {
                        jobinfo.waitForJobCompletion().then((results) => {
                            var provedregistracitokenu = (mToken) => {
                                console.log('Token H: OK');
                                var j;
                                var existCredential = -1;
                                for (j = 0; j < myEsriId.credentials.length; j++) {
                                    for (var j2 = 0; j2 < myEsriId.credentials[j].resources.length; j2++) {
                                        if (myEsriId.credentials[j].resources[j2].indexOf("/arcgis/rest3/services/") > -1) { existCredential = j; }
                                    }
                                }
                                if (existCredential == -1) {
                                    myEsriId.registerToken({
                                        "expires": mToken.expires,
                                        "server": appConfig.domain + "/arcgis3/rest/services/",
                                        "ssl": true,
                                        "token": mToken.token,
                                        "userId": ((mfcpfc)("klpwjmd", [3]))()
                                    });
                                } else {
                                    myEsriId.credentials[existCredential].token = mToken.token;
                                    myEsriId.credentials[existCredential].expires = mToken.expires;
                                }
                            }
                            if (((results)) && (results.messages)) {
                                let nactenyToken = {};
                                for (let i = 0; i < results.messages.length; i++) {
                                    if (results.messages[i].description.indexOf('Token je:') > -1) {
                                        nactenyToken.token = results.messages[i].description.replace("Token je:", "").trim();
                                    }
                                    if (results.messages[i].description.indexOf('Expiration je:') > -1) {
                                        nactenyToken.expires = Number(results.messages[i].description.replace("Expiration je:", "").trim());
                                    }
                                }
                                if (nactenyToken.token && nactenyToken.expires) {
                                    provedregistracitokenu(nactenyToken);
                                    genPortal();
                                } else {
                                    reject(new Error("Invalid Token"));
                                }
                            }
                        }, (err) => {
                            console.log(err);
                            var merr = new Error(err.message);
                            reject(merr);
                        });
                    }, (err) => {
                        console.log(err);
                        var merr = new Error(err.message);
                        reject(merr);
                    });
                }
            });
            return odpovedPromise;
        }

        function comazasednoutpredtokenem() {
            //sem se uvedou části menu, které se udělají zašedlé, dokud nebude token
        }

        function comaodsednoutpotokenu() {
            //sem se uvedou části menu, které mají být dostupné až po tokenu

            /* if (window.location.hash == "#soutez") {
                if (app.widgetProdukty) {
                    app.widgetProdukty.useproduct(666);
                    if (app.napoveda) {
                        app.napoveda.collapse();
                    }
                }
            } */
        }

        myEsriId = esriId;
        var aktivujZaviraniPrihlasovacihoOkna = () => {
            zavriPrihlasovaciOknoListener = esriId.on("dialog-create", (a) => {
                esriId.dialog.destroy();
                console.log("Okno přihlášení zavřeno.");
            });
        };

        myserversconfig.server_tokenValidity = 60;  //minuty 
        var serverInfo = new ServerInfo();
        serverInfo.server = 'https://ags.cuzk.gov.cz/arcgis';
        serverInfo.tokenServiceUrl = 'https://ags.cuzk.gov.cz/arcgis/tokens/generateToken';
        serverInfo.shortLivedTokenValidity = myserversconfig.server_tokenValidity;
        serverInfo.currentVersion = "11.3";
        serverInfo.hasServer = true;

        var serverInfo2 = new ServerInfo();
        serverInfo2.server = 'https://ags.cuzk.gov.cz/arcgis2';
        serverInfo2.tokenServiceUrl = 'https://ags.cuzk.gov.cz/arcgis2/tokens/generateToken';
        serverInfo2.shortLivedTokenValidity = myserversconfig.server_tokenValidity;
        serverInfo2.currentVersion = "11.3";
        serverInfo2.hasServer = true;

        var serverInfo3 = new ServerInfo();
        serverInfo3.server = 'https://ags.cuzk.gov.cz/agsportal';
        serverInfo3.tokenServiceUrl = 'https://ags.cuzk.gov.cz/agsportal/sharing/rest/generateToken';
        serverInfo3.shortLivedTokenValidity = 1;
        serverInfo3.currentVersion = "11.3";
        serverInfo3.hasPortal = true;

        var hosting = new ServerInfo();
        hosting.server = 'https://ags.cuzk.gov.cz/arcgis3';
        hosting.tokenServiceUrl = 'https://ags.cuzk.gov.cz/arcgis3/tokens/generateToken';
        hosting.shortLivedTokenValidity = 1;
        hosting.currentVersion = "11.3";
        hosting.hasServer = true;
        esriId.registerServers([serverInfo, serverInfo2, serverInfo3, hosting]);

        var idObject = {};
        idObject.serverInfos = [serverInfo, serverInfo2, serverInfo3, hosting];
        idObject.oAuthInfos = [];
        idObject.credentials = [];
        esriId.initialize(idObject);

        comazasednoutpredtokenem();
        function getJsonFromUrl() {
            var query = location.search.substr(1);
            var result = {};
            query.split("&").forEach(part => {
                var item = part.split("=");
                result[item[0]] = decodeURIComponent(item[1]);
            });
            return result;
        }

        myUrlParams.extentstring = "";
        myUrlParams.openwidget = "";
        myUrlParams.initialSpatialRef = "";
        myUrlParams.kompozice = "";
        myUrlParams.produkt = "";
        myUrlParams.id = "";
        myUrlParams.e = "";
        myUrlParams.m = "";
        myUrlParams.b = "";
        myUrlParams.xy = "";
        myUrlParams.atom = "";
        myUrlParams.export = "";
        myUrlParams.klad = "";

        var obj = getJsonFromUrl();
        for (var key in obj) { // Array.forEach would skip string keys here
            if (key == 'extent') { myUrlParams.extentstring = obj[key]; }
            if (key == 'w') { myUrlParams.openwidget = obj[key]; }
            if (key == 'ss') { myUrlParams.initialSpatialRef = obj[key]; }
            if (key == 'k') { myUrlParams.kompozice = obj[key]; }
            if (key == 'b') { myUrlParams.b = obj[key]; }
            if (key == 'p') { myUrlParams.produkt = obj[key]; }
            if (key == 'v') { myUrlParams.viewpoint = obj[key]; }
            if (key == 'id') { myUrlParams.id = obj[key]; }
            if (key == 'e') { myUrlParams.e = obj[key]; }
            if (key == 'm') { myUrlParams.m = obj[key]; }
            if (key == 'xy') { myUrlParams.xy = obj[key]; }
            if (key == 'atom') { myUrlParams.atom = obj[key]; }
            if (key == 'export') { myUrlParams.export = obj[key]; }
            if (key == 'klad') { myUrlParams.klad = obj[key]; }
        }

        if (myStorage.geoprohlizec) {
            if (myStorage.geoprohlizec["layerlist"]) {
                if (myStorage.geoprohlizec["layerlist"] != "null") {
                    if (myUrlParams.b == "" && myUrlParams.produkt == "" && myUrlParams.kompozice == "") {
                        let value = myStorage.geoprohlizec["layerlist"].split("-");
                        if (value[0] == "b") {
                            myUrlParams.b = value[1];
                        } else if (value[0] == "p") {
                            myUrlParams.produkt = value[1];
                        } else if (value[0] == "k") {
                            myUrlParams.kompozice = value[1];
                        }
                    } else {
                        myStorage.geoprohlizec["layerlist"] = "null";
                    }
                }
            }
        }

        var maxextenty = [];
        maxextenty["5514"] = { xmin: -907841.0, ymin: -1230916.0, xmax: -416691.0, ymax: -932111.0/*xmin: -990000, ymin: -1290000, xmax: -330000, ymax: -880000*/ };
        maxextenty["4326"] = { xmin: 11.8, ymin: 48.1, xmax: 19.4, ymax: 51.4 };
        maxextenty["32633"] = { xmin: 262000, ymin: 5349000, xmax: 824000, ymax: 5683000 };
        maxextenty["32634"] = { xmin: -181000, ymin: 5369000, xmax: 382000, ymax: 5695000 };
        maxextenty["4258"] = { xmin: 11.8, ymin: 48.1, xmax: 19.4, ymax: 51.4 };
        maxextenty["3034"] = { xmin: 4084000, ymin: 2391000, xmax: 4686000, ymax: 2752000 };
        maxextenty["3035"] = { xmin: 4389000, ymin: 2785000, xmax: 5041000, ymax: 3179000 };
        maxextenty["3045"] = { xmin: 241000, ymin: 5334000, xmax: 835000, ymax: 5691000 };
        maxextenty["3046"] = { xmin: -180000, ymin: 5350000, xmax: 403000, ymax: 5714000 };
        maxextenty["3835"] = { xmin: 3234000, ymin: 5330000, xmax: 3830000, ymax: 5700000 };
        maxextenty["3836"] = { xmin: 3803000, ymin: 5332000, xmax: 4392000, ymax: 5711000 };
        maxextenty["3857"] = { xmin: 1266000, ymin: 6124000, xmax: 2179000, ymax: 6707000 };

        var pocatecniparametry = {};
        pocatecniparametry.wkid = 5514;
        if (myUrlParams.initialSpatialRef != "") {
            if (myUrlParams.initialSpatialRef == "102100") { myUrlParams.initialSpatialRef = "3857"; }
            if (myUrlParams.initialSpatialRef == "102067") { myUrlParams.initialSpatialRef = "5514"; }
            for (b in maxextenty) {
                if (myUrlParams.initialSpatialRef == b) { pocatecniparametry.wkid = Number(b); }
            }
        }
        pocatecniparametry.extent = maxextenty[pocatecniparametry.wkid.toString()];
        if (myUrlParams.extentstring != "") {
            var hranice = myUrlParams.extentstring.split(",");
            if (hranice.length == 4) {
                pocatecniparametry.extent.xmin = Number(hranice[0]);
                pocatecniparametry.extent.ymin = Number(hranice[1]);
                pocatecniparametry.extent.xmax = Number(hranice[2]);
                pocatecniparametry.extent.ymax = Number(hranice[3]);
            }
            if (isNaN(pocatecniparametry.extent.xmin) || isNaN(pocatecniparametry.extent.ymin) || isNaN(pocatecniparametry.extent.xmax) || isNaN(pocatecniparametry.extent.ymax)) {
                pocatecniparametry.extent = maxextenty[pocatecniparametry.wkid.toString()];
            }
        }

        pocatecniparametry.stred = [];
        pocatecniparametry.stred[0] = (pocatecniparametry.extent.xmax - pocatecniparametry.extent.xmin) / 2;
        pocatecniparametry.stred[1] = (pocatecniparametry.extent.ymax - pocatecniparametry.extent.ymin) / 2;

        if (myUrlParams.openwidget != "") {
            let w = {
                1: 'panelProdukty',
                2: 'panelLayerlist',
                3: 'panelTransformaceSouradnic',
                4: 'panelPridatVrstvu',
                5: 'panelHledaniSouradnice',
                6: 'panelRozsireneHledani',
                7: 'panelHlaseniChyb',
                8: 'panelVyjadreni',
                9: 'panelShare',
                10: 'panelSettings'
            }
            document.getElementById(w[myUrlParams.openwidget]).classList.add('in');
        }

        //konfigurace
        app.arrMove = [];
        app.zoom = 1;
        app.lonlat = pocatecniparametry.stred;
        app.mapView = null;
        app.mapDiv = "mapViewDiv";
        app.sceneView = null;
        app.sceneDiv = "sceneViewDiv";
        app.sceneFL = null;
        app.activeView = null;
        app.layerListWidget = null;
        app.homebuttonWidget = null;
        app.basemaps_jtsk = [];
        app.basemaps_merc = [];
        app.basemaps_jiny = [];
        app.ground_jtsk5G = null;
        app.ground_merc5G = null;
        app.ground_jtsk4G = null;
        app.ground_merc4G = null;
        app.padding = {
            top: 50,
            right: 0,
            bottom: 0,
            left: 0
        };
        app.uiPadding = {
            components: ["zoom", "attribution"],
            padding: {
                top: 15,
                right: 15,
                bottom: 30,
                left: 15
            }
        };
        app.popupOptions = {
            dockEnabled: true,
            dockOptions: {
                buttonEnabled: true,
                //breakpoint: 544 // default
            }
        };
        app.panelSettings = null;

        app.noveTileInfoJTSK = TileInfo.create({
            spatialReference: new SpatialReference({ wkid: 102067, latestWkid: 5514 }),
            scales: [59, 118, 236, 472, 945, 1890, 3780, 7560, 15120, 30240, 60480, 120960, 241920, 483840, 967680, 1935360, 3870720]
        });

        app.noveTileInfoMERC = TileInfo.create({
            spatialReference: new SpatialReference({ wkid: 102100, latestWkid: 3857 }),
            scales: [564.248588, 1128.497176, 2256.994353, 4513.988705, 9027.977411, 18055.954822, 36111.909643, 72223.819286, 144447.638572, 288895.277144, 577790.554289, 1155581.108577, 2311162.217155, 4622324.434309, 9244648.868618, 18489297.737236, 36978595.474472, 73957190.948944, 147914381.897889, 295828763.795777, 591657527.591555]
        });

        app.basemaps_jtsk["zm"] = new TileLayer({ url: "https://ags.cuzk.gov.cz/arcgis1/rest/services/ZTM/MapServer", id: "zm" });
        app.basemaps_jtsk["ortofoto"] = new TileLayer({ url: "https://ags.cuzk.gov.cz/arcgis1/rest/services/ORTOFOTO/MapServer", id: "ortofoto", });
        app.basemaps_jtsk["empty"] = new MapImageLayer({ url: "https://ags.cuzk.gov.cz/arcgis/rest/services/Pracovni/AppAdd/MapServer", id: "empty", imageFormat: "jpg", sublayers: [{ id: 1 }] });
        app.basemaps_jtsk["dmr"] = new ImageryLayer({ url: "https://ags.cuzk.gov.cz/arcgis2/rest/services/dmr5g/ImageServer", id: "dmr", hidepopups: true });
        app.basemaps_jtsk[5] = new MapImageLayer({ url: "https://ags.cuzk.gov.cz/arcgis/rest/services/Pracovni/AppAdd/MapServer", id: "zemepisnaSit", sublayers: [{ id: 0 }], maxScale: 241920 });

        app.basemaps_merc["zm"] = new TileLayer({ url: "https://ags.cuzk.gov.cz/arcgis1/rest/services/ZTM_WM/MapServer", id: "zm" });
        app.basemaps_merc["ortofoto"] = new TileLayer({ url: "https://ags.cuzk.gov.cz/arcgis1/rest/services/ORTOFOTO_WM/MapServer", id: "ortofoto" });
        app.basemaps_merc["empty"] = new MapImageLayer({ url: "https://ags.cuzk.gov.cz/arcgis/rest/services/Pracovni/AppAdd/MapServer", spatialReference: new SpatialReference({ "wkid": 102100, "latestWkid": 3857 }), id: "empty", imageFormat: "jpg", sublayers: [{ id: 1 }] });
        app.basemaps_merc["dmr"] = new ImageryLayer({ url: "https://ags.cuzk.gov.cz/arcgis2/rest/services/dmr5g/ImageServer", id: "dmr", hidepopups: true });

        app.basemaps_jiny["zm"] = new MapImageLayer({ url: "https://ags.cuzk.gov.cz/arcgis1/rest/services/ZTM_WM/MapServer", imageFormat: "jpg", id: "zm", maxScale: 564 });
        app.basemaps_jiny["ortofoto"] = new MapImageLayer({ url: "https://ags.cuzk.gov.cz/arcgis1/rest/services/ORTOFOTO_WM/MapServer", imageFormat: "jpg", id: "ortofoto" });
        app.basemaps_jiny["empty"] = new MapImageLayer({ url: "https://ags.cuzk.gov.cz/arcgis/rest/services/Pracovni/AppAdd/MapServer", id: "empty", imageFormat: "jpg", sublayers: [{ id: 1 }], spatialReference: new SpatialReference({ wkid: 102100, latestWkid: 3857 }), sublayers: [{ id: 1 }] });
        app.basemaps_jiny["dmr"] = new ImageryLayer({ url: "https://ags.cuzk.gov.cz/arcgis2/rest/services/dmr5g/ImageServer", id: "dmr", hidepopups: true });

        app.ground_jtsk5G = new ElevationLayer({ url: "https://ags.cuzk.gov.cz/arcgis/rest/services/3D/dmr5g/ImageServer" });
        app.ground_merc5G = new ElevationLayer({ url: "https://ags.cuzk.gov.cz/arcgis/rest/services/3D/dmr5g_wm/ImageServer" });
        app.ground_jtsk4G = new ElevationLayer({ url: "https://ags.cuzk.gov.cz/arcgis/rest/services/3D/dmr4g/ImageServer" });
        app.ground_merc4G = new ElevationLayer({ url: "https://ags.cuzk.gov.cz/arcgis/rest/services/3D/dmr4g_wm/ImageServer" });

        app.movegraphicsontop = () => {
            app.layersMaphandle.remove();
            let l = app.mapView.map.layers.toArray();
            let endoflayers = l.length;
            for (let i = endoflayers - 2; i >= 0; i--) {
                if (l[i].type == "graphics") app.mapView.map.layers.reorder(l[i], endoflayers - 1);
            };
            app.layersMaphandle = app.mapView.map.layers.on("after-add", app.movegraphicsontop);
        }

        //----------------------------------
        // App
        //----------------------------------

        initializeMapViews();
        initializeAppUI();
        initializeAppSettings();
        initializeWidgets();

        function setMovable(t) {
            let p, c, h;
            if (t == true) {
                p = "relative"; c = "move"; h = "0px";
                let StepMover;
                require(["dojo/_base/declare", "dojo/_base/event", "dojo/dnd/Mover"], (declare, event, Mover) => {
                    StepMover = declare([Mover], {
                        onMouseMove: function (e) {
                            let m = this.marginBox;
                            let marginx = 150; if (e.view.innerWidth < 400) { marginx = 25; }
                            let marginyt = 70; if (e.view.innerHeight < 300) { marginyt = 10; }
                            let marginyb = 40; if (e.view.innerHeight < 300) { marginyb = 5; }
                            let novex = e.pageX;
                            let novey = e.pageY;

                            if (novex < marginx) { novex = marginx; }
                            if (novex > e.view.innerWidth - marginx) { novex = e.view.innerWidth - marginx; }
                            if (novey < marginyt) { novey = marginyt; }
                            if (novey > e.view.innerHeight - marginyb) { novey = e.view.innerHeight - marginyb; }
                            this.host.onMove(this, { l: m.l + novex, t: m.t + novey });
                            event.stop(e);
                        }
                    });
                });

                let wm = ["Info", "Produkty", "SS", "PridatVrstvu", "Layerlist", "Print", "Measurement", "Share", "HledaniSouradnice", "HlaseniChyb", "RozsireneHledani", "Vyjadreni", "Swipe", "TransformaceSouradnic", "Settings"];
                wm.forEach(e => {
                    app.arrMove.push(new Moveable(document.getElementById("panel" + e), { handle: document.getElementById("heading" + e + "Move"), mover: StepMover }));
                });
            } else {
                p = "static"; c = "default"; h = null;
                if (app.napoveda) app.napoveda.collapse();
                app.arrMove.forEach(e => {
                    e.destroy();
                });
                app.arrMove = [];
            }
            document.getElementById("movableNavBar").style.height = h;
            Array.from(document.getElementsByClassName("panel collapse")).forEach(e => {
                e.style.left = null; e.style.top = null; e.style.position = p;
            });
            Array.from(document.getElementsByClassName("panel-toggle collapsed")).forEach(e => {
                e.style.cursor = c;
            });
        }

        function initializeMapViews() {
            app.map = new Map({
                basemap: {
                    baseLayers: []
                }
            });
            if (pocatecniparametry.wkid == 5514) {
                app.map.basemap.baseLayers = [app.basemaps_jtsk["zm"], app.basemaps_jtsk[5]];
                app.spatialReference = new SpatialReference({ wkid: 102067, latestWkid: 5514 });
            } else if (pocatecniparametry.wkid == 3857) {
                app.map.basemap.baseLayers.add(app.basemaps_merc["zm"]);
                app.spatialReference = new SpatialReference({ wkid: 102100, latestWkid: 3857 });
            } else {
                app.map.basemap.baseLayers.add(app.basemaps_jiny["zm"]);
                app.spatialReference = new SpatialReference({ wkid: pocatecniparametry.wkid });
            }

            // 2D - MapView
            app.mapView = new MapView({
                container: app.mapDiv,
                map: app.map,
                zoom: app.zoom,
                center: app.lonlat,
                padding: app.padding,
                ui: app.uiPadding,
                popup: new Popup(app.popupOptions),
                visible: true,
                highlightOptions: {
                    fillOpacity: 0.5,
                    color: [50, 50, 50]
                },
                spatialReference: app.spatialReference,
                extent: new Extent({
                    xmin: pocatecniparametry.extent.xmin,
                    ymin: pocatecniparametry.extent.ymin,
                    xmax: pocatecniparametry.extent.xmax,
                    ymax: pocatecniparametry.extent.ymax,
                    spatialReference: app.spatialReference.clone()
                }),
                constraints: {
                    lods: app.noveTileInfoJTSK.lods
                }
            });
            // Set active view
            app.activeView = app.mapView;
            // 3D - SceneView 
            app.sceneView = new SceneView({
                container: app.sceneDiv,
                map: app.map,
                zoom: app.zoom,
                center: app.lonlat,
                padding: app.padding,
                ui: app.uiPadding,
                popup: new Popup(app.popupOptions),
                visible: false,
                viewingMode: "local",
                spatialReference: app.spatialReference.clone(),
                extent: new Extent({
                    xmin: pocatecniparametry.extent.xmin,
                    ymin: pocatecniparametry.extent.ymin,
                    xmax: pocatecniparametry.extent.xmax,
                    ymax: pocatecniparametry.extent.ymax,
                    spatialReference: app.spatialReference.clone()
                })
            });

            app.readyView = (view) => {
                reactiveUtils.when(() => view.fatalError, () => {
                    view.tryFatalErrorRecovery();
                });
                reactiveUtils.when(() => (view.widthBreakpoint === "xsmall" || view.widthBreakpoint === "small"), () => {
                    setMovable(false)
                });
                reactiveUtils.when(() => (view.widthBreakpoint === "medium" || view.widthBreakpoint === "large" || view.widthBreakpoint === "xlarge"), () => {
                    setMovable(true)
                });
            }
            app.readyView(app.mapView);
            app.readyView(app.sceneView);
        }

        //----------------------------------
        // View widgets
        //----------------------------------

        function initializeWidgets() {
            var isOnline = () => {
                appstate.online = true; app.setState();
            };
            var isOffline = () => {
                appstate.online = false; app.setState();
            };
            if (window.addEventListener) {
                window.addEventListener("online", isOnline, false);
                window.addEventListener("offline", isOffline, false);
            } else {
                document.body.ononline = isOnline;
                document.body.onoffline = isOffline;
            }

            app.setState = () => {
                var displayOnlineStatus = document.getElementById("offline");
                if (displayOnlineStatus) {
                    var textdivu = "";
                    if (appstate.online == false) {
                        textdivu = "&nbsp;(offline)";
                    } else {
                        if (appstate.ohlasenproblemseserverem) {
                            textdivu = "&nbsp;(" + label[655] + ")";
                        } else {
                            if (appstate.ohlasenproblemstokenem) {
                                textdivu = "&nbsp;(" + label[654] + ")";
                            }
                        }
                    }
                    displayOnlineStatus.innerHTML = textdivu;
                    displayOnlineStatus.title = '';
                }
            };

            app.prover_tokenG = () => {
                if (requireTokenG == false) {
                    requireTokenG = true;
                }
                return new Promise((resolve, reject) => {
                    if (lastExpiresG < Date.now()) {
                        promiseUtils.eachAlways([
                            esriRequest("https://ags.cuzk.gov.cz/arcgis2/rest/info/healthCheck", { method: "POST", query: { f: "json" }, responseType: "json", cacheBust: true, timeout: 15000 })
                        ]).then((results) => {
                            if (results[0].error) {
                                if (!appstate.ohlasenproblemseserverem) {
                                    appstate.ohlasenproblemseserverem = true; app.setState();
                                    if (controllerG) { controllerG.abort(); controllerG = undefined; }
                                    if (controllerR) { controllerR.abort(); controllerR = undefined; }
                                }
                            } else {
                                if (results[0].value.data.success == true) {
                                    if (appstate.ohlasenproblemseserverem) {
                                        appstate.ohlasenproblemseserverem = false; app.setState();
                                    }
                                    if (requireTokenG == true) {
                                        if (controllerG) { controllerG.abort(); }
                                        controllerG = new AbortController();
                                        appConfig.getMytoken('g').then(() => {
                                            hasSecureAccess_g = true;
                                            if (hasmapViewWhen && jeodsednuto_g == false) { jeodsednuto_g = true; comaodsednoutpotokenu(); }
                                            if (appstate.ohlasenproblemstokenem) {
                                                if (hasSecureAccess_r) { appstate.ohlasenproblemstokenem = false; app.setState(); }
                                            }
                                            if (zavriPrihlasovaciOknoListener && hasSecureAccess_r) { zavriPrihlasovaciOknoListener.remove(); zavriPrihlasovaciOknoListener = undefined; }
                                            resolve({ status: "OK" });
                                        }, function (err) {
                                            hasSecureAccess_g = false;
                                            if (!appstate.ohlasenproblemstokenem) {
                                                appstate.ohlasenproblemstokenem = true; app.setState();
                                                if (!zavriPrihlasovaciOknoListener) { aktivujZaviraniPrihlasovacihoOkna(); }
                                            }
                                            console.log(err);
                                            requireTokenG = false;
                                            reject(err);
                                        });
                                    }
                                } else {
                                    if (!appstate.ohlasenproblemseserverem) {
                                        appstate.ohlasenproblemseserverem = true; app.setState();
                                        if (controllerG) { controllerG.abort(); controllerG = undefined; }
                                        if (controllerR) { controllerR.abort(); controllerR = undefined; }
                                    }
                                }
                            }
                        });
                    } else {
                        resolve({ status: "OK" });
                    }
                });
            };

            app.prover_tokenR = () => {
                if (requireTokenR == false) {
                    requireTokenR = true;
                }
                return new Promise((resolve, reject) => {
                    if (lastExpiresR < Date.now()) {
                        promiseUtils.eachAlways([
                            esriRequest("https://ags.cuzk.gov.cz/arcgis2/rest/info/healthCheck", { method: "POST", query: { f: "json" }, responseType: "json", cacheBust: true, timeout: 15000 })
                        ]).then((results) => {
                            if (results[0].error) {
                                if (!appstate.ohlasenproblemseserverem) {
                                    appstate.ohlasenproblemseserverem = true; app.setState();
                                    if (controllerG) { controllerG.abort(); controllerG = undefined; }
                                    if (controllerR) { controllerR.abort(); controllerR = undefined; }
                                }
                            } else {
                                if (results[0].value.data.success == true) {
                                    if (appstate.ohlasenproblemseserverem) {
                                        appstate.ohlasenproblemseserverem = false; app.setState();
                                    }
                                    if (requireTokenR == true) {
                                        if (controllerR) { controllerR.abort(); }
                                        controllerR = new AbortController();
                                        appConfig.getMytoken('r').then(() => {
                                            hasSecureAccess_r = true;
                                            if (appstate.ohlasenproblemstokenem) {
                                                if (hasSecureAccess_g) { appstate.ohlasenproblemstokenem = false; app.setState(); }
                                            }
                                            if (zavriPrihlasovaciOknoListener && hasSecureAccess_g) { zavriPrihlasovaciOknoListener.remove(); zavriPrihlasovaciOknoListener = undefined; }
                                            resolve({ status: "OK" });
                                        }, function (err) {
                                            hasSecureAccess_r = false;
                                            if (!appstate.ohlasenproblemstokenem) {
                                                appstate.ohlasenproblemstokenem = true; app.setState();
                                                if (!zavriPrihlasovaciOknoListener) { aktivujZaviraniPrihlasovacihoOkna(); }
                                            }
                                            console.log(err);
                                            requireTokenR = false;
                                            reject(err);
                                        });
                                    }
                                } else {
                                    if (!appstate.ohlasenproblemseserverem) {
                                        appstate.ohlasenproblemseserverem = true; app.setState();
                                        if (controllerG) { controllerG.abort(); controllerG = undefined; }
                                        if (controllerR) { controllerR.abort(); controllerR = undefined; }
                                    }
                                }
                            }
                        });
                    } else {
                        resolve({ status: "OK" });
                    }
                });
            }

            //průběžná kontrola stavu, případně opětovného načtení práv
            var posledniPrubeznaKontrolaStavu = Date.now();
            var zadostOHealth = 0;

            var App_internal_timing = () => {
                var rozdilcasu = Date.now() - posledniPrubeznaKontrolaStavu - 3000;
                if (Math.abs(rozdilcasu) < 5000) {    //pokud mezitím počítač spal, nespustí se tato podmínka - často ještě není dostupný internet a browser si
                    //ze stavu před uspáním pamatuje, že byl online.
                    if (navigator.onLine && document.hidden == false && zadostOHealth == 0) {
                        zadostOHealth = 40;   //další žádost až po 21s
                        if (requireTokenR == true) {
                            app.prover_tokenR();
                        }
                        if (requireTokenG == true) {
                            app.prover_tokenG()
                        }
                    }

                    if (navigator.onLine != appstate.online) {
                        if (navigator.onLine) {
                            isOnline();
                        } else {
                            isOffline();
                        }
                    }
                } else {
                    // aby se případně tokeny načetly co nejdřív po probuzení počítače
                    zadostOHealth = 0;
                }
                posledniPrubeznaKontrolaStavu = Date.now();

                if (zadostOHealth > 0) { zadostOHealth--; }
            };
            window.setInterval(App_internal_timing, 3000);
            App_internal_timing();

            app.searchSettings = (widget) => {
                reactiveUtils.watch(() => widget.activeSource, () => {
                    widget.suggest();
                });
                let searchIndex = -1;
                if (myStorage.geoprohlizec) {
                    if (myStorage.geoprohlizec["search"]) {
                        if (Number(myStorage.geoprohlizec["search"]) != -1) {
                            searchIndex = myStorage.geoprohlizec["search"];
                        }
                    }
                }
                if (document.getElementById('settingssearchSelect').options.length == 0) {
                    var option = document.createElement("option");
                    option.setAttribute("value", -1);
                    option.innerHTML = label[514];
                    if (searchIndex == -1) {
                        option.setAttribute("selected", "selected");
                    }
                    document.getElementById('settingssearchSelect').appendChild(option);
                    for (var j = 0; j < widget.sources.items.length; j++) {
                        if (widget.sources.items[j].name) {
                            var option = document.createElement("option");
                            option.setAttribute("value", j);
                            if ((searchIndex != -1) && searchIndex == j) {
                                option.setAttribute("selected", "selected");
                            }
                            option.innerHTML = widget.sources.items[j].name;
                            document.getElementById('settingssearchSelect').appendChild(option);
                        }
                    }
                    document.getElementById('settingssearchSelect').disabled = false;
                }
                if (Number(document.getElementById('settingssearchSelect').value) != -1) {
                    widget.activeSourceIndex = Number(document.getElementById('settingssearchSelect').value);
                }
                if (widget.sourceMenuId) {
                    if (document.getElementById(widget.sourceMenuId)) {
                        var advancedSearch = document.createElement("li");
                        advancedSearch.innerHTML = "<span class='esri-icon-expand' style='padding-bottom: 2px; transform: rotate(180deg);'></span> " + label[313].toLowerCase();
                        advancedSearch.className = "esri-search__source esri-menu__list-item";
                        advancedSearch.tabIndex = -1;
                        advancedSearch.setAttribute("onclick", "(() => { document.getElementById('tlacitkoRozsireneHledani').click(); app.activeView.ui.find('search').activeMenu = 'none'; })();");
                        document.getElementById(widget.sourceMenuId).appendChild(advancedSearch);
                    }
                }
            }

            app.popupSettings = (view) => {
                reactiveUtils.watch(() => view.popup.title, () => {
                    if (view.popup.title == "Výsledek vyhledávání" || view.popup.title == "Search result") {
                        let mySearch = view.ui.find("search");
                        let title = view.popup.title;
                        if (title.indexOf("(" > -1)) {
                            title = title.split(' (');
                            view.popup.title = title[0];
                            view.popup.title += ' (' + mySearch.viewModel.resultCount + ')';
                        } else {
                            view.popup.title += ' (' + mySearch.viewModel.resultCount + ')';
                        }
                    }
                });

                reactiveUtils.watch(() => view.popup.selectedFeature, () => {
                    let sf = view.popup.selectedFeature;
                    if (view.popup.selectedFeature) {
                        if ((sf.attributes) && sf.attributes.Type) {
                            if (sf.attributes.Type == "AdresniMisto") {
                                sf.popupTemplate.actions =
                                    [{
                                        id: "nahlizeni",
                                        className: "esri-icon-review",
                                        title: label[530]
                                    }, {
                                        id: "locate",
                                        className: "esri-icon-share",
                                        title: label[314]
                                    }]
                            } else if (sf.attributes.Type == "GEONAMES") {
                                var geonames = false;
                                app.layerListWidget.operationalItems.forEach((vrstva) => {
                                    if (vrstva.layer) {
                                        if (vrstva.layer.url) {
                                            if (vrstva.layer.url.indexOf('GEONAMES') > -1) {
                                                if (vrstva.layer.visible == true) {
                                                    geonames = true;
                                                }
                                            }
                                        }
                                    }
                                });
                                if (geonames == false) {
                                    sf.popupTemplate.actions =
                                        [{
                                            id: "geonames",
                                            className: "esri-icon-right-arrow",
                                            title: label[587]
                                        }, {
                                            id: "locate",
                                            className: "esri-icon-share",
                                            title: label[314]
                                        }]
                                } else {
                                    sf.popupTemplate.actions = [{
                                        id: "locate",
                                        className: "esri-icon-share",
                                        title: label[314]
                                    }]
                                }
                            } else {
                                sf.popupTemplate.actions = null;
                            }
                        } else if ((sf.geometry) && (sf.geometry.type == "polygon" || sf.geometry.type == "polyline" || sf.geometry.type == "point")) {
                            if (sf.popupTemplate.actions) {
                                let isJson = false;
                                sf.popupTemplate.actions.items.forEach((akce) => {
                                    if (akce.id == "geojson") {
                                        isJson = true;
                                    }
                                });
                                if (isJson == false) {
                                    let geojson = {
                                        id: "geojson",
                                        className: "esri-icon-save",
                                        title: "GeoJSON"
                                    }
                                    sf.popupTemplate.actions.push(geojson);
                                }
                            } else {
                                let geojson = [{
                                    id: "geojson",
                                    className: "esri-icon-save",
                                    title: "GeoJSON"
                                }]
                                sf.popupTemplate.actions = geojson;
                            }
                            if (sf.geometry.type == "polygon" && view.type == "2d") {
                                if (geometryEngine.planarArea(sf.geometry, "square-kilometers") >= 1) {
                                    let listExports = [];
                                    view.map.layers.forEach(s => {
                                        if (s.dataName) if (!listExports.includes[s.title, s.dataName]) listExports.push([s.title, s.dataName])
                                    });
                                    listExports.forEach(e => {
                                        let exportAction = {
                                            id: "exportData",
                                            className: "esri-icon-download",
                                            title: label[39] + e[0],
                                            dataName: e[1]
                                        }
                                        if (sf.popupTemplate.actions) {
                                            let isExport = true;
                                            sf.popupTemplate.actions.items.forEach(akce => {
                                                if (akce?.dataName == e[1]) isExport = false;
                                            });
                                            if (isExport == true) sf.popupTemplate.actions.unshift(exportAction);
                                        } else {
                                            sf.popupTemplate.actions = [exportAction];
                                        }
                                    });
                                }
                            }
                        } else if (!sf.geometry && sf.sourceLayer) {
                            if (sf.sourceLayer.source) {
                                let fid = sf.attributes[sf.sourceLayer.objectIdField];
                                for (let i = 0; i < sf.sourceLayer.source.items.length; i++) {
                                    if (sf.sourceLayer.source.items[i].attributes[sf.sourceLayer.objectIdField] == fid) {
                                        if (sf.popupTemplate.actions) {
                                            let isJson = false;
                                            sf.popupTemplate.actions.items.forEach((akce) => {
                                                if (akce.id == "geojson") {
                                                    isJson = true;
                                                }
                                            });
                                            if (isJson == false) {
                                                let geojson = {
                                                    id: "geojson",
                                                    className: "esri-icon-save",
                                                    title: "GeoJSON"
                                                }
                                                sf.popupTemplate.actions.push(geojson);
                                            }
                                        } else {
                                            let geojson = [{
                                                id: "geojson",
                                                className: "esri-icon-save",
                                                title: "GeoJSON"
                                            }]
                                            sf.popupTemplate.actions = geojson;
                                        }
                                        if ((sf.sourceLayer.source.items[i].geometry) && sf.sourceLayer.source.items[i].geometry.type == "polygon") {
                                            if (sf.popupTemplate.actions) {
                                                let isDBP = false;
                                                sf.popupTemplate.actions.items.forEach((akce) => {
                                                    if (akce.id == "vyjadreniDBP") {
                                                        isDBP = true;
                                                    }
                                                });
                                                if (isDBP == false) {
                                                    let dbp = {
                                                        id: "vyjadreniDBP",
                                                        className: "esri-icon-documentation",
                                                        title: label[321]
                                                    }
                                                    sf.popupTemplate.actions.push(dbp);
                                                }
                                            } else {
                                                let dbp = [{
                                                    id: "vyjadreniDBP",
                                                    className: "esri-icon-documentation",
                                                    title: label[321]
                                                }]
                                                sf.popupTemplate.actions = dbp;
                                            }
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                    }
                });

                view.popup.viewModel.on("trigger-action", (event) => {
                    if (event.action.id === "nahlizeni") {
                        if (view.spatialReference.wkid == 5514 || view.spatialReference.wkid == 102067) {
                            var katpage = protokol + "nahlizenidokn.cuzk.gov.cz/MapaIdentifikace.aspx?&x=" + view.popup.location.x.toFixed(0) + "&y=" + view.popup.location.y.toFixed(0);
                            if (view.widthBreakpoint == "xsmall" || view.widthBreakpoint == "small") {
                                window.open(katpage);
                            } else {
                                window.open(katpage, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=100, left=100, width=600, height=600");
                            }
                        }
                    } else if (event.action.id === "geonames") {
                        view.popup.close();
                        var geonames = false;
                        app.layerListWidget.operationalItems.forEach((vrstva) => {
                            if (vrstva.layer) {
                                if (vrstva.layer.url) {
                                    if (vrstva.layer.url.indexOf('GEONAMES') > -1) {
                                        if (vrstva.layer.visible == false) {
                                            vrstva.layer.visible = true;
                                        }
                                        geonames = true;
                                    }
                                }
                            }
                        });
                        if (geonames == false) {
                            app.widgetProdukty.useproduct(22522);
                        }
                    } else if (event.action.id === "histonames") {
                        view.popup.close();
                        var histonames = false;
                        app.layerListWidget.operationalItems.forEach((vrstva) => {
                            if (vrstva.layer) {
                                if (vrstva.layer.url) {
                                    if (vrstva.layer.url.indexOf('HistorickaJmena') > -1) {
                                        if (vrstva.layer.visible == false) {
                                            vrstva.layer.visible = true;
                                        }
                                        histonames = true;
                                    }
                                }
                            }
                        });
                        if (histonames == false) {
                            app.widgetProdukty.useproduct(81);
                        }
                    } else if (event.action.id === "csv") {
                        var data = view.popup.selectedFeature.attributes;
                        var csv = '';
                        var cisloparcely = '';
                        for (o in data) {
                            if (o == "cisloparcely") { o = label[558].replace(":", ""); }
                            if (o == "katastralniuzemi") { o = label[151]; }
                            if (o == "id") { o = label[150]; }
                            if (o == "druhcislovanikod") { o = label[62]; }
                            if (o == "kmenovecislo") { o = label[59]; }
                            if (o == "poddelenicisla") { o = label[60]; }
                            if (o == "druhpozemkukod") { o = label[149]; }
                            if (o == "zpusobyvyuzitipozemku") { o = label[607]; }
                            if (o == "vymeraparcely") { o = label[61].replace(":", "") + "(m²)"; }
                            csv += o + ";";
                        };
                        csv += "\n";
                        for (o in data) {
                            csv += data[o] + ";";
                            if (o == "cisloparcely") { cisloparcely = data[o]; }
                        };

                        var a = document.createElement('a');
                        a.href = 'data:text/csv;charset=utf-8,' + "\ufeff" + encodeURIComponent(csv);
                        a.target = '_blank';
                        a.download = 'parcela_' + cisloparcely + '.csv';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    } else if (event.action.id === "locate") {
                        app.mojeMisto.get();
                    } else if (event.action.id === "exportData") {
                        app.export.widget(event.action.dataName);
                        app.export.localDataPopup(true);
                    } else if (event.action.id === "geojson") {
                        if (app.geojson) app.geojson(app.activeView);
                    } else if (event.action.id === "hlaseniChyb") {
                        if (app.graphics_coord_layer) {
                            let pole = app.graphics_coord_layer.graphics.toArray();
                            for (let i = pole.length - 1; i >= 0; i--) {
                                if (pole[i].mujtyp == "hlaseni_bod" || pole[i].mujtyp == "hlaseni_temp" || pole[i].mujtyp == "hlaseni_grafika") {
                                    app.graphics_coord_layer.graphics.remove(pole[i]);
                                }
                            }
                        }
                        if (app.widgetHlasenichyb) app.widgetHlasenichyb.drawingcompleteBod(undefined, [view.popup.location.x, view.popup.location.y]); view.popup.close(); document.getElementById("tlacitkoHlaseniChyb").click();
                    } else if (event.action.id === "vyjadreniDBP") {
                        let sl = view.popup.selectedFeature;
                        if (!sl.geometry) {
                            let fid = sl.attributes[sl.sourceLayer.objectIdField];
                            for (let i = 0; i < sl.sourceLayer.source.items.length; i++) {
                                if (sl.sourceLayer.source.items[i].attributes[sl.sourceLayer.objectIdField] == fid) {
                                    app.polohaProjektu.drawingcompleteShape(sl.sourceLayer.source.items[i].geometry.rings[0]);
                                }
                            }
                        } else {
                            app.polohaProjektu.drawingcompleteShape(sl.geometry.rings[0]);
                        }
                        view.popup.close();
                        document.getElementById("tlacitkoVyjadreniDBP").click();
                    } else if (event.action.id === "dmrz") {
                        var url = "https://ags.cuzk.gov.cz/arcgis2/rest/services/dmr5g/ImageServer/identify?geometry={x:" + view.popup.selectedFeature.geometry.x + ",y:" + view.popup.selectedFeature.geometry.y + ",spatialReference:{wkid:5514}}&geometryType=esriGeometryPoint&mosaicRule=&renderingRule=&pixelSize=&time=&returnGeometry=false&returnCatalogItems=false&f=pjson";
                        var graphic = view.popup.selectedFeature;
                        view.popup.close();
                        esriRequest(url, {
                            responseType: "json"
                        }).then((response) => {
                            var vyskaNum = Number(response.data.value);
                            var vyskaKrovak = vyskaNum.toFixed(2);
                            graphic.popupTemplate.content += "<hr>" + label[145] + " (DMR 5G): <b>" + vyskaKrovak + "</b> (m)";
                            for (let i = 0; i < graphic.popupTemplate.actions.items.length; i++) {
                                if (graphic.popupTemplate.actions.items[i].id == "dmrz") {
                                    graphic.popupTemplate.actions.removeAt(i);
                                    break;
                                }
                            }
                            view.popup.open({
                                features: [graphic]
                            });
                        });
                    }
                });
            }

            app.mapView.when(() => {
                document.getElementById("loader").style.display = "none";
                document.getElementById("loadingImg").style.animation = "none";
                document.getElementById("loadingTitle").style.animation = "none";
                document.getElementById("loadingTitle2").style.animation = "none";
                document.getElementById("loadingTitle2").innerHTML = label[549];
                app.mapView.widthBreakpoint === "xsmall" || app.mapView.widthBreakpoint === "small" ? setMovable(false) : setMovable(true)

                app.watchNavigate = () => {
                    app.watchNavigateMove = () => {
                        if ((app.mapView) && app.mapView.viewpoint) {
                            myStorage.geoprohlizec["navigating"] = app.mapView.viewpoint.toJSON();
                        }
                        localStorage.settings = JSON.stringify(myStorage);
                        app.watchNavigateHandle = reactiveUtils.watch(() => app.mapView.stationary, () => {
                            if (app.mapView.stationary == true) {
                                if ((app.mapView) && app.mapView.viewpoint) {
                                    myStorage.geoprohlizec["navigating"] = app.mapView.viewpoint.toJSON();
                                }
                                localStorage.settings = JSON.stringify(myStorage);
                            }
                        });
                    }
                    app.watchNavigateMove();
                }

                if (myStorage.geoprohlizec) {
                    if (myStorage.geoprohlizec["navigating"]) {
                        if (myStorage.geoprohlizec["navigating"] != false) {
                            if (myUrlParams.extentstring == "") {
                                app.mapView.viewpoint = Viewpoint.fromJSON(myStorage.geoprohlizec["navigating"]);
                                document.getElementById("settingsnavigating").checked = true;
                                myUrlParams.extentstring = "false";
                                app.watchNavigate();
                            } else {
                                document.getElementById("settingsnavigating").checked = false;
                            }
                        }
                    }
                }
                require(["./widgets/Layers.js", "./widgets/ChangeCoordSystem.js"], () => { });
                hasmapViewWhen = true;

                if (myUrlParams.id != "") {
                    var styl = "position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); padding: 10px; width: 15%; min-width: 200px; background-color: white; box-shadow: 0px 1px 2px rgba(0,0,0,0.3); max-height: 40%; overflow: auto;";
                    if (localStorage.theme) {
                        if (localStorage.theme != "default") {
                            if (localStorage.theme == "dark") {
                                styl += "background-color: #4c4c4c; color: white;";
                            } else if (localStorage.theme == "light") {
                                styl += "background-color: white; color: #333333;";
                            }
                        }
                    }
                    var widgetLoadID = domConstruct.create("div", {
                        id: "widgetLoadID",
                        class: "panel-collapse",
                        style: styl,
                        innerHTML: label[549]
                    });
                    app.mapView.ui.add({
                        component: widgetLoadID
                    });
                }

                var widgetPrevence = domConstruct.create("div", {
                    style: "positon: absolute; left: 0px; top: 0px; width: 60px; height: 340px; z-index: -1;"
                });
                app.mapView.ui.add({
                    component: widgetPrevence
                });

                var widgetUpdatingMap = domConstruct.create("div", {
                    id: "widgetUpdatingMap",
                    style: "box-shadow: none; border-radius: 50%;",
                    innerHTML: "<div class='esri-icon-loading-indicator' style='animation: infiniteRotate 1s linear infinite; font-size: 25px; border-radius: 50%; box-shadow: 0px 0px 15px rgba(255,255,255,1);'></div>"
                });
                app.mapView.ui.add({
                    component: widgetUpdatingMap,
                    position: "bottom-right"
                });

                query('.help').on("click", (e) => {
                    if (e.currentTarget.classList[1]) {
                        query(".subhelp-" + e.currentTarget.classList[1].toString()).toggleClass("hidden");
                        query(".subhelpArrow-" + e.currentTarget.classList[1].toString()).toggleClass("rotate");
                    }
                });

                (function () {
                    let a = [
                        ["obsahProdukty", "onTopProdukty"],
                        ["obsahAddData", "onTopAddData"],
                        ["obsahNapoveda", "onTopNapoveda"],
                        ["obsahLayerlist", "onTopLayerlist"]
                    ];
                    a.forEach(e => {
                        let w = document.getElementById(e[0]);
                        w.onscroll = () => {
                            let btn = document.getElementById(e[1]);
                            w.scrollTop > 20 ? btn.style.display = 'block' : btn.style.display = 'none'
                            btn.onclick = () => {
                                w.scrollTop = 0;
                                btn.style.display = 'none';
                            }
                        }
                    });
                })();

                for (let i = 0; i < app.noveTileInfoJTSK.scales.length; i++) {
                    var opt = document.createElement('option');
                    opt.value = app.noveTileInfoJTSK.scales[i];
                    let scale = app.noveTileInfoJTSK.scales[i].toLocaleString('en', {
                        maximumFractionDigits: 0
                    }).replace(/,/g, " ");
                    opt.innerHTML = "1 : " + scale;
                    document.getElementById("vlastniMeritko").appendChild(opt);
                }
                document.getElementById("vlastniMeritko").value = app.mapView.scale;

                app.nastavMeritko = () => {
                    if (document.getElementById("label_43").classList.value.indexOf("rotate") > -1) {
                        query(".vlastniMeritko").addClass("hidden");
                        query("#label_43").removeClass("rotate");
                    } else {
                        query(".vlastniMeritko").removeClass("hidden");
                        query("#label_43").addClass("rotate");
                        if (document.getElementById("vlastniMeritko").value != "own") {
                            let validScale = false;
                            document.getElementById('vlastniMeritko').childNodes.forEach((opt) => {
                                if (opt.nodeName == "OPTION") {
                                    let scale = opt.value;
                                    if (Number(scale) == app.mapView.scale) {
                                        validScale = true;
                                    }
                                }
                            });
                            if (validScale == true) {
                                document.getElementById("vlastniMeritko").value = app.mapView.scale;
                                query("#vlastniMeritkoInput, #label_223").addClass("hidden");
                            } else {
                                document.getElementById("vlastniMeritko").value = "own";
                                query("#vlastniMeritkoInput, #label_223").removeClass("hidden");
                            }
                        }
                    }
                };

                app.pouzitMeritko = (ownScale, newScale) => {
                    if (document.getElementById("vlastniMeritko").value != "own") {
                        query("#vlastniMeritkoInput, #label_223").addClass("hidden");
                    } else {
                        query("#vlastniMeritkoInput, #label_223").removeClass("hidden");
                    }
                    if (ownScale) {
                        if (zoomControl) {
                            zoomControl.remove();
                        }
                        app.mapView.constraints.snapToZoom = false;
                        let scale;
                        if (newScale) {
                            scale = newScale;
                        } else {
                            scale = document.getElementById("vlastniMeritkoInput").value.trim();
                            if (scale.indexOf(":") > -1) {
                                let splitScale = scale.split(":");
                                scale = splitScale[1];
                                scale = Number(scale);
                            } else {
                                scale = Number(scale);
                            }
                        }
                        if (isNaN(scale) == false) {
                            app.mapView.scale = scale;
                        } else {
                            app.mapView.constraints.snapToZoom = true;
                            alert(label[383]);
                            return
                        }
                        zoomControl = reactiveUtils.watch(() => app.mapView.zoom, () => {
                            if (app.mapView.constraints.snapToZoom == false) {
                                app.mapView.constraints.snapToZoom = true;
                            }
                        });
                    } else {
                        if (document.getElementById("vlastniMeritko").value != "own") {
                            app.activeView.goTo({
                                scale: Number(document.getElementById("vlastniMeritko").value)
                            });
                        }
                    }
                };

                app.rss = () => {
                    app.removeDiv(['widgetRSS']);
                    fetch('https://geoportal.cuzk.gov.cz/rss/default.ashx?lng=CZ').then((response) => {
                        response.text().then((str) => {
                            let items = new window.DOMParser().parseFromString(str, "text/xml").querySelectorAll("item");
                            let div = document.createElement("DIV");
                            let panelDiv = document.createElement("DIV");
                            panelDiv.className = "panel-body";
                            panelDiv.innerHTML = "<span><a target='_blank' href='https://geoportal.cuzk.gov.cz/Default.aspx?mode=News&head_tab=sekce-00-gp&newsTyp=archiv'><b>" + label[485] + ":</b></a></span><span style='float: right; cursor: pointer; padding: 2px;' class='esri-icon-close bold' onclick='app.removeDiv([\"widgetRSS\"])' title='" + label[325] + "'></span><br><br>"
                            div.appendChild(panelDiv);
                            if (items.length == 0) {
                                let nothing = document.createElement("DIV");
                                nothing.innerHTML = label[588];
                                panelDiv.appendChild(nothing);
                            } else {
                                for (var i = 0; i < items.length; i++) {
                                    let newFeed = document.createElement("DIV");
                                    let d = new Date(items[i].children[1].textContent);
                                    newFeed.innerHTML = d.getDate() + ". " + (d.getMonth() + 1) + ". " + d.getFullYear() + " - " + items[i].children[4].textContent;
                                    panelDiv.appendChild(newFeed);
                                    if (i != items.length - 1) panelDiv.appendChild(document.createElement("HR"));
                                }
                            }
                            let styl = "position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); background-color: white; box-shadow: 0px 1px 2px rgba(0,0,0,0.3); max-height: 80%; overflow: auto; z-index: 2;";
                            if (localStorage.theme) {
                                if (localStorage.theme != "default") {
                                    if (localStorage.theme == "dark") {
                                        styl += "background-color: #4c4c4c; color: white;";
                                    } else if (localStorage.theme == "light") {
                                        styl += "color: #333333;";
                                    }
                                }
                            }
                            let widgetRSS = domConstruct.create("div", {
                                id: "widgetRSS",
                                style: styl,
                                class: "panel-collapse",
                                innerHTML: div.innerHTML
                            });
                            app.activeView.ui.add({
                                component: widgetRSS
                            });
                            app.napoveda3.collapse();
                        });
                    });
                }

                app.odstranitVrstvy = () => {
                    app.activeView.map.layers.toArray().forEach(e => {
                        if (e.type != "graphics") app.activeView.map.remove(e);
                    });
                    document.getElementById("timeortofotodiv").style.display = "none";
                    app.removeDiv(['widgetBlendMode', 'widgetRasterFunctions', 'widgetInformaceWMS', 'widgetWmtsStyle']);
                    app.aktivni_kompozice = null;
                    app.aktivni_produkt = null;
                    document.getElementById('odstranitvrstvy').style.display = 'none';
                    document.getElementById('nazevvrstevdiv').innerHTML = "";
                };

                app.archivniOrtofoto = () => {
                    let ao = app.activeView.map.layers.toArray();
                    for (var t = ao.length - 1; t >= 0; t--) {
                        if (ao[t].url) {
                            if (ao[t].url.indexOf("geoportal.cuzk.gov.cz/WMS_ORTOFOTO_ARCHIV/WMService.aspx") > -1) {
                                let p = ao[t].sublayers.items;
                                for (var a = p.length - 1; a >= 0; a--) {
                                    p[a].title == document.getElementById('timeortofoto').value ? p[a].visible = true : p[a].visible = false
                                }
                            }
                        }
                    };
                };

                query("#panelMeasurement > div > div > a > span.esri-icon-close").on("click", (e) => {
                    app.mereni(3);
                });

                app.mereni = (e) => {
                    if (e == 1) {
                        if (app.activeView == app.mapView) {
                            app.measurement.activeTool = "distance";
                        } else if (app.activeView == app.sceneView) {
                            app.measurement.activeTool = "direct-line";
                        }
                        query("#label_64").addClass("hidden");
                        query("#label_65").removeClass("hidden");
                    } else if (e == 2) {
                        app.measurement.activeTool = "area";
                        query("#label_65").addClass("hidden");
                        query("#label_64").removeClass("hidden");
                    } else if (e == 3) {
                        app.measurement.clear();
                        query("#label_68").addClass("hidden");
                        query("#label_64, #label_65").removeClass("hidden");
                        app.enabledPopup = true;
                    }
                };

                reactiveUtils.watch(() => app.measurement.viewModel.state, (stav) => {
                    if (stav == "measured") {
                        if (app.measurement.activeTool == 'distance' || app.measurement.activeTool == 'direct-line') {
                            query("#label_65").removeClass("hidden");
                        } else if (app.measurement.activeTool == 'area') {
                            query("#label_64").removeClass("hidden");
                        }
                        app.enabledPopup = true;
                    } else if (stav == "measuring" || stav == "ready") {
                        app.enabledPopup = false;
                        query("#label_64, #label_65").addClass("hidden");
                        query("#label_68").removeClass("hidden");
                    }
                });

                document.getElementById("volbaSS").value = app.mapView.spatialReference.wkid;
                app.panelSettings.setWidgetPosition(app.mapView, "home", "top-left", 0);
                app.panelSettings.setWidgetPosition(app.mapView, "track", "top-left", 1);
                if (myStorage.geoprohlizec) {
                    if (myStorage.geoprohlizec["track"]) {
                        let track = app.mapView.ui.find("track");
                        track ? track.start() : false;
                        document.getElementById("settingstrack").checked = true;
                    } else {
                        document.getElementById("settingstrack").checked = false;
                    }
                }
                app.panelSettings.setWidgetPosition(app.mapView, "compass", "top-left");
                app.panelSettings.setWidgetPosition(app.mapView, "search", "top-left");
                app.mapView.ui.find("search") ? app.mapView.ui.find("search").when(() => app.searchSettings(app.mapView.ui.find("search"))) : false
                app.panelSettings.setWidgetPosition(app.mapView, "scalebar", "bottom-right");
                app.panelSettings.setWidgetPosition(app.mapView, "expand2", "top-left");
                if (myStorage.geoprohlizec) {
                    if (myStorage.geoprohlizec["expand3"]) {
                        app.panelSettings.setWidgetPosition(app.mapView, "expand3", "top-left");
                    } else {
                        document.getElementById("settingsexpand3").checked = false;
                    }
                } else {
                    app.panelSettings.setWidgetPosition(app.mapView, "expand3", "top-left");
                }
                if ((!myStorage.geoprohlizec) && (app.mapView.widthBreakpoint == "medium" || app.mapView.widthBreakpoint == "large" || app.mapView.widthBreakpoint == "xlarge")) {
                    app.panelSettings.setWidgetPosition(app.mapView, "expand", "top-left");
                }
                if (document.getElementById("settingslayerlist")) {
                    let selectedContent = "null";
                    if (myStorage.geoprohlizec) {
                        if (myStorage.geoprohlizec["layerlist"]) {
                            if (myStorage.geoprohlizec["layerlist"] != "null") {
                                selectedContent = myStorage.geoprohlizec["layerlist"];
                            }
                        }
                    }
                    let option = document.createElement("option");
                    option.setAttribute("value", "null");
                    option.innerHTML = label[328];
                    if (selectedContent == -1) {
                        option.setAttribute("selected", "selected");
                    }
                    document.getElementById('settingslayerlist').appendChild(option);
                    let options = [
                        [label[368], [label[125], "b-zm"], [label[130], "b-ortofoto"], ["DMR 5G", "b-dmr"]],
                        [label[751] + ":", [label[137], "p-22514"], [label[138], "p-22521"], [label[531], "p-22575"], ["ZABAGED® - " + label[601], "p-22574"], [label[130], "p-22524"], ["Geonames", "p-22522"], ["RUIAN", "p-88"]],
                        [label[752] + ":", [label[137], "k-485"], [label[138], "k-503"], [label[130], "k-12232"], ["Geonames", "k-490"]]
                    ];
                    function generateOpt(array) {
                        let optgroup = document.createElement("optgroup");
                        optgroup.label = array[0];
                        for (let o = 1; o < array.length; o++) {
                            if (array[o]) {
                                let option = document.createElement("option");
                                option.setAttribute("value", array[o][1]);
                                if ((selectedContent != "null") && selectedContent == array[o][1]) {
                                    option.setAttribute("selected", "selected");
                                }
                                option.innerHTML = array[o][0];
                                optgroup.appendChild(option);
                            }
                        }
                        document.getElementById('settingslayerlist').appendChild(optgroup);
                    }
                    for (let i = 0; i < options.length; i++) {
                        generateOpt(options[i]);
                    }
                    document.getElementById('settingslayerlist').disabled = false;
                }
                if (myStorage.geoprohlizec) {
                    if (myStorage.geoprohlizec["katastr"]) {
                        app.panelSettings.setWidgetPosition(app.mapView, "expand", "top-left");
                    } else {
                        document.getElementById("settingskatastr").checked = false;
                    }
                }

                app.layersMaphandle = app.mapView.map.layers.on("after-add", app.movegraphicsontop);

                app.layerListWidget.operationalItems.on("after-add", () => {
                    document.getElementById("infoVrstva").classList.add("hidden");
                });

                app.layerListWidget.operationalItems.on("after-remove", () => {
                    document.getElementById("infoVrstva").classList.remove("hidden");
                });

                app.homebuttonWidget.viewModel.viewpoint = new Viewpoint({
                    targetGeometry: new Extent({ xmin: -990000, ymin: -1290000, xmax: -330000, ymax: -880000, spatialReference: app.spatialReference.clone() })
                });

                app.settings = (type, value) => {
                    if (!myStorage) {
                        myStorage = {};
                        myStorage.geoprohlizec = {};
                    } else {
                        if (!myStorage.geoprohlizec) {
                            myStorage.geoprohlizec = {};
                        }
                    }
                    switch (type) {
                        case "katastr":
                            if (value == false) {
                                app.mapView.ui.remove("expand");
                                app.napoveda = undefined;
                                myStorage.geoprohlizec[type] = false;
                            } else {
                                app.panelSettings.setWidgetPosition(app.mapView, "expand", "top-left", 7);
                                myStorage.geoprohlizec[type] = true;
                            }
                            break;
                        case "expand3":
                            if (value == false) {
                                app.mapView.ui.remove(type);
                                app.sceneView.ui.remove(type);
                                app.napoveda3 = undefined;
                                myStorage.geoprohlizec[type] = false;
                            } else {
                                app.panelSettings.setWidgetPosition(app.mapView, type, "top-left", 6);
                                app.panelSettings.setWidgetPosition(app.sceneView, type, "top-left");
                                myStorage.geoprohlizec[type] = true;
                            }
                            break;
                        case "coordinate":
                            let widgetSouradnice = app.mapView.ui.find("widgetSouradnice_2d");
                            let widgetSouradnice_3D = app.sceneView.ui.find("widgetSouradnice_3d");
                            if (value == false) {
                                widgetSouradnice ? widgetSouradnice.classList.add("hidden") : false;
                                widgetSouradnice_3D ? widgetSouradnice_3D.classList.add("hidden") : false;
                                myStorage.geoprohlizec[type] = false;
                            } else {
                                widgetSouradnice ? widgetSouradnice.classList.remove("hidden") : false;
                                widgetSouradnice_3D ? widgetSouradnice_3D.classList.remove("hidden") : false;
                                myStorage.geoprohlizec[type] = true;
                            }
                            break;
                        case "daylight":
                            if (value == false) {
                                let daylight = app.sceneView.ui.find(type);
                                daylight ? app.sceneView.ui.remove(daylight) : false;
                                app.daylight = undefined;
                                myStorage.geoprohlizec[type] = false;
                            } else {
                                app.panelSettings.setWidgetPosition(app.sceneView, type, "bottom-right", 1);
                                myStorage.geoprohlizec[type] = true;
                            }
                            break;
                        case "search":
                            let index = Number(value);
                            if (isNaN(index) == false) {
                                myStorage.geoprohlizec[type] = index;
                                app.mapView.ui.find("search") ? app.mapView.ui.find("search").activeSourceIndex = index : false
                                app.sceneView.ui.find("search") ? app.sceneView.ui.find("search").activeSourceIndex = index : false
                            }
                            break;
                        case "lang":
                            if (value == "cs") {
                                window.location.hash = "";
                            } else {
                                window.location.hash = "#" + value;
                            }
                            window.location.reload();
                            break;
                        case "track":
                            if (value == true) {
                                if (navigator.geolocation) {
                                    myStorage.geoprohlizec[type] = true;
                                } else {
                                    alert(label[746]);
                                    document.getElementById("settingstrack").checked = false;
                                }
                            } else {
                                myStorage.geoprohlizec[type] = false;
                            }
                            break;
                        case "trackzoom":
                            let track = app.mapView.ui.find("track");
                            if (value == true) {
                                track.goToLocationEnabled = true;
                                myStorage.geoprohlizec[type] = true;
                            } else {
                                track.goToLocationEnabled = false;
                                myStorage.geoprohlizec[type] = false;
                            }
                            break;
                        case "layerlist":
                            myStorage.geoprohlizec[type] = value;
                            break;
                        case "navigating":
                            if (value == true) {
                                app.watchNavigate();
                            } else {
                                if (app.watchNavigateMove) {
                                    app.watchNavigateHandle.remove();
                                    app.watchNavigateMove = undefined;
                                }
                                myStorage.geoprohlizec[type] = false;
                            }
                            break;
                    }
                    localStorage.settings = JSON.stringify(myStorage);
                }
                if ((myStorage.geoprohlizec) && myStorage.geoprohlizec["daylight"] == true) {
                    document.getElementById("dayLightCheckbox").checked = true;
                }

                app.popupSettings(app.mapView);

                app.mojeMisto = {};

                app.mojeMisto.rozsirene = () => {
                    query(".mojeMistoToggleDiv").toggleClass("hidden");
                    query("#mojeMistoToggle").toggleClass("rotate");
                }

                app.mojeMisto.get = (x, y) => {
                    app.activeView.popup.close();
                    app.removeDiv(['widgetMojeMisto']);
                    var obsahMojeMisto = "<div class='panel-body'><span style='float: right; cursor: pointer; padding: 2px;' class='esri-icon-close bold' onclick='app.removeDiv([\"widgetMojeMisto\"]);' title='" + label[325] + "'></span>" +
                        "<b>" + label[711] + "</b><br><br>" +
                        "<b>" + label[368] + "</b>" +
                        "<select class='form-control' id='mojeMistoBasemap' title=" + label[368] + "><option value='zm' selected>" + label[125] + "</option><option value='orto'>" + label[130] + "</option></select><br>" +
                        "<b>" + label[335] + "</b>" +
                        "<input id='mojeMistoName' class='form-control' type='text' placeholder='" + label[712] + "' maxlength='100'/><br>" +
                        "<b>" + label[468] + ":</b>" +
                        "<textarea id='mojeMistoPoznamka' class='form-control' placeholder='" + label[377] + "' maxlength='300' style='height: 60px; max-width: 100%; min-width: 300px; min-height: 50px;'></textarea><br>" +
                        "<div style='cursor: pointer;' onclick='app.mojeMisto.rozsirene();' class='bold'><b>" + label[678] + "</b><span id='mojeMistoToggle' class='esri-icon-down' style='float: right; transition: transform 0.5s ease-out;'></span></div>" +
                        "<div class='mojeMistoToggleDiv hidden' style='margin: 20px 0px 20px 0px;'>" +
                        "<label class='switch' id='mojeMistoLinkCkeckDiv'><input type='checkbox' id='mojeMistoBtnCkeck' checked><span class='slider'></span></label> <label for='mojeMistoBtnCkeck'>" + label[728] + "</label><br>" +
                        "<span>" + label[636] + ":</span><input type='color' id='mojeMistoColor' value='#204d74'  style='margin: 20px 0px 30px 10px;' /><br>" +
                        "<span>" + label[713] + "</span><br><div id='mojeMistoSliderDiv'></div>" +
                        "</div><br>" +
                        "<label class='switch hidden' style='margin-bottom: 15px;' id='mojeMistoLinkCkeckDiv'><input type='checkbox' id='mojeMistoLinkCkeck' onchange='app.mojeMisto.showLink();'><span class='slider'></span></label> <label for='mojeMistoLinkCkeck' id='mojeMistoLinkCkeckLabel' class='hidden'>" + label[719] + "</label>" +
                        "<textarea id='mojeMistoTextArea' class='form-control hidden' style='margin-bottom: 10px;'></textarea>" +
                        "<button class='btn btn-primary btn-block' onclick='app.mojeMisto.use(" + x + "," + y + ");'>" + label[314] + "</button>" +
                        "</div>"
                    let styl = "position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); background-color: white; box-shadow: 0px 1px 2px rgba(0,0,0,0.3); min-width: 300px; max-height: 80%; overflow: auto; z-index: 2;";
                    if (localStorage.theme) {
                        if (localStorage.theme != "default") {
                            if (localStorage.theme == "dark") {
                                styl += "background-color: #4c4c4c; color: white;";
                            } else if (localStorage.theme == "light") {
                                styl += "color: #333333;";
                            }
                        }
                    }
                    let widgetMojeMisto = domConstruct.create("div", {
                        id: "widgetMojeMisto",
                        class: "panel-collapse",
                        style: styl,
                        innerHTML: obsahMojeMisto
                    });
                    app.activeView.ui.add({
                        component: widgetMojeMisto
                    });
                    if (((!x && !y) && app.activeView.popup.selectedFeature.attributes) && app.activeView.popup.selectedFeature.attributes.Type == "GEONAMES") {
                        let split = app.activeView.popup.selectedFeature.attributes.Match_addr.split("(");
                        document.getElementById("mojeMistoName").value = split[0];
                    }
                    app.mojeMisto.slider = new Slider({
                        container: "mojeMistoSliderDiv",
                        id: "mojeMistoSlider",
                        min: 0,
                        max: 3,
                        values: [1],
                        steps: 1,
                        visibleElements: {
                            rangeLabels: true
                        },
                        labelFormatFunction: (value, type) => {
                            if (value == 0) {
                                value = label[714];
                            } else if (value == 1) {
                                value = label[715];
                            } else if (value == 2) {
                                value = label[716];
                            } else if (value == 3) {
                                value = label[727];
                            }
                            return (type === "value") ? value : value;
                        },
                        tickConfigs: [{
                            mode: "position",
                            values: [1, 2],
                            labelsVisible: true
                        }]
                    });
                    if (localStorage.theme) {
                        if (localStorage.theme != "default") {
                            if (localStorage.theme == "dark") {
                                query(".form-control").attr("style", { "background-color": "#4c4c4c", "color": "#fff" });
                                query(".slider").addClass("slider-dark");
                            }
                        }
                    }
                }

                app.mojeMisto.showLink = () => {
                    let check = document.getElementById("mojeMistoLinkCkeck").checked;
                    if (check == true) {
                        query("#mojeMistoTextArea").removeClass("hidden");
                    } else {
                        query("#mojeMistoTextArea").addClass("hidden");
                    }
                };

                app.mojeMisto.use = (x, y) => {
                    let url = location.origin + location.pathname.replace("/index.html", "/") + "mapa.html?xy=";
                    if (!x && !y) {
                        url += app.activeView.popup.selectedFeature.geometry.x + "," + app.activeView.popup.selectedFeature.geometry.y;
                    } else {
                        url += "-" + x + ",-" + y;
                    }
                    if (app.activeView.type == "3d") url += "&cam=" + app.activeView.camera.fov + ";" + app.activeView.camera.heading + ";" + app.activeView.camera.tilt + ";" + app.activeView.camera.position.x + ";" + app.activeView.camera.position.y + ";" + app.activeView.camera.position.z;
                    if (document.getElementById("mojeMistoName").value != "") url += "&name=" + document.getElementById("mojeMistoName").value;
                    url += "&b=" + document.getElementById("mojeMistoBasemap").value;
                    if (localStorage.theme == "dark") url += '&t=dark';
                    if (document.getElementById("mojeMistoPoznamka").value != "") url += '&p=' + document.getElementById("mojeMistoPoznamka").value;
                    if (document.getElementById("mojeMistoBtnCkeck").checked == false) url += '&btn=false';
                    if (document.getElementById("mojeMistoColor").value != '#204d74') url += '&c=' + document.getElementById("mojeMistoColor").value.replace('#', '');
                    if (window.location.hash == "#en") url += '#en';
                    let width = 600;
                    let height = 600;
                    let hodnotaSlider = app.mojeMisto.slider.values[0];
                    if (hodnotaSlider == 0) {
                        width = 400;
                        height = 400;
                    } else if (hodnotaSlider == 1) {
                        width = 600;
                        height = 600;
                    } else if (hodnotaSlider == 2) {
                        width = 800;
                        height = 800;
                    } else if (hodnotaSlider == 3) {
                        width = '100%';
                        height = '100%';
                    }
                    if (hodnotaSlider == 3) {
                        window.open(encodeURI(url));
                    } else {
                        window.open(encodeURI(url), "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=100, left=100, width=" + width + ", height=" + height);
                    }
                    query("#mojeMistoLinkCkeckDiv, #mojeMistoLinkCkeckLabel").removeClass("hidden");
                    document.getElementById("mojeMistoTextArea").innerHTML = "<iframe src='" + url + "' width=" + width + " height=" + height + " title='Moje místo' allow='clipboard-write'></iframe>"
                }

                if (myUrlParams.xy != "") {
                    let split = myUrlParams.xy.split(",");
                    x = split[0];
                    y = split[1];
                    ss = split[2];
                    if (!ss) ss = 102067;
                    if (ss == "4258" || ss == "4326" || ss == "3045" || ss == "3046") {
                        let temp = x;
                        x = y;
                        y = temp;
                    }
                    app.mapView.goTo({
                        target: new Point({
                            x: Number(x),
                            y: Number(y),
                            spatialReference: new SpatialReference({ "wkid": Number(ss) })
                        }),
                        zoom: 10
                    });
                }

                if (app.mapView.updating == false) {
                    query("#widgetUpdatingMap").addClass("hidden");
                }
                reactiveUtils.watch(() => app.mapView.updating, () => {
                    if (app.mapView.updating == false) {
                        query("#widgetUpdatingMap").addClass("hidden");
                    } else {
                        query("#widgetUpdatingMap").removeClass("hidden");
                    }
                });

                var showTutorial = true;
                if (((localStorage) && localStorage.tutorial) && localStorage.tutorial != false) {
                    showTutorial = false;
                }
                if (window.location.hash == "#en") {
                    showTutorial = false;
                }
                if (app.activeView.widthBreakpoint != "xlarge") {
                    showTutorial = false;
                }
                if (showTutorial == true) {
                    query("#showTutorial").removeClass("hidden");
                    app.tutorial = (local) => {
                        if (document.getElementById("tutorial")) {
                            app.activeView.ui.remove(document.getElementById('tutorial'));
                            if (local) {
                                localStorage.tutorial = false;
                                query("#showTutorial").addClass("hidden");
                            }
                            return;
                        }
                        let styl = "position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); background-color: white; box-shadow: 0px 1px 2px rgba(0,0,0,0.3); max-height: 80%; overflow: auto; z-index: 2; padding: 15px;";
                        if (localStorage.theme) {
                            if (localStorage.theme != "default") {
                                if (localStorage.theme == "dark") {
                                    styl += "background-color: #4c4c4c; color: white;";
                                } else if (localStorage.theme == "light") {
                                    styl += "color: #333333;";
                                }
                            }
                        }
                        let t = domConstruct.create("div", {
                            id: "tutorial",
                            class: "panel-collapse",
                            style: styl,
                            innerHTML: '<span style="float: right; cursor: pointer; padding: 5px;" class="esri-icon-close bold" onclick="app.tutorial();" title="' + label[325] + '"></span>'
                        });
                        t.innerHTML += "<p><b style='font-size: 17px;'>Prohlédněte si videonávody a objevte nové možnosti v Geoprohlížeči!</b></p><a target='_blank' href='https://forms.office.com/r/wiP1fSbai2'><b>" + label[730] + "</b></a><br>"
                        t.innerHTML += "<table><tr><td style='padding:10px;'><b>1. Produkty a Kompozice</b><br><br>Poznejte rozdíl mezi samostatným produktem a mapovou kompozicí. Podívejte se jaké výhody může mít skládání více produktů do Seznamu vrstev.</td><td><video width='400' height='250' controls poster='../tutorial/logo.jpg'  preload='none'><source src='../tutorial/geoprohlizec/ProduktyKompozice.mp4' type='video/mp4'>Váš prohlížeč nepodporuje videopřehrávač.</video></td></tr></table><hr>";
                        t.innerHTML += "<table><tr><td><video width='400' height='250' controls poster='../tutorial/logo.jpg'  preload='none'><source src='../tutorial/geoprohlizec/OtevrenaData.mp4' type='video/mp4'>Váš prohlížeč nepodporuje videopřehrávač.</video></td><td style='padding:10px;'><b>2. Otevřená data</b><br><br>Vyzkoušejte si možnosti stahování otevřených dat ČÚZK přímo z Geoprohlížeče, k dispozici je celá řada formátů.</td></tr></table><hr>";
                        t.innerHTML += "<table><tr><td style='padding:10px;'><b>3. Hledání parcel</b><br><br>Vyhledávání parcel v RUIAN nebylo nikdy rychlejší, stačí otevřít widget Rozšířené hledání, který toho nabízí i mnohem víc!</td><td><video width='400' height='250' controls poster='../tutorial/logo.jpg'  preload='none'><source src='../tutorial/geoprohlizec/hledaniParcel.mp4' type='video/mp4'>Váš prohlížeč nepodporuje videopřehrávač.</video></td></tr></table><hr>";
                        t.innerHTML += "<table><tr><td><video width='400' height='250' controls poster='../tutorial/logo.jpg'  preload='none'><source src='../tutorial/geoprohlizec/OrtofotoObdobiNaletu.mp4' type='video/mp4'>Váš prohlížeč nepodporuje videopřehrávač.</video></td><td style='padding:10px;'><b>4. Ortofoto, období náletu</b><br><br>Zajímá Vás, kdy bylo nasnímáno Ortofoto ČR? Každá část (list SM5) mohla být nasnímaná v různou dobu, přesné vymezení zjistíte kliknutím do mapy.</td></tr></table><hr>";
                        t.innerHTML += "<table><tr><td style='padding:10px;'><b>5. Překrývání</b><br><br>Porovnávání různých produktů je snadné a rychlé, stačí si jen připravit Seznam vrstev a začít porovnávat.</td><td><video width='400' height='250' controls poster='../tutorial/logo.jpg'  preload='none'><source src='../tutorial/geoprohlizec/Prekryvani.mp4' type='video/mp4'>Váš prohlížeč nepodporuje videopřehrávač.</video></td></tr></table><hr>";
                        t.innerHTML += "<table><tr><td><video width='400' height='250' controls poster='../tutorial/logo.jpg'  preload='none'><source src='../tutorial/geoprohlizec/Shapefile.mp4' type='video/mp4'>Váš prohlížeč nepodporuje videopřehrávač.</video></td><td style='padding:10px;'><b>6. Přidání vlastního Shapefile</b><br><br>Nemáte desktopový GIS klient a potřebujete se podívat na Shapefile, který se k Vám dostal? To není pro Geoprohlížeč žádný problém, po přidání budete mít k dispozici geometrii i atributy vlastního Shapefile.</td></tr></table><hr>";
                        t.innerHTML += "<table><tr><td style='padding:10px;'><b>7. Transformace souřadnic</b><br><br>Potřebujete transformovat souřadnice do různých souřadnicových systémů zpřesněnou transformací? V Geoprohlížeči je to rychlé, zdarma a máte i možnost dávkové transformace souřadnic.</td><td><video width='400' height='250' controls poster='../tutorial/logo.jpg'  preload='none'><source src='../tutorial/geoprohlizec/Transformace.mp4' type='video/mp4'>Váš prohlížeč nepodporuje videopřehrávač.</video></td></tr></table><hr>";
                        t.innerHTML += "<table><tr><td><video width='400' height='250' controls poster='../tutorial/logo.jpg'  preload='none'><source src='../tutorial/geoprohlizec/VypisSouradnic.mp4' type='video/mp4'>Váš prohlížeč nepodporuje videopřehrávač.</video></td><td style='padding:10px;'><b>8. Výpis souřadnic bodu</b><br><br>Zjistěte souřadnice místa po kliknutí do mapy. K dispozici máte velké množství souřadnicových systémů, při výpisu probíhá zpřesněná transformace, navíc dostanete i informaci o nadmořské výšce.</td></tr></table><hr>";
                        t.innerHTML += "<button class='btn btn-primary btn-sm' onclick='app.tutorial(\"local\")'>Příště nezobrazovat</button><button style='float: right;' class='btn btn-primary btn-sm' onclick='app.tutorial()'>Podívám se později</button>";
                        app.activeView.ui.add({
                            component: t
                        });
                        reactiveUtils.once(() => app.mapView.widthBreakpoint).then(() => {
                            if (document.getElementById("tutorial")) {
                                app.tutorial();
                            }
                        });
                    }
                }
            });

            app.geojson = (view) => {
                let results;
                let sl = view.popup.selectedFeature;
                if (sl.geometry) {
                    results = sl;
                } else {
                    if (!sl.geometry && sl.sourceLayer) {
                        if ((sl.sourceLayer.source) && sl.sourceLayer.source.items.length != 0) {
                            let fid = sl.attributes[sl.sourceLayer.objectIdField];
                            for (let i = 0; i < sl.sourceLayer.source.items.length; i++) {
                                if (sl.sourceLayer.source.items[i].attributes[sl.sourceLayer.objectIdField] == fid) {
                                    results = sl.sourceLayer.source.items[i];
                                    break;
                                }
                            }
                        }
                    }
                }
                let ss;
                if (results.geometry.spatialReference.latestWkid) {
                    ss = results.geometry.spatialReference.latestWkid
                } else {
                    ss = results.geometry.spatialReference.wkid
                }
                var input = '{"type": "FeatureCollection","crs": {"type": "name","properties": {"name": "EPSG:' + ss + '"}}, "features": [';
                let type = results.geometry.type.charAt(0).toUpperCase() + results.geometry.type.slice(1);
                if (type == "Polyline") {
                    type = "LineString";
                    for (let i = 0; i < results.geometry.paths.length; i++) {
                        input += '{"type": "Feature", "id": ' + (i + 1) + ', "geometry": { "type": "' + type + '", "coordinates":';
                        var myJSON = "";
                        myJSON += JSON.stringify(results.geometry.paths[i]);
                        input += myJSON;
                        if (results.attributes) {
                            input += '},"properties":';
                            myJSON = JSON.stringify(results.attributes);
                            input += myJSON + '}';
                        } else {
                            input += '}}';
                        }
                        if (i != results.geometry.paths.length - 1) {
                            input += ',';
                        }
                    }
                } else {
                    input += '{"type": "Feature", "geometry": { "type": "' + type + '", "coordinates":';
                    if (type == "Point") {
                        var myJSON = "[" + results.geometry.x + "," + results.geometry.y + "]";
                    } else if (type == "Polygon") {
                        var myJSON = JSON.stringify(results.geometry.rings);
                    }
                    input += myJSON;
                    if (results.attributes) {
                        input += '},"properties":';
                        var myJSON = JSON.stringify(results.attributes);
                        input += myJSON + '}';
                    } else {
                        input += '}}';
                    }
                }
                input += ']}';
                var a = document.createElement("a");
                a.href = window.URL.createObjectURL(new Blob([input], { type: "text/plain" }));
                a.download = "geojson.json";
                a.click();
                a.remove();
            }

            app.sceneView.when(() => {
                document.getElementById("loader").style.display = "none";
                app.panelSettings.setWidgetPosition(app.sceneView, "home", "top-left", 0);
                app.panelSettings.setWidgetPosition(app.sceneView, "compass", "top-left");
                app.panelSettings.setWidgetPosition(app.sceneView, "navtoggle", "top-left");
                app.panelSettings.setWidgetPosition(app.sceneView, "search", "top-left");
                app.sceneView.ui.find("search") ? app.sceneView.ui.find("search").when(() => app.searchSettings(app.sceneView.ui.find("search"))) : false
                if ((myStorage.geoprohlizec) && myStorage.geoprohlizec["expand3"] == true) {
                    app.panelSettings.setWidgetPosition(app.sceneView, "expand3", "top-left");
                }
                if ((myStorage.geoprohlizec) && myStorage.geoprohlizec["daylight"] == true) {
                    app.panelSettings.setWidgetPosition(app.sceneView, "daylight", "bottom-right", 1);
                }

                app.sceneView.map.ground.navigationConstraint = {
                    type: "none"
                };

                require(["./widgets/SceneScreenshot.js"], () => { });
                app.sceneView.qualityProfile = document.getElementById("kvalita3Dselect").value;
                query("#sceneModel").removeClass("hidden");
                if (app.sceneView.spatialReference.wkid == 5514 || app.sceneView.spatialReference.wkid == 102067) {
                    app.homebuttonWidget.viewModel.viewpoint = new Viewpoint({
                        targetGeometry: new Extent({ xmin: -990000, ymin: -1290000, xmax: -330000, ymax: -880000, spatialReference: app.spatialReference.clone() })
                    });
                } else if (app.sceneView.spatialReference.wkid == 3857 || app.sceneView.spatialReference.wkid == 102100) {
                    app.homebuttonWidget.viewModel.viewpoint = new Viewpoint({
                        targetGeometry: new Extent({ xmin: 1266000, ymin: 6124000, xmax: 2179000, ymax: 6707000, spatialReference: app.spatialReference.clone() })
                    });
                }

                var widgetPrevence = domConstruct.create("div", {
                    style: "positon: absolute; left: 0px; top: 0px; width: 60px; height: 250px; z-index: -1;"
                });
                app.sceneView.ui.add({
                    component: widgetPrevence
                });

                var widgetUpdatingScene = domConstruct.create("div", {
                    id: "widgetUpdatingScene",
                    style: "box-shadow: none; border-radius: 50%;",
                    innerHTML: "<div class='esri-icon-loading-indicator' style='animation: infiniteRotate 1s linear infinite; font-size: 25px; border-radius: 50%; box-shadow: 0px 0px 15px rgba(255,255,255,1);'></div>"
                });
                app.sceneView.ui.add({
                    component: widgetUpdatingScene,
                    position: "bottom-right",
                    index: 0
                });

                app.kvalita3D = () => {
                    if (app.activeView.type == "3d") {
                        app.sceneView.qualityProfile = document.getElementById("kvalita3Dselect").value;
                    } else {
                        alert("Něco se nepovedlo, zkuste aplikaci spustit znovu nebo se obraťte na technickou podporu.")
                    }
                };

                app.popupSettings(app.sceneView);

                app.zvolitModel = () => {
                    if (app.activeView.type == "3d") {
                        app.map.ground.layers.removeAll();
                        if (document.getElementById("jakyModel").value != "empty") {
                            app.sceneView.spatialReference = app.mapView.spatialReference.clone();
                            if (document.getElementById("jakyModel").value == "5G") {
                                if (app.mapView.spatialReference.wkid == 3857 || app.mapView.spatialReference.wkid == 102100) {
                                    app.map.ground.layers.add(app.ground_merc5G);
                                }
                                if (app.mapView.spatialReference.wkid == 5514 || app.mapView.spatialReference.wkid == 102067) {
                                    app.map.ground.layers.add(app.ground_jtsk5G);
                                }
                            } else if (document.getElementById("jakyModel").value == "4G") {
                                if (app.mapView.spatialReference.wkid == 3857 || app.mapView.spatialReference.wkid == 102100) {
                                    app.map.ground.layers.add(app.ground_merc4G);
                                }
                                if (app.mapView.spatialReference.wkid == 5514 || app.mapView.spatialReference.wkid == 102067) {
                                    app.map.ground.layers.add(app.ground_jtsk4G);
                                }
                            }
                        }
                    }
                };
                if (myUrlParams.e == "5g") {
                    document.getElementById("jakyModel").value = "5G";
                    app.zvolitModel();
                } else if (myUrlParams.e == "4g") {
                    document.getElementById("jakyModel").value = "4G";
                    app.zvolitModel();
                }

                if (app.sceneView.updating == false) {
                    query("#widgetUpdatingScene").addClass("hidden");
                }

                reactiveUtils.watch(() => app.sceneView.updating, () => {
                    if (app.sceneView.updating == false) {
                        query("#widgetUpdatingScene").addClass("hidden");
                    } else {
                        query("#widgetUpdatingScene").removeClass("hidden");
                    }
                });
            });

            reactiveUtils.once(() => app.mapView.updating == false).then(() => {
                if (myUrlParams.viewpoint == "3d") {
                    window.setTimeout(() => {
                        document.getElementById("sceneNav").click();
                        document.getElementById("loader").style.display = "none";
                    }, 200);
                }
                if ((localStorage.theme) && localStorage.theme != "default") {
                    document.getElementById("settingsThemeColor").value = localStorage.theme;
                    if (app.zmenTema) app.zmenTema();
                }
            });

            app.ZMmeritko = (v) => {
                app.ztmInfo = undefined;
                let id = document.getElementById("jakazakladnimapa");
                if (document.getElementById('selectBasemapPanel').value == 'zm') {
                    let s = Number(v.scale);
                    let thresholds = [
                        { max: 2834, label: "ZTM 1 : 5 000", m: 22 },
                        { min: 2835, max: 5669, label: "ZTM 1 : 10 000", m: 23 },
                        { min: 5670, max: 22679, label: "ZTM 1 : 25 000", m: 24 },
                        { min: 22680, max: 45359, label: "ZTM 1 : 50 000", m: 25 },
                        { min: 45360, max: 90719, label: "ZTM 1 : 100 000", m: 26 },
                        { min: 90720, max: 181439, label: "ZTM 1 : 250 000", m: 27 },
                        { min: 181440, max: 362879, label: label[40] },
                        { min: 362880, max: 725759, label: label[41] },
                        { min: 725760, max: 2903039, label: label[42] },
                        { min: 2903040, label: label[244] }
                    ];

                    for (let i = 0; i < thresholds.length; i++) {
                        let threshold = thresholds[i];
                        if ((threshold.min === undefined || s >= threshold.min) && (threshold.max === undefined || s <= threshold.max)) {
                            id.innerHTML = " " + threshold.label;
                            app.ztmInfo = threshold.m;
                            threshold.m ? document.getElementById("basemapInfoLabelDiv").classList.remove("hidden") : document.getElementById("basemapInfoLabelDiv").classList.add("hidden")
                            break;
                        }
                    }
                }
            };
            app.ZMmeritko(app.mapView);

            reactiveUtils.watch(() => app.mapView.scale, () => {
                let meritkoMapy = app.mapView.scale.toLocaleString('en', {
                    maximumFractionDigits: 0
                }).replace(/,/g, " ");
                document.getElementById('meritko').innerHTML = "1 : " + meritkoMapy;
                if (app.ZMmeritko && app.activeView.spatialReference.wkid == 102067) app.ZMmeritko(app.mapView);
            });

            app.removeDiv = (id) => {
                id.forEach(e => {
                    if (document.getElementById(e)) app.activeView.ui.remove(document.getElementById(e))
                    if (e == 'widgetExportAtom') {
                        let l = app.activeView.map.findLayerById('KladyMLAtom');
                        if (l) app.activeView.map.remove(l);
                    }
                });
            }

            require(["./widgets/HlaseniChyb.js", "./widgets/Coord.js", "./widgets/RHledani.js", "./widgets/AddData.js", "./js/setpopups.js", "./widgets/GotoCoordinate.js", "./widgets/Swipe.js", "./widgets/VyjadreniDBP.js", "./widgets/Share.js", "./widgets/Tisk.js", "./widgets/Transformace.js", "./widgets/Export.js", "./js/tooltipy.js"], () => { });

            app.panelSettings.setWidgetPosition(app.mapView, "layerlist", "top-right", 0, "layerlistDiv");
            app.panelSettings.setWidgetPosition(app.activeView, "measurement", "top-left", 0, "measurementDiv");

            app.layerListWidget.on("trigger-action", (event) => {
                let id = event.action.id;
                let layer = event.item.layer;
                let layerid = app.activeView.map.layers.indexOf(layer);
                app.removeDiv(['widgetBlendMode', 'widgetRasterFunctions', 'widgetInformaceWMS', 'widgetWmtsStyle']);

                let steadyPanel = (ei) => {
                    let uid = ei.uid;
                    reactiveUtils.once(() => event.item.actionsOpen == false).then(() => {
                        setTimeout(() => {
                            const item = app.layerListWidget.operationalItems.find(e => e.uid === uid);
                            if (item) {
                                item.actionsOpen = true;
                            }
                        }, 100);
                    });
                }

                if (id === "remove") {
                    if (layer.parent.type) {
                        if (layer.parent.type == "group") layer.parent.layers.remove(layer);
                    } else {
                        app.activeView.map.layers.remove(layer);
                        document.getElementById('nazevvrstevdiv').innerHTML = "";
                        let l = false
                        app.activeView.map.layers.forEach(e => {
                            if (e.type != "graphics") l = true
                        })
                        if (l == false) document.getElementById('odstranitvrstvy').style.display = 'none';
                        document.getElementById("timeortofotodiv").style.display = "none";
                        if (app.layerListWidget.operationalItems.some(e => e.url?.includes('/WMS_ORTOFOTO_ARCHIV/WMService.aspx'))) {
                            document.getElementById("timeortofotodiv").style.display = "block";
                        }
                    }
                    app.aktivni_produkt = null;
                    app.aktivni_kompozice = null;
                } else if (id === "information") {
                    if (layer.type == "wms" || layer.type == "wmts" || layer.type == "wfs") {
                        let styl = "position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); padding: 10px; background-color: white; box-shadow: 0px 1px 2px rgba(0,0,0,0.3);";
                        if (localStorage.theme) {
                            if (localStorage.theme != "default") {
                                if (localStorage.theme == "dark") {
                                    styl += "background-color: #4c4c4c; color: white;";
                                } else if (localStorage.theme == "light") {
                                    styl += "color: #333333;";
                                }
                            }
                        }
                        let widgetInformaceWMS = domConstruct.create("div", {
                            id: "widgetInformaceWMS",
                            name: layer.id,
                            class: "panel-collapse",
                            style: styl,
                            innerHTML: '<span style="float: right; cursor: pointer; padding: 5px;" class="esri-icon-close bold" onclick="app.removeDiv([\'widgetInformaceWMS\']);" title="' + label[325] + '"></span><b>' + label[44] + '</b>' + layer.title
                        });
                        if (layer.description) widgetInformaceWMS.innerHTML += '<br /><br /><b>' + label[45] + '</b>' + layer.description;
                        if (layer.activeLayer?.description) widgetInformaceWMS.innerHTML += '<br /><br /><b>' + label[45] + '</b>' + layer.activeLayer.description;
                        if (layer.imageFormat) widgetInformaceWMS.innerHTML += '<br /><br /><b>' + label[46] + '</b><a href=' + 'https://fileinfo.com/extension/' + layer.imageFormat.replace('image/', '') + ' target=\'_blank\'>' + layer.imageFormat.replace('image/', '') + '</a>';
                        if (layer.spatialReferences) {
                            if (layer.spatialReferences.length > 0) {
                                widgetInformaceWMS.innerHTML += '<br /><br /><b>' + label[48] + '</b> ';
                                layer.spatialReferences.forEach((s, t) => {
                                    if (s) widgetInformaceWMS.innerHTML += '<a href=https://epsg.io/' + s.toString() + ' target=\'_blank\'>' + s.toString() + '</a>';
                                    if (t < layer.spatialReferences.length - 1) widgetInformaceWMS.innerHTML += ', ';
                                });
                            }
                        }
                        if (layer.operationalLayerType) widgetInformaceWMS.innerHTML += '<br /><br /><b>' + label[49] + '</b> ' + layer.operationalLayerType;
                        if (layer.version) widgetInformaceWMS.innerHTML += ' v.' + layer.version
                        if (layer.opacity) widgetInformaceWMS.innerHTML += '<br /><br /><b>' + label[50] + '</b>' + (layer.opacity * 100 - 100) * -1 + "%";
                        if (layer.url) widgetInformaceWMS.innerHTML += '<br /><br /><b>' + label[51] + '</b><a href=' + layer.url + ' target=\'_blank\'>' + layer.url + '</a>';
                        if ((layer.copyright) && layer.copyright != "none") widgetInformaceWMS.innerHTML += '<br /><br /><b>Copyright: </b><a href=' + layer.copyright + ' target=\'_blank\'>' + layer.copyright + '</a>';
                        app.activeView.ui.add({
                            component: widgetInformaceWMS
                        });
                        if (app.activeView.widthBreakpoint != "xlarge") {
                            query("#panelLayerlist").removeClass("in");
                        }
                    } else if (layer.type == "map-image" || layer.type == "tile") {
                        window.open(layer.url);
                    } else if (layer.type == "feature" && layer.url && layer.parsedUrl) {
                        window.open(layer.parsedUrl.path);
                    } else {
                        window.open(layer.url);
                    }
                } else if (id === "decrease-opacity" && layer.opacity != 0) {
                    layer.opacity = ((layer.opacity * 10) - 1) / 10;
                    steadyPanel(event.item);
                } else if (id === "increase-opacity" && layer.opacity != 1) {
                    layer.opacity = ((layer.opacity * 10) + 1) / 10;
                    steadyPanel(event.item);
                } else if (id === "popupy") {
                    if (layer.hidepopups) {
                        layer.hidepopups = false;
                        if (layer.popupEnabled == false) layer.popupEnabled = true;
                        event.action.title = label[28];
                        if (layer.type == "group") {
                            layer.layers.items.forEach((subvrstva) => {
                                if (subvrstva) subvrstva.hidepopups = false;
                            });
                        }
                    } else {
                        layer.hidepopups = true;
                        if (layer.popupEnabled == true) layer.popupEnabled = false;
                        event.action.title = label[29];
                        if (layer.type == "group") {
                            layer.layers.items.forEach((subvrstva) => {
                                if (subvrstva) subvrstva.hidepopups = true;
                            });
                        }
                    }
                } else if (id === "podvrstvy") {
                    if (layer.allSublayers && event.action.title == label[31]) {
                        layer.allSublayers.forEach((subvrstva) => {
                            subvrstva.visible = true;
                        });
                        event.action.title = label[30];
                    } else if (layer.allSublayers && event.action.title == label[30]) {
                        layer.allSublayers.forEach((subvrstva) => {
                            subvrstva.visible = false;
                        });
                        event.action.title = label[31];
                    }
                } else if (id === "wish") {
                    window.open('https://geoportal.cuzk.gov.cz/default.aspx?mode=eShop&fnc=getProduct&product_code=' + layer.wish + '&head_tab=sekce-01-gp&menu=13')
                } else if (id === "format") {
                    if (layer.type == "wms") {
                        if (layer.imageFormat == "image/jpeg") {
                            layer.imageFormat = "image/png";
                            event.action.title = label[32];
                        } else if (layer.imageFormat == "image/png") {
                            layer.imageFormat = "image/jpeg";
                            event.action.title = label[33];
                        }
                        layer.refresh();
                    } else if (layer.type == "map-image") {
                        if (layer.imageFormat == "jpg") {
                            layer.imageFormat = "png32";
                            event.action.title = label[32];
                        } else if (layer.imageFormat == "png32") {
                            layer.imageFormat = "jpg";
                            event.action.title = label[33];
                        }
                        layer.refresh();
                    }
                } else if (id === "zoomTo") {
                    if (layer.type == "wms") {
                        if (layer.fullExtents.length > 0) {
                            layer.fullExtents.forEach((s) => {
                                if (s.spatialReference.wkid == app.activeView.spatialReference.wkid || s.spatialReference.wkid == app.activeView.spatialReference.latestWkid) app.activeView.extent = s;
                            });
                        } else if (layer.fullExtent.spatialReference.wkid == app.activeView.spatialReference.wkid || layer.fullExtent.spatialReference.wkid == app.activeView.spatialReference.latestWkid) {
                            app.activeView.extent = layer.fullExtent;
                        } else {
                            alert(label[52] + layer.fullExtent.spatialReference.wkid)
                        }
                    } else if (layer.type == "map-image") {
                        app.activeView.extent = layer.fullExtent;
                    } else if (layer.type == "wmts") {
                        if ((layer.activeLayer.tileMatrixSet) && layer.activeLayer.tileMatrixSet.fullExtent) app.activeView.extent = layer.activeLayer.tileMatrixSet.fullExtent;
                    } else {
                        app.activeView.extent = layer.fullExtent;
                    }
                } else if (id === "download") {
                    if (layer.download) window.open(layer.download)
                } else if (id === "wmtsStyle") {
                    let styl = "position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); padding: 10px; background-color: white; box-shadow: 0px 1px 2px rgba(0,0,0,0.3); min-width: 150px;";
                    let stylSelect = "background-color: white; color: #333333; margin-top: 10px;";
                    if (localStorage.theme) {
                        if (localStorage.theme != "default") {
                            if (localStorage.theme == "dark") {
                                styl += "background-color: #4c4c4c; color: white;";
                                stylSelect = "background-color: #4c4c4c; color: white; margin-top: 10px;";
                            } else if (localStorage.theme == "light") {
                                styl += "color: #333333;";
                            }
                        }
                    }
                    let wmtsStyle = domConstruct.create("div", {
                        id: "widgetWmtsStyle",
                        name: layer.id,
                        class: "panel-body",
                        style: styl,
                        innerHTML: '<span style="float: right; cursor: pointer; padding: 2px;" class="esri-icon-close bold" onclick="app.removeDiv([\'widgetWmtsStyle\']);" title="' + label[325] + '"></span><b>' + label[555] + ':</b>'
                    });
                    app.activeView.ui.add({
                        component: wmtsStyle
                    });
                    app.layerListWidget.setWmtsStyle = (id) => {
                        let l = app.activeView.map.findLayerById(document.getElementById("widgetWmtsStyle").attributes.name.value);
                        l.activeLayer.styleId = id;
                    }
                    let obsah = '<br /><select id="widgetWmtsStyleValue" class="form-control" onchange="app.layerListWidget.setWmtsStyle(this.value);" style="' + stylSelect + '">';
                    let selected = (vrstva, styl) => {
                        let result = "";
                        if (styl == vrstva.styleId) {
                            result = " selected";
                            return result;
                        } else {
                            return result;
                        }
                    }
                    for (let i = 0; i < layer.activeLayer?.styles?.items?.length; i++) {
                        let styl = layer.activeLayer.styles.items[i];
                        if (styl.id) obsah += '<option value=' + styl.id + selected(layer.activeLayer, styl.id) + '>' + styl.title + '</option>';
                        if (i == styl.length - 1) obsah += '</select>';
                    }
                    wmtsStyle.innerHTML += obsah;
                } else if (id === "vectorTileStyle") {
                    let style = prompt(label[554]);
                    if (style == "") {
                        alert(label[54]);
                    } else if (style != null) {
                        layer.loadStyle(style).then().catch(err => {
                            alert(err);
                        });
                    }
                } else if (id === "move-up") {
                    if (layer.parent.type) {
                        layer.parent.type == "group" ? layer.parent.layers.reorder(layer, layer.parent.layers.indexOf(layer) + 1) : app.activeView.map.layers.reorder(layer, layerid + 1)
                    } else {
                        app.activeView.map.layers.reorder(layer, layerid + 1);
                    }
                } else if (id === "move-down") {
                    if (layer.parent.type) {
                        layer.parent.type == "group" ? layer.parent.layers.reorder(layer, layer.parent.layers.indexOf(layer) - 1) : app.activeView.map.layers.reorder(layer, layerid - 1)
                    } else {
                        app.activeView.map.layers.reorder(layer, layerid - 1);
                    }
                } else if (id === "rename") {
                    let title = prompt(label[53] + layer.title + "?");
                    if (title == "") {
                        alert(label[54]);
                    } else if (title != null) {
                        layer.title = title;
                    }
                } else if (id === "blend") {
                    app.layerListWidget.blendMode = () => {
                        let b = app.activeView.map.findLayerById(document.getElementById("widgetBlendMode").attributes.name.value);
                        b.blendMode = document.getElementById("widgetBlendModeValue").value;
                    }
                    let styl = "position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); padding: 10px; background-color: white; box-shadow: 0px 1px 2px rgba(0,0,0,0.3);";
                    let stylSelect = "background-color: white; color: #333333; margin-top: 10px;";
                    if (localStorage.theme) {
                        if (localStorage.theme != "default") {
                            if (localStorage.theme == "dark") {
                                styl += "background-color: #4c4c4c; color: white;";
                                stylSelect = "background-color: #4c4c4c; color: white; margin-top: 10px;";
                            } else if (localStorage.theme == "light") {
                                styl += "color: #333333;";
                            }
                        }
                    }
                    let widgetBlendMode = domConstruct.create("div", {
                        id: "widgetBlendMode",
                        name: layer.id,
                        class: "panel-body",
                        style: styl,
                        innerHTML: '<span style="float: right; cursor: pointer; padding: 2px;" class="esri-icon-close bold" onclick="app.removeDiv([\'widgetBlendMode\']);" title="' + label[325] + '"></span><b>' + label[613] + ':</b>'
                    });
                    widgetBlendMode.innerHTML += '<br /><select id="widgetBlendModeValue" class="form-control" onchange="app.layerListWidget.blendMode();" style="' + stylSelect + '">' +
                        '<option value="normal">' + label[646] + '</option>' +
                        '<option value="average">' + label[647] + '</option>' +
                        '<optgroup label="' + label[614] + '">' +
                        '<option value="lighten">' + label[614] + '</option>' +
                        '<option value="lighter">' + label[615] + '</option>' +
                        '<option value="plus">' + label[616] + '</option>' +
                        '<option value="screen">' + label[617] + '</option>' +
                        '<option value="color-dodge">' + label[618] + '</option>' +
                        '</optgroup>' +
                        '<optgroup label="' + label[619] + '">' +
                        '<option value="darken">' + label[619] + '</option>' +
                        '<option value="multiply">' + label[620] + '</option>' +
                        '<option value="color-burn">' + label[621] + '</option>' +
                        '</optgroup>' +
                        '<optgroup label="' + label[622] + '">' +
                        '<option value="difference">' + label[623] + '</option>' +
                        '<option value="exclusion">' + label[624] + '</option>' +
                        '<option value="minus">' + label[625] + '</option>' +
                        '<option value="invert">' + label[622] + '</option>' +
                        '<option value="reflect">' + label[626] + '</option>' +
                        '</optgroup>' +
                        '<optgroup label="' + label[627] + '">' +
                        '<option value="overlay">' + label[628] + '</option>' +
                        '<option value="soft-light">' + label[629] + '</option>' +
                        '<option value="hard-light">' + label[630] + '</option>' +
                        '<option value="vivid-light">' + label[631] + '</option>' +
                        '</optgroup>' +
                        '<optgroup label="' + label[632] + '">' +
                        '<option value="hue">' + label[633] + '</option>' +
                        '<option value="saturation">' + label[634] + '</option>' +
                        '<option value="luminosity">' + label[635] + '</option>' +
                        '<option value="color">' + label[636] + '</option>' +
                        '</optgroup>' +
                        '<optgroup label="' + label[637] + '">' +
                        '<option value="destination-over">' + label[638] + '</option>' +
                        '<option value="destination-atop">' + label[639] + '</option>' +
                        '<option value="destination-in">' + label[640] + '</option>' +
                        '<option value="destination-out">' + label[641] + '</option>' +
                        '<option value="source-atop">' + label[642] + '</option>' +
                        '<option value="source-in">' + label[643] + '</option>' +
                        '<option value="source-out">' + label[644] + '</option>' +
                        '<option value="xor">' + label[645] + '</option>' +
                        '</optgroup>' +
                        '</select>';
                    app.activeView.ui.add({
                        component: widgetBlendMode
                    });
                    document.getElementById("widgetBlendModeValue").value = layer.blendMode;
                    if (app.activeView.widthBreakpoint != "xlarge") query("#panelLayerlist").removeClass("in");
                } else if (id === "export") {
                    let vrstvy = app.activeView.map.layers.toArray();
                    let block = false;
                    for (let t = vrstvy.length - 1; t >= 0; t--) {
                        if (vrstvy[t].url && vrstvy[t].visible == true && vrstvy[t].opacity != 0 && block == false) {
                            block = true;
                            if (vrstvy[t].id != layer.id) alert(label[85]);
                        }
                    };
                    if (app.export) app.export.widget(layer.dataName);
                } else if (id === "atom") {
                    if (app.export) app.export.atom(layer.atom);
                } else if (id === "rasterFunctions") {
                    app.layerListWidget.widgetRasterFunctionsPush = () => {
                        let rasterFunction = new RasterFunction();
                        let imageSluzba = app.activeView.map.findLayerById(document.getElementById("widgetRasterFunctions").attributes.name.value);
                        rasterFunction.functionName = document.getElementById("widgetRasterFunctionsValue").value;
                        imageSluzba.rasterFunction = rasterFunction;
                        document.getElementById("RasterFunctionsLegend").onclick = () => {
                            let selectedValue = document.getElementById("widgetRasterFunctionsValue").options[document.getElementById("widgetRasterFunctionsValue").selectedIndex].value;
                            let url = layer.url + '/legend?renderingRule={rasterFunction:' + selectedValue + '}&f=html';
                            window.open(url);
                        };
                    }
                    let styl = "position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); padding: 10px; background-color: white; box-shadow: 0px 1px 2px rgba(0,0,0,0.3);";
                    let stylSelect = "background-color: white; color: #333333; margin-top: 10px;";
                    if (localStorage.theme) {
                        if (localStorage.theme != "default") {
                            if (localStorage.theme == "dark") {
                                styl += "background-color: #4c4c4c; color: white;";
                                stylSelect = "background-color: #4c4c4c; color: white; margin-top: 10px;";
                            } else if (localStorage.theme == "light") {
                                styl += "color: #333333;";
                            }
                        }
                    }
                    let widgetRasterFunctions = domConstruct.create("div", {
                        id: "widgetRasterFunctions",
                        name: layer.id,
                        class: "panel-body",
                        style: styl,
                        innerHTML: '<span style="float: right; cursor: pointer; padding: 2px; margin-left: 10px;" class="esri-icon-close bold" onclick="app.removeDiv([\'widgetRasterFunctions\']);" title="' + label[325] + '"></span><b>' + label[729] + ':</b>'
                    });
                    app.activeView.ui.add({
                        component: widgetRasterFunctions
                    });
                    let obsah = '<br /><select id="widgetRasterFunctionsValue" class="form-control" onchange="app.layerListWidget.widgetRasterFunctionsPush();" style="' + stylSelect + '">';
                    let selected = (vrstva, funkce) => {
                        let result = "";
                        if ((vrstva.rasterFunction) && funkce == vrstva.rasterFunction.functionName) {
                            result = " selected";
                            return result;
                        } else {
                            return result;
                        }
                    }
                    for (let i = 0; i < layer.rasterFunctionInfos.length; i++) {
                        if (layer.rasterFunctionInfos[i].name) obsah += '<option value=' + layer.rasterFunctionInfos[i].name + selected(layer, layer.rasterFunctionInfos[i].name) + '>' + layer.rasterFunctionInfos[i].name + '</option>';
                        if (i == layer.rasterFunctionInfos.length - 1) obsah += '</select>';
                    }
                    widgetRasterFunctions.innerHTML += obsah;
                    widgetRasterFunctions.innerHTML += '<br><button id="RasterFunctionsLegend" class="btn btn-primary btn-block" onclick="window.open(\'' + layer.url + '/legend?renderingRule={rasterFunction:' + document.getElementById("widgetRasterFunctionsValue").options[document.getElementById("widgetRasterFunctionsValue").selectedIndex].value + '}&f=html\', \'_blank\')">' + label[34] + '<span class="esri-icon-expand fRight rotate"></span></button>';
                    if (app.activeView.widthBreakpoint != "xlarge") query("#panelLayerlist").removeClass("in");
                }
            });

            app.widgetReposition = (id) => {
                let d = document.getElementById(id.id);
                if (d.childNodes[0].childNodes) {
                    let w = d.childNodes[0].childNodes;
                    for (let i = 0; i < w.length; i++) {
                        if (w[i].classList) {
                            if (w[i].classList.value.indexOf("esri-icon-dock-right") > -1) {
                                w[i].classList.remove("esri-icon-dock-right");
                                w[i].classList.add("esri-icon-minimize");
                            } else if (w[i].classList.value.indexOf("esri-icon-minimize") > -1) {
                                w[i].classList.add("esri-icon-dock-right");
                                w[i].classList.remove("esri-icon-minimize");
                            }
                        }

                    }
                }
                if (d.classList.value.indexOf("dokovano") > -1) {
                    d.style.position = 'fixed';
                    d.style.transform = 'translate(-50%, -50%)';
                    d.style.top = '50%';
                    d.style.left = '50%';
                    d.style.right = '';
                    d.classList.remove("dokovano");
                } else {
                    d.style.position = 'absolute';
                    d.style.top = '15px';
                    d.style.right = '15px';
                    d.style.left = '';
                    d.style.transform = '';
                    d.classList.add("dokovano");
                }
            }
        }

        //----------------------------------
        // App panel settings
        //----------------------------------

        function initializeAppSettings() {
            // Panel settings
            app.panelSettings = new PanelSettings({ app: app });
            app.panelSettings.activeLayout = app.panelSettings.APP_LAYOUTS.TOP;
            app.panelSettings.setLayout(app.panelSettings.activeLayout, false);

            // Set padding for navs that change height
            if (window.innerWidth < app.activeView.breakpoints.small && app.panelSettings.activeLayout.viewPaddingSmallScreen) {
                app.panelSettings.setPadding(app.panelSettings.activeLayout.viewPaddingSmallScreen, app.panelSettings.activeLayout.uiPadding);
            }
        }

        //----------------------------------
        // App UI Handlers
        //----------------------------------

        function initializeAppUI() {
            // App UI
            setTabEvents();
            CalciteMapsArcGISSupport.setPopupPanelSync(app.mapView);
            CalciteMapsArcGISSupport.setPopupPanelSync(app.sceneView);
        }

        //----------------------------------
        // View Tabs
        //----------------------------------

        function setTabEvents() {
            query(".calcite-navbar li a[data-toggle='tab']").on("show.bs.tab", (e) => {
                app.activeView.popup.visible = false;
                app.clearPopup(app.activeView)
                e.target.text.indexOf("2D") > -1 ? app.setDimensionView("2d") : app.setDimensionView("3d")
            });
            app.setDimensionView = (input) => {
                document.getElementById("loader").style.display = "block";
                if (app.measurement.activeTool) app.mereni(3);
                if (app.export.watchLimit) app.export.zavrit();
                app.removeDiv(['widgetBlendMode', 'widgetRasterFunctions', 'widgetInformaceWMS', 'widgetWmtsStyle', 'widgetExportAtom']);
                app.map.ground.layers.removeAll();
                if (input == "2d") {
                    if (app.activeView.type != "2d") {
                        // přepnutí do 2D
                        reactiveUtils.once(() => app.mapView.updating == false).then(() => {
                            if (document.getElementById("loader").style.display == "block") {
                                document.getElementById("loader").style.display = "none";
                                if (app.mapView.rotation != 0) app.mapView.rotation = 0;
                            }
                        });
                        if (app.widgetCoord[app.activeView.type].active) app.widgetCoord.toggle(app.activeView.type);
                        syncViews(app.sceneView, app.mapView);
                        app.activeView = app.mapView;
                        query("#tlacitkoVyjadreniDBP, #tlacitkoHlaseniChyb, #zmenitSSmenu, #printDiv, #zobrazVlastniMeritko, #tlacitkoSwipe, #meritkodiv, #basemapInfoLabelDiv").removeClass("hidden");
                        query("#sceneScreenshot, #sceneModel, #geonamesPanorama, .zabaged_3d").addClass("hidden");
                        if (app.activeView.spatialReference.wkid !== 102067) {
                            query("#tlacitkoHlaseniChyb, #tlacitkoVyjadreniDBP, #tlacitkoMereni").addClass("hidden");
                        }
                        reactiveUtils.whenOnce(() => app.mapView.ready == true).then(() => {
                            app.layerListWidget.view = app.activeView;
                            let zemepisna = app.activeView.map.basemap.baseLayers.find((mylayer) => {
                                return mylayer.id === "zemepisnaSit";
                            });
                            zemepisna ? zemepisna.visible = true : false
                        });
                    } else {
                        if (document.getElementById("loader").style.display == "block") document.getElementById("loader").style.display = "none";
                    }
                } else {
                    if (app.activeView.type == "2d") {
                        //přepnutí do 3D
                        reactiveUtils.once(() => app.sceneView.updating == false).then(() => {
                            if (document.getElementById("loader").style.display == "block") document.getElementById("loader").style.display = "none";
                        });
                        if (app.widgetCoord[app.activeView.type].active) app.widgetCoord.toggle(app.activeView.type);
                        query(".panel, .panel-collapse").removeClass("in");
                        query("#tlacitkoVyjadreniDBP, #tlacitkoHlaseniChyb, #jakazakladnimapa, #zmenitSSmenu, #printDiv, #zobrazVlastniMeritko, .vlastniMeritko, #tlacitkoSwipe, #meritkodiv, #basemapInfoLabelDiv").addClass("hidden");
                        query("#sceneScreenshot, #sceneModel").removeClass("hidden");
                        app.sceneView.spatialReference = app.mapView.spatialReference.clone();
                        if (app.sceneView.spatialReference.wkid == 3857 || app.sceneView.spatialReference.wkid == 102100) {
                            if (document.getElementById("jakyModel").value == "5G") {
                                app.map.ground.layers.add(app.ground_merc5G);
                            } else if (document.getElementById("jakyModel").value == "4G") {
                                app.map.ground.layers.add(app.ground_merc4G);
                            }
                        }
                        if (app.sceneView.spatialReference.wkid == 5514 || app.sceneView.spatialReference.wkid == 102067) {
                            if (document.getElementById("jakyModel").value == "5G") {
                                app.map.ground.layers.add(app.ground_jtsk5G);
                            } else if (document.getElementById("jakyModel").value == "4G") {
                                app.map.ground.layers.add(app.ground_jtsk4G);
                            }
                            query("#geonamesPanorama").removeClass("hidden");
                        }
                        if (window.location.hash == 'zab3d') query(".zabaged_3d").removeClass("hidden");
                        syncViews(app.mapView, app.sceneView);
                        app.activeView = app.sceneView;
                        reactiveUtils.whenOnce(() => app.sceneView.ready == true).then(() => {
                            app.layerListWidget.view = app.activeView;
                            let zemepisna = app.activeView.map.basemap.baseLayers.find((mylayer) => {
                                return mylayer.id === "zemepisnaSit";
                            });
                            zemepisna ? zemepisna.visible = false : false;
                        });
                    } else {
                        if (document.getElementById("loader").style.display == "block") document.getElementById("loader").style.display = "none";
                    }
                }
                app.measurement.view = app.activeView;
            };

            // Views
            function syncViews(fromView, toView) {
                reactiveUtils.whenOnce(() => fromView.ready == true).then(() => {
                    var viewPt = fromView.viewpoint.clone();
                    fromView.container = null;
                    if (fromView.type === "3d") {
                        toView.container = app.mapDiv;
                    } else {
                        toView.container = app.sceneDiv;
                    }
                    toView.viewpoint = viewPt;
                    toView.padding = app.padding;
                    toView.ui.find("search") && fromView.ui.find("search") ? toView.ui.find("search").activeSourceIndex = fromView.ui.find("search").activeSourceIndex : false
                });
            }
        }
    });
};