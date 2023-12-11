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

    const EdmType = exportLibrary.EdmType;

    return Controller.extend("com.lab2dev.btpxp.controller.Ranking", {
      formatter: formatter,

      onInit: function () {
        function getData() {
          const request = new XMLHttpRequest();
          request.open("GET", "/model/ranking.json", false);
          request.send();

          if (request.status === 200) {
            return JSON.parse(request.responseText);
          } else {
            console.error("Falha ao carregar dados: " + request.status);
            return [];
          }
        }

        const addPoints = {
          points: 0,
        };

        const points = [
          {
            key: "descending",
            name: "Maior para Menor",
          },
          {
            key: "ascending",
            name: "Menor para Maior",
          },
        ];


        const Ranking = getData();

        this.getView().setModel(new JSONModel(addPoints), "addPoints");

        Ranking.sort((a, b) => b.score - a.score);

        Ranking.forEach((item, index) => (item.position = index + 1));

        this.getView().setModel(new JSONModel(Ranking), "ranking");

        const companies = Ranking.map((item) => item.company);

        const uniqueCompanies = [...new Set(companies)];

        const oCompaniesModel = new JSONModel(uniqueCompanies);
        this.getView().setModel(oCompaniesModel, "empresas");

        const oMultiComboBox = this.byId("idMultiComboBoxEmpresas");

        oMultiComboBox.bindItems({
          path: "empresas>/",
          template: new Item({
            key: "{empresas>}",
            text: "{empresas>}",
          }),
        });

        const oPointsModel = new JSONModel(points);
        this.getView().setModel(oPointsModel, "pontuacoes");

        const oComboBoxPoints = this.byId("idComboBoxOrdernarPontuacao");

        oComboBoxPoints.bindItems({
          path: "pontuacoes>/",
          template: new Item({
            key: "{pontuacoes>key}",
            text: "{pontuacoes>name}",
          }),
        });
      },

      onSearch: function () {
        const oMultiComboBox = this.byId("idMultiComboBoxEmpresas");
        const aSelectedEmpresas = oMultiComboBox.getSelectedKeys();

        const searchField = this.byId("idInputPesquisar");
        const sQuery = searchField.getValue();

        const sortInput = this.byId("idComboBoxOrdernarPontuacao");
        const selectedSort = sortInput.getSelectedKey();

        const isAscending = selectedSort === "ascending" ? true : false;
        const oSorter = new Sorter("position", isAscending);

        const aFilters = [];

        if (sQuery && sQuery.length > 0) {
          const filter = new Filter({
            filters: [
              new Filter("name", FilterOperator.Contains, sQuery),
              new Filter("job", FilterOperator.Contains, sQuery),
            ],
          });
          aFilters.push(filter);
        }

        if (aSelectedEmpresas.length > 0) {
          const filter = new Filter({
            filters: aSelectedEmpresas.map(function (sEmpresa) {
              return new Filter("company", FilterOperator.EQ, sEmpresa);
            }),
          });
          aFilters.push(filter);
        }

        const oTable = this.byId("idTable");
        const oBinding = oTable.getBinding("items");
        oBinding.filter(aFilters);
        oBinding.sort(oSorter);
      },

      onOpenDialog: function () {
        const oTable = this.getView().byId("idTable");

        const aItems = oTable.getItems();

        const aSelectedItems = aItems.filter((item) =>
          item.getCells()[0].getSelected()
        );

        if (aSelectedItems.length === 0) {
          MessageToast.show("Selecione pelo menos um usuário para pontuar.");
          return;
        }

        if (!this.dialog) {
          this.dialog = sap.ui.xmlfragment(
            "com.lab2dev.btpxp.view.fragments.Dialog",
            this
          );
          this.getView().addDependent(this.dialog);
        }

        this.dialog.open();
      },

      onCloseDialog: function () {
        this.dialog.close();
      },

      onClearFiltersPress: function () {
        const oInputPesquisar = this.byId("idInputPesquisar");
        oInputPesquisar.setValue("");

        const oMultiComboBoxEmpresas = this.byId("idMultiComboBoxEmpresas");
        oMultiComboBoxEmpresas.setSelectedKeys([]);

        const oComboBoxOrdernarPontuacao = this.byId(
          "idComboBoxOrdernarPontuacao"
        );
        oComboBoxOrdernarPontuacao.setSelectedKey("");

        const oSorter = new Sorter("position", false);

        const oTable = this.byId("idTable");
        const oBinding = oTable.getBinding("items");
        oBinding.filter([]);
        oBinding.sort(oSorter);
      },

      onConfirm: function () {
        const points = this.getView().getModel("addPoints");
        const addPoints = parseInt(points.getData().points);

        if (isNaN(addPoints)) {
          MessageToast.show("Insira uma pontuação válida.");
          return;
        }

        const oTable = this.getView().byId("idTable");

        const aItems = oTable.getItems();

        const aSelectedItems = aItems.filter((item) =>
          item.getCells()[0].getSelected()
        );

        const oModel = this.getView().getModel("ranking");

        debugger
        aSelectedItems.forEach(function (oSelectedItem) {
          const oBindingContext = oSelectedItem.getBindingContext("ranking");
          const sPath = oBindingContext.getPath();
          const oItemData = oModel.getProperty(sPath);

          oItemData.score += addPoints;


          oModel.setProperty(sPath, oItemData);
        });

        this.onClearFiltersPress();

        const aUpdatedData = oModel.getProperty("/");
        aUpdatedData.sort((a, b) => b.score - a.score);

        aUpdatedData.forEach((item, index) => (item.position = index + 1));

        oModel.setProperty("/", aUpdatedData);

        oTable.removeSelections();
        aItems.forEach((item) => item.getCells()[0].setSelected(false));
        MessageToast.show("Pontuação confirmada com sucesso!");

        // Fecha o dialog
        this.onCloseDialog();
      },

      createColumnConfig: function () {
        const aCols = [];

        aCols.push({
          label: "Nome",
          property: "name",
          type: EdmType.String,
        });

        aCols.push({
          label: "Cargo",
          property: "job",
          type: EdmType.String,
        });

        aCols.push({
          label: "Empresa",
          property: "company",
          type: EdmType.String,
        });

        aCols.push({
          label: "Posição",
          property: "position",
          type: EdmType.String,
        });

        aCols.push({
          label: "Pontuação",
          type: EdmType.Number,
          property: "score",
          scale: 0,
        });

        return aCols;
      },

      onExportToExcel: function () {
        const oTable = this.getView().byId("idTable");
        const oRowBinding = oTable.getBinding("items");
        const aCols = this.createColumnConfig();

        const oSettings = {
          workbook: {
            columns: aCols,
            hierarchyLevel: "Level",
          },
          dataSource: oRowBinding,
          fileName: "Ranking.xlsx",
          worker: false,
        };

        const oSheet = new Spreadsheet(oSettings);
        oSheet.build().finally(function () {
          oSheet.destroy();
        });
      },

      onLinkPress: function (oEvent) {
        const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        const oSelectedItem = oEvent.getSource();
        const sName = oSelectedItem
          .getBindingContext("ranking")
          .getProperty("name");

        oRouter.navTo("UserProfile", {
          Name: sName,
        });
        console.log("navega");
      },
    });
  }
);
