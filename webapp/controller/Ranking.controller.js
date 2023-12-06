sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "com/lab2dev/btpxp/model/formatter",
    "sap/ui/model/Filter",         
    "sap/ui/model/FilterOperator",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel,formatter, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("com.lab2dev.btpxp.controller.Ranking", {
            formatter: formatter,

            onInit: function () {
                
                const Ranking = [
                    {
                      "name": "João",
                      "job": "Analista de Sistemas",
                      "company": "Lab2Dev",
                      "score": 1100
                    },
                    {
                      "name": "Maria",
                      "job": "Desenvolvedora Front-end",
                      "company": "SAP",
                      "score": 1200
                    },
                    {
                      "name": "Carlos",
                      "job": "Gerente de Projetos",
                      "company": "Lab2Dev",
                      "score": 1300
                    },
                    {
                      "name": "Juliana",
                      "job": "Scrum Master",
                      "company": "SAP",
                      "score": 1600
                    },
                    {
                      "name": "Ana",
                      "job": "Analista de Dados",
                      "company": "SAP",
                      "score": 1400
                    },
                    {
                      "name": "Lucas",
                      "job": "QA Engineer",
                      "company": "Lab2Dev",
                      "score": 1500
                    },
                    {
                      "name": "Fernanda",
                      "job": "Arquiteta de Software",
                      "company": "Lab2Dev",
                      "score": 1800
                    },
                    {
                      "name": "Rodrigo",
                      "job": "Desenvolvedor Back-end",
                      "company": "Lab2Dev",
                      "score": 1700
                    },
                    {
                      "name": "Matheus",
                      "job": "Desenvolvedor Mobile",
                      "company": "Lab2Dev",
                      "score": 1700
                    },
                    {
                      "name": "Thiago",
                      "job": "Desenvolvedor Front-end",
                      "company": "Sap",
                      "score": 900
                    },
                    
                ];
                  
                // Ordenar o array de objetos com base no score em ordem decrescente
                Ranking.sort((a, b) => b.score - a.score);

                // Adicionar a propriedade "position" para indicar a posição no ranking
                Ranking.forEach((item, index) => item.position = index + 1);  
                
                const oModel = new JSONModel(Ranking);

                this.getView().setModel(oModel, "ranking");

                 // Obter a lista de empresas do ranking
                const empresas = Ranking.map(item => item.company);
                
                // Remover empresas duplicadas (opcional, dependendo da sua lógica)
                const empresasSemDuplicatas = [...new Set(empresas)];

                // Criar um modelo para a lista de empresas
                const oEmpresasModel = new JSONModel(empresasSemDuplicatas);
                this.getView().setModel(oEmpresasModel, "empresas");

                // Obter a referência ao MultiComboBox
                const oMultiComboBox = this.byId("idMultiComboBoxEmpresas");

                // Vincular a lista de empresas ao MultiComboBox
                oMultiComboBox.bindItems({
                    path: "empresas>/",
                    template: new sap.ui.core.Item({
                        key: "{empresas>}",
                        text: "{empresas>}"
                    })
                });
                
            },

            onSearch: function (oEvent) {
              // add filter for search
              const aFilters = [];
              const sQuery = oEvent.getSource().getValue();
              if (sQuery && sQuery.length > 0) {
                  const filter = new Filter("name", FilterOperator.Contains, sQuery);
                  aFilters.push(filter);
              }
  
              // update list binding
              const oTable = this.byId("idTable");
              const oBinding = oTable.getBinding("items");
              oBinding.filter(aFilters);
          },
            
        });
    });
