class TablePropertyModel {
  id: string
  columnName: string
  columnType: string

  constructor(id: string, columnName: string, columnType: string) {
    this.id = id
    this.columnName = columnName
    this.columnType = columnType
  }

  static fromJSON(prop: any): TablePropertyModel {
    return new TablePropertyModel(prop.id, prop.columnName || '', prop.columnType || '')
  }

  asJSON = () => ({
    id: this.id,
    columnName: this.columnName,
    columnType: this.columnType,
  })
}

export default TablePropertyModel
