import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BugService } from '../bug.service';
import { Bug } from '../bug-dto';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {Router} from "@angular/router";

@Component({
  selector: 'app-bug-list',
  templateUrl: './bug-list.component.html',
  styleUrls: ['./bug-list.component.scss']
})
export class BugListComponent implements OnInit,OnDestroy {

  bugList : MatTableDataSource<Bug> = new MatTableDataSource<Bug>([]);
  displayedColumns: string[] = ['title', 'priority', 'reporter', 'created', 'status', 'actions'];
  lastSortedColumn: string = "";
  lastSorting: string = "";
  
  constructor(private bugService: BugService, private router: Router) {

    bugService.getAll(new Map<string, string>).subscribe({
      next: (data) => {
        this.bugList = new MatTableDataSource<Bug>(data);
        console.log(this.bugList);
      }
    })

  }

  ngOnDestroy(): void {
    
  }
  ngOnInit(): void {
    
  }

  public getTitle(field: string) : string{
    switch (field) {
      case 'title':
        return 'Title';
      case 'priority':
        return 'Priority';
      case 'reporter':
        return 'Reporter';  
      case 'created':
        return 'Date Created';
      case 'status':
        return 'Status';        
      case 'actions':
        return 'Actions';
      default:
        return field;
    }
  }

  navigateToNew() {
    this.router.navigate(['bug', 'new']);
  }

  sort(column:string) {
    let queryMap = new Map<string, string>;

    if (this.lastSortedColumn == column) {
      this.lastSortedColumn = column;
      if (this.lastSorting == "asc") {
        this.lastSorting = "desc";
        queryMap.set("_sort", this.lastSortedColumn);
        queryMap.set("_order", this.lastSorting);  
      } else if (this.lastSorting == "desc") {
        this.lastSorting = "";
        this.lastSortedColumn = "";
      } else {
        this.lastSorting = "asc";
        queryMap.set("_sort", this.lastSortedColumn);
        queryMap.set("_order", this.lastSorting);
      }
    } else {
      this.lastSorting = "asc";
      this.lastSortedColumn = column;
      queryMap.set("_sort", this.lastSortedColumn);
      queryMap.set("_order", this.lastSorting);
    }
    
    console.log(queryMap);
    this.bugService.getAll(queryMap).subscribe({
      next: (data) => {
        this.bugList = new MatTableDataSource<Bug>(data);
        console.log(this.bugList);
      }
    })

  }


}
