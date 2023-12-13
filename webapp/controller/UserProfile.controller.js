sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "com/lab2dev/btpxp/model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/export/Spreadsheet",
    "sap/ui/export/library"
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, formatter, Filter, FilterOperator, Spreadsheet,
    exportLibrary) {
    "use strict";

    const EdmType = exportLibrary.EdmType;

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
          const numberOfTasks = e.tarefas.length
          const oModel = new JSONModel(e);
          oModel.setProperty("/numberOfTasks", numberOfTasks)
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

      updateTableCount: function () {                 
        const oTable = this.getView().byId("idTaskTable");                
        const oBinding = oTable.getBinding("items");  
        const iFilteredCount = oBinding.getLength();                
        const oViewModel = this.getView().getModel('userProfile');                
        oViewModel.setProperty("/numberOfTasks", iFilteredCount); 
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
        this.updateTableCount();
      },

      onCloseDialog: function () {
        this.dialog.close()
      },

      createColumnConfigTasks: function () {
        const aCols = [];

        aCols.push({
          label: "ID",
          property: "ID",
          type: EdmType.Number,
          textAlign: "Center"
        });

        aCols.push({
          label: "Nome da Tarefa",
          property: "name",
          type: EdmType.String,
          textAlign: "Center"
        });

        aCols.push({
          label: "Tipo de Tarefa",
          property: "tipo",
          type: EdmType.String,
          textAlign: "Center"
        });

        aCols.push({
          label: "Data/Hora da tarefa",
          property: "data",
          type: EdmType.String, 
          textAlign: "Center"
        });

        aCols.push({
          label: "Pontuação Obtida",
          type: EdmType.Number,
          property: "points",
          scale: 0,
          textAlign: "Center"
        });

        return aCols;
      },

      onExportToExcelTasks: function () {
        const oTable = this.getView().byId("idTaskTable");
        const oRowBinding = oTable.getBinding("items");
        const aCols = this.createColumnConfigTasks();

        const oSettings = {
          workbook: {
            columns: aCols,
            hierarchyLevel: "Level",
          },
          dataSource: oRowBinding,
          fileName: "Tasks.xlsx",
          worker: false,
        };

        const oSheet = new Spreadsheet(oSettings);
        oSheet.build().finally(function () {
          oSheet.destroy();
        });
      },

    });
  }
);
