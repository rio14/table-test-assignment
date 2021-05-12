///<reference path="PredictionModel.ts" />
///<reference path="RowModel.ts" />

class TableModel {
  private _predictions: Array<PredictionModel>;
  public VisibleRows: KnockoutObservableArray<RowModel>;
  public Page: KnockoutObservable<number>;
  public Pages: KnockoutObservable<number>;
  public PageSize: number;
  public SortBy: KnockoutObservable<string>;

  public constructor() {
    this._predictions = [];
    this.VisibleRows = ko.observableArray([]);
    this.Page = ko.observable(1);
    this.Pages = ko.observable();
    this.SortBy = ko.observable("none");
    this.PageSize = Number.MAX_VALUE;
  }

  public AddPrediction(rawPrediction) {
    let prediction = new PredictionModel(rawPrediction);
    this._predictions.push(prediction);
  }

  public SetSorting(sort: string) {
    switch (sort) {
      case "time-asc":
        alert("Implement Sort By Time ASC");
        break;

      case "time-desc":
        alert("Implement Sort By Time DESC");
        break;
    }
    this.SortBy(sort);
  }

  public SetPageSize(pageSize: number) {
    this.PageSize = pageSize;
    this.Pages(Math.ceil(this._predictions.length / this.PageSize));
  }

  public SetPage(page) {
    alert("Implement Set Page Method (" + page + ")");

    /**
     * This method builds the viewable rows of the table, by creating an array of row elements and placing it into
     * the visible rows observable property
     */
    this.VisibleRows([new RowModel(this._predictions[0])]);

    this.Page(page);
  }
}
