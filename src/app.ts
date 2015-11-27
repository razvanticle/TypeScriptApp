interface IEntity {
    id: number;
}

class CompanyProfile implements IEntity {
    id:number;
    name:string;
    address:string;
    website:string;
    phone:string;
    description:string;
    userId:number;

    user:User;
}

class User implements IEntity {
    id:number;
    name:string;
}

class Repository {
    public get<T extends IEntity>():Array<T> {
        var result:Array<any> = [
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

        return <Array<T>>result;
    }
}

interface IStrategy{

}

abstract class ListBuilder<T extends IEntity> {
    protected entities:Array<T>;
    protected rootElement:HTMLElement;

    constructor(entities:Array<T>) {
        this.entities = entities;

        this.rootElement = document.createElement("table");
    }

    public build():HTMLElement {

        var headerRowElement = document.createElement("tr");
        var headerColumns = this.createHeaderColumns();

        for (var headerColumn of headerColumns) {
            headerRowElement.appendChild(headerColumn);
        }

        this.rootElement.appendChild(headerRowElement);

        //todo: see why this does not work?
        //this.addRow(this.createHeaderColumns);

        for (var entity of this.entities) {
            var rowElement = document.createElement("tr");
            var rowColumns = this.createRowColumns(entity);

            for (var column of rowColumns) {
                rowElement.appendChild(column);
            }

            this.rootElement.appendChild(rowElement);
        }

        return this.rootElement;
    }

    private addRow(createColumns: () => Array<HTMLElement>){
        var rowElement = document.createElement("tr");
        var rowColumns = createColumns();

        for (var column of rowColumns) {
            rowElement.appendChild(column);
        }

        this.rootElement.appendChild(rowElement);
    }

    protected abstract createRowColumns(entity:T):Array<HTMLElement>;

    protected abstract createHeaderColumns():Array<HTMLElement>;

    protected createColumn(innerText:string):HTMLElement {
        var columnElement = document.createElement("td");
        columnElement.innerText = innerText;

        return columnElement;
    }

    protected createHeader(innerText:string):HTMLElement {
        var columnElement = document.createElement("th");
        columnElement.innerText = innerText;

        return columnElement;
    }
}

class CompanyProfileListBuilder extends ListBuilder<CompanyProfile> {
    constructor(entities:Array<CompanyProfile>) {
        super(entities);
    }

    protected createRowColumns(entity:CompanyProfile):Array<HTMLElement> {
        var columns:Array<HTMLElement> =
            [
                this.createColumn(entity.name),
                this.createColumn(entity.address),
                this.createColumn(entity.description),
                this.createColumn(entity.user.name)
            ];

        return columns;
    }

    protected createHeaderColumns():Array<HTMLElement> {
        var columns:Array<HTMLElement> =
            [
                this.createHeader("name"),
                this.createHeader("address"),
                this.createHeader("description"),
                this.createHeader("user")
            ];

        return columns;
    }
}

window.onload = () => {
    var repository = new Repository();
    var data = repository.get<CompanyProfile>();

    var companyProfileListBuilder = new CompanyProfileListBuilder(data);
    var companiesElement = companyProfileListBuilder.build();

    var contentElement = document.getElementById("content");
    contentElement.appendChild(companiesElement);
};