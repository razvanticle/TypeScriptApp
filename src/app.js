var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CompanyProfile = (function () {
    function CompanyProfile() {
    }
    return CompanyProfile;
})();
var User = (function () {
    function User() {
    }
    return User;
})();
var Repository = (function () {
    function Repository() {
    }
    Repository.prototype.get = function () {
        var result = [
            {
                id: 1,
                name: "company 1",
                address: "address",
                website: "http://company.com",
                phone: "0040744523365",
                description: "This is an awesome company that does awesome stuff.",
                userId: 1,
                user: {
                    id: 1,
                    name: "john smith"
                }
            },
            {
                id: 2,
                name: "company 2",
                address: "address",
                website: "http://company.com",
                phone: "0040744523365",
                description: "This is an awesome company that does awesome stuff.",
                userId: 2,
                user: {
                    id: 2,
                    name: "john doe"
                }
            },
            {
                id: 3,
                name: "company 3",
                address: "address",
                website: "http://company.com",
                phone: "0040744523365",
                description: "This is an awesome company that does awesome stuff.",
                userId: 3,
                user: {
                    id: 3,
                    name: "jane smith"
                }
            }
        ];
        return result;
    };
    return Repository;
})();
var ListBuilder = (function () {
    function ListBuilder(entities) {
        this.entities = entities;
        this.rootElement = document.createElement("table");
    }
    ListBuilder.prototype.build = function () {
        var headerRowElement = document.createElement("tr");
        var headerColumns = this.createHeaderColumns();
        for (var _i = 0; _i < headerColumns.length; _i++) {
            var headerColumn = headerColumns[_i];
            headerRowElement.appendChild(headerColumn);
        }
        this.rootElement.appendChild(headerRowElement);
        //todo: see why this does not work?
        //this.addRow(this.createHeaderColumns);
        for (var _a = 0, _b = this.entities; _a < _b.length; _a++) {
            var entity = _b[_a];
            var rowElement = document.createElement("tr");
            var rowColumns = this.createRowColumns(entity);
            for (var _c = 0; _c < rowColumns.length; _c++) {
                var column = rowColumns[_c];
                rowElement.appendChild(column);
            }
            this.rootElement.appendChild(rowElement);
        }
        return this.rootElement;
    };
    ListBuilder.prototype.addRow = function (createColumns) {
        var rowElement = document.createElement("tr");
        var rowColumns = createColumns();
        for (var _i = 0; _i < rowColumns.length; _i++) {
            var column = rowColumns[_i];
            rowElement.appendChild(column);
        }
        this.rootElement.appendChild(rowElement);
    };
    ListBuilder.prototype.createColumn = function (innerText) {
        var columnElement = document.createElement("td");
        columnElement.innerText = innerText;
        return columnElement;
    };
    ListBuilder.prototype.createHeader = function (innerText) {
        var columnElement = document.createElement("th");
        columnElement.innerText = innerText;
        return columnElement;
    };
    return ListBuilder;
})();
var CompanyProfileListBuilder = (function (_super) {
    __extends(CompanyProfileListBuilder, _super);
    function CompanyProfileListBuilder(entities) {
        _super.call(this, entities);
    }
    CompanyProfileListBuilder.prototype.createRowColumns = function (entity) {
        var columns = [
            this.createColumn(entity.name),
            this.createColumn(entity.address),
            this.createColumn(entity.description),
            this.createColumn(entity.user.name)
        ];
        return columns;
    };
    CompanyProfileListBuilder.prototype.createHeaderColumns = function () {
        var columns = [
            this.createHeader("name"),
            this.createHeader("address"),
            this.createHeader("description"),
            this.createHeader("user")
        ];
        return columns;
    };
    return CompanyProfileListBuilder;
})(ListBuilder);
window.onload = function () {
    var repository = new Repository();
    var data = repository.get();
    var companyProfileListBuilder = new CompanyProfileListBuilder(data);
    var companiesElement = companyProfileListBuilder.build();
    var contentElement = document.getElementById("content");
    contentElement.appendChild(companiesElement);
};
