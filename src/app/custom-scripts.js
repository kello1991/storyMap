define(["dojo/topic",  "esri/arcgis/utils", "esri/dijit/Print",
  "esri/tasks/PrintTemplate", "esri/config",
  "dojo/_base/array", "dojo/dom", "dojo/parser",
  "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dojo/domReady!"],function(topic,  arcgisUtils, Print,
                                PrintTemplate, esriConfig,
                                arrayUtils, dom, parser) {
  /*
   * Custom Javascript to be executed while the application is initializing goes here
   */

  // The application is ready
  topic.subscribe("tpl-ready", function(){
    /*
     * Custom Javascript to be executed when the application is ready goes here
     */
  });

  topic.subscribe("story-loaded-map", function(result){
    console.log(app);
    if ( result.index !== null ) {
      parser.parse();

      app.printUrl = "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task";
      var layouts = [{
        name: "Letter ANSI A Landscape",
        label: "Landscape (PDF)",
        format: "pdf",
        options: {
          legendLayers: [], // empty array means no legend
          scalebarUnit: "Miles",
          titleText: " Landscape PDF"
        }
      }, {
        name: "Letter ANSI A Portrait",
        label: "Portrait (Image)",
        format: "jpg",
        options:  {
          legendLayers: [],
          scalebarUnit: "Miles",
          titleText: " Portrait JPG"
        }
      }];
      var templates = arrayUtils.map(layouts, function(lo) {
        var t = new PrintTemplate();
        t.layout = lo.name;
        t.label = lo.label;
        t.format = lo.format;
        t.layoutOptions = lo.options;
        return t;
      });
        app.printer = new Print({
          map: app.map,
          templates: templates,
          url: app.printUrl
        }, dom.byId("print_button"));
        setTimeout(function () {
          app.printer.startup();
        }, 300);

    }
    else {

    }
  });
});
