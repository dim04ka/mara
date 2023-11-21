import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Column, ITableColumns, Product } from '../../interfaces/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  dataSource = [];
  @Input() set data(value: any) {
    this.dataSource = value;
  }

  @Output() actionEdit = new EventEmitter<Product>();
  @Output() actionDelete = new EventEmitter<Product>();

  tableColumns: ITableColumns[] = [
    {
      columnDef: Column.Hide,
      header: 'в архиве',
      cell: ({ hide }) => (hide ? 'Да' : 'Нет'),
      // filterType: FILTER_TYPE.TEXT,
      save: (value: any) => {
        console.log('value', value);
        // const { citationFilter } = this.internalAppliedFilters;
        // this.internalAppliedFilters.citationFilter = {
        //   ...citationFilter,
        //   id: value,
        // };
        //
        // this.filterService.applyAllFilters(this.internalAppliedFilters);
      },
    },
    {
      columnDef: Column.Title,
      header: 'Title',
      cell: ({ title }) => title,
      // filterType: FILTER_TYPE.TEXT,
      save: (value: any) => {
        console.log('value', value);
        // const { citationFilter } = this.internalAppliedFilters;
        // this.internalAppliedFilters.citationFilter = {
        //   ...citationFilter,
        //   id: value,
        // };
        //
        // this.filterService.applyAllFilters(this.internalAppliedFilters);
      },
    },
    {
      columnDef: Column.Price,
      header: 'Title',
      cell: ({ price }) => price,
      // filterType: FILTER_TYPE.TEXT,
      save: (value: any) => {
        console.log('value', value);
        // const { citationFilter } = this.internalAppliedFilters;
        // this.internalAppliedFilters.citationFilter = {
        //   ...citationFilter,
        //   id: value,
        // };
        //
        // this.filterService.applyAllFilters(this.internalAppliedFilters);
      },
    },
    {
      columnDef: Column.Images,
      header: 'Image',
      cell: ({ images }) => images[0],
      // filterType: FILTER_TYPE.TEXT,
      save: (value: any) => {
        console.log('value', value);
      },
    },
    {
      columnDef: Column.SmallDescription,
      header: 'SmallDescription',
      cell: ({ small_description }) => small_description,
      // filterType: FILTER_TYPE.TEXT,
      save: (value: any) => {
        console.log('value', value);
      },
    },
    {
      columnDef: Column.FullDescription,
      header: 'FullDescription',
      cell: ({ full_description }) => full_description,
      // filterType: FILTER_TYPE.TEXT,
      save: (value: any) => {
        console.log('value', value);
      },
    },
    {
      columnDef: Column.Category,
      header: 'Category',
      cell: ({ category }) => category,
      // filterType: FILTER_TYPE.TEXT,
      save: (value: any) => {
        console.log('value', value);
      },
    },
  ];
  displayedColumns: Column[] = [
    Column.CustomColumn,
    ...this.tableColumns.map((column: ITableColumns) => column.columnDef),
  ];
  protected readonly Column = Column;

  handleEdit(person: Product) {
    this.actionEdit.emit(person);
    console.log('handleEdit', person);
  }

  handleDelete(person: Product) {
    this.actionDelete.emit(person);
  }
}
