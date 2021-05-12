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
        this._predictions = this._predictions.sort((a, b) =>
          new Date(a.Time).toUTCString() > new Date(b.Time).toUTCString()
            ? 1
            : -1
        );
        this.SetPage(this.Page());
        break;

      case "time-desc":
        this._predictions = this._predictions.sort((a, b) =>
          new Date(a.Time).toUTCString() < new Date(b.Time).toUTCString()
            ? 1
            : -1
        );
        this.SetPage(this.Page());
        break;
    }
    this.SortBy(sort);
  }

  public SetPageSize(pageSize: number) {
    this.PageSize = pageSize;
    this.Pages(Math.ceil(this._predictions.length / this.PageSize));
  }

  public SetPage(page) {
    let temp = this._predictions.map((d) => new RowModel(d));
    const start = (page - 1) * this.PageSize;
    const end =
      this.PageSize !== 1.7976931348623157
        ? start + this.PageSize
        : temp.length;
    temp = temp.slice(start, end);
    this.VisibleRows(temp);
    this.Page(page);
  }
}
