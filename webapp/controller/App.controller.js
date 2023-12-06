sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("com.lab2dev.btpxp.controller.App", {
        onInit: function() {
        },

        onItemSelect: function () {
          // Obtém a referência à visão
          const oView = this.getView();
    
          // Obtém a referência ao roteador
          const oRouter = sap.ui.core.UIComponent.getRouterFor(this);

          // Navega para a rota "Ranking"
          oRouter.navTo("Ranking");
          console.log("Navega")
        }
        
      });
    }
  );
  