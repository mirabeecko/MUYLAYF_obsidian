document.getElementById("tiskSirka").value = app.mapView.size[0];
document.getElementById("tiskVyska").value = app.mapView.size[1] - 50;
document.getElementById("tiskFormat").value = "PDF";
document.getElementById("tiskFormat").onchange = (event) => {
    require(['dojo/query'], (query) => {
            if (event.target.value == "PDF") {
                document.getElementById("label_208").disabled = false;
                document.getElementById("label_211").innerHTML = label[552];
                query("#tiskDpi, #tiskDpiNadpis").removeClass("hidden");
                if (document.getElementById("label_208").checked == true) {
                    query("#label_61, #tiskSirka, #label_62, #tiskVyska").removeClass("hidden");
                    query("#tiskLayoutTemplateNadpis, #tiskLayoutTemplate,  #tiskNazevMapy, #tiskAutor").addClass("hidden");
                }
            } else {
                document.getElementById("label_211").innerHTML = label[551];
                if (document.getElementById("label_209").checked == true) {
                    query("#label_61, #tiskSirka, #label_62, #tiskVyska").removeClass("hidden");
                    query("#tiskDpi, #tiskDpiNadpis, #tiskLayoutTemplateNadpis, #tiskLayoutTemplate, #tiskNazevMapy, #tiskAutor").addClass("hidden");
                } else {
                    if (document.getElementById("label_208").checked == false) {
                        query("#label_61, #tiskSirka, #label_62, #tiskVyska").addClass("hidden");
                        query("#tiskDpi, #tiskDpiNadpis, #tiskLayoutTemplateNadpis, #tiskLayoutTemplate, #tiskNazevMapy, #tiskAutor").removeClass("hidden");
                    } else {
                        query("#tiskDpi, #tiskDpiNadpis").addClass("hidden");
                    }
                }
            }
        });
};

document.getElementById("label_208").onchange = (event) => {
    require(['dojo/query'], (query) => {
            if (event.target.checked == true) {
                query("#tiskLayoutTemplateNadpis, #tiskLayoutTemplate, #tiskNazevMapy, #tiskAutor, #tiskAutor").addClass("hidden");
                query("#label_61, #tiskSirka, #label_62, #tiskVyska").removeClass("hidden");
            } else {
                if (document.getElementById("label_209").checked == false) {
                    query("#tiskDpi, #tiskDpiNadpis, #tiskLayoutTemplateNadpis, #tiskLayoutTemplate, #tiskNazevMapy, #tiskAutor").removeClass("hidden");
                    query("#label_61, #tiskSirka, #label_62, #tiskVyska").addClass("hidden");
                }
            }
        });
};

document.getElementById("label_209").onchange = (event) => {
    require(['dojo/query'], (query) => {
            if (event.target.checked == true) {
                if (document.getElementById("tiskFormat").value != "PDF") {
                    query("#tiskDpi, #tiskDpiNadpis").addClass("hidden");
                }
                document.getElementById("label_208").checked = true;
                document.getElementById("label_208").disabled = true;
                query("#tiskLayoutTemplateNadpis, #tiskLayoutTemplate, #tiskNazevMapy, #tiskAutor").addClass("hidden");
                query("#label_61, #tiskSirka, #label_62, #tiskVyska, #label_212").removeClass("hidden");
            } else {
                document.getElementById("label_208").disabled = false;
                if (document.getElementById("label_208").checked == false) {
                    query("#tiskDpi, #tiskDpiNadpis, #tiskLayoutTemplateNadpis, #tiskLayoutTemplate, #tiskNazevMapy, #tiskAutor").removeClass("hidden");
                    query("#label_61, #tiskSirka, #label_62, #tiskVyska, #label_212").addClass("hidden");
                }
            }
        });
};

