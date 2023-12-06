sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "com/lab2dev/btpxp/model/formatter",
    "sap/ui/model/Filter",         
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "sap/m/BusyDialog",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel,formatter, Filter, FilterOperator, Fragment, BusyDialog, MessageToast) {
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
                      "name": "Thiago",
                      "job": "Desenvolvedor Front-end",
                      "company": "SAP",
                      "score": 900
                    },
                    {
                      "name": "Matheus",
                      "job": "Desenvolvedor Mobile",
                      "company": "Lab2Dev",
                      "score": 2000
                    },                 
                  ];

                const addPoints = {
                  "points": 0
                };

                this.getView().setModel(new JSONModel(addPoints), "addPoints")

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

          onOpenDialog: function () {
            // Carrega o fragmento do diálogo
            if (!this.dialog) {
                this.dialog = sap.ui.xmlfragment("com.lab2dev.btpxp.view.fragments.Dialog", this);
                this.getView().addDependent(this.dialog);
            }
    
            // Abre o diálogo
            this.dialog.open();
          },

          //Função para fechar o Dialog
          onCloseDialog: function () {
            this.dialog.close();
          },

          onConfirmPontuacao: function () {
        
            // Obtendo o valor do Input de pontuação
            const points = this.getView().getModel("addPoints");
            const addPoints = points.getData().points;
        
            // Obtenha a referência à tabela
            const oTable = this.getView().byId("idTable");
        
            if (!oTable) {
                console.error("A tabela não foi encontrada.");
                return;
            }
        
            // Obtenha todos os itens da tabela
            const aItems = oTable.getItems();
        
            // Filtra os itens selecionados
            const aSelectedItems = aItems.filter(item => item.getCells()[0].getSelected());
        
            if (aSelectedItems.length === 0) {
                MessageToast.show("Selecione pelo menos um usuário para pontuar.");
                return this.onCloseDialog();
            }
        
            // Obtenha o modelo
            const oModel = this.getView().getModel("ranking");
        
            // Atualize o score dos itens selecionados
            aSelectedItems.forEach(function (oSelectedItem) {
                const oBindingContext = oSelectedItem.getBindingContext("ranking");
                const sPath = oBindingContext.getPath();
                const oItemData = oModel.getProperty(sPath);
        
                // Adicione a pontuação aos itens selecionados
                oItemData.score += parseInt(addPoints);
        
                // Atualize o modelo
                oModel.setProperty(sPath, oItemData);
            });

            const aUpdatedData = oModel.getProperty("/");
            aUpdatedData.sort((a, b) => b.score - a.score);

            // Atualize a propriedade "position" para indicar a nova posição no ranking
            aUpdatedData.forEach((item, index) => item.position = index + 1);

            // Atualize o modelo com os dados reordenados
            oModel.setProperty("/", aUpdatedData);
        
            // Atualize a tabela
            oTable.removeSelections();
            aItems.forEach(item => item.getCells()[0].setSelected(false));
            MessageToast.show("Pontuação confirmada com sucesso!");

            
        
            // Fecha o dialog
            this.onCloseDialog();
          },
          
          onItemSelect: function (oEvent) {
              // Este evento é chamado quando um item é selecionado/desmarcado
              // Você pode adicionar lógica adicional aqui, se necessário
          },
        
        
        
        
        
        
            
        });
    });
