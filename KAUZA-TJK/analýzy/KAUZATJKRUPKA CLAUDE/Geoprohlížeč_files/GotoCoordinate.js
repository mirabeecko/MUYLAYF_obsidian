//přechod na souřadnice
require([
    'dojo/query',
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/request"], (query, Graphic, GraphicsLayer, esriRequest) => {
        app.widgetGotoCoordinate = {};
        document.getElementById("volbaSSsouradnice").value="102067";
        
        var mapss = app.activeView.spatialReference.wkid;
        var textss = "Neznámý";
        if (mapss == 102067) {
            textss = "5514 (S-JTSK/Krovak)";
        } else if (mapss == 4326) {
            textss = "4326 (WGS 84, geographic 2D)";
        } else if (mapss == 32633) {
            textss = "32633 (WGS 84, UTM zone 33N)";
        } else if (mapss == 32634) {
            textss = "32634 (WGS 84, UTM zone 34N)";
        } else if (mapss == 4258) {
            textss = "4258 (ETRS89, geographic 2D)";
        } else if (mapss == 3034) {
            textss = "3034 (ETRS89, LCC Europe)";
        } else if (mapss == 3035) {
            textss = "3035 (ETRS89, LAEA Europe)";
        } else if (mapss == 3045) {
            textss = "3045 (ETRS89, TM33)";
        } else if (mapss == 3046) {
            textss = "3046 (ETRS89, TM34)";
        } else if (mapss == 3835) {
            textss = "3835 (Pulkovo 1942(83), GK zone 3)";
        } else if (mapss == 3836) {
            textss = "3836 (Pulkovo 1942(83), GK zone 4)";
        } else if (mapss == 102100) {
            textss = "3857 (WGS 84, Pseudo-Mercator)";
        }
        document.getElementById("aktualniSS").innerHTML = textss;
        document.getElementById("label_212").innerHTML = label[47] + textss;
        
        app.widgetGotoCoordinate.testSouradnic = () => {
            var sssouradnic = document.getElementById("volbaSSsouradnice").value;
            if (sssouradnic==5514 || sssouradnic==102067) {
              var novyextent={xmin:-990000,ymin:-1290000,xmax:-330000,ymax:-880000};
            } else if (sssouradnic==4326) {
              var novyextent={xmin:11.8,ymin:48.1,xmax:19.4,ymax:51.4};
            } else if (sssouradnic==32633) {
              var novyextent={xmin:262000,ymin:5349000,xmax:824000,ymax:5683000};
            } else if (sssouradnic==32634) {
              var novyextent={xmin:-181000,ymin:5369000,xmax:382000,ymax:5695000};
            } else if (sssouradnic==4258) {
              var novyextent={xmin:11.8,ymin:48.1,xmax:19.4,ymax:51.4};
            } else if (sssouradnic==3034) {
              var novyextent={xmin:4084000,ymin:2391000,xmax:4686000,ymax:2752000};
            } else if (sssouradnic==3035) {
              var novyextent={xmin:4389000,ymin:2785000,xmax:5041000,ymax:3179000};
            } else if (sssouradnic==3045) {
              var novyextent={xmin:241000,ymin:5334000,xmax:835000,ymax:5691000};
            } else if (sssouradnic==3046) {
              var novyextent={xmin:-180000,ymin:5350000,xmax:403000,ymax:5714000};
            } else if (sssouradnic==3835) {
              var novyextent={xmin:3234000,ymin:5330000,xmax:3830000,ymax:5700000};
            } else if (sssouradnic==3836) {
              var novyextent={xmin:3803000,ymin:5332000,xmax:4392000,ymax:5711000};
            } else if (sssouradnic==3857 || sssouradnic==102100) {
              var novyextent={xmin:1266000,ymin:6124000,xmax:2179000,ymax:6707000};
            }
            
            var nadpisX = "X";
            var nadpisY = "Y";
            if (sssouradnic == 4326 || sssouradnic == 4258) {
                nadpisX = "L";
                nadpisY = "B";
            } else if (sssouradnic == 102067 || sssouradnic == 5514 || sssouradnic == 3035) {
                nadpisX = "Y";
                nadpisY = "X";
            } else if (sssouradnic == 32633 || sssouradnic == 32634) {
                nadpisX = "E";
                nadpisY = "N";
            } else if (sssouradnic == 3034 || sssouradnic == 3045 || sssouradnic == 3046) {
                nadpisX = "N";
                nadpisY = "E";
            }
            
            var tx = document.getElementById("souradnice1").value.replace(",", ".");
            var ty = document.getElementById("souradnice2").value.replace(",", ".");
            if (sssouradnic == 102067 || sssouradnic == 5514 || sssouradnic == 3835 || sssouradnic == 3836 || sssouradnic == 3857 || sssouradnic == 32633 || sssouradnic == 32634) { 
                tx = document.getElementById("souradnice2").value.replace(",", ".");
                ty = document.getElementById("souradnice1").value.replace(",", ".");
            }
            if (sssouradnic == 102067 || sssouradnic == 5514) {
                if (tx.indexOf("-") > -1) {
                    let x = tx;
                    let y = ty;
                    tx = y;
                    ty = x;                
                }
            }            
            
            var vysledek={};
            vysledek.mohuprevadet = 1;
            vysledek.err="";
            if (sssouradnic==4326 || sssouradnic==4258) {
                tx=tx.replace('’','\'');
                ty=ty.replace('’','\'');
                tx=tx.replace('″','\'\'');
                ty=ty.replace('″','\'\'');
               tx=tx.replace("''",'#');
               ty=ty.replace("''",'#');
               tx=tx.replace('"','#');
               ty=ty.replace('"','#');
               tx=tx.replace("'",'#');
               ty=ty.replace("'",'#');
               tx=tx.replace('°','#');
               ty=ty.replace('°','#');
               tx=tx.replace('N','');
               tx=tx.replace('E','');
               ty=ty.replace('N','');
               ty=ty.replace('E','');
               tx=tx.replace(/ /g,'');
               ty=ty.replace(/ /g,'');
               tx=tx.replace(String.fromCharCode(92),'');
               ty=ty.replace(String.fromCharCode(92),'');
               if (tx.charAt(tx.length-1)=="#") {tx=tx.slice(0,tx.length-1);}
               if (ty.charAt(ty.length-1)=="#") {ty=ty.slice(0,ty.length-1);}
               var polehodnotx=tx.split("#");
               var polehodnoty=ty.split("#");
                if (polehodnotx.length > 3) { vysledek.err = label[564] + nadpisX + label[565];vysledek.mohuprevadet=0;}
                if (polehodnoty.length > 3) { vysledek.err = label[564] + nadpisY + label[565];vysledek.mohuprevadet=0;}
               if (vysledek.mohuprevadet==1) {
                  var cislax=[];
                  for (var i=0;i<polehodnotx.length;i++) {
                      cislax[i]=Number(polehodnotx[i]);
                      if (cislax[i] == null || cislax[i] == "" || isNaN(cislax[i])) { vysledek.err = label[566] + nadpisX + label[567];vysledek.mohuprevadet=0;}
                  }               
                  var cislay=[];
                  for (var i=0;i<polehodnoty.length;i++) {
                      cislay[i]=Number(polehodnoty[i]);
                      if (cislay[i] == null || cislay[i] == "" || isNaN(cislay[i])) { vysledek.err = label[566] + nadpisY + label[567];vysledek.mohuprevadet=0;}                    
                  }             //tady se dřív využili label 90 a 91
                  if (vysledek.mohuprevadet==1) {
                     vysledek.x=0;
                     if (polehodnotx.length>2) {vysledek.x+=cislax[2]/3600;}
                     if (polehodnotx.length>1) {vysledek.x+=cislax[1]/60;}
                     vysledek.x+=cislax[0];     
                     vysledek.y=0;
                     if (polehodnoty.length>2) {vysledek.y+=cislay[2]/3600;}
                     if (polehodnoty.length>1) {vysledek.y+=cislay[1]/60;}
                     vysledek.y+=cislay[0];
                  }   
               }
            } else {
                tx = tx.replace('N','');
                tx = tx.replace('E','');
                ty = ty.replace('N','');
                ty = ty.replace('E','');
                vysledek.x = Number(tx);
                vysledek.y = Number(ty);
                if (vysledek.x == null || vysledek.x == "" || isNaN(vysledek.x)) {
                    vysledek.err = label[89] + " " + nadpisX + label[567];
                    vysledek.mohuprevadet=0;
                }
                if (vysledek.y == null || vysledek.y == "" || isNaN(vysledek.y)) {
                    vysledek.err = label[89] + " " + nadpisY + label[567];
                    vysledek.mohuprevadet=0;
                }
            }
            if (vysledek.mohuprevadet==1) {
               if (sssouradnic==5514 || sssouradnic==102067) {
                  if (vysledek.x>0) {vysledek.x=-1*vysledek.x;}
                  if (vysledek.y>0) {vysledek.y=-1*vysledek.y;}
               }
                if (vysledek.x < novyextent.xmin || vysledek.x > novyextent.xmax) { vysledek.err = label[89] + " " + nadpisX + label[568];vysledek.mohuprevadet=0;}
                if (vysledek.y < novyextent.ymin || vysledek.y > novyextent.ymax) { vysledek.err = label[89] + " " + nadpisY + label[568];vysledek.mohuprevadet=0;}
            }
            return vysledek;
        };    

        app.widgetGotoCoordinate.provedprevod = () => {
            var ssbodu = document.getElementById("volbaSSsouradnice").value;
            var mapss = app.activeView.spatialReference.wkid;
            query("#goToCoordVyska").addClass("hidden");
            document.getElementById("goToCoordVyska").innerHTML = "";
            
            var testsouradnic=app.widgetGotoCoordinate.testSouradnic();
            if (testsouradnic.mohuprevadet == 0) {
               alert(testsouradnic.err);
            } else {
                if (ssbodu == 4258 || ssbodu== 3034 || ssbodu == 3035 || ssbodu==3045 || ssbodu==3046) { 
                   var x = testsouradnic.y;
                   var y = testsouradnic.x;
                } else {
                   var x = testsouradnic.x;
                   var y = testsouradnic.y;
                }   
                sstransffce(ssbodu, mapss, x, y).then((response) => {
                    app.widgetGotoCoordinate.hasfinalSS(response.x, response.y);
                    }, (err) => {
                        alert(label[569] + err.message);
                    }
                );
            }
        };

        app.widgetGotoCoordinate.hasfinalSS = (x, y) => {
            var mapss = app.activeView.spatialReference.wkid;
            if (mapss == 3034 || mapss == 3035 || mapss == 3045 || mapss == 3046 || mapss == 4258) {
                var znacka = app.widgetGotoCoordinate._getMarkerGraphic({ x: y, y: x, spatialReference: app.activeView.spatialReference.clone(), type: "point" });
                znacka.popupTemplate = null;
            } else {
                var znacka = app.widgetGotoCoordinate._getMarkerGraphic({ x: x, y: y, spatialReference: app.activeView.spatialReference.clone(), type: "point" });
                if (document.getElementById("volbaSSsouradnice").value == 102067) {
                    var url = "https://ags.cuzk.gov.cz/arcgis2/rest/services/dmr5g/ImageServer/identify?geometry={x:" + x + ",y:" + y + ",spatialReference:{wkid:5514}}&geometryType=esriGeometryPoint&mosaicRule=&renderingRule=&pixelSize=&time=&returnGeometry=false&returnCatalogItems=false&f=pjson";
                    esriRequest(url, {
                        responseType: "json"
                    }).then((response) => {
                        var vyskaNum = Number(response.data.value);
                        var vyskaKrovak = vyskaNum.toFixed(2);
                        if (vyskaKrovak == "NoData" || vyskaKrovak == "NaN") { 
                            vyskaKrovak = "Neznámo"; 
                            vyskaNum = 0; 
                        } else {
                            query("#goToCoordVyska").removeClass("hidden");
                            document.getElementById("goToCoordVyska").innerHTML = label[145] + " (DMR 5G): <b>" + vyskaKrovak + "</b> (m)";
                        }
                    });
                } else {
                    znacka.popupTemplate = null;
                }
            }
            znacka.mujtyp = "gotocoordinate_znacka";
            if (!app.graphics_coord_layer) {
                app.graphics_coord_layer = new GraphicsLayer({
                    title: "Značka odečtu souřadnic",
                    listMode: "hide"
                });
                app.activeView.map.layers.add(app.graphics_coord_layer);
            }
            app.graphics_coord_layer.add(znacka);
            app.activeView.goTo({
                target: znacka,
                zoom: 11
            });
            query("#vymazatBody").removeClass("hidden");
        };

        app.widgetGotoCoordinate._getMarkerGraphic = (mapPoint, offset) => {
            if (app.activeView.type == "2d") {
                var symbol = {
                    type: "text", // autocasts as new TextSymbol()
                    color: document.getElementById("goToCoordColor").value,
                    text: "\ue61d", // esri-icon-map-pin
                    font: {
                        // autocasts as new Font()
                        size: 25,
                        family: "calcite-web-icons" // Esri Icon Font
                    },
                    haloColor: "white",
                    haloSize: "3px"
                };
                if (offset) {
                    symbol.offset = offset;
                }
            } else {
                var symbol = {
                    type: "point-3d",  // autocasts PointSymbol3D()
                    symbolLayers: [{
                        type: "icon",  // autocasts IconSymbol3DLayer()
                        size: 12,
                        resource: { primitive: "circle" },
                        material: { color: document.getElementById("goToCoordColor").value }
                    }],
                    verticalOffset: {
                        screenLength: 40,
                        minWorldLength: 10
                    },
                    callout: {
                        type: "line", // autocasts LineCallout3D()
                        size: 1.5,
                        color: "white",
                        border: {
                            color: "black"
                        }
                    }
                };
                if (offset) {
                    symbol.offset = offset;
                }
            }
            //symbol.yoffset=17; // puv. 0, 12
            return new Graphic({
                geometry: mapPoint,
                symbol: symbol,
                popupTemplate: {
                    title: label[89],
                    content:
                    "<b>" + label[89] + " Y:</b> " + Number(mapPoint.x) * -1 + "<br>" +
                    "<b>" + label[89] + " X:</b> " + Number(mapPoint.y) * -1 + "<br>",
                    actions: [{
                        id: "locate",
                        className: "esri-icon-share",
                        title: label[314]
                    }, {
                        id: "dmrz",
                        className: "esri-icon-elevation-profile",
                        title: label[145]
                    }]
                }
            });
        };

        app.widgetGotoCoordinate._getLabelGraphic = (mapPoint) => {
            let text = mapPoint.x.toFixed(2) * -1 + "; " + mapPoint.y.toFixed(2) * -1;
            var symbol = {
                type: "text",
                color: "#204d74",
                text: text,
                yoffset: 35,
                haloColor: "white",
                haloSize: "2px",
                font: {
                    size: 14
                }
            };
            //symbol.yoffset=17; // puv. 0, 12
            return new Graphic({
                geometry: mapPoint,
                symbol: symbol,
                popupTemplate: {
                    title: label[89],
                    content:
                    "<b>" + label[89] + " Y:</b> " + Number(mapPoint.x) * -1 + "<br>" +
                    "<b>" + label[89] + " X:</b> " + Number(mapPoint.y) * -1 + "<br>",
                    actions: [{
                        id: "locate",
                        className: "esri-icon-share",
                        title: label[314]
                    }]
                }
            });
        };
        
        app.widgetGotoCoordinate.loadTxt = () => {
            if (!app.graphics_coord_layer) {
                app.graphics_coord_layer = new GraphicsLayer({
                    title: "Značka odečtu souřadnic",
                    listMode: "hide"
                });
                app.mapView.map.layers.add(app.graphics_coord_layer);
                app.sceneView.map.layers.add(app.graphics_coord_layer);
            } else {
                var pole = app.graphics_coord_layer.graphics.toArray();
                for (var i = pole.length - 1; i >= 0; i--) {
                    if (pole[i].mujtyp == "gotocoordinate_znacka") {
                        app.graphics_coord_layer.graphics.remove(pole[i]);
                    }
                }
            }
            function findTxt(txt) {            
                let arr = txt.split(";");
                var vysledky = [];
                var vysledkyLabel = [];
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].indexOf(",") > -1) {
                        let string = arr[i].split(",");
                        let x = "-" + string[0].replace("\r\n", "");
                        let y = "-" + string[1].replace("\r\n", "");
                        vysledky.push(app.widgetGotoCoordinate._getMarkerGraphic({ x: Number(x), y: Number(y), spatialReference: app.activeView.spatialReference.clone(), type: "point" }));
                        if (app.activeView.type == "2d" && document.getElementById("prechodNaSouradniceTxtLabelsToggle").checked == true) {
                            vysledkyLabel.push(app.widgetGotoCoordinate._getLabelGraphic({ x: Number(x), y: Number(y), spatialReference: app.activeView.spatialReference.clone(), type: "point" }));
                        }
                    }
                }
                if (vysledky.length == 0) {    
                    alert(label[160]);                    
                    query("#prechodNaSouradniceTxt").removeClass("hidden");
                    document.getElementById("prechodNaSouradniceTxt").value = null;
                    document.getElementById("label_228").innerHTML = label[718];
                    return;
                }
                for (var t = 0; t < vysledky.length; t++) {
                    if (vysledky.length > 1000) {
                        document.getElementById("prechodNaSouradniceTxt").value = null;
                        document.getElementById("label_228").innerHTML = label[718];
                        query("#prechodNaSouradniceTxt").removeClass("hidden");
                        alert(label[383]);
                        return;
                    }
                    if (vysledky.length > 0) {                               
                        var popupTemplate = {
                            title: label[89] + " " + (t + 1),
                            content:
                            "<b>" + label[89] + " Y:</b> " + Number(vysledky[t].geometry.x) * -1 + "<br>" +
                            "<b>" + label[89] + " X:</b> " + Number(vysledky[t].geometry.y) * -1 + "<br>",
                            actions: [{
                                id: "locate",
                                className: "esri-icon-share",
                                title: label[314]
                            }, {
                                id: "dmrz",
                                className: "esri-icon-elevation-profile",
                                title: label[145]
                            }]
                        };
                        vysledky[t].popupTemplate = popupTemplate;
                        vysledky[t].typ = "gotocoordinate_znacka";
                        app.graphics_coord_layer.graphics.add(vysledky[t]);
                    } else {
                        alert(label[160]);
                    }
                }
                for (var t = 0; t < vysledkyLabel.length; t++) {
                    if (vysledkyLabel.length > 0) {
                        vysledkyLabel[t].popupTemplate.title = vysledkyLabel[t].popupTemplate.title + " " + (t + 1);
                        vysledkyLabel[t].typ = "gotocoordinate_znacka";
                        app.graphics_coord_layer.graphics.add(vysledkyLabel[t]);
                    } else {
                        alert(label[160]);
                    }
                }
                app.activeView.goTo(vysledky).then(() => {
                    app.activeView.openPopup({
                        features: vysledky,
                        featureMenuOpen: false,
                        updateLocationEnabled: true,
                        highlightEnabled: true
                    });
                    query("#label_226").removeClass("hidden");
                });
                query("#prechodNaSouradniceTxt").removeClass("hidden");
                document.getElementById("prechodNaSouradniceTxt").value = null;
                document.getElementById("label_228").innerHTML = label[718];
            }   
            let fileReader = new FileReader(); 
            fileReader.onload = (e) => { 
                let txt = fileReader.result;
                findTxt(txt);
            } 
            fileReader.readAsText(document.getElementById("prechodNaSouradniceTxt").files[0]);
        }

        query("#prechodNaSouradniceTxt").on("change", () => {
            if (app.activeView.spatialReference.wkid != 102067) {
                alert(label[185]);
                document.getElementById("prechodNaSouradniceTxt").value = null;
                return;
            }
            if (document.getElementById("prechodNaSouradniceTxt").files[0].type != "text/plain" && document.getElementById("prechodNaSouradniceTxt").files[0].size > 1000) {
                alert(label[383]);
                document.getElementById("prechodNaSouradniceTxt").value = null;
                return;
            }
            document.getElementById("label_228").innerHTML = label[549];
            query("#prechodNaSouradniceTxt").addClass("hidden");
            app.widgetGotoCoordinate.loadTxt();
        });

        query("#zobrazitSouradnice").on("click", (e) => {
            app.widgetGotoCoordinate.provedprevod();
        });
        query("#vymazatBody").on("click", (e) => {
            if (app.graphics_coord_layer) {
                var pole = app.graphics_coord_layer.graphics.toArray();
                for (var i = pole.length - 1; i >= 0; i--) {
                    if (pole[i].mujtyp == "gotocoordinate_znacka") {
                        app.graphics_coord_layer.graphics.remove(pole[i]);
                    }
                }
                query("#goToCoordVyska, #vymazatBody").addClass("hidden");
                document.getElementById("goToCoordVyska").innerHTML = "";
            }
        });        
        query("#label_226").on("click", (e) => {
            if (app.graphics_coord_layer) {
                var pole = app.graphics_coord_layer.graphics.toArray();
                for (var i = pole.length - 1; i >= 0; i--) {
                    if (pole[i].typ == "gotocoordinate_znacka") {
                        app.graphics_coord_layer.graphics.remove(pole[i]);
                    }
                }
                query("#label_226").addClass("hidden");
                app.activeView.closePopup();
            }
        });
        query("#volbaSSsouradnice").on("change", (e) => {
            var vybranySS = document.getElementById("volbaSSsouradnice").value;
            if (vybranySS == 102067 || vybranySS == 3035) {
                nadpisX = label[89] + " Y:";
                nadpisY = label[89] + " X:";
            } else if (vybranySS == 3857 || vybranySS == 3835 || vybranySS == 3836) {
                nadpisX = label[89] + " X:";
                nadpisY = label[89] + " Y:";
            } else if (vybranySS == 4326 || vybranySS == 4258) {
                nadpisX = label[89] + " B:";
                nadpisY = label[89] + " L:";
            } else if (vybranySS == 3045 || vybranySS == 3046 || vybranySS == 3034) {
                nadpisX = label[89] + " N:";
                nadpisY = label[89] + " E:";
            } else if (vybranySS == 32633 || vybranySS == 32634) {
                nadpisX = label[89] + " E:";
                nadpisY = label[89] + " N:";
            }
            document.getElementById("nadpisX").innerHTML = nadpisX;
            document.getElementById("nadpisY").innerHTML = nadpisY;
        });

    });