///<reference path="PredictionModel.ts" />
///<reference path="RowModel.ts" />
var TableModel = /** @class */ (function () {
  function TableModel() {
    this._predictions = [];
    this.VisibleRows = ko.observableArray([]);
    this.Page = ko.observable(1);
    this.Pages = ko.observable();
    this.SortBy = ko.observable("none");
    this.PageSize = Number.MAX_VALUE;
  }
  TableModel.prototype.AddPrediction = function (rawPrediction) {
    var prediction = new PredictionModel(rawPrediction);
    this._predictions.push(prediction);
  };
  TableModel.prototype.SetSorting = function (sort) {
    switch (sort) {
      case "time-asc":
        alert("Implement Sort By Time ASC");
        break;
      case "time-desc":
        alert("Implement Sort By Time DESC");
        break;
    }
    this.SortBy(sort);
  };
  TableModel.prototype.SetPageSize = function (pageSize) {
    this.PageSize = pageSize;
    this.Pages(Math.ceil(this._predictions.length / this.PageSize));
  };
  TableModel.prototype.SetPage = function (page) {
    let temp = this._predictions.map((d) => new RowModel(d));
    const start = (page - 1) * this.PageSize;
    const end =
      this.PageSize !== 1.7976931348623157
        ? start + this.PageSize
        : temp.length;
    temp = temp.slice(start, end);
    this.VisibleRows(temp);
    this.Page(page);
  };
  return TableModel;
})();