app.tisk = {};
require(["esri/widgets/Slider"], (Slider) => {
    app.tisk.slider = new Slider({
        container: "tiskDpi",
        id: "tiskDpiSlider",
        min: 1,
        max: 300,
        values: [96],
        steps: 1,
        visibleElements: {
            rangeLabels: true,
            labels: true
        },
        labelInputsEnabled: true,
        labelFormatFunction: (value, type) => {
            if (value == 50) {
                value = "50";
            } else if (value == 100) {
                value = "100";
            } else if (value == 150) {
                value = "150";                                    
            } else if (value == 200) {
                value = "200";                                    
            } else if (value == 250) {
                value = "250";                                    
            }
            return (type === "value") ? value : value;
        },
        tickConfigs: [{
            mode: "position",
            values: [50, 100, 150, 200, 250],
            labelsVisible: true
        }]
    });
});

app.tisk.activeDraw = false;
app.tisk.clearDraw = (e) => {
    if (eval(e) == true) {
        let t = app.activeView.map.findLayerById("tiskDraw");
        if (t) app.activeView.map.remove(t)
    } else {
        let pole = app.activeView.map.findLayerById("tiskDraw").graphics.toArray();
        for (let i = pole.length - 1; i >= 0; i--) {
            if (pole[i].mujtyp == "tiskDraw") app.activeView.map.findLayerById("tiskDraw").graphics.remove(pole[i]);
        }
    }
    if (app.tisk.activeDraw) app.draw.reset();
    app.tisk.activeDraw = false;
    app.activeView.cursor = "default";
    document.getElementById("tiskDraw").innerHTML = "<span class='esri-icon-polygon fLeft'></span>" + label[133];
    document.getElementById("tiskDrawEnd").classList.add("hidden");
}
app.tisk.draw = () => {
    if (app.tisk.activeDraw == true) {
        app.tisk.clearDraw(false)
        return
    }
    app.tisk.activeDraw = true;
    document.getElementById("tiskDraw").innerHTML = "<span class='esri-icon-close fLeft'></span>" + label[135];
    require(["esri/layers/GraphicsLayer", "esri/Graphic",], (GraphicsLayer, Graphic) => {
        var layer = app.activeView.map.findLayerById("tiskDraw");
        if (!layer) {
            let tiskDraw = new GraphicsLayer({
                title: "tiskDraw",
                listMode: "hide",
                id: "tiskDraw"
            });
            app.activeView.map.layers.add(tiskDraw);
        }
        app.enabledPopup = false;
        function kresleniPolygonEdit(vertices) {
            if (vertices.length > 1) {
                let pole = app.activeView.map.findLayerById("tiskDraw").graphics.toArray();
                for (let i = pole.length - 1; i >= 0; i--) {
                    if (pole[i].mujtyp == "tiskDraw") app.activeView.map.findLayerById("tiskDraw").graphics.remove(pole[i]);
                }
                let graphic = new Graphic({
                    geometry: {
                        type: "polygon",
                        rings: vertices,
                        spatialReference: app.mapView.spatialReference.clone()
                    },
                    symbol: {
                        type: "simple-line",
                        color: [4, 90, 141],
                        width: 3
                    }
                });
                graphic.mujtyp = "tiskDraw";
                app.activeView.map.findLayerById("tiskDraw").graphics.add(graphic);
            }
        };
        function kresleniPolygonComplete(vertices) {
            let pole = app.activeView.map.findLayerById("tiskDraw").graphics.toArray();
            for (let i = pole.length - 1; i >= 0; i--) {
                if (pole[i].mujtyp == "tiskDraw") app.activeView.map.findLayerById("tiskDraw").graphics.remove(pole[i]);
            }
            let prvniVertex = {};
            prvniVertex[0] = vertices[0];
            let noveVertices = vertices.concat([prvniVertex[0]]);
            let graphic = new Graphic({
                geometry: {
                    type: "polygon",
                    rings: noveVertices,
                    spatialReference: app.mapView.spatialReference.clone()
                },
                symbol: {
                    type: "simple-fill",
                    color: [4, 90, 141],
                    style: "none",
                    outline: {
                        color: [255, 0, 0],
                        width: 2
                    }
                }
            });
            graphic.mujtyp = "tiskDrawEnded";
            app.activeView.map.findLayerById("tiskDraw").graphics.add(graphic);
            app.enabledPopup = true;
        }
        app.activeView.cursor = "crosshair";
        let action = app.draw.create("polygon", { mode: "click" });
        action.on("vertex-add", (evt) => {
            kresleniPolygonEdit(evt.vertices);
        });
        action.on("cursor-update", (evt) => {
            kresleniPolygonEdit(evt.vertices);
        });
        action.on("draw-complete", (evt) => {
            app.activeView.cursor = "default";
            app.draw.reset();
            kresleniPolygonComplete(evt.vertices);
            document.getElementById("tiskDraw").innerHTML = "<span class='esri-icon-polygon fLeft'></span>" + label[133];
            document.getElementById("tiskDrawEnd").classList.remove("hidden");
            app.tisk.activeDraw = false;
        });
    })
};

