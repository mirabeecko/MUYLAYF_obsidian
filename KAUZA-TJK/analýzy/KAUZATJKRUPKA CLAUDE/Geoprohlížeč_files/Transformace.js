require([
    'esri/rest/geoprocessor', "esri/rest/support/DataFile", "esri/request", 'dojo/query'], (geoprocessor, DataFile, esriRequest, query) => {
        const selects = ["transformaceVstupniSS", "transformaceVystupniSS", "transformaceVstupniSSTxt", "transformaceVystupniSSTxt"]
        const sValues = [
            ["ETRS89 (BLh/DEG)", "B", "L", "h"], 
            ["ETRS89 (BLh/DMS)", "B", "L", "h"], 
            ["ETRS89 (XYZ/geocentric)", "X", "Y", "Z"], 
            ["S-JTSK + Bpv (YXH)", "Y", "X", "H"], 
            ["S-JTSK/05 + Bpv (YXH)", "Y", "X", "H"], 
            ["ETRS89-LAEA + EVRS (YXH)", "Y", "X", "H"], 
            ["ETRS89-LCC + EVRS (NEH)", "N", "E", "H"], 
            ["ETRS89-TM33 + EVRS (NEH)", "N", "E", "H"], 
            ["ETRS89-TM34 + EVRS (NEH)", "N", "E", "H"], 
            ["ETRS89-TM33 + GRS80 (NEh)", "N", "E", "h"], 
            ["ETRS89-TM34 + GRS80 (NEh)", "N", "E", "h"], 
            ["WGS84 (BLh/DEG)", "B", "L", "h"], 
            ["WGS84 (BLh/DMS)", "B", "L", "h"], 
            ["WGS84 (XYZ/geocentric)", "X", "Y", "Z"], 
            ["WGS84/UTM33 (ENh)", "E", "N", "h"], 
            ["WGS84/UTM34 (ENh)", "E", "N", "h"],
            ["WGS84/Pseudo-Mercator (XYh)"],
            ["WGS84/LCC (ENh)", "E", "N", "h"],
            ["WGS84/EGM2008 (BLH/DEG)", "B", "L", "h"],
            ["WGS84/EGM2008 (BLH/DMS)", "B", "L", "h"],
            ["WGS84/EGM96 (BLH/DEG)", "B", "L", "h"],
            ["WGS84/EGM96 (BLH/DMS)", "B", "L", "h"]];
        selects.forEach(e => {
            sValues.forEach(t => {
                let o = document.createElement("option");
                o.setAttribute("value", t[0]);
                o.innerHTML = t[0].replace("WGS", "WGS ");
                document.getElementById(e).appendChild(o);
            });   
            document.getElementById(e).disabled = false;
        });

        app.transformace = {};
        app.transformace.help = () => {
            let url = "https://ags.cuzk.gov.cz/transformace/?object=";
            document.getElementById("transformaceSouradniceToggleActive").classList.length > 0 ? url += '3' : url += '2';
            if (localStorage.theme == "dark") url += '#dark';
            window.open(url);
        };

        app.transformace.zmenaSS = (typ) => {
            let inputCRS = document.getElementById('transformaceVstupniSS').value;
            let outputCRS = document.getElementById('transformaceVystupniSS').value;
            let tit1 = document.getElementById('transformaceNadpis1');
            let tit2 = document.getElementById('transformaceNadpis2');
            let tit3 = document.getElementById('transformaceNadpis3');
            sValues.forEach(t => {
                if (t[0] == inputCRS) {
                    titL1 = t[1] + ":";
                    titL2 = t[2] + ":";
                    titL3 = t[3] + ":";
                }
            });
            if (typ == 1) {
                tit1.innerHTML = label[89] + ' ' + titL1;
                tit2.innerHTML = label[89] + ' ' + titL2;
                tit3.innerHTML = label[89] + ' ' + titL3;
                if (inputCRS.indexOf('WGS') > -1 || outputCRS.indexOf('WGS') > -1) {
                    query('#transformaceEpochaDiv').removeClass('hidden');
                } else {
                    query('#transformaceEpochaDiv').addClass('hidden');
                    document.getElementById('transformaceEpocha').value = null;
                }
            } else if (typ == 2) {
                if (outputCRS.indexOf('WGS') > -1 || inputCRS.indexOf('WGS') > -1) {
                    query('#transformaceEpochaDiv').removeClass('hidden');
                } else {
                    query('#transformaceEpochaDiv').addClass('hidden');
                    document.getElementById('transformaceEpocha').value = null;
                }
            } else if (typ == 3) {
                if (document.getElementById('transformaceVstupniSSTxt').value.indexOf('WGS') > -1 || document.getElementById('transformaceVystupniSSTxt').value.indexOf('WGS') > -1) {
                    query('#transformaceSouborEpochaDiv').removeClass('hidden');
                } else {
                    query('#transformaceSouborEpochaDiv').addClass('hidden');
                    document.getElementById('transformaceSouborEpocha').value = null;
                }
            }
        }
        app.transformace.zmenaSS(1);

        app.transformace.prevodSouradnic = () => {
            if (!document.getElementById('transformaceSouradnice1').value || !document.getElementById('transformaceSouradnice2').value) {
                alert(label[596]);
                return;
            }
            query('#label_168').removeClass('hidden');
            document.getElementById('label_170').innerHTML = label[511];
            document.getElementById('label_170').disabled = true;
            query('#transformaceVysledek1, #transformaceVysledek2, #transformaceVysledek3').forEach((prvky) => {
                prvky.innerHTML = label[549];
            });

            let params = {
                "InputCoordinate1": document.getElementById('transformaceSouradnice1').value,
                "InputCoordinate2": document.getElementById('transformaceSouradnice2').value,
                "InputCoordinate3": document.getElementById('transformaceSouradnice3').value,
                "InputCRS": document.getElementById('transformaceVstupniSS').value,
                "OutputCRS": document.getElementById('transformaceVystupniSS').value
            }

            if (document.getElementById('transformaceEpocha').value) {
                let epocha = {};
                let subclass = document.getElementById('transformaceEpocha').value.split("-");
                epocha["Epocha"] = Number(subclass[2]) + "." + Number(subclass[1]) + "." + Number(subclass[0]);
                params = Object.assign(params, epocha);
            }

            geoprocessor.submitJob("https://ags.cuzk.gov.cz/arcgis2/rest/services/Transformacni/TransformaceSouradnic/GPServer/TransformaceSouradnic", params).then((jobInfo) =>{
                let options = {
                    interval: 1000,
                    statusCallback: (j) => {
                        console.log("Job Status: ", j.jobStatus);
                    }
                };

                jobInfo.waitForJobCompletion(options).then((results) => {
                    if (results.jobStatus == "job-succeeded") {
                        let part = 0;
                        let transOutCRS = document.getElementById('transformaceVystupniSS').value;
                        let fullPart = () => {
                            document.getElementById('label_170').disabled = false;
                            document.getElementById('label_170').innerHTML = label[512];
                            document.getElementById('label_170').scrollIntoView();
                        }
                        jobInfo.fetchResultData("OutputCoordinate1").then(r => {
                            let res1 = document.getElementById('transformaceVysledek1');
                            let c = '';
                            let m = '';                            
                            sValues.forEach(t => {
                                if (t[0] == transOutCRS) {
                                    c = t[1] + ":";
                                    if (transOutCRS.includes("/DEG")) {
                                        m = "°";
                                    } else if (transOutCRS.includes("/DMS")) {
                                        let refRes = r.value.split(" ");
                                        r.value =  + refRes[0] + "° " + refRes[1] + "' " + refRes[2] + "''";
                                    }
                                }
                            });
                            res1.innerHTML = label[89] + ' ' + c + ' ' + r.value;
                            if (m) res1.innerHTML += m;
                            part++;
                            if (part == 3) fullPart();
                        }, (err) => {
                            console.log(err);
                        });
                        jobInfo.fetchResultData("OutputCoordinate2").then(r => {
                            let res2 = document.getElementById('transformaceVysledek2');
                            let c = '';
                            let m = '';
                            sValues.forEach(t => {
                                if (t[0] == transOutCRS) {
                                    c = t[2] + ":";
                                    if (transOutCRS.includes("/DEG")) {
                                        m = "°";
                                    } else if (transOutCRS.includes("/DMS")) {
                                        let refRes = r.value.split(" ");
                                        r.value =  + refRes[0] + "° " + refRes[1] + "' " + refRes[2] + "''";
                                    }
                                }
                            });
                            res2.innerHTML = label[89] + ' ' + c + ' ' + r.value;
                            if (m) res2.innerHTML += m;
                            part++;
                            if (part == 3) fullPart();
                        }, (err) => {
                            console.log(err);
                        });
                        jobInfo.fetchResultData("OutputCoordinate3").then(r => {
                            let res3 = document.getElementById('transformaceVysledek3');
                            let c = '';
                            sValues.forEach(t => {
                                if (t[0] == transOutCRS) c = t[3] + ":";
                            });
                            res3.innerHTML = label[89] + ' ' + c + ' ' + r.value;
                            part++;
                            if (part == 3) fullPart();
                        }, (err) => {
                            app.transformace.jobFailed(err, "inputs");
                        });
                    } else if (results.jobStatus == "job-failed") {
                        app.transformace.jobFailed(results), "inputs";
                    }
                }).catch((err) => {
                    app.transformace.jobFailed(err, "inputs");
                });
            });
        }

        app.transformace.prevodSouboru = () => {
            if (document.getElementById('transformaceSoubor').files.length == 0) {
                alert(label[584]);
                return;
            } else {
                if (document.getElementById('transformaceSoubor').files[0].type != 'text/plain') {
                    alert(label[585]);
                    return;
                }
            }
            document.getElementById('label_221').innerHTML = label[511];
            document.getElementById('label_221').disabled = true;
            document.getElementById("transformaceVysledekTxtUrl").classList.add('hidden');

            let formData = new FormData(document.getElementById('transformaceSouborForm'));
            formData.append("f", "pjson");

            esriRequest('https://ags.cuzk.gov.cz/arcgis2/rest/services/Transformacni/TransformaceSouradnic/GPServer/uploads/upload', {
                method: "post",
                body: formData,
                responseType: 'json'
            }).then((response) => {
                let dataFile = new DataFile();
                dataFile.itemId = response.data.item.itemID;

                let params = {
                    "InputCRS": document.getElementById('transformaceVstupniSSTxt').value,
                    "OutputCRS": document.getElementById('transformaceVystupniSSTxt').value,
                    "InputTXTfile": dataFile
                };

                if (document.getElementById('transformaceSouborEpocha').value) {
                    let epocha = {};
                    let subclass = document.getElementById('transformaceSouborEpocha').value.split("-");
                    epocha["Epocha"] = Number(subclass[2]) + "." + Number(subclass[1]) + "." + Number(subclass[0]);
                    params = Object.assign(params, epocha);
                }

                geoprocessor.submitJob("https://ags.cuzk.gov.cz/arcgis2/rest/services/Transformacni/TransformaceSouradnic/GPServer/TransformaceSouradnic", params).then((jobInfo) =>{
                    let options = {
                        interval: 1000,
                        statusCallback: (j) => {
                            console.log("Job Status: ", j.jobStatus);
                        }
                    };

                    jobInfo.waitForJobCompletion(options).then((results) => {
                        document.getElementById('transformaceSoubor').value = null;
                        let chyba = "žádná";
                        for (let j = 0; j < results.messages.length; j++) {
                            let desc = results.messages[j].description;
                            if (desc.search('Nejsou zadány vstupní souřadnice nebo textový soubor se souřadnicemi pro transformaci') >= 0) chyba = desc;
                            if (desc.search('Vstupní a výstupní CRS pro transformaci nesmí být stejné') >= 0) chyba = desc;
                            if (desc.search("Vstupní a výstupní CRS pro transformaci musí být zadány") >= 0) chyba = desc;
                            if (desc.search("Nepovolená kombinace vstupního a výstupního CRS") >= 0) chyba = desc;
                            if (desc.search("Zadané vstupní souřadnice jsou mimo povolený rozsah pro vstupní CRS") >= 0) chyba = desc;
                            if (desc.search("Vstupní hodnota epochy není ve formátu datum") >= 0) chyba = desc;
                            if (desc.search("Zadané vstupní souřadnice musí být ve formátu odpovídajícím vstupnímu CRS") >= 0) chyba = desc;
                            if (desc.search("Záporné souřadnice X a Y nejsou podporovány pro vstupní CRS") >= 0) chyba = desc;
                            if (desc.search("Kombinace záporných a kladných souřadnice X a Y nejsou podporovány pro vstupní CRS") >= 0) chyba = desc;
                            if (desc.search("Řádka neobsahuje souřadnice ve správném formátu pro vstupní CRS") >= 0) chyba = desc;
                            if (desc.search('Transformace souboru proběhla úspěšně') >= 0) chyba = desc;
                            if (desc.search("Transformace souboru proběhla s chybami") >= 0) chyba = desc;
                        }

                        if (results.jobStatus == "job-succeeded") {
                            jobInfo.fetchResultData("URLResultTXT").then((result) => {
                                document.getElementById('label_221').innerHTML = label[512];
                                document.getElementById('label_221').disabled = false;
                                if (result.value) {
                                    fetch(result.value, {
                                        method: 'GET',
                                    }).then((resp) => {
                                        return resp.blob();
                                    }).then((blob) => {
                                        var newBlob = new Blob([blob], {
                                            type: "text/html"
                                        });
                                        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                                            window.navigator.msSaveOrOpenBlob(newBlob, "vysledekTransformace.txt");
                                            return;
                                        }
                                        var data = window.URL.createObjectURL(newBlob);
                                        var link = document.createElement('a');
                                        link.href = data;
                                        link.download = "vysledekTransformace.txt";
                                        link.click();
                                        setTimeout(() => {
                                            window.URL.revokeObjectURL(data), 60
                                        });
                                        document.getElementById("transformaceVysledekTxtUrl").setAttribute("onclick", "window.open('" + result.value + "')");
                                        document.getElementById("transformaceVysledekTxtUrl").classList.remove('hidden');
                                    });
                                } else if (chyba != "žádná") {
                                    alert(chyba);
                                }
                            }, (error) => {
                                console.log(error);
                            });
                        } else if (results.jobStatus == "job-failed") {
                            app.transformace.jobFailed(results);
                        }
                    }).catch((err) => {
                        app.transformace.jobFailed(err);
                    });
                });
                if (response.error) {
                    app.transformace.jobFailed(response.error);
                    return;
                }
            }, (error) => {
                app.transformace.jobFailed(error);
            });
        }

        app.transformace.jobFailed = (err, type) => {
            if (type == "inputs") {
                query('#label_168').addClass('hidden');
                document.getElementById('label_170').innerHTML = label[512];
                document.getElementById('label_170').disabled = false;
                query('#transformaceVysledek1, #transformaceVysledek2, #transformaceVysledek3').forEach(r => {
                    r.innerHTML = '';
                });
            } else if (type == "file") {
                document.getElementById('label_221').innerHTML = label[512];
                document.getElementById('label_221').disabled = false;
            }
            if (err.messages) {
                for (var j = 0; j < err.messages.length; j++) {
                    let desc = err.messages[j].description;
                    console.log(desc);
                    if (desc.search("Vstupní souřadnice nejsou ve správném formátu pro vstupní CRS") >= 0) alert(desc);
                    if (desc.search('Nejsou zadány vstupní souřadnice nebo textový soubor se souřadnicemi pro transformaci') >= 0) alert(desc);
                    if (desc.search('Vstupní a výstupní CRS pro transformaci nesmí být stejné') >= 0) alert(desc);
                    if (desc.search("Vstupní a výstupní CRS pro transformaci musí být zadány") >= 0) alert(desc);
                    if (desc.search("Nepovolená kombinace vstupního a výstupního CRS") >= 0) alert(desc);
                    if (desc.search("Zadané vstupní souřadnice jsou mimo povolený rozsah pro vstupní CRS") >= 0) alert(desc);
                    if (desc.search("Vstupní hodnota epochy není ve formátu datum") >= 0) alert(desc);
                    if (desc.search("Zadané vstupní souřadnice musí být ve formátu odpovídajícím vstupnímu CRS") >= 0) alert(desc);
                    if (desc.search("Záporné souřadnice X a Y nejsou podporovány pro vstupní CRS") >= 0) alert(desc);
                    if (desc.search("Kombinace záporných a kladných souřadnice X a Y nejsou podporovány pro vstupní CRS") >= 0) alert(desc);
                    if (desc.search("Řádka neobsahuje souřadnice ve správném formátu pro vstupní CRS") >= 0) alert(desc);
                }
            } else {
                alert(label[383]);
            }
        }
    });