/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "com/lab2dev/btpxp/model/models",
    "sap/ui/model/json/JSONModel",
  ],
  function (UIComponent, Device, models, JSONModel) {
    "use strict";

    return UIComponent.extend("com.lab2dev.btpxp.Component", {
      metadata: {
        manifest: "json",
      },

      /**
       * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
       * @public
       * @override
       */
      init: function () {
        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments);

        // enable routing
        this.getRouter().initialize();

        // set the device model
        this.setModel(models.createDeviceModel(), "device");

        function getData() {
          const request = new XMLHttpRequest();
          request.open("GET", "/model/ranking.json", false);
          request.send();

          if (request.status === 200) {
            return JSON.parse(request.responseText);
          } else {
            console.error("Falha ao carregar dados: " + request.status);
            return [];
          }
        }

        const Ranking = getData();

        Ranking.sort((a, b) => b.score - a.score);

        Ranking.forEach((item, index) => (item.position = index + 1));

        this.setModel(new JSONModel(Ranking), "ranking");

        const addPoints = {
          points: 0,
        };

        const points = [
          {
            key: "descending",
            name: "Maior para Menor",
          },
          {
            key: "ascending",
            name: "Menor para Maior",
          },
        ];

        this.setModel(new JSONModel(addPoints), "addPoints");

        const companies = Ranking.map((item) => item.company);

        const uniqueCompanies = [...new Set(companies)];

        const oCompaniesModel = new JSONModel(uniqueCompanies);
        this.setModel(oCompaniesModel, "empresas");

        const oPointsModel = new JSONModel(points);
        this.setModel(oPointsModel, "pontuacoes");
      },
    });
  }
);