app.tisk.spustit = () => {
    if (app.mapView.rotation != 0) {
        app.mapView.rotation = 0;
    }
    require(["esri/rest/print", "esri/rest/support/PrintTemplate", "esri/rest/support/PrintParameters"], (print, PrintTemplate, PrintParameters) => {
        function runAfterToken() {
            var printTask = appConfig.domain + "/arcgis/rest/services/Tiskove/AdvancedHighQualityPrinting/GPServer/AdvancedHighQualityPrinting";
            var template = new PrintTemplate({
                format: document.getElementById("tiskFormat").value.toLowerCase(),
                layout: document.getElementById("tiskLayoutTemplate").value + " " + app.activeView.spatialReference.wkid,
                layoutOptions: {
                    titleText: document.getElementById("tiskNazevMapy").value,
                    copyrightText: document.getElementById("tiskAutor").value
                }
            });

            var params = new PrintParameters({
                view: app.mapView,
                template: template,
                extraParameters: {
                    Georef_info: document.getElementById("label_209").checked,
                    Resolution: app.tisk.slider.values[0],
                    Df_export_width: document.getElementById("tiskSirka").value,
                    Df_export_height: document.getElementById("tiskVyska").value,
                    Map_Only: document.getElementById("label_208").checked
                }
            });

            print.execute(printTask, params).then(app.tisk.printResultPage).catch(app.tisk.jobFailedPage);
        }
        document.getElementById("label_207").innerHTML = label[549];
        document.getElementById("label_207").disabled = true;
        app.prover_tokenR().then(() => {
            runAfterToken();
        }, (err) => {
            console.log(err);
            document.getElementById("label_207").innerHTML = label[550];
            document.getElementById("label_207").disabled = false;
            alert(label[383]);
        });
    });
};

app.tisk.printResultPage = (result) => {
    document.getElementById("label_207").innerHTML = label[550];
    document.getElementById("label_207").disabled = false;
    var url = result.url.replace("http:", "https:");
    if (url.indexOf(".zip") > -1) {
        fetch(url, {
            method: 'GET',
        }).then((resp) => {
            return resp.blob();
        }).then((blob) => {
            var newBlob = new Blob([blob], {
                type: "application/zip"
            });
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(newBlob, "vysledekTisku.zip");
                return;
            }
            var data = window.URL.createObjectURL(newBlob);
            var link = document.createElement('a');
            link.href = data;
            link.download = "vysledekTisku.zip";
            link.click();
            setTimeout(() => {
                window.URL.revokeObjectURL(data), 60
            });
        });
    } else {
        window.open(url);
    }
};

app.tisk.jobFailedPage = (err) => {
    document.getElementById("label_207").innerHTML = label[550];
    document.getElementById("label_207").disabled = false;
    alert(err);
};

