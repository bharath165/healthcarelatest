import { Component, OnDestroy, OnInit  } from '@angular/core';
import { Subject } from 'rxjs';
import { AppService } from '../app.service';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit , OnDestroy {
   ColumnDefs;
  grid1ColumnDefs;
  grid2ColumnDefs;
  grid3ColumnDefs;
  grid4ColumnDefs;
  gridData1: any;
  gridData2: any;
  gridData3: any;
  gridData4: any;
  AgLoad = false;
  gridNumber: number;
  searchText: string;
  asthmaGrid = false;
  diabeticsGrid = false;
  constructor(private appService: AppService) { }

  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit() {
    this.GetAgColumns();
  }
  GetAgColumns() {

    this.grid1ColumnDefs = [
      { headerName: 'ICD10_ID', field: 'ICD10_ID', sortable: true, filter: true },
      { headerName: 'Disease', field: 'Disease', sortable: true, filter: true },
    ];

    this.grid2ColumnDefs = [
      { headerName: 'Rx_Unique_ID', field: 'Rx_Unique_ID', sortable: true, filter: true },
      { headerName: 'Rx_Code', field: 'Rx_Code', sortable: true, filter: true },
      { headerName: 'Drugname', field: 'Drugname', sortable: true, filter: true },
    ];

    this.grid3ColumnDefs = [
      { headerName: 'GENERIC_PROD_ID_NAME', field: 'GENERIC_PROD_ID_NAME', sortable: true, filter: true },
      { headerName: 'COUNT', field: 'COUNT', sortable: true, filter: true },
    ];

    this.grid4ColumnDefs = [
      { headerName: 'Code', field: 'Code', sortable: true, filter: true },
      { headerName: 'NDC', field: 'NDC', sortable: true, filter: true },
      { headerName: 'STR', field: 'STR', sortable: true, filter: true }
    ];
  }

  modalChanged(event: any) {
    if (this.searchText === '') {
      this.gridData1 = [];
      this.gridData2 = [];
      this.gridData3 = [];
      this.gridData4 = [];
      this.asthmaGrid = false;
    }
  }

  getDrugInfo(gridNumber: number) {
    // switch (gridNumber) {
    //   case 1:
    //     this.gridData1 = [];
    //     break;
    //   case 2:
    //     this.gridData2 = [];
    //     break;
    //   case 3:
    //     this.gridData3 = [];
    //     break;
    //   case 4:
    //     this.gridData4 = [];
    //     break;
    // }
    this.asthmaGrid = false;
    this.diabeticsGrid = false;
    this.AgLoad = true;
    this.gridNumber = gridNumber;
    this.appService.getGridData(gridNumber, this.searchText).pipe(takeUntil(this.destroy$)).subscribe((gridData: any[]) => {
      setTimeout(() => {
        this.AgLoad = false;
        if (gridNumber === 1) {
          this.gridData1 = gridData;
        } else if (gridNumber === 2) {
          this.gridData2 = gridData;
        } else if (gridNumber === 3) {
          this.gridData3 = gridData;
          if (['asthma' , 'astma' , 'astmma'].includes(this.searchText?.toLowerCase())  ) {
            this.asthmaGrid = true;
          } else  if (['diabetics', 'diabetic' , 'diabeteic', 'diabetes type 2', 'type 2 diabetes' , 'diabetes','diabetestype2', 'type2diabetes' ].includes(this.searchText?.toLowerCase())  ) {
            this.diabeticsGrid = true;
          }
        } else if (gridNumber === 4) {
          this.gridData4 = gridData;
        }
      }, 4000);
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  


  }
  
