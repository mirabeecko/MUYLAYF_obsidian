let checkBrowser = () => {
    let appversion = 2.16;
    let validVersion = {
        Edge: ["Edg", 127, "Microsoft Edge"],
        Firefox: ["Firefox", 130, "Mozilla Firefox"],
        Safari: ["Safari", 17, "Safari"],
        iOS: ["Version", 17, "iOS"],
        Chrome: ["Chrome", 127, "Google Chrome"]
    }
    let results = {
        is64bit: false,
        webGL2: false,
        browser: {
            Edge: false,
            Firefox: false,
            Safari: false,
            iOS: false,
            Chrome: false,
            Unknown: false
        },
        updated: false,
        currentUA: undefined,
        valid: false
    }
    
    let is64BitBrowser = navigator.userAgent.includes('WOW64') || navigator.userAgent.includes('Win64');
    if (is64BitBrowser) results.is64bit = true;
    if (window.innerWidth < 768) results.is64bit = true;

    let canvas = document.createElement('canvas');
    let gl = canvas.getContext('webgl2');
    if (gl) results.webGL2 = true;

    let getBrowserName = () => {
        let uA = navigator.userAgent;
        if (uA.includes("Edg")) {
            return "Edge";
        } else if (uA.includes("Firefox")) {
            return "Firefox";
        } else if (uA.includes("Safari") && !uA.includes("Chrome")) {
            return "Safari";
        } else if (uA.includes("Chrome")) {
            return "Chrome";
        } else if ((uA.includes("iPhone") || uA.includes("iPad")) && uA.includes("Safari")) {
            return "iOS";
        } else {
            return "Unknown";
        }
    }

    let browserName = getBrowserName();
    results.browser[browserName] = true;
    if (results.browser["Unknown"] == false) {
        for (let key in results.browser) {
            if (results.browser[key] === true) results.currentUA = key;
        }
    }

    if (results.currentUA) {
        let checkBrowserVersion = (browserName, minVersion) => {
            let userAgent = navigator.userAgent;
            let regex = new RegExp(browserName + "/(\\d+)", "i");
            let match = userAgent.replace("EdgA/", "Edg/").match(regex);
        
            if (match && match[1]) {
                let browserVersion = parseInt(match[1]);
                if (browserVersion >= minVersion) {
                    return true;
                }
            }
            return false;
        }
        let param = validVersion[results.currentUA]
        results.updated = checkBrowserVersion(param[0], param[1])
    }

    if (results.is64bit && results.webGL2 && results.updated && results.browser["Unknown"] == false) results.valid = true

    if (results.valid == false) {       
        d = {};
        d[0] = { cs: "Technické požadavky", en: "Technical requirements" };

        let l = "cs";
        if (window.location.hash == "#en") l = "en";

        label = {};
        if (l) {
            for (x in d) {
                l == "cs" ? label[x] = d[x].cs : label[x] = d[x].en
            };
        }
        let t = document.getElementById('validB');
        if (t) {
            t.innerHTML = "<b>" + label[0] + "</b> <span class='esri-icon-question' style='font-size: 20px; position: relative; top: 5px;'></span>";
            t.href = "https://geoportal.cuzk.gov.cz/Default.aspx?mode=TextMeta&text=about_technicke&side=about&menu=3"
        }
    }
    
    let t = document.getElementById('browserList');
    if (t) {
        for (let b in validVersion) {
            let i = validVersion[b];
            t.innerHTML += "<div>" + i[2] + " " + i[1] + "+</div>"
        }
    }
    let v = document.getElementById('appVersion');
    if (v) v.innerHTML = appversion;

    return results.valid
}
checkBrowser();