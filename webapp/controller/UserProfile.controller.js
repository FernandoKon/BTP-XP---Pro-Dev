sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "com/lab2dev/btpxp/model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, formatter, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("com.lab2dev.btpxp.controller.UserProfile", {
      formatter: formatter,

      onInit: function () {
        this.oRouter = this.getOwnerComponent().getRouter();

        this.oRouter
          .getRoute("UserProfile")
          .attachPatternMatched(this.onRouteMatch, this);
      },

      onRouteMatch: function (oEvent) {
        const oArguments = oEvent.getParameter("arguments");

        this.getUserInfo(oArguments.Name).then((e) => {
          const oModel = new JSONModel(e);
          this.getView().setModel(oModel, "userProfile");
        });
      },

      getUserInfo: async function (name) {
        const oModel = new JSONModel();
        await oModel.loadData("/model/ranking.json");
        const oData = oModel.getData();

        oData.sort((a, b) => b.score - a.score);

        oData.forEach((item, index) => (item.position = index + 1));

        return oData.find((el) => el.name === String(name));
      },

      onOpenDialog: function () {
        if (!this.dialog) {
          this.dialog = sap.ui.xmlfragment(
            "com.lab2dev.btpxp.view.fragments.UserDialog",
            this
          );
          this.getView().addDependent(this.dialog);
        }

        this.dialog.open();
      },

      onSearch: function (oEvent) {
        const aFilters = [];
        const sQuery = oEvent.getSource().getValue();
        if (sQuery && sQuery.length > 0) {
          const filterTasks = new Filter({
            filters: [
              new Filter("name", FilterOperator.Contains, sQuery),
              new Filter("ID", FilterOperator.EQ, sQuery),
            ],
          });
          aFilters.push(filterTasks);
        }

        const oTable = this.byId("idTaskTable");
        const oBinding = oTable.getBinding("items");
        oBinding.filter(aFilters);
      },

      onCloseDialog: function () {
        this.dialog.close()
      },

    });
  }
);
