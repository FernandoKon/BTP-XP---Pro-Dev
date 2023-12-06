sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "com/lab2dev/btpxp/model/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel,formatter) {
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
                      "company": "Lab2Dev",
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
                      "company": "Lab2Dev",
                      "score": 1600
                    },
                    {
                      "name": "Ana",
                      "job": "Analista de Dados",
                      "company": "Lab2Dev",
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
                    
                ];
                  
                // Ordenar o array de objetos com base no score em ordem decrescente
                Ranking.sort((a, b) => b.score - a.score);

                // Adicionar a propriedade "position" para indicar a posição no ranking
                Ranking.forEach((item, index) => item.position = index + 1);  
                
                const oModel = new JSONModel(Ranking);

                this.getView().setModel(oModel, "ranking")
                
            },
            
        });
    });
