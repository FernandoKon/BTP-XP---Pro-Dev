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
            const oRouter = this.getOwnerComponent().getRouter();

            const userProfile = oRouter.getRoute("UserProfile");
        },
  
        onObjectMatched: function (oEvent) {
          const oArgs = oEvent.getParameter("arguments");

          const userName = oArgs.Name;

          const oUserModel = new JSONModel({
            Name: userName
          });

          this.getView().setModel(oUserModel, "userProfile")
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
  