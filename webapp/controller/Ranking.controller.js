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

    var EdmType = exportLibrary.EdmType;

    return Controller.extend("com.lab2dev.btpxp.controller.Ranking", {
      formatter: formatter,

      onInit: function () {
        const Ranking = [
          {
            name: "João",
            job: "Analista de Sistemas",
            company: "Lab2Dev",
            score: 1100,
            biografia:
              "Lorem ipsum dolor sit amet. Et adipisci laboriosam non quia dolor vel tempora rerum ut nulla minus non magni iusto aut quisquam quia est voluptatibus molestiae",
            telefone: "+55 11 94002 8922",
            email: "joao@lab2dev.com",
            portifolio: "www.figma.com/joao",
            site: "www.joao.com.br",
          },
          {
            name: "Maria",
            job: "Desenvolvedora Front-end",
            company: "SAP",
            score: 1200,
            biografia:
              "Lorem ipsum dolor sit amet. Et adipisci laboriosam non quia dolor vel tempora rerum ut nulla minus non magni iusto aut quisquam quia est voluptatibus molestiae",
            telefone: "+55 11 94002 8922",
            email: "maria@sap.com",
            portifolio: "www.figma/maria.com",
            site: "www.maria.com",
          },
          {
            name: "Carlos",
            job: "Gerente de Projetos",
            company: "Lab2Dev",
            score: 1300,
            biografia:
              "Lorem ipsum dolor sit amet. Et adipisci laboriosam non quia dolor vel tempora rerum ut nulla minus non magni iusto aut quisquam quia est voluptatibus molestiae",
            telefone: "+55 11 94002 8922",
            email: "carlos@lab2dev.com",
            portifolio: "www.figma/carlos.com",
            site: "www.carlos.com",
          },
          {
            name: "Juliana",
            job: "Scrum Master",
            company: "SAP",
            score: 1600,
            biografia:
              "Lorem ipsum dolor sit amet. Et adipisci laboriosam non quia dolor vel tempora rerum ut nulla minus non magni iusto aut quisquam quia est voluptatibus molestiae",
            telefone: "+55 11 94002 8922",
            email: "juliana@sap.com",
            portifolio: "www.figma/juliana.com",
            site: "www.juliana.com",
          },
          {
            name: "Ana",
            job: "Analista de Dados",
            company: "SAP",
            score: 1400,
            biografia:
              "Lorem ipsum dolor sit amet. Et adipisci laboriosam non quia dolor vel tempora rerum ut nulla minus non magni iusto aut quisquam quia est voluptatibus molestiae",
            telefone: "+55 11 94002 8922",
            email: "ana@sap.com",
            portifolio: "www.figma/ana.com",
            site: "www.ana.com",
          },
          {
            name: "Lucas",
            job: "QA Engineer",
            company: "Lab2Dev",
            score: 1500,
            biografia:
              "Lorem ipsum dolor sit amet. Et adipisci laboriosam non quia dolor vel tempora rerum ut nulla minus non magni iusto aut quisquam quia est voluptatibus molestiae",
            telefone: "+55 11 94002 8922",
            email: "lucas@lab2dev.com",
            portifolio: "www.figma/lucas.com",
            site: "www.lucas.com",
          },
          {
            name: "Fernanda",
            job: "Arquiteta de Software",
            company: "Lab2Dev",
            score: 1800,
            biografia:
              "Lorem ipsum dolor sit amet. Et adipisci laboriosam non quia dolor vel tempora rerum ut nulla minus non magni iusto aut quisquam quia est voluptatibus molestiae",
            telefone: "+55 11 94002 8922",
            email: "fernanda@lab2dev.com",
            portifolio: "www.figma/fernanda.com",
            site: "www.fernanda.com",
          },
          {
            name: "Rodrigo",
            job: "Desenvolvedor Back-end",
            company: "Lab2Dev",
            score: 1700,
            biografia:
              "Lorem ipsum dolor sit amet. Et adipisci laboriosam non quia dolor vel tempora rerum ut nulla minus non magni iusto aut quisquam quia est voluptatibus molestiae",
            telefone: "+55 11 94002 8922",
            email: "rodrigo@lab2dev.com",
            portifolio: "www.figma/rodrigo.com",
            site: "www.rodrigo.com",
          },
          {
            name: "Thiago",
            job: "Desenvolvedor Front-end",
            company: "SAP",
            score: 900,
            biografia:
              "Lorem ipsum dolor sit amet. Et adipisci laboriosam non quia dolor vel tempora rerum ut nulla minus non magni iusto aut quisquam quia est voluptatibus molestiae",
            telefone: "+55 11 94002 8922",
            email: "thiago@sap.com",
            portifolio: "www.figma/thiago.com",
            site: "www.thiago.com",
          },
          {
            name: "Matheus",
            job: "Desenvolvedor Mobile",
            company: "Lab2Dev",
            score: 2000,
            biografia:
              "Lorem ipsum dolor sit amet. Et adipisci laboriosam non quia dolor vel tempora rerum ut nulla minus non magni iusto aut quisquam quia est voluptatibus molestiae",
            telefone: "+55 11 94002 8922",
            email: "matheus@lab2dev.com",
            portifolio: "www.figma/matheus.com",
            site: "www.matheus.com",
          },
          {
            name: "João Silva",
            job: "Analista de Sistemas",
            company: "SAP",
            score: 1100,
            biografia:
              "Lorem ipsum dolor sit amet. Et adipisci laboriosam non quia dolor vel tempora rerum ut nulla minus non magni iusto aut quisquam quia est voluptatibus molestiae",
            telefone: "+55 11 94002 8922",
            email: "joaosilva@sap.com",
            portifolio: "www.figma/joaosilva.com",
            site: "www.joaosilva.com",
          },
          {
            name: "Maria Oliveira",
            job: "Desenvolvedora Front-end",
            company: "SAP",
            score: 1200,
            biografia:
              "Lorem ipsum dolor sit amet. Et adipisci laboriosam non quia dolor vel tempora rerum ut nulla minus non magni iusto aut quisquam quia est voluptatibus molestiae",
            telefone: "+55 11 94002 8922",
            email: "mariaoliveira@sap.com",
            portifolio: "www.figma/mariaoliveira.com",
            site: "www.mariaoliveira.com",
          },
          {
            name: "Fernanda Oliveira",
            job: "Gerente de Projetos",
            company: "SAP",
            score: 1300,
            biografia:
              "Lorem ipsum dolor sit amet. Et adipisci laboriosam non quia dolor vel tempora rerum ut nulla minus non magni iusto aut quisquam quia est voluptatibus molestiae",
            telefone: "+55 11 94002 8922",
            email: "fernandaoliveira@sap.com",
            portifolio: "www.figma/fernandaoliveira.com",
            site: "www.fernandaoliveira.com",
          },
          {
            name: "Juliana Santos",
            job: "Scrum Master",
            company: "Lab2Dev",
            score: 1600,
            biografia:
              "Lorem ipsum dolor sit amet. Et adipisci laboriosam non quia dolor vel tempora rerum ut nulla minus non magni iusto aut quisquam quia est voluptatibus molestiae",
            telefone: "+55 11 94002 8922",
            email: "julianasantos@lab2dev.com",
            portifolio: "www.figma/julianasantos.com",
            site: "www.julianasantos.com",
          },
          {
            name: "Ana Souza",
            job: "Analista de Dados",
            company: "Lab2Dev",
            score: 1400,
            biografia:
              "Lorem ipsum dolor sit amet. Et adipisci laboriosam non quia dolor vel tempora rerum ut nulla minus non magni iusto aut quisquam quia est voluptatibus molestiae",
            telefone: "+55 11 94002 8922",
            email: "anasouza@lab2dev.com",
            portifolio: "www.figma/anasouza.com",
            site: "www.anasouza.com",
          },
          {
            name: "Lucas Costa",
            job: "QA Engineer",
            company: "Lab2Dev",
            score: 1500,
            biografia:
              "Lorem ipsum dolor sit amet. Et adipisci laboriosam non quia dolor vel tempora rerum ut nulla minus non magni iusto aut quisquam quia est voluptatibus molestiae",
            telefone: "+55 11 94002 8922",
            email: "lucascosta@lab2dev.com",
            portifolio: "www.figma/lucascosta.com",
            site: "www.lucascosta.com",
          },
          {
            name: "Fernanda Lima",
            job: "Arquiteta de Software",
            company: "Lab2Dev",
            score: 1800,
            biografia:
              "Lorem ipsum dolor sit amet. Et adipisci laboriosam non quia dolor vel tempora rerum ut nulla minus non magni iusto aut quisquam quia est voluptatibus molestiae",
            telefone: "+55 11 94002 8922",
            email: "fernandalima@lab2dev.com",
            portifolio: "www.figma/fernandalima.com",
            site: "www.fernandalima.com",
          },
          {
            name: "Rodrigo Almeida",
            job: "Desenvolvedor Back-end",
            company: "Lab2Dev",
            score: 1700,
            biografia:
              "Lorem ipsum dolor sit amet. Et adipisci laboriosam non quia dolor vel tempora rerum ut nulla minus non magni iusto aut quisquam quia est voluptatibus molestiae",
            telefone: "+55 11 94002 8922",
            email: "rodrigoalmeida@lab2dev.com",
            portifolio: "www.figma/rodrigoalmeida.com",
            site: "www.rodrigoalmeida.com",
          },
          {
            name: "Thiago Pereira",
            job: "Desenvolvedor Front-end",
            company: "Lab2Dev",
            score: 900,
            biografia:
              "Lorem ipsum dolor sit amet. Et adipisci laboriosam non quia dolor vel tempora rerum ut nulla minus non magni iusto aut quisquam quia est voluptatibus molestiae",
            telefone: "+55 11 94002 8922",
            email: "thiagopereira@lab2dev.com",
            portifolio: "www.figma/thiagopereira.com",
            site: "www.thiagopereira.com",
          },
          {
            name: "Matheus Oliveira",
            job: "Desenvolvedor Mobile",
            company: "Lab2Dev",
            score: 2000,
            biografia:
              "Lorem ipsum dolor sit amet. Et adipisci laboriosam non quia dolor vel tempora rerum ut nulla minus non magni iusto aut quisquam quia est voluptatibus molestiae",
            telefone: "+55 11 94002 8922",
            email: "matheusoliveira@lab2dev.com",
            portifolio: "www.figma/matheusoliveira.com",
            site: "www.matheusoliveira.com",
          },
        ];

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

        aSelectedItems.forEach(function (oSelectedItem) {
          const oBindingContext = oSelectedItem.getBindingContext("ranking");
          const sPath = oBindingContext.getPath();
          const oItemData = oModel.getProperty(sPath);

          oItemData.score += addPoints;

          oModel.setProperty(sPath, oItemData);
        });

        this.onClearFiltersPress();

        // Ordena a tabela para as novas posições
        const aUpdatedData = oModel.getProperty("/");
        aUpdatedData.sort((a, b) => b.score - a.score);

        // Atualize a propriedade "position" para indicar a nova posição no ranking
        aUpdatedData.forEach((item, index) => (item.position = index + 1));

        // Atualize o modelo com os dados reordenados
        oModel.setProperty("/", aUpdatedData);

        // Atualize a tabela
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
        const sName = oSelectedItem.getBindingContext("ranking").getProperty("name");

        oRouter.navTo("UserProfile", {
          Name: sName,
        });
        console.log("navega")
      },
    });
  }
);
