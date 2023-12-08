sap.ui.define(
    [
      "sap/ui/core/mvc/Controller",
      "sap/ui/model/json/JSONModel",
      "com/lab2dev/btpxp/model/formatter",
      "sap/ui/model/Filter",
      "sap/ui/model/FilterOperator",
      "sap/ui/core/Fragment",
      "sap/m/BusyDialog",
      "sap/m/MessageToast",
      "sap/ui/core/Item",
      "sap/ui/model/Sorter",
      "sap/ui/export/Spreadsheet",
      "sap/ui/export/library",
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (
      Controller,
      JSONModel,
      formatter,
      Filter,
      FilterOperator,
      Fragment,
      BusyDialog,
      MessageToast,
      Item,
      Sorter,
      Spreadsheet,
      exportLibrary
    ) {
      "use strict";
  
      return Controller.extend("com.lab2dev.btpxp.controller.UserProfile", {
        formatter: formatter,
  
        onInit: function () {
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("UserProfile").attachMatched(this._onRouteMatched, this);
        },
  
        _onRouteMatched: function (oEvent) {
            const sName = oEvent.getParameter("arguments").Name;
            this.loadOrderDetails(sName);
        },

        
        
      });
    }
  );
  