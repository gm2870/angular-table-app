import { Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "../users.service";
import { MatPaginator, MatSort } from "@angular/material";
import { merge, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";

@Component({
  selector: "list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  dataSource = [];

  displayedColumns = [
    "first_name",
    "email",
    "last_name",
    "ip_address",
    "actions"
  ];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private userService: UserService) {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.userService.getUser(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex
          );
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = 1000;
          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;

          return observableOf([]);
        })
      )
      .subscribe(data => {
        this.dataSource = data;
      });
  }
}
