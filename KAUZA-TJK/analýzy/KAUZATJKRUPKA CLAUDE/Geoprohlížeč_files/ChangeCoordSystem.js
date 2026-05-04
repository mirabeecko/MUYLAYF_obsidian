require([
  'dojo/query', 'esri/geometry/SpatialReference', "esri/rest/geometryService", "esri/rest/support/ProjectParameters", "esri/geometry/Point", "esri/Map", "esri/Viewpoint", "esri/core/reactiveUtils", "esri/geometry/projection", "dojo/dom-construct"
], (query, SpatialReference, geometryService, ProjectParameters, Point, Map, Viewpoint, reactiveUtils, projection) => {
    app.widgetChangeSS = {};
    app.widgetChangeSS.nastavSS = (code) => {
      var odpovedPromise = new Promise((resolve, reject) => {
        if (app.activeView.type === "2d") {
          document.getElementById('volbaSS').value = code
          let ncsn = Number(code);
          let valid = true;
          let isgpx = false;
          app.mapView.map.layers.forEach(v => {
            if (v.id) {
              if (v.id.indexOf("userOgcLayer") > -1) {
                let lcs = false;
                if (v.type == "wms") {
                  v.spatialReferences.forEach(s => {
                    if (ncsn == s) { lcs = true; }
                    if (ncsn == 102100 && s == 3857) lcs = true;
                    if (ncsn == 102067 && s == 5514) lcs = true;
                  });
                  if (lcs == false) valid = false;
                }
                if (v.type == "wmts") {
                  v.sublayers.forEach(s => {
                    s.tileMatrixSets.forEach(mm => {
                      if (ncsn == mm.tileInfo.spatialReference.wkid) lcs = true;
                      if (ncsn == 102100 && mm.tileInfo.spatialReference.wkid == 3857) lcs = true;
                      if (ncsn == 102067 && mm.tileInfo.spatialReference.wkid == 5514) lcs = true;
                    });
                  });
                  if (lcs == false) valid = false;
                }
              }
              if (v.id.indexOf("userDataLayer") > -1 && v.id.indexOf("_gpx") > -1) {
                if (v.type == "feature") {
                  valid = false;
                  isgpx = true;
                }
              }
            }
          });
          if (valid == true) {
            let ncs = new SpatialReference({
              wkid: ncsn
            });
            if (ncsn == 102067) ncs.latestWkid = 5514;
            if (ncsn == 102100) ncs.latestWkid = 3857;
            let activeViewpoint = app.mapView.viewpoint.clone();
            let lcsn = activeViewpoint.targetGeometry.spatialReference.wkid;
            if (ncsn != lcsn) {
              let twoTransform = false;
              let outSR = new SpatialReference({
                wkid: ncsn
              });
              if (ncsn == 102067) outSR.latestWkid = 5514;
              if (lcsn != 102067 && lcsn != 5514 && ncsn != 102067 && ncsn != 5514) {
                twoTransform = true;
                let outSR = new SpatialReference({
                  wkid: 102067, latestWkid: 5514
                });
              }
              let mygeometryService = "https://ags.cuzk.gov.cz/arcgis/rest/services/Utilities/Geometry/GeometryServer";
              let params = new ProjectParameters({
                geometries: [activeViewpoint.targetGeometry],
                outSpatialReference: outSR
              });
              geometryService.project(mygeometryService, params).then(p => {
                let bod = new Point({
                  type: "point",
                  x: p[0].x,
                  y: p[0].y,
                  z: p[0].z,
                  spatialReference: outSR.clone(),
                  hasZ: true
                });
                activeViewpoint.targetGeometry = bod;
                if (!twoTransform) {
                  app.widgetChangeSS.provedzmenuss(ncs, lcsn, activeViewpoint).then(() => {
                    resolve({ status: "OK" });
                  });
                } else {
                  let params2 = new ProjectParameters({
                    geometries: [activeViewpoint.targetGeometry],    //teď již v JTSK
                    outSpatialReference: ncs
                  });
                  geometryService.project(mygeometryService, params2).then(p => {
                    let bod = new Point({
                      type: "point",
                      x: p[0].x,
                      y: p[0].y,
                      z: p[0].z,
                      spatialReference: ncs.clone(),
                      hasZ: true
                    });
                    activeViewpoint.targetGeometry = bod;
                    app.widgetChangeSS.provedzmenuss(ncs, lcsn, activeViewpoint).then(() => {
                      resolve({ status: "OK" });
                    });
                  });
                }
              });
            } else {
              resolve({ status: "OK" });
            }
          } else {
            document.getElementById('volbaSS').value = app.mapView.spatialReference.wkid;
            isgpx == true ? alert(label[120]) : alert(label[121] + ncsn + label[122])
            resolve({ status: "OK" });
          }
        } else {
          alert(label[123]);
          document.getElementById('volbaSS').value = app.sceneView.spatialReference.wkid;
          resolve({ status: "OK" });
        }
      });
      return odpovedPromise
    };

    app.widgetChangeSS.provedzmenuss = (ncs, lcsn, activeViewpoint, scale) => {
      var odpovedPromise = new Promise((resolve, reject) => {
        let lb = "";
        let lbi = app.activeView.map.basemap.baseLayers.items;
        if (lbi) {
          for (let i = 0; i < lbi.length; i++) {
            if (lbi[i].id != "zemepisnaSit") {
              lb = lbi[i].id.toLowerCase();
            }
          }
        }
        if (ncs.wkid == 5514 || ncs.wkid == 102067) {
          document.getElementById("settingsnavigating").disabled = true;
          if (document.getElementById("settingsnavigating").checked == true) app.watchNavigate();
        } else {
          document.getElementById("settingsnavigating").disabled = true;
          if (app.watchNavigateMove) {
            app.watchNavigateHandle.remove();
            app.watchNavigateMove = undefined;
          }
        }

        if ((app.rozsireneHledani) && app.rozsireneHledani.odstranVysledky) app.rozsireneHledani.odstranVysledky(1);
        if (app.graphics_coord_layer) app.graphics_coord_layer.removeAll();
        if (app.measurement.activeTool) app.mereni(3);
        if (app.widgetCoord[app.activeView.type].active) app.widgetCoord.toggle(app.activeView.type);
        app.layersMaphandle.remove();

        app.activeView.map.basemap.baseLayers.removeAll();
        let vrstvy = app.mapView.map.layers.toArray();
        app.mapView.map.layers.removeAll();
        app.map = undefined;

        let nb = [];
        if (ncs.wkid == 5514 || ncs.wkid == 102067) {
          nb.push(app.basemaps_jtsk[lb], app.basemaps_jtsk[5]);
        } else if (ncs.wkid == 3857 || ncs.wkid == 102100) {
          nb.push(app.basemaps_merc[lb]);
        } else {
          nb.push(app.basemaps_jiny[lb]);
        }
        projection.load().then(() => {
          app.mapView.spatialReference = ncs;
          app.sceneView.spatialReference = ncs;
          app.mapView.viewpoint = activeViewpoint;
          app.sceneView.viewpoint = activeViewpoint;
          app.widgetAddData.edit();

          (ncs.wkid == 102067 || ncs.wkid == 102100) ? document.getElementById('sceneNav').style.display = 'block' : document.getElementById('sceneNav').style.display = 'none'
          let mapss = app.mapView.spatialReference.wkid;
          if (app.mapView.spatialReference.wkid !== 102067) {
            query("#tlacitkoVyjadreniDBP, #tlacitkoHlaseniChyb, #jakazakladnimapa, #tlacitkoMereni, #tlacitkoSwipe, #basemapInfoLabelDiv").addClass("hidden");
          } else if (app.mapView.spatialReference.wkid == 102067 && app.activeView.type == "2d") {
            query("#tlacitkoVyjadreniDBP, #tlacitkoHlaseniChyb, #jakazakladnimapa, #tlacitkoMereni, #tlacitkoSwipe, #basemapInfoLabelDiv").removeClass("hidden");
          }
          if (app.mapView.constraints.snapToZoom == false) app.mapView.constraints.snapToZoom = true;
          let scales = document.getElementById("vlastniMeritko");
          let sourcescale;
          app.mapView.spatialReference.wkid == 102067 ? sourcescale = app.noveTileInfoJTSK : sourcescale = app.noveTileInfoMERC
          if (scales.options.length > 0) {
            scales.options.length = 0;
            let opt = document.createElement('option');
            opt.value = "own";
            opt.innerHTML = label[147];
            scales.appendChild(opt);
            for (let i = 0; i < sourcescale.scales.length; i++) {
              let opt = document.createElement('option');
              opt.value = sourcescale.scales[i];
              let scale = sourcescale.scales[i].toLocaleString('en', {
                maximumFractionDigits: 0
              }).replace(/,/g, " ");
              opt.innerHTML = "1 : " + scale;
              scales.appendChild(opt);
            }
            if (document.getElementById("vlastniMeritko").value == "own") {
              scales.value = "own";
            } else {
              query("#vlastniMeritkoInput, #label_223").addClass("hidden");
              scales.value = app.mapView.scale;
            }
          }
          if (document.getElementById('label_43').classList.value.indexOf('rotate') > 0) app.nastavMeritko();
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
          } else if (mapss == 3857 || ncs.wkid == 102100) {
            textss = "3857 (WGS 84, Pseudo-Mercator)";
          }
          document.getElementById("aktualniSS").innerHTML = textss;
          document.getElementById("label_212").innerHTML = label[47] + textss;
          app.mapView.constraints.lods = sourcescale.lods;
          app.map = new Map({
            basemap: { baseLayers: nb }
          });
          app.mapView.map = app.map;
          app.sceneView.map = app.map;
          vrstvy.forEach(l => {
            if (l.id) {
              if (l.id.indexOf("userOgcLayer") > -1) {
                if (l.type == "wms") {
                  for (var j = 0; j < l.spatialReferences.length; j++) {
                    if (ncs.wkid == l.spatialReferences[j]) l.spatialReference = new SpatialReference({ wkid: ncs.wkid });
                    if (ncs.wkid == 102100 && (l.spatialReferences[j] == 102100 || l.spatialReferences[j] == 3857)) l.spatialReference = new SpatialReference({ wkid: 102100, latestWkid: 3857 });
                    if (ncs.wkid == 102067 && (l.spatialReferences[j] == 5514 || l.spatialReferences[j] == 102067)) l.spatialReference = new SpatialReference({ wkid: 102067, latestWkid: 5514 });
                  }
                }
                if (l.type == "wmts") {
                  let matrixSet = l.activeLayer.tileMatrixSets.find(mm => {
                    let validMS = false;
                    if (mm.tileInfo.spatialReference.wkid == ncs.wkid) validMS = true;
                    if (ncs.wkid == 102067 && mm.tileInfo.spatialReference.wkid == 5514) validMS = true;
                    if (ncs.wkid == 102100 && mm.tileInfo.spatialReference.wkid == 3857) validMS = true;
                    return validMS;
                  });
                  matrixSet ? l.activeLayer.tileMatrixSetId = matrixSet.id : matrixSet = l.activeLayer.tileMatrixSets.getItemAt(0)
                }
              }
            }
          });
          reactiveUtils.whenOnce(() => app.mapView.ready == true).then(() => {
            app.map.layers.addMany(vrstvy);
            app.homebuttonWidget.viewModel.viewpoint = new Viewpoint({
              targetGeometry: nb[0]?.fullExtent
            });
            if (scale) {
              document.getElementById("vlastniMeritko").value = "own";
              app.pouzitMeritko(true, scale);
            } else {
              document.getElementById("vlastniMeritko").value = app.mapView.scale;
            }
            resolve({ status: "OK" });
          });
          app.layersMaphandle = app.mapView.map.layers.on("after-add", app.movegraphicsontop);
        })
      });
      return odpovedPromise
    }

    query("#volbaSS").on("change", s => {
      app.widgetChangeSS.nastavSS(s.target.value);
    });
  });