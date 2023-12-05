sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.lab2dev.btpxp.controller.Home", {
            onInit: function () {
                
            },

            onSelectRanking: function() {
                // Obtém a referência à visão
                const oView = this.getView();
    
                // Obtém a referência ao roteador
                const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
    
                // Navega para a rota "Ranking"
                oRouter.navTo("Ranking");
            }
        });
    });
