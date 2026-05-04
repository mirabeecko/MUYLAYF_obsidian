require(['esri/rest/geoprocessor', "esri/request"], (geoprocessor, esriRequest) => {
        sstransffce = (inSRWkid, outSRWkid, x, y, z) => {
            var thisTransfPoint = {};
            var vysledek = new Promise((resolve, reject) => {
            thisTransfPoint.onProjectComplete = (jobId) => {
                if (jobId.jobStatus == "job-succeeded") {
                    var pocetsouradnic = 0;
                    var x;
                    var y;
                    var z;
                    jobId.fetchResultData("OutputCoordinate1").then((result) => {
                        x = -1 * Number(result.value);
                        pocetsouradnic++;
                        if (pocetsouradnic == 3) { thisTransfPoint.hasJTSK(x, y, z); }
                    }, (err) => {
                        console.log(err);
                    });
                    jobId.fetchResultData("OutputCoordinate2").then((result) => {
                        y = -1 * Number(result.value);
                        pocetsouradnic++;
                        if (pocetsouradnic == 3) { thisTransfPoint.hasJTSK(x, y, z); }
                    }, (err) => {
                        console.log(err);
                    });
                    jobId.fetchResultData("OutputCoordinate3").then((result) => {
                        z = Number(result.value);
                        pocetsouradnic++;
                        if (pocetsouradnic == 3) { thisTransfPoint.hasJTSK(x, y, z); }
                    }, (err) => {
                        console.log(err);
                    });
                } else {
                    reject({ message: "Mimo rozsah konverzní funkce." });
                }
            };

            thisTransfPoint.onProjectComplete2 = (jobId) => {
                if (jobId.jobStatus == "job-succeeded") {
                    var pocetsouradnic = 0;
                    var x;
                    var y;
                    var z;

                    jobId.fetchResultData("OutputCoordinate1").then((result) => {
                        x = Number(result.value);
                        pocetsouradnic++;
                        if (pocetsouradnic == 3) { thisTransfPoint.hasfinalSS(x, y, z); }
                    }, (err) => {
                        console.log(err);
                    });
                    jobId.fetchResultData("OutputCoordinate2").then((result) => {
                        y = Number(result.value);
                        pocetsouradnic++;
                        if (pocetsouradnic == 3) { thisTransfPoint.hasfinalSS(x, y, z); }
                    }, (err) => {
                        console.log(err);
                    });
                    jobId.fetchResultData("OutputCoordinate3").then((result) => {
                        z = Number(result.value);
                        pocetsouradnic++;
                        if (pocetsouradnic == 3) { thisTransfPoint.hasfinalSS(x, y, z); }
                    }, (err) => {
                        console.log(err);
                    });

                } else {
                    reject({ message: "Mimo rozsah konverzní funkce." });
                }
            };

            thisTransfPoint.hasJTSK = (x, y, z) => {
                if (!z) {z=0;}
                console.log("JTSK:" + x + "," + y + "," + z);
                if (outSRWkid == 102067 || outSRWkid == 5514) { thisTransfPoint.hasfinalSS(x, y, z); }
                if (outSRWkid == 3034 || outSRWkid == 3035 || outSRWkid == 3045 || outSRWkid == 3046 || outSRWkid == 4258 || outSRWkid == 4326 || outSRWkid == 32633 || outSRWkid == 32634 || outSRWkid == 3857 || outSRWkid == 102100) {
                    //převod přes Řezníčkovo dll
                    var taskparams = {
                        InputCoordinate1: (-1 * x).toString(),
                        InputCoordinate2: (-1 * y).toString()
                    };
                    
                    if (outSRWkid == 3034) { taskparams.OutputCRS = "ETRS89-LCC + EVRS (NEH)"; }
                    if (outSRWkid == 3035) { taskparams.OutputCRS = "ETRS89-LAEA + EVRS (YXH)"; }
                    if (outSRWkid == 3045) { taskparams.OutputCRS = "ETRS89-TM33 + EVRS (NEH)"; }
                    if (outSRWkid == 3046) { taskparams.OutputCRS = "ETRS89-TM34 + EVRS (NEH)"; }
                    if (outSRWkid == 4258) { taskparams.OutputCRS = "ETRS89 (BLh/DEG)"; }
                    if (outSRWkid == 4326) { taskparams.OutputCRS = "WGS84 (BLh/DEG)"; }
                    if (outSRWkid == 32633) { taskparams.OutputCRS = "WGS84/UTM33 (ENh)"; }
                    if (outSRWkid == 32634) { taskparams.OutputCRS = "WGS84/UTM34 (ENh)"; }
                    if (outSRWkid == 3857 || outSRWkid == 102100) { taskparams.OutputCRS = "WGS84/Pseudo-Mercator (XYh)"; }
                    taskparams.InputCRS = "S-JTSK + Bpv (YXH)";
                    
                    taskparams.InputCoordinate3 = z.toString();
                    console.log("Řezníček 5514->" + outSRWkid);
                    thisTransfPoint.gpserviceUrl = "https://ags.cuzk.gov.cz/arcgis2/rest/services/Transformacni/TransformaceSouradnic/GPServer/TransformaceSouradnic";
                    geoprocessor.submitJob(thisTransfPoint.gpserviceUrl, taskparams).then((jobinfo) => {
                        jobinfo.waitForJobCompletion().then(thisTransfPoint.onProjectComplete2, thisTransfPoint.onProjectError);
                    });
                }
                if (outSRWkid == 3835 || outSRWkid == 3836) {
                    //převod přes ESRI
                    if (outSRWkid == 4326 || outSRWkid == 32633 || outSRWkid == 32634 || outSRWkid == 3857 || outSRWkid == 102100) {
                        var transformstr = "{wkid:1623}"; //wkid:108270,latestWkid:15965,name:%22S_JTSK_To_WGS_1984_NGA%22
                        //už se tahle nevyužívá, nikdy nenastane, řezníček už to má ve svém dll
                    } else {
                        var transformstr = "{wkid:108202}";
                    }
                    console.log("ESRI transf. 5514->" + outSRWkid + "-transf." + transformstr);

                    var url = "http://ags.cuzk.gov.cz/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?inSR=102067&outSR=" + outSRWkid + "&geometries=%7BgeometryType%3A%22esriGeometryPoint%22%2Cgeometries%3A%5B%7Bx%3A" + x + "%2Cy%3A" + y + "%7D%5D%7D&transformation=" + transformstr + "&transformForward=true&vertical=false&f=json";
                    esriRequest(url, {
                        responseType: "json"
                    }).then((response) => {
                        var geoJson = response.data;
                        if (geoJson.geometries) {
                            if (geoJson.geometries.length > 0) {
                                var final_x = geoJson.geometries[0].x;
                                var final_y = geoJson.geometries[0].y;
                                thisTransfPoint.hasfinalSS(final_x, final_y, z);
                            }
                        }
                    });
                }
            };

            thisTransfPoint.hasfinalSS = function (x, y, z) {
                if (outSRWkid==4326 ) {
                   console.log("Final:" + y + "," + x + "," + z);
                   resolve({ x: y, y: x, z: z });
                } else {   
                   console.log("Final:" + x + "," + y + "," + z);
                   resolve({ x: x, y: y, z: z });
                }   
            };

            thisTransfPoint.onProjectError = (err) => {
                var duvod="Konverze souřadnic se nezdařila.";
                if (err.messages) {
                  for (var j = 0; j < err.messages.length; j++) {
                    if (err.messages[j].description.search('Vstupní a výstupní CRS pro transformaci musí být zadány') >= 0) { duvod=err.messages[j].description; }
                    if (err.messages[j].description.search('Vstupní a výstupní CRS pro transformaci nesmí být stejné') >= 0) { duvod=err.messages[j].description; }
                    if (err.messages[j].description.search("Nepovolená kombinace vstupního a výstupního CRS") >= 0) { duvod=err.messages[j].description; }
                    if (err.messages[j].description.search("Nejsou zadány vstupní souřadnice nebo textový soubor se souřadnicemi pro transformaci") >= 0) { duvod=err.messages[j].description; }
                    if (err.messages[j].description.search("Zadané vstupní souřadnice jsou mimo povolený rozsah pro vstupní CRS") >= 0) { duvod=err.messages[j].description; }
                    if (err.messages[j].description.search("Zadané vstupní souřadnice musí být reálné číslo") >= 0) { duvod=err.messages[j].description; }
                    if (err.messages[j].description.search("Záporné souřadnice X a Y nejsou podporovány pro vstupní CRS") >= 0) { duvod=err.messages[j].description; }
                    if (err.messages[j].description.search("Kombinace záporných a kladných souřadnice X a Y nejsou podporovány pro vstupní CRS") >= 0) { duvod=err.messages[j].description; }
                    if (err.messages[j].description.search("Řádka neobsahuje souřadnice ve správném formátu pro vstupní CRS") >= 0) { duvod=err.messages[j].description; }
                  }
                }
                console.log(duvod);
                reject({ message: duvod });
            };

            //main fce
            if (inSRWkid == 5514 || inSRWkid == 102067) {
                if (x > 0) { x = -1 * x; }
                if (y > 0) { y = -1 * y; }
            }
            if (!z) { z = 0; }
            console.log("Souř.:" + x + "," + y + "," + z + " (" + inSRWkid + ")");
            // na jtsk
            if (inSRWkid == 102067 || inSRWkid == 5514) { thisTransfPoint.hasJTSK(x, y, z); }
            if (inSRWkid == 3034 || inSRWkid == 3035 || inSRWkid == 3045 || inSRWkid == 3046 || inSRWkid == 4258 || inSRWkid == 4326 || inSRWkid == 32633 || inSRWkid == 32634 || inSRWkid == 3857 || inSRWkid == 102100) {
                //převod přes Řezníčkovo dll
                var taskparams = {
                    InputCoordinate1: x.toString(),
                    InputCoordinate2: y.toString()
                };
                if (inSRWkid==4326 ) {
                   var taskparams = {
                    InputCoordinate1: y.toString(),
                    InputCoordinate2: x.toString()
                   };
                }
                
                if (inSRWkid == 3034) { taskparams.InputCRS = "ETRS89-LCC + EVRS (NEH)"; }
                if (inSRWkid == 3035) { taskparams.InputCRS = "ETRS89-LAEA + EVRS (YXH)"; }
                if (inSRWkid == 3045) { taskparams.InputCRS = "ETRS89-TM33 + EVRS (NEH)"; }
                if (inSRWkid == 3046) { taskparams.InputCRS = "ETRS89-TM34 + EVRS (NEH)"; }
                if (inSRWkid == 4258) { taskparams.InputCRS = "ETRS89 (BLh/DEG)"; }
                if (inSRWkid == 4326) { taskparams.InputCRS = "WGS84 (BLh/DEG)"; }
                if (inSRWkid == 32633) { taskparams.InputCRS = "WGS84/UTM33 (ENh)"; }
                if (inSRWkid == 32634) { taskparams.InputCRS = "WGS84/UTM34 (ENh)"; }
                if (inSRWkid == 3857 || inSRWkid == 102100) { taskparams.InputCRS = "WGS84/Pseudo-Mercator (XYh)"; }
                taskparams.OutputCRS = "S-JTSK + Bpv (YXH)";
                taskparams.InputCoordinate3 = z.toString();
                console.log("Řezníček " + inSRWkid + "->5514");
                thisTransfPoint.gpserviceUrl = "https://ags.cuzk.gov.cz/arcgis2/rest/services/Transformacni/TransformaceSouradnic/GPServer/TransformaceSouradnic";
                geoprocessor.submitJob(thisTransfPoint.gpserviceUrl, taskparams).then((jobinfo) => {
                    jobinfo.waitForJobCompletion().then(thisTransfPoint.onProjectComplete, thisTransfPoint.onProjectError);
                });
            }
            if (inSRWkid == 3835 || inSRWkid == 3836) {
                //převod přes ESRI
                if (inSRWkid == 4326 || inSRWkid == 32633 || inSRWkid == 32634 || inSRWkid == 3857 || inSRWkid == 102100) {
                    var transformstr = "{wkid:1623}";
                    //už se tahle nevyužívá, nikdy nenastane, řezníček už to má ve svém dll
                } else {
                    var transformstr = "{wkid:108202}";
                    //                var transformstr="{geoTransforms:[{wkid:1623},{wkid:15998,latestWkid:15998,transformForward:false,name:%22Pulkovo_1942_Adj_1983_To_WGS_1984_5%22}]}";
                }
                console.log("ESRI transf. " + inSRWkid + "->5514 -transf." + transformstr);
                var url = "http://ags.cuzk.gov.cz/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?inSR=" + inSRWkid + "&outSR=102067&geometries=%7BgeometryType%3A%22esriGeometryPoint%22%2Cgeometries%3A%5B%7Bx%3A" + x + "%2Cy%3A" + y + "%7D%5D%7D&transformation=" + transformstr + "&transformForward=false&vertical=false&f=json";
                esriRequest(url, {
                    responseType: "json"
                }).then((response) => {
                    var geoJson = response.data;
                    if (geoJson.geometries) {
                        if (geoJson.geometries.length > 0) {
                            var jtsk_x = geoJson.geometries[0].x;
                            var jtsk_y = geoJson.geometries[0].y;
                            thisTransfPoint.hasJTSK(jtsk_x, jtsk_y, z);
                        }
                    }
                });
            }            
            });
            return vysledek;
        }  
    });