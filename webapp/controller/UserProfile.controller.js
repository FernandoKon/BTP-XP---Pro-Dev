sap.ui.define(
    [
      "sap/ui/core/mvc/Controller",
      "sap/ui/model/json/JSONModel",
      "com/lab2dev/btpxp/model/formatter",
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (
      Controller,
      JSONModel,
      formatter,
    ) {
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
          const oArguments = oEvent.getParameter("arguments")
          
          this.getUserInfo(oArguments.Name).then((e) => {
            const oModel = new JSONModel(e);
            this.getView().setModel(oModel, "userProfile");
          })
        },

        getUserInfo: async function (name) {
          const oModel = new JSONModel();
          await oModel.loadData("/model/ranking.json");
          const oData = oModel.getData()
          console.log(oData)
        
        return oData.find((el) => el.name === String(name))
      },
        
        onOpenDialog: function () {  
          if (!this.dialog) {
            this.dialog = sap.ui.xmlfragment(
              "com.lab2dev.btpxp.view.fragments.Dialog",
              this
            );
            this.getView().addDependent(this.dialog);
          }
  
          this.dialog.open();
        },

      });
    }
  );
  