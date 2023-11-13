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
export class BugListComponent implements OnInit,OnDestroy, AfterViewInit {

  bugList : MatTableDataSource<Bug> = new MatTableDataSource<Bug>([]);
  displayedColumns: string[] = ['title', 'priority', 'reporter', 'created', 'status'];
  
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private bugService: BugService, private router: Router) {

    bugService.getAll(new Map<string, string>).subscribe({
      next: (data) => {
        this.bugList = new MatTableDataSource<Bug>(data);
        this.bugList.sort = this.sort;
        console.log(this.bugList);
      }
    })

  }

  ngAfterViewInit() {
    this.bugList.sort = this.sort;
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
      default:
        return field;
    }
  }

  navigateToNew() {
    this.router.navigate(['bug', 'new']);
  }

}
