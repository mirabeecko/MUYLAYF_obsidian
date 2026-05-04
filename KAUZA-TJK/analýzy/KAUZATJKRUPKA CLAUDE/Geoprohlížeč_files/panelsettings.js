/* ========================================================================
 * Calcite Maps: panelsettings.js v0.1 (dojo)
 * ========================================================================
 * Settings panel event handlers to dynamically change map UI
 *
 * ======================================================================== */

define([
    "esri/widgets/Zoom",
    "esri/widgets/Home",
    "esri/widgets/Compass",
    "esri/widgets/NavigationToggle",
    "esri/widgets/Search",
    "esri/widgets/LayerList",
    "esri/widgets/ScaleBar",
    "esri/widgets/Measurement",
    "esri/views/ui/Component",
    "esri/layers/FeatureLayer",
    "esri/widgets/Expand",
    "esri/core/reactiveUtils",
    "esri/widgets/Daylight",
    "esri/widgets/Track",

    "dojo/query",
    "dojo/dom-class",
    "dojo/_base/lang",
    "dojo/_base/declare",
    'dojo/dom-construct',

    "dojo/domReady!"
], (Zoom, Home, Compass, NavToggle, Search, LayerList, ScaleBar, Measurement, Component, FeatureLayer, Expand, reactiveUtils, Daylight, Track,
        query, domClass, lang, declare, domConstruct) => {

        //--------------------------------------------------------------------------
        //
        //  Constants
        //
        //--------------------------------------------------------------------------

        var CALCITE_THEME_SELECTORS = {
            NAVBAR: ".calcite-navbar",
            DROPDOWN: ".calcite-dropdown",
            DROPDOWN_MENU: ".calcite-dropdown .dropdown-menu",
            PANELS: ".calcite-panels",
            MAP: ".calcite-map"
        }

        var CALCITE_THEME_STYLES = {
            BG_LIGHT: "calcite-bg-light", // default
            BG_DARK: "calcite-bg-dark",
            BG_CUSTOM: "calcite-bg-custom",
            TEXT_LIGHT: "calcite-text-light",
            TEXT_DARK: "calcite-text-dark", // default
            WIDGETS_DARK: "calcite-widgets-dark",
            WIDGETS_LIGHT: "calcite-widgets-light", // default
            RGBA_DEFAULT: "" // default (no bg color)
        }

        var CALCITE_LAYOUT_STYLES = {
            body:
                // Custom layouts
                "calcite-layout-large-title calcite-layout-small-title calcite-layout-inline-right calcite-layout-inline-left " +
                // Nav
                "calcite-nav-top calcite-nav-bottom calcite-nav-top-fixed calcite-nav-bottom-fixed " +
                // Nav space
                "calcite-margin-top calcite-margin-bottom calcite-margin-all " +
                // Zoom
                "calcite-zoom-top-left calcite-zoom-top-right calcite-zoom-bottom-left calcite-zoom-bottom-right " +
                // Minibar
                "calcite-nav-transparent",
            nav:
                // Navbar
                "navbar-fixed-top navbar-fixed-bottom",
            // Panels
            panels: "calcite-panels-right calcite-panels-left"
        }

        var PanelSettings = declare(null, {

            APP_LAYOUTS: {
                TOP: { // TOP je defaultni, ostatni pozice odstraneny
                    navPosition: "calcite-nav-top",
                    navSpace: "",
                    panelPosition: "calcite-panels-right",
                    zoomPosition: "calcite-zoom-top-left",
                    navFixedPosition: "navbar-fixed-top",
                    viewPadding: { top: 50, bottom: 0 },
                    viewPaddingNavHidden: { top: 0, bottom: 0 },
                    uiPadding: { top: 15, bottom: 30 },
                    layoutName: ""
                }
            },

            _this: null,

            activeLayout: null,

            // TODO
            defaultOptions: {
                "loading-text": 'loading...'
            },

            // Default settings
            styleSettings: {
                navbar: {
                    bgStyle: CALCITE_THEME_STYLES.BG_LIGHT, // calcite-bg-light / calcite-bg-dark / calcite-bg-custom
                    textStyle: CALCITE_THEME_STYLES.TEXT_DARK, // calcite-text-dark / calcite-text-light
                    bgRgbaColor: CALCITE_THEME_STYLES.RGBA_DEFAULT // ""
                },
                dropdown: {
                    bgStyle: CALCITE_THEME_STYLES.BG_LIGHT, // calcite-bg-light / calcite-bg-dark / calcite-bg-custom
                    textStyle: CALCITE_THEME_STYLES.TEXT_DARK, // calcite-text-dark / calcite-text-light
                    bgRgbaColor: CALCITE_THEME_STYLES.RGBA_DEFAULT // ""
                },
                panel: {
                    bgStyle: CALCITE_THEME_STYLES.BG_LIGHT, // calcite-bg-light / calcite-bg-dark / calcite-bg-custom
                    textStyle: CALCITE_THEME_STYLES.TEXT_DARK, // calcite-text-dark / calcite-text-light
                    bgRgbaColor: CALCITE_THEME_STYLES.RGBA_DEFAULT // ""
                }
            },

            //--------------------------------------------------------------------------
            //
            //  Lifecycle
            //
            //--------------------------------------------------------------------------

            constructor: function (options) {
                _this = this;

                _this.options = lang.mixin(lang.clone(_this.defaultOptions), (options || {}));

                _this.app = options.app;

                _this.activeLayout = _this.APP_LAYOUTS.TOP; //default

                _this._initUIHandlers();

            },

            //--------------------------------------------------------------------------
            //
            //  UI
            //
            //--------------------------------------------------------------------------

            _initUIHandlers: function () {
                app.zmenTema = function () {
                    var theme = document.getElementById("settingsThemeColor").value;
                    textStyle = "";
                    bgStyle = "";
                    bgRgbaColor = "";
                    applyToAll = true;
                    switch (theme) {
                        case "default":
                            textStyle = CALCITE_THEME_STYLES.TEXT_DARK;
                            bgStyle = CALCITE_THEME_STYLES.BG_LIGHT;
                            bgRgbaColor = CALCITE_THEME_STYLES.RGBA_DEFAULT;
                            document.getElementById("motivApky").href = api + "/" + apiVersion + "/esri/themes/light/main.css";
                            query(".form-control, .panel-body, .panel-collapse").attr("style", { "background-color": "#fff", "color": "#000" });
                            query(".dropdownMenu").attr("style", { "color": "#fff" });
                            query("#rozdelovac").attr("style", { "border-left": "1px solid #f8f8f8" });
                            query(".slider").removeClass("slider-dark");
                            var widgetSouradniceMap = app.mapView.ui.find("widgetSouradnice");
                            if (widgetSouradniceMap) {
                                widgetSouradniceMap.style = "padding: 5px; z-index: -1;";
                                widgetSouradniceMap.classList.add('widgetLight');
                                widgetSouradniceMap.classList.remove('widgetDark');
                            }
                            var widgetSouradniceScene = app.sceneView.ui.find("widgetSouradnice_3D");
                            if (widgetSouradniceScene) {
                                widgetSouradniceScene.style = "padding: 5px; z-index: -1;";
                                widgetSouradniceScene.classList.add('widgetLight');
                                widgetSouradniceScene.classList.remove('widgetDark');
                            }
                            var widgetExpand1 = app.mapView.ui.find("expand");
                            if (widgetExpand1) {
                                widgetExpand1.content.style = "padding: 10px;";
                                widgetExpand1.content.classList.add('widgetLight');
                                widgetExpand1.content.classList.remove('widgetDark');
                            }
                            var widgetExpand2 = app.mapView.ui.find("expand2");
                            if (widgetExpand2) {
                                widgetExpand2.content.style = "width: 250px; padding: 10px;";
                                widgetExpand2.content.classList.add('widgetLight');
                                widgetExpand2.content.classList.remove('widgetDark');
                            }
                            var widgetExpand3Map = app.mapView.ui.find("expand3");
                            if (widgetExpand3Map) {
                                widgetExpand3Map.content.style = "width: 400px; padding: 10px; overflow: auto; max-height: 250px;";
                                widgetExpand3Map.content.classList.add('widgetLight');
                                widgetExpand3Map.content.classList.remove('widgetDark');
                            }
                            var widgetExpand3Scene = app.sceneView.ui.find("expand3");
                            if (widgetExpand3Scene) {
                                widgetExpand3Scene.content.style = "width: 400px; padding: 10px; overflow: auto; max-height: 250px;";
                                widgetExpand3Scene.content.classList.add('widgetLight');
                                widgetExpand3Scene.content.classList.remove('widgetDark');
                            }
                            query(CALCITE_THEME_SELECTORS.MAP).removeClass("calcite-widgets-dark calcite-widgets-light").addClass("calcite-widgets-light");
                            query(CALCITE_THEME_SELECTORS.DROPDOWN).removeClass("calcite-bg-dark calcite-text-light").addClass("calcite-bg-light calcite-text-dark");
                            query(CALCITE_THEME_SELECTORS.PANELS).removeClass("calcite-bg-dark calcite-bg-light calcite-text-dark calcite-text-light").addClass("calcite-bg-light calcite-text-dark");
                            document.getElementById("klientLogo").src = "images/logoDark.svg";
                            document.getElementById("mapViewDiv").style.backgroundColor = "white";
                            localStorage.theme = "default";
                            break;
                        case "light":
                            textStyle = CALCITE_THEME_STYLES.TEXT_DARK;
                            bgStyle = CALCITE_THEME_STYLES.BG_LIGHT;
                            bgRgbaColor = CALCITE_THEME_STYLES.RGBA_DEFAULT;
                            document.getElementById("motivApky").href = api + "/" + apiVersion + "/esri/themes/light/main.css";
                            query(".form-control, .panel-body").attr("style", { "background-color": "#fff", "color": "#000" });
                            query(".dropdownMenu").attr("style", { "color": "#000" });
                            query("#rozdelovac").attr("style", { "border-left": "1px solid #595959" });
                            query(".slider").removeClass("slider-dark");
                            var widgetSouradniceMap = app.mapView.ui.find("widgetSouradnice");
                            if (widgetSouradniceMap) {
                                widgetSouradniceMap.style = "padding: 5px; z-index: -1;";
                                widgetSouradniceMap.classList.add('widgetLight');
                                widgetSouradniceMap.classList.remove('widgetDark');
                            }
                            var widgetSouradniceScene = app.sceneView.ui.find("widgetSouradnice_3D");
                            if (widgetSouradniceScene) {
                                widgetSouradniceScene.style = "padding: 5px; z-index: -1;";
                                widgetSouradniceScene.classList.add('widgetLight');
                                widgetSouradniceScene.classList.remove('widgetDark');
                            }
                            var widgetExpand1 = app.mapView.ui.find("expand");
                            if (widgetExpand1) {
                                widgetExpand1.content.style = "padding: 10px;";
                                widgetExpand1.content.classList.add('widgetLight');
                                widgetExpand1.content.classList.remove('widgetDark');
                            }
                            var widgetExpand2 = app.mapView.ui.find("expand2");
                            if (widgetExpand2) {
                                widgetExpand2.content.style = "width: 250px; padding: 10px;";
                                widgetExpand2.content.classList.add('widgetLight');
                                widgetExpand2.content.classList.remove('widgetDark');
                            }
                            var widgetExpand3Map = app.mapView.ui.find("expand3");
                            if (widgetExpand3Map) {
                                widgetExpand3Map.content.style = "width: 400px; padding: 10px; overflow: auto; max-height: 250px;";
                                widgetExpand3Map.content.classList.add('widgetLight');
                                widgetExpand3Map.content.classList.remove('widgetDark');
                            }
                            var widgetExpand3Scene = app.sceneView.ui.find("expand3");
                            if (widgetExpand3Scene) {
                                widgetExpand3Scene.content.style = "width: 400px; padding: 10px; overflow: auto; max-height: 250px;";
                                widgetExpand3Scene.content.classList.add('widgetLight');
                                widgetExpand3Scene.content.classList.remove('widgetDark');
                            }
                            query(CALCITE_THEME_SELECTORS.MAP).removeClass("calcite-widgets-dark calcite-widgets-light").addClass("calcite-widgets-light");
                            query(CALCITE_THEME_SELECTORS.DROPDOWN).removeClass("calcite-bg-dark calcite-bg-light calcite-text-dark calcite-text-light").addClass("calcite-bg-light calcite-text-dark");
                            query(CALCITE_THEME_SELECTORS.PANELS).removeClass("calcite-bg-dark calcite-bg-light calcite-text-dark calcite-text-light").addClass("calcite-bg-light calcite-text-dark");
                            document.getElementById("klientLogo").src = "images/logoDark.svg";
                            document.getElementById("mapViewDiv").style.backgroundColor = "white";
                            localStorage.theme = "light";
                            break;
                        case "dark":
                            textStyle = CALCITE_THEME_STYLES.TEXT_LIGHT;
                            bgStyle = CALCITE_THEME_STYLES.BG_DARK;
                            bgRgbaColor = CALCITE_THEME_STYLES.RGBA_DEFAULT;
                            document.getElementById("motivApky").href = api + "/" + apiVersion + "/esri/themes/dark/main.css";
                            query(".form-control, .panel-body").attr("style", { "background-color": "#4c4c4c", "color": "#fff" });
                            query(".dropdownMenu").attr("style", { "color": "#fff" });
                            query("#rozdelovac").attr("style", { "border-left": "1px solid #f8f8f8" });
                            query(".slider").addClass("slider-dark");
                            var widgetSouradniceMap = app.mapView.ui.find("widgetSouradnice");
                            if (widgetSouradniceMap) {
                                widgetSouradniceMap.style = "padding: 5px; z-index: -1;";
                                widgetSouradniceMap.classList.add('widgetDark');
                                widgetSouradniceMap.classList.remove('widgetLight');
                            }
                            var widgetSouradniceScene = app.sceneView.ui.find("widgetSouradnice_3D");
                            if (widgetSouradniceScene) {
                                widgetSouradniceScene.style = "padding: 5px; z-index: -1;";
                                widgetSouradniceScene.classList.add('widgetDark');
                                widgetSouradniceScene.classList.remove('widgetLight');
                            }
                            var widgetExpand1 = app.mapView.ui.find("expand");
                            if (widgetExpand1) {
                                widgetExpand1.content.style = "padding: 10px;";
                                widgetExpand1.content.classList.add('widgetDark');
                                widgetExpand1.content.classList.remove('widgetLight');
                            }
                            var widgetExpand2 = app.mapView.ui.find("expand2");
                            if (widgetExpand2) {
                                widgetExpand2.content.style = "width: 250px; padding: 10px;";
                                widgetExpand2.content.classList.add('widgetDark');
                                widgetExpand2.content.classList.remove('widgetLight');
                            }
                            var widgetExpand3Map = app.mapView.ui.find("expand3");
                            if (widgetExpand3Map) {
                                widgetExpand3Map.content.style = "width: 400px; padding: 10px; overflow: auto; max-height: 250px;";
                                widgetExpand3Map.content.classList.add('widgetDark');
                                widgetExpand3Map.content.classList.remove('widgetLight');
                            }
                            var widgetExpand3Scene = app.sceneView.ui.find("expand3");
                            if (widgetExpand3Scene) {
                                widgetExpand3Scene.content.style = "width: 400px; padding: 10px; overflow: auto; max-height: 250px;";
                                widgetExpand3Scene.content.classList.add('widgetDark');
                                widgetExpand3Scene.content.classList.remove('widgetLight');
                            }
                            query(CALCITE_THEME_SELECTORS.MAP).removeClass("calcite-widgets-dark calcite-widgets-light").addClass("calcite-widgets-dark");
                            query(CALCITE_THEME_SELECTORS.DROPDOWN).removeClass("calcite-bg-dark calcite-bg-light calcite-text-dark calcite-text-light").addClass("calcite-bg-dark calcite-text-light");
                            query(CALCITE_THEME_SELECTORS.PANELS).removeClass("calcite-bg-dark calcite-bg-light calcite-text-dark calcite-text-light").addClass("calcite-bg-dark calcite-text-light");
                            document.getElementById("klientLogo").src = "images/logoLight.svg";
                            document.getElementById("mapViewDiv").style.backgroundColor = "grey";
                            localStorage.theme = "dark";
                            break;
                    }
                    // Set styles
                    _this.setStyles(bgStyle, textStyle, bgRgbaColor, applyToAll);
                    _this.applyStyles();
                }
            },

            //--------------------------------------------------------------------------
            //
            //  Private Functions
            //
            //--------------------------------------------------------------------------

            _rgb2hsv: function () {
                var rr, gg, bb,
                    r = arguments[0] / 255,
                    g = arguments[1] / 255,
                    b = arguments[2] / 255,
                    h, s,
                    v = Math.max(r, g, b),
                    diff = v - Math.min(r, g, b),
                    diffc = function (c) {
                        return (v - c) / 6 / diff + 1 / 2;
                    };

                if (diff == 0) {
                    h = s = 0;
                } else {
                    s = diff / v;
                    rr = diffc(r);
                    gg = diffc(g);
                    bb = diffc(b);

                    if (r === v) {
                        h = bb - gg;
                    } else if (g === v) {
                        h = (1 / 3) + rr - bb;
                    } else if (b === v) {
                        h = (2 / 3) + gg - rr;
                    }
                    if (h < 0) {
                        h += 1;
                    } else if (h > 1) {
                        h -= 1;
                    }
                }
                return {
                    h: Math.round(h * 360),
                    s: Math.round(s * 100),
                    v: Math.round(v * 100)
                };
            },

            _rgb2hsl: function (r, g, b) {
                r /= 255, g /= 255, b /= 255;
                var max = Math.max(r, g, b), min = Math.min(r, g, b);
                var h, s, l = (max + min) / 2;

                if (max == min) {
                    h = s = 0; // achromatic
                } else {
                    var d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    switch (max) {
                        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                        case g: h = (b - r) / d + 2; break;
                        case b: h = (r - g) / d + 4; break;
                    }
                    h /= 6;
                }
                return {
                    h: h,
                    s: s,
                    l: l
                };
            },

            _getRgbaColorFromStyle: function (calciteBgColorStyle) {
                caliteColorStyle = "." + calciteBgColorStyle,
                    attr = "backgroundColor";
                var ss = document.styleSheets;
                var rgba = "";
                for (var i = 0; i < ss.length && !rgba; i++) {
                    var ss = document.styleSheets;
                    var s = ss[i];
                    try {
                        var rules = s.cssRules ? s.cssRules : null; //ss[i].cssRules; //  || ss[i].rules;
                        if (s && rules) {
                            for (var j = 0; j < rules.length; j++) {
                                if (rules[j].selectorText === caliteColorStyle) {
                                    rgba = rules[j].style[attr];
                                    break;
                                }
                            }
                        }
                    } catch (err) { }
                }
                return rgba;
            },

            //--------------------------------------------------------------------------
            //
            //  Public Functions
            //
            //--------------------------------------------------------------------------

            setStyles: function (bgStyle, textStyle, bgRgbaColor, applyToAll) {
                // Navbar
                _this.styleSettings.navbar.bgStyle = bgStyle || _this.styleSettings.navbar.bgStyle;
                _this.styleSettings.navbar.textStyle = textStyle || _this.styleSettings.navbar.textStyle;
                _this.styleSettings.navbar.bgRgbaColor = bgRgbaColor !== null ? bgRgbaColor : _this.styleSettings.navbar.bgRgbaColor;
                // Navbar only - reset
                if (!applyToAll) {
                    // Dropdown - reset
                    _this.styleSettings.dropdown.bgStyle = CALCITE_THEME_STYLES.BG_LIGHT;
                    _this.styleSettings.dropdown.textStyle = CALCITE_THEME_STYLES.TEXT_DARK;
                    _this.styleSettings.dropdown.bgRgbaColor = CALCITE_THEME_STYLES.RGBA_DEFAULT;
                    // Panel - reset
                    _this.styleSettings.panel.bgStyle = CALCITE_THEME_STYLES.BG_LIGHT;
                    _this.styleSettings.panel.textStyle = CALCITE_THEME_STYLES.TEXT_DARK;
                    _this.styleSettings.panel.bgRgbaColor = CALCITE_THEME_STYLES.RGBA_DEFAULT;
                } else {
                    // Dropdown
                    // _this.styleSettings.dropdown.bgStyle = bgStyle || _this.styleSettings.dropdown.bgStyle;
                    // _this.styleSettings.dropdown.textStyle = textStyle || _this.styleSettings.dropdown.textStyle;
                    // _this.styleSettings.dropdown.bgRgbaColor = bgRgbaColor !== null ? bgRgbaColor : _this.styleSettings.dropdown.bgRgbaColor;
                    // Panel
                    _this.styleSettings.panel.bgStyle = bgStyle || _this.styleSettings.panel.bgStyle;
                    _this.styleSettings.panel.textStyle = textStyle || _this.styleSettings.panel.textStyle;
                    _this.styleSettings.panel.bgRgbaColor = bgRgbaColor !== null ? bgRgbaColor : _this.styleSettings.panel.bgRgbaColor;
                }
            },

            applyStyles: function (applyToAll) {
                if (document.getElementById("settingsThemeColor").value == "default") {
                    query(CALCITE_THEME_SELECTORS.NAVBAR).removeClass("calcite-bg-dark calcite-bg-light calcite-text-dark calcite-text-light").addClass("calcite-bg-dark calcite-text-light");
                    query(CALCITE_THEME_SELECTORS.PANELS).removeClass("calcite-bg-dark calcite-bg-light calcite-text-dark calcite-text-light").addClass("calcite-bg-dark calcite-text-light");
                    query(CALCITE_THEME_SELECTORS.MAP).removeClass("calcite-widgets-dark calcite-widgets-light").addClass("calcite-widgets-light");
                    document.getElementById("klientLogo").src = "images/logoLight.svg";
                } else {
                    _this.setBgThemeStyle(CALCITE_THEME_SELECTORS.NAVBAR, _this.styleSettings.navbar.bgStyle);
                    _this.setTextThemeStyle(CALCITE_THEME_SELECTORS.NAVBAR, _this.styleSettings.navbar.textStyle);
                    _this.setBgRgbaColor(CALCITE_THEME_SELECTORS.NAVBAR, _this.styleSettings.navbar.bgRgbaColor);
                    // Panel
                    _this.setBgThemeStyle(CALCITE_THEME_SELECTORS.PANELS, _this.styleSettings.panel.bgStyle);
                    _this.setTextThemeStyle(CALCITE_THEME_SELECTORS.PANELS, _this.styleSettings.panel.textStyle);
                    _this.setBgRgbaColor(CALCITE_THEME_SELECTORS.PANELS, _this.styleSettings.panel.bgRgbaColor);
                }
                // Dropdown
                // _this.setBgThemeStyle(CALCITE_THEME_SELECTORS.DROPDOWN, _this.styleSettings.dropdown.bgStyle);
                // _this.setTextThemeStyle(CALCITE_THEME_SELECTORS.DROPDOWN, _this.styleSettings.dropdown.textStyle);
                // _this.setBgRgbaColor(CALCITE_THEME_SELECTORS.DROPDOWN_MENU, _this.styleSettings.dropdown.bgRgbaColor);
                // Panel
                //_this.setBgThemeStyle(CALCITE_THEME_SELECTORS.PANELS, _this.styleSettings.panel.bgStyle);
                //_this.setTextThemeStyle(CALCITE_THEME_SELECTORS.PANELS, _this.styleSettings.panel.textStyle);
                //_this.setBgRgbaColor(CALCITE_THEME_SELECTORS.PANELS, _this.styleSettings.panel.bgRgbaColor);
            },

            // BgColor
            setBgColorStyle: function (cssSelector, bgColorStyle) {
                _this.removeBgColorStyle(cssSelector);
                if (bgColorStyle !== "default") {
                    query(cssSelector).addClass(bgColorStyle);
                }
            },

            setBgRgbaColor: function (cssSelector, bgColorRgba) {
                query(cssSelector).attr("style", { "background-color": bgColorRgba });
            },

            removeBgColorStyle: function (cssSelector) {
                query(cssSelector).attr("class")[0].split(" ").forEach(function (val) {
                    if (val.indexOf("calcite-bgcolor-") > -1) {
                        query(cssSelector).removeClass(val);
                    }
                });
            },

            // Theme - text
            setTextThemeStyle: function (cssSelector, textColorStyle) {
                query(cssSelector).removeClass(CALCITE_THEME_STYLES.TEXT_LIGHT + " " + CALCITE_THEME_STYLES.TEXT_DARK);
                query(cssSelector).addClass(textColorStyle);
            },

            // Theme - bg
            setBgThemeStyle: function (cssSelector, bgColorStyle) {
                query(cssSelector).removeClass(CALCITE_THEME_STYLES.BG_LIGHT + " " + CALCITE_THEME_STYLES.BG_DARK + " " + CALCITE_THEME_STYLES.BG_CUSTOM);
                query(cssSelector).addClass(bgColorStyle)
            },

            //----------------------------------
            // Tab - Map functions
            //----------------------------------



            //----------------------------------
            // Tab - Layout functions
            //----------------------------------

            setLayout: function (layout, hiddenNav) {
                // Update layout
                _this.activeLayout = layout;
                // Remove classes
                _this.removeClasses();
                _this.addClasses(layout);
                if (hiddenNav) {
                    _this.setPadding(layout.viewPaddingHidden, layout.uiPadding);
                } else {
                    _this.setPadding(layout.viewPadding, layout.uiPadding);
                }
                //_this.setPaddingUI(layout.viewPadding); //update UI // fce odstranena
                if (layout.zoomPosition === "calcite-zoom-top-right") {
                    _this.setWidgetPosition(_this.app.mapView, "zoom", "top-right");
                    _this.setWidgetPosition(_this.app.sceneView, "zoom", "top-right");
                } else {
                    _this.setWidgetPosition(_this.app.mapView, "zoom", "top-left");
                    _this.setWidgetPosition(_this.app.sceneView, "zoom", "top-left");
                }
            },

            addClasses: function (layout) {
                var body = query("body")[0],
                    nav = query("nav")[0],
                    panels = query(CALCITE_THEME_SELECTORS.PANELS)[0];
                domClass.add(body, layout.navPosition + " " + layout.navSpace + " " + layout.zoomPosition + " " + layout.layoutName);
                domClass.add(nav, layout.navFixedPosition);
                domClass.add(panels, layout.panelPosition);
            },

            removeClasses: function () {
                var body = query("body")[0],
                    nav = query("nav")[0],
                    panels = query(CALCITE_THEME_SELECTORS.PANELS)[0];
                domClass.remove(body, CALCITE_LAYOUT_STYLES.body);
                domClass.remove(nav, CALCITE_LAYOUT_STYLES.nav);
                domClass.remove(panels, CALCITE_LAYOUT_STYLES.panels);
            },

            setPadding: function (viewPadding, uiPadding) {
                if (window.innerWidth <= 768 && _this.activeLayout.viewPaddingSmallScreen) {
                    viewPadding = _this.activeLayout.viewPaddingSmallScreen;
                }
                _this.app.mapView.padding = viewPadding;
                _this.app.mapView.ui.padding = uiPadding;
                _this.app.sceneView.padding = viewPadding;
                _this.app.sceneView.ui.padding = uiPadding;
            },

            // odstraneno setPaddingUI

            setWidgetPosition: function (view, name, position, index, id) {
                var component,
                    exists = view.ui.find(name);
                // Remove
                if (position === "none") {
                    view.ui.remove(name);
                    // if (exists) {
                    //   exists.destroy();
                    // }
                } else { // Add/Move
                    if (exists) {
                        view.ui.move(name, position);
                    } else {
                        component = _this.createComponent(view, name, id);
                        if (!id) {
                            view.ui.add([{
                                component: component,
                                position: position,
                                index: index
                            }]);
                        }
                    }
                }
            },

            createComponent: function (view, name, id) {
                var component,
                    widget = _this.createWidget(view, name, id);
                component = new Component({
                    node: widget,
                    id: name
                });
                return component;
            },

            createWidget: function (view, name, id) {
                var widget,
                    viewModel = {
                        view: view
                    }
                var stylExpand = "background-color: white; padding: 10px;";
                if (localStorage.theme) {
                    if (localStorage.theme != "default") {
                        if (localStorage.theme == "dark") {
                            stylExpand = "background-color: #4c4c4c; padding: 10px;";
                        }
                    }
                }
                var unreadNews = 1;
                if (localStorage.news) {
                    if (localStorage.news == d[484].id) {
                        unreadNews = null;
                    }
                }
                switch (name) {
                    case "zoom":
                        widget = new Zoom({
                            viewModel: viewModel
                        });
                        break;
                    case "navtoggle":
                        widget = new NavToggle({
                            viewModel: viewModel
                        });
                        break;
                    case "home":
                        widget = new Home({
                            viewModel: viewModel,
                        });
                        app.homebuttonWidget = widget;
                        break;
                    case "expand":
                        var obsah = domConstruct.create("div", {
                            style: stylExpand,
                            innerHTML: "<div style='max-width: 230px;'><b>" + label[0] + "</b><br><br><p>" + label[1] + "</p><button id='expandKatastr' class='btn btn-primary btn-block' onclick='app?.widgetProdukty?.useproduct(22514);'>" + label[2] + " <span class='esri-icon-expand expandKm'></span></button></div>"
                        });
                        let expanded = true;
                        if (app.mapView.widthBreakpoint == "small" || app.mapView.widthBreakpoint == "xsmall") {
                            expanded = false;
                        }
                        widget = new Expand({
                            expandIcon: "analysis",
                            expandTooltip: label[0],
                            expanded: expanded,
                            mode: "floating",
                            view: view,
                            group: "skupina",
                            content: obsah
                        });
                        app.napoveda = widget;
                        break;
                    case "expand2":
                        var obsah = domConstruct.create("div", {
                            style: stylExpand + "width: 250px;",
                            innerHTML: "<p style=\"font-weight: bold;\">" + label[4] + "</p><p class=\"expandOdkaz\" onclick=\"app.sdileni.aplikace(1);\">" + label[5] + "</p><p class=\"expandOdkaz\" onclick=\"app.sdileni.aplikace(2);\">" + label[6] + "</p><p class=\"expandOdkaz\" onclick=\"app.sdileni.aplikace(3);\">" + label[7] + "</p><p class=\"expandOdkaz\" onclick=\"app.sdileni.aplikace(6);\">" + label[608] + "</p><hr><p class=\"expandOdkaz\" onclick=\"app.sdileni.aplikace(4);\">" + label[530] + "</p><span class=\"expandOdkaz\" onclick=\"app.sdileni.aplikace(5);\">" + label[533] + "</span>"
                        });
                        widget = new Expand({
                            expandIcon: "launch",
                            expandTooltip: label[3],
                            expanded: false,
                            mode: "floating",
                            view: view,
                            group: "skupina",
                            content: obsah
                        });
                        app.napoveda2 = widget;
                        break;
                    case "expand3":
                        var obsah = domConstruct.create("div", {
                            style: stylExpand,
                            innerHTML: "<a onclick='app.rss();' href='javascript:void(0)' rel='noopener'><b>" + label[483] + "</b></a><br><br><p>" + label[484] + "</p>"
                        });
                        widget = new Expand({
                            expandIcon: "mega-phone",
                            expandTooltip: label[483],
                            expanded: false,
                            iconNumber: unreadNews,
                            mode: "drawer",
                            view: view,
                            group: "skupina",
                            content: obsah
                        });
                        app.napoveda3 = widget;

                        reactiveUtils.whenOnce(() => app.napoveda3.expanded == true).then(() => {
                            localStorage.news = d[484].id;
                            app.napoveda3.iconNumber = null;
                        });
                        break;
                    case "compass":
                        widget = new Compass({
                            viewModel: viewModel
                        });
                        break;
                    case "track":
                        widget = new Track({
                            viewModel: viewModel,
                            scale: 1000,
                            geolocationOptions: {
                                enableHighAccuracy: true
                            }
                        });
                        if (myStorage.geoprohlizec) {
                            if (myStorage.geoprohlizec["trackzoom"] != undefined) {
                                if (myStorage.geoprohlizec["trackzoom"] == true) {
                                    widget.goToLocationEnabled = true;
                                } else {
                                    widget.goToLocationEnabled = false;
                                    document.getElementById("settingstrackzoom").checked = false;
                                }
                            }
                        }
                        break;
                    case "search":
                        widget = new Search({
                            viewModel: {
                                view: view,
                                showPopupOnSelect: true,
                                activeMenu: "suggestion",
                                includeDefaultSources: false,
                                sources: [
                                    {
                                        layer: new FeatureLayer({
                                            url: "https://ags.cuzk.gov.cz/arcgis/rest/services/RUIAN/MapServer/7"
                                        }),
                                        searchFields: ["nazev"],
                                        displayField: "nazev",
                                        exactMatch: true,
                                        name: label[12],
                                        placeholder: label[13],
                                        maxResults: 10,
                                        maxSuggestions: 10,
                                        suggestionsEnabled: true,
                                        minSuggestCharacters: 0,
                                        outFields: ["nazev", "kod"],
                                        searchTemplate: "{nazev} ({kod})"
                                    }, {
                                        url: "https://ags.cuzk.gov.cz/arcgis/rest/services/RUIAN/MapServer/exts/GeocodeSOE/tables/1",
                                        singleLineFieldName: "SingleLine",
                                        name: label[8],
                                        placeholder: label[9],
                                        zoomScale: 5000,
                                        minSuggestCharacters: 4,
                                        maxResults: 10,
                                        maxSuggestions: 10
                                    }, {
                                        url: "https://ags.cuzk.gov.cz/arcgis/rest/services/RUIAN/MapServer/exts/GeocodeSOE/tables/4",
                                        singleLineFieldName: "SingleLine",
                                        name: label[10],
                                        zoomScale: 5000,
                                        placeholder: label[11],
                                        maxResults: 10,
                                        maxSuggestions: 10
                                    }, {
                                        layer: new FeatureLayer({
                                            url: "https://ags.cuzk.gov.cz/arcgis/rest/services/GEONAMES/HistorickaJmena/MapServer/0"
                                        }),
                                        searchFields: ["historicke_jmeno"],
                                        displayField: "historicke_jmeno",
                                        exactMatch: true,
                                        name: label[589],
                                        placeholder: label[590],
                                        maxResults: 10,
                                        maxSuggestions: 10,
                                        suggestionsEnabled: true,
                                        minSuggestCharacters: 0,
                                        outFields: ["historicke_jmeno", "geonames"],
                                        searchTemplate: "{historicke_jmeno} ({geonames})"
                                    }, {
                                        url: "https://ags.cuzk.gov.cz/arcgis/rest/services/GEONAMES/Vyhledavaci_sluzba_nad_daty_GEONAMES/MapServer/exts/GeocodeSOE",
                                        singleLineFieldName: "SingleLine",
                                        name: label[16],
                                        zoomScale: 10000,
                                        placeholder: label[17],
                                        maxResults: 100,
                                        maxSuggestions: 100
                                    }
                                ],
                            },
                            container: id
                        });
                        break;
                    case "layerlist":
                        function defineActions(event) {
                            if (event.item.childrenSortable = true) event.item.childrenSortable = false;
                            let item = event.item;
                            if (item.layer.type != "group" && item.layer.sublayers == null) {
                                if (item.layer.legendUrl) {
                                    let u = item.layer.legendUrl.replace("http:", "https:");
                                    item.panel = { content: "<a href='" + u + "' target='_blank'><img src='" + u + "' title='" + label[34] + "' /></a>", className: "esri-icon-legend" };
                                }
                            }
                            if (!event.item.layer.type || event.item.layer.type == 'sublayer') return;
                            let setPanel = (id, v) => {
                                let l = {
                                    'information': { title: label[25], className: "esri-icon-description LLA" },
                                    'export': { title: label[668], className: "esri-icon-download LLA" },
                                    'atom': { title: label[26] + " (" + label[699] + ")", className: "esri-icon-save LLA" },
                                    'blend': { title: label[613], className: "esri-icon-sliders-horizontal LLA" },
                                    'wmtsStyle': { title: label[555], className: "esri-icon-settings2 LLA" },
                                    'rasterFunctions': { title: label[729], className: "esri-icon-settings LLA" },
                                    'vectorTileStyle': { title: label[553], className: "esri-icon-settings2 LLA" },
                                    'wish': { title: label[36], className: "esri-icon-marketplace LLA" },
                                    'popupy': { title: [label[29], label[28]], className: "esri-icon-configure-popup LLA" },
                                    'format': { title: [label[32], label[33]], className: "esri-icon-swap LLA" },
                                    'podvrstvy': { title: [label[31], label[30]], className: "esri-icon-layer-list LLA" }
                                }
                                let r = l[id];
                                r.id = id;
                                if (Array.isArray(r.title)) v === true ? r.title = r.title[1] : r.title = r.title[0]
                                if (v === true) r.value = true;
                                return r;
                            }
                            if (item.layer.type != 'group') {
                                item.actionsSections = [
                                    [{ title: label[18], className: "esri-icon-trash LLA", id: "remove" }, 
                                    { title: label[19], className: "esri-icon-edit LLA", id: "rename" }, 
                                    { title: label[20], className: "esri-icon-zoom-in-magnifying-glass LLA", id: "zoomTo" }],
                                    [{ title: label[242], className: "esri-icon-up LLA", id: "move-up" }, { title: label[243], className: "esri-icon-down LLA", id: "move-down" }],
                                    [{ title: label[23], className: "esri-icon-non-visible LLA", id: "decrease-opacity" }, { title: label[24], className: "esri-icon-visible LLA", id: "increase-opacity" }]
                                ];
                            } else {
                                item.actionsSections = [
                                    [{ title: label[18], className: "esri-icon-trash", id: "remove" }, { title: label[19], className: "esri-icon-edit", id: "rename" }]
                                ];
                                item.layer.hidepopups == undefined || item.layer.hidepopups == false ? item.actionsSections.push([setPanel('popupy', true)]) : item.actionsSections.push([setPanel('popupy')])
                            }
                            let podvrstvyZapnuto = false;
                            let queryable = false;
                            if (item.layer.allSublayers) {
                                item.layer.allSublayers.forEach(s => {
                                    if (s.queryable == true && app.activeView.type == "2d") queryable = true;
                                    if (s.visible == true) podvrstvyZapnuto = true;
                                });
                            }
                            if (item.layer.type) {
                                if (item.layer.type == "wms") {
                                    item.actionsSections.unshift([setPanel('information')]);
                                    if (app.mapView.spatialReference.wkid == 102067 || app.mapView.spatialReference.wkid == 4258 || app.mapView.spatialReference.wkid == 3035 || app.mapView.spatialReference.wkid == 3045 || app.mapView.spatialReference.wkid == 3046) {
                                        if (item.layer.dataName && item.layer.atom && app.mapView.spatialReference.wkid == 102067) {
                                            item.actionsSections.unshift([setPanel('export'), setPanel('atom')]);
                                        } else if (item.layer.dataName && app.mapView.spatialReference.wkid == 102067) {
                                            item.actionsSections.unshift([setPanel('export')]);
                                        } else if (item.layer.atom) {
                                            item.actionsSections.unshift([setPanel('atom')]);
                                        }
                                    }
                                    if (app.activeView.type == "2d") item.actionsSections.push([setPanel('blend')]);
                                    if ((item.layer.allSublayers && queryable) || item.layer.metaPopup) item.layer.hidepopups == undefined || item.layer.hidepopups == false ? item.actionsSections.push([setPanel('popupy', true)]) : item.actionsSections.push([setPanel('popupy')])
                                    if (item.layer.allSublayers) podvrstvyZapnuto == true ? item.actionsSections.push([setPanel('podvrstvy', true)]) : item.actionsSections.push([setPanel('podvrstvy')])
                                    if (item.layer.imageFormat == "image/png") {
                                        item.actionsSections.push([setPanel('format')]);
                                    } else if (item.layer.imageFormat == "image/jpeg") {
                                        item.actionsSections.push([setPanel('format', true)]);
                                    }
                                } else if (item.layer.type == "wmts") {
                                    item.actionsSections.unshift([setPanel('information')], [setPanel('wmtsStyle')]);
                                    item.actionsSections.push([setPanel('blend')]);
                                } else if (item.layer.type == "wfs") {
                                    item.actionsSections.unshift([setPanel('information')]);
                                } else if (item.layer.type == "map-image") {
                                    item.panel = { content: "legend", title: label[34], className: "esri-icon-legend" }
                                    item.actionsSections.unshift([setPanel('information')]);
                                    if (app.mapView.spatialReference.wkid == 102067 || app.mapView.spatialReference.wkid == 4258 || app.mapView.spatialReference.wkid == 3035 || app.mapView.spatialReference.wkid == 3045  || app.mapView.spatialReference.wkid == 3046) {
                                        if (item.layer.dataName && item.layer.atom && app.mapView.spatialReference.wkid == 102067) {
                                            item.actionsSections.unshift([setPanel('export'), setPanel('atom')]);
                                        } else if (item.layer.dataName && app.mapView.spatialReference.wkid == 102067) {
                                            item.actionsSections.unshift([setPanel('export')]);
                                        } else if (item.layer.atom) {
                                            item.actionsSections.unshift([setPanel('atom')]);
                                        }
                                    }
                                    if (app.activeView.type == "2d") item.actionsSections.push([setPanel('blend')]);
                                    if (((item.layer.capabilities) && item.layer.capabilities.operations.supportsQuery == true && app.activeView.type == "2d") || item.layer.kod == 22524 || item.layer.metaPopup) item.layer.hidepopups == undefined || item.layer.hidepopups == false ? item.actionsSections.push([setPanel('popupy', true)]) : item.actionsSections.push([setPanel('popupy')])
                                    if (((item.layer.allSublayers) && item.layer.allSublayers.items.length) && item.layer.allSublayers.items.length > 1) podvrstvyZapnuto == true ? item.actionsSections.push([setPanel('podvrstvy', true)]) : item.actionsSections.push([setPanel('podvrstvy')])
                                    if (item.layer.imageFormat == "png32") { 
                                        item.actionsSections.push([setPanel('format')]);
                                    } else if (item.layer.imageFormat == "jpg") { 
                                        item.actionsSections.push([setPanel('format', true)]); 
                                    }
                                } else if (item.layer.type == "tile") {
                                    item.actionsSections.unshift([setPanel('information')]);
                                    item.actionsSections.push([setPanel('blend')]);
                                } else if (item.layer.type == "vector-tile") {
                                    item.actionsSections.unshift([setPanel('information')], [setPanel('vectorTileStyle')]);
                                    item.actionsSections.push([setPanel('blend')]);
                                } else if (item.layer.type == "scene") {
                                    item.actionsSections.unshift([setPanel('information')]);
                                    item.actionsSections.push([setPanel('popupy', true)]);
                                } else if (item.layer.type == "feature") {
                                    if (item.layer.url) item.actionsSections.unshift([setPanel('information')]);
                                    if (app.activeView.type == "2d") item.actionsSections.push([setPanel('blend')]);
                                    if (item.parent == null) item.actionsSections.push([setPanel('popupy', true)]);
                                    item.panel = { content: "legend", title: label[34], className: "esri-icon-legend" };
                                } else if (item.layer.type == "imagery") {
                                    if (app.activeView.type == "2d") item.actionsSections.push([setPanel('blend')]);
                                    if (item.layer.url) item.actionsSections.unshift([setPanel('information')]);
                                    if (item.layer.rasterFunctionInfos) item.actionsSections.unshift([setPanel('rasterFunctions')]);
                                    if (item.layer.dataName && item.layer.atom && app.mapView.spatialReference.wkid == 102067) {
                                        item.actionsSections.unshift([setPanel('export'), setPanel('atom')]);
                                    } else if (item.layer.dataName && app.mapView.spatialReference.wkid == 102067) {
                                        item.actionsSections.unshift([setPanel('export')]);
                                    } else if (item.layer.atom) {
                                        item.actionsSections.unshift([setPanel('atom')]);
                                    }
                                    if ((item.layer.capabilities) && item.layer.capabilities.operations.supportsIdentify) item.layer.capabilities.operations.supportsIdentify == true && item.layer.popupEnabled == true ? item.actionsSections.push([setPanel('popupy', true)]) : item.actionsSections.push([setPanel('popupy')])
                                }
                                if (item.layer.wish) {
                                    item.actionsSections.unshift([setPanel('wish')]);
                                }
                            }
                        };

                        widget = new LayerList({
                            viewModel: viewModel,
                            container: id,
                            listItemCreatedFunction: defineActions,
                            dragEnabled: true,
                            filterPlaceholder: label[594],
                            visibleElements: {
                                errors: true,
                                filter: true,
                                statusIndicators: true
                            }
                        });
                        app.layerListWidget = widget;
                        break;
                    case "scalebar":
                        widget = new ScaleBar({
                            view: app.mapView,
                            unit: "metric",
                            style: "line",
                            container: id
                        });
                        app.scalebar = widget;
                        break;
                    case "measurement":
                        widget = new Measurement({
                            view: app.mapView,
                            container: id
                        });
                        app.measurement = widget;
                        break;
                    case "daylight":
                        widget = new Daylight({
                            view: app.sceneView,
                            container: id,
                            dateOrSeason: "season",
                            visibleElements: {
                                playButtons: true,
                                shadowsToggle: false,
                                datePicker: true,
                                timezone: false
                            }
                        });
                        app.daylight = widget;
                        break;
                }
                return widget;
            },

            setPopupDock: function (view, popupOptions) {
                view.popup.set({
                    dockOptions: popupOptions
                });
                var dock = (popupOptions.position !== "auto");
                view.popup.set("dockEnabled", dock);
            }
        });
        return PanelSettings;
    });
