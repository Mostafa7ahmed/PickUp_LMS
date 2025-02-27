import { IPaginationResponse } from './../../../../Core/Shared/Interface/irespose';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
export interface TableHeader {
  key: string;   // Unique key for the header
  label: string; // Display name for the header
  type: 'string' | 'number' | 'boolean' | 'date'; // Data type

}

export type TableRecord = Record<string, any>; // Dictionary where keys match headers
@Component({
  selector: 'app-tablereused',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tablereused.component.html',
  styleUrl: './tablereused.component.scss'
})
export class TablereusedComponent<T> {
  
  pageSize: number = 5; 
  @Input({required:true}) paginationResponse: IPaginationResponse<T> = {} as IPaginationResponse<T>;
  @Input({required:true}) headers: TableHeader[] = [];
  @Input({required:true}) records: TableRecord[] = [];

  @Output() fetchRemainingDataEvent = new EventEmitter<{ pageNumber?: number; pageSize?: number }>();
      
  collapsePagination = false;

    toggPagination() {
      this.collapsePagination = !this.collapsePagination;
    }

      someMethodToEmitEvent(pageSize: number , pageNumber : number) {
        this.fetchRemainingDataEvent.emit({
          pageNumber: pageNumber, 
          pageSize: pageSize
        });
      } 

      getNextPage(pageNumber:number , pageSize:number ){
        pageNumber = pageNumber + 1;
        this.someMethodToEmitEvent(pageSize , pageNumber)
      }
      getPreviousPage(pageNumber:number , pageSize:number ){

        pageNumber = pageNumber - 1;
        this.someMethodToEmitEvent(pageSize , pageNumber)
      }
      onPageSizeChange(event: Event) {
        const target = event.target as HTMLSelectElement;
        this.pageSize = Number(target.value);
        this.someMethodToEmitEvent(this.pageSize, 1);
      }
}