app.tisk.screenShot = () => {
    app.mapView.takeScreenshot().then((screenshot) => {
        document.getElementById("tiskScreenExtent").innerHTML = "";
        if (app.mapView.rotation == 0 && app.mapView.spatialReference.wkid == 102067) {
            var dataUrl = vytvorObrazek(screenshot);
            function vytvorObrazek(screenshot)  {
                const imageData = screenshot.data;
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");
                canvas.height = imageData.height;
                canvas.width = imageData.width;
                context.putImageData(imageData, 0, 0);
                context.font = "14px Arial";
                context.fillStyle = "#000";
                context.fillRect(0, 0, context.measureText(Number(app.mapView.extent.xmin).toFixed(0) * -1 + "; " + Number(app.mapView.extent.ymin).toFixed(0) * -1).width + 6, 20);
                context.fillRect(imageData.width - context.measureText(Number(app.mapView.extent.xmax).toFixed(0) * -1 + "; " + Number(app.mapView.extent.ymax).toFixed(0) * -1).width - 6, 0, context.measureText(Number(app.mapView.extent.xmax).toFixed(0) * -1 + "; " + Number(app.mapView.extent.ymax).toFixed(0) * -1).width + 6, 20);
                context.fillRect(imageData.width - context.measureText(Number(app.mapView.extent.xmin).toFixed(0) * -1 + "; " + Number(app.mapView.extent.ymin).toFixed(0) * -1).width - 6, imageData.height - 20, context.measureText(Number(app.mapView.extent.xmin).toFixed(0) * -1 + "; " + Number(app.mapView.extent.ymin).toFixed(0) * -1).width + 6, 20);
                context.fillRect(0, imageData.height - 20, context.measureText(Number(app.mapView.extent.xmin).toFixed(0) * -1 + "; " + Number(app.mapView.extent.ymin).toFixed(0) * -1).width + 6, 20);
                context.fillStyle = "#fff";
                context.fillText(Number(app.mapView.extent.xmin).toFixed(0) * -1 + "; " + Number(app.mapView.extent.ymax).toFixed(0) * -1, 3, 15);
                context.fillText(Number(app.mapView.extent.xmax).toFixed(0) * -1 + "; " + Number(app.mapView.extent.ymax).toFixed(0) * -1, imageData.width - context.measureText(Number(app.mapView.extent.xmax).toFixed(0) * -1 + "; " + Number(app.mapView.extent.ymax).toFixed(0) * -1).width - 3, 15);
                context.fillText(Number(app.mapView.extent.xmax).toFixed(0) * -1 + "; " + Number(app.mapView.extent.ymin).toFixed(0) * -1, imageData.width - context.measureText(Number(app.mapView.extent.xmax).toFixed(0) * -1 + "; " + Number(app.mapView.extent.ymin).toFixed(0) * -1).width - 3, imageData.height - 5);
                context.fillText(Number(app.mapView.extent.xmin).toFixed(0) * -1 + "; " + Number(app.mapView.extent.ymin).toFixed(0) * -1, 3, imageData.height - 5);
                return canvas.toDataURL();
            }
        } else {
            var dataUrl = screenshot.dataUrl;
        }
        if (!window.navigator.msSaveOrOpenBlob) {
            var element = document.createElement("a");
            element.setAttribute("href", dataUrl);
            element.setAttribute("download", "zachycení");
            element.style.display = "none";
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        } else {
            var byteString = atob(dataUrl.split(",")[1]);
            var mimeString = dataUrl
                .split(",")[0]
                .split(":")[1]
                .split(";")[0];
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            var blob = new Blob([ab], { type: mimeString });
            window.navigator.msSaveOrOpenBlob(blob, "zachycení");
        }
        if (app.mapView.rotation == 0 && app.mapView.spatialReference.wkid == 102067) {
            document.getElementById("tiskScreenExtent").innerHTML = "<br><b>" + label[649] + " (Y; X):</b><br>";
            document.getElementById("tiskScreenExtent").innerHTML += "<b>" + label[650] + ":</b> " + Number(app.mapView.extent.xmin).toFixed(0) * -1 + "; " + Number(app.mapView.extent.ymax).toFixed(0) * -1 + "<br>";
            document.getElementById("tiskScreenExtent").innerHTML += "<b>" + label[651] + ":</b> " + Number(app.mapView.extent.xmax).toFixed(0) * -1 + "; " + Number(app.mapView.extent.ymax).toFixed(0) * -1 + "<br>";
            document.getElementById("tiskScreenExtent").innerHTML += "<b>" + label[652] + ":</b> " + Number(app.mapView.extent.xmax).toFixed(0) * -1 + "; " + Number(app.mapView.extent.ymin).toFixed(0) * -1 + "<br>";
            document.getElementById("tiskScreenExtent").innerHTML += "<b>" + label[653] + ":</b> " + Number(app.mapView.extent.xmin).toFixed(0) * -1 + "; " + Number(app.mapView.extent.ymin).toFixed(0) * -1;
        }
    });
}