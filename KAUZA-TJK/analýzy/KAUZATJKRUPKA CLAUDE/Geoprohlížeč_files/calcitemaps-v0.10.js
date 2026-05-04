/* ========================================================================
 * Calcite Maps: calcitemaps.js v0.2 (dojo)
 * ========================================================================
 * Generic handlers for mapping-specific UI
 *
 * ======================================================================== */

define([ 
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/query",
  "dojo/dom-class",
  "dojo/on",
  "dojo/domReady!"
], function(declare, lang, query, domClass, on) {

  var CalciteMaps = declare(null, {

    constructor: function () {
      
      this.initEvents();

    },

    //--------------------------------------------------------------------------
    //
    //  Public
    //
    //--------------------------------------------------------------------------

    dropdownMenuItemSelector: ".calcite-navbar .calcite-dropdown li > a",

    navBarItemSelector: ".tlacitko-panel-nav",

    autoCollapsePanel: true,

    preventOverscrolling: true,

    activePanel: null,

    stickyDropdownDesktop: false,

    stickyDropdownMobile: false,

    stickyDropdownBreakpoint: 768,

    //----------------------------------
    // Initialize Handlers
    //----------------------------------

    initEvents: function() {

      this.setDropdownItemEvents();
      this.setDropdownToggleEvents();
      //this.setToggleNavbarClick();
      //this.setPanelEvents();

    },

    //----------------------------------
    // Dropdown Menu Item Events
    //----------------------------------

    setDropdownItemEvents: function() {

      var funcContext = function setNavbarEvents(e) {

        if (e.type === "keydown" && e.keyCode !== 13) {
          return;
        }

        var isPanel = false,
          panel = null,
          panelBody = null,
          panels = null;

        if (e.currentTarget.dataset.target) {
            panel = query(e.currentTarget.dataset.target);
            if (panel[0].className == 'panel collapse in') {
                query(panel).parent().removeClass("in");
                //if (panel[0].children[1].className == "panel-collapse collapse") {
                //    panel[0].children[1].classList.add("in");
                //}
                return;
            }
          if (panel.length > 0) {
            isPanel = domClass.contains(panel[0], "panel");
          }
        }

        // Toggle panels
          if (isPanel && panel) {
            if (app.widgetCoord[app.activeView.type].active) app.widgetCoord.toggle(app.activeView.type);
            if ((kresleniZapnutoVyjadreni) && kresleniZapnutoVyjadreni == true) zacitZnovuVyjadreni();
            if (sketchVM) sketchVM.complete();
            if ((app.measurement) && app.measurement.viewModel.state == "measuring" || app.measurement.viewModel.state == "ready") app.mereni(3);
            if ((kresleniZapnutoHlaseniChyb) && kresleniZapnutoHlaseniChyb == true) app.widgetHlasenichyb.kreslenibodu();
            if (upresneniPolygon || upresneniLinie) app.widgetHlasenichyb.init();
            app.removeDiv(['widgetBlendMode', 'widgetRasterFunctions', 'widgetInformaceWMS', 'widgetExportAtom', 'widgetRSS', 'tutorial', 'widgetRest', 'widgetMojeMisto', 'widgetWmtsStyle']);
            if (document.getElementById('widgetExport')) app.export.zavrit();
            if ((panel[0].id == "panelSwipe") && app.nastavitSwipe) app.nastavitSwipe.load();
            if ((panel[0].id == "panelShare") && app.sdileni) app.sdileni.produkt(false);
            // Close all panels and bodies          
            query(panel).parent().query(".panel, .panel-collapse").removeClass("in");
            // Show body
            query(panel).collapse("show").query(".panel-collapse").collapse("show");
            // Set focus
            if (e.keyCode === 13) {
            panel.query(".panel-toggle")[0].focus();
            }
            // Dismiss dropdown automatically
            var isMobile = window.innerWidth < this.stickyDropdownBreakpoint;
            if (isMobile && !this.stickyDropdownMobile || !isMobile && !this.stickyDropdownDesktop) {
            var toggle = query(".calcite-dropdown .dropdown-toggle")[0];
            on.emit(toggle, "click", { bubbles: true, cancelable: true });
            }
            // Set active panel
            this.activePanel = panel;
        }
      }.bind(this);

      // Show/hide panels

      query(this.dropdownMenuItemSelector).on(["click", "keydown"], lang.hitch(this, funcContext));
      query(this.navBarItemSelector).on(["click", "keydown"], lang.hitch(this, funcContext));

    },

    //----------------------------------
    // Manually show/hide the dropdown
    //----------------------------------

    setDropdownToggleEvents: function() {
      
      // Manually show/hide the dropdown
      query(".calcite-dropdown .dropdown-toggle").on(["click","keydown"], function (e) {
        if (e.type === "keydown" && e.keyCode !== 13) {
          return;
        }
        query(this).parent().toggleClass("open");
        query(".calcite-dropdown-toggle").toggleClass("open");
      });

      query(".calcite-dropdown").on("hide.bs.dropdown", function () {
        query(".calcite-dropdown-toggle").removeClass("open");
      });

      // Submenu

      // Dismiss dropdown menu
      query(window).on("click", function (e) {
        var menu = query(".calcite-dropdown.open")[0];
        if (menu) {
          if (query(e.target).closest(".calcite-dropdown").length === 0) {
            query(menu).removeClass("open");
            query(".calcite-dropdown-toggle").removeClass("open");
          }
        }
      });
    }
  });
      
  return new CalciteMaps();
});