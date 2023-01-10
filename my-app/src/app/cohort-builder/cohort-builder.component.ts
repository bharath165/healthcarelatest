import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgSelectModule } from "@ng-select/ng-select";
import { ElementRef, ViewChild } from "@angular/core";
import {
  CdkDragStart,
  CdkDragMove,
  CdkDragDrop,
  moveItemInArray,
  copyArrayItem,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import DiseaseStateDropdownJson from "src/assets/json/diseaseStateDropdown.json";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { AppService } from "../app.service";
import { takeUntil } from "rxjs/operators";
@Component({
  selector: "app-cohort-builder",
  templateUrl: "./cohort-builder.component.html",
  styleUrls: ["./cohort-builder.component.scss"]
})
export class CohortBuilderComponent implements OnInit {
  
  //diseaseStates: any = (DiseaseStateDropdownJson as any).default;
  diseaseStates: any = [];


  @ViewChild("diseaseStateAutocomplete") diseaseStateAutocomplete: any;
  

  constructor(private httpClient: HttpClient, private appService: AppService) {}
  criterias = [
    {
      id: 1,
      value: "diseasestate",
      name: "Disease State"
    },
    {
      id: 2,
      value: "medication",
      name: "Medication"
    },
    {
      id: 3,
      value: "icd10code",
      name: "ICD10 Code"
    },
    {
      id: 4,
      value: "conceptid",
      name: "Concept ID"
    },
    {
      id: 5,
      value: "rxnorm",
      name: "RxNorm#"
    },
    {
      id: 6,
      value: "conceptid",
      name: "Concept ID"
    },
    {
      id: 7,
      value: "gpi",
      name: "GPI"
    },
    {
      id: 8,
      value: "dateofbirth",
      name: "Date Of Birth"
    },
    {
      id: 9,
      value: "age",
      name: "Age"
    },
    {
      id: 10,
      value: "gender",
      name: "Gender"
    },
    {
      id: 11,
      value: "patientZipcode",
      name: "Patient Zip Code"
    },
    {
      id: 12,
      value: "state",
      name: "State"
    },
    {
      id: 13,
      value: "prescriptionDate",
      name: "Prescription Date"
    },
    {
      id: 14,
      value: "ndc",
      name: "NDC"
    }
  ];

  genders = [
    {
      label: "Male",
      isChecked: false
    },
    {
      label: "Female",
      isChecked: false
    },
    {
      label: "Others",
      isChecked: false
    },
    {
      label: "None Specified",
      isChecked: false
    }
  ];
  selectedCriteria = "";
  selectedIncCriterias = [];
  selectedExlCriterias = [];

  isShowTag = false;
  isShowTag1 = false;

  showIncAddValue = false;
  showExcAddValue = false;
  isShowAgeInputs = [];
  isShowExAgeInputs = [];

  dragPosition = { x: 0, y: 0 };

  trackByIndex;
  _currentIndex;
  _currentField;

  isPreview = false;
  keyword = "Disease";

  valueDiseaseState: any = "Equals";
  isFromListInc = [];
  isFromListExc = [];

  isSaveCohort: boolean = false;
  DiseaseGrid = false;
  asthmaGrid=false;
  diabeticsGrid = false;
  diseaseName:string;
  AgLoad = false;
  FormattedData1=[];
  FormattedData2=[];
  FormattedData3=[];
  FormattedData4=[];
  gridData1: any;
  gridData2: any;
  gridData3: any;
  gridData4: any;
  gridDataD1: any;
  gridDataD2: any;
  gridDataD3: any;
  gridDataD4: any;
  gridNumber: number;
  destroy$: Subject<boolean> = new Subject<boolean>();
  showDiseaseState = false;
  ColumnDefs;
  grid1ColumnDefs;
  grid2ColumnDefs;
  grid3ColumnDefs;
  grid4ColumnDefs;

  inclusionCriteria = [];
  exclusionCriteria = [];

  add: number = 0;
  allCount: number = 0;

  selectedDiseaseStateFilter: any = "Contains";
  ngOnInit(): void {
    console.log("class loading...");
    this.GetAgColumns();
    
  }
  getAllDiseaseState() {
    console.log('get all disease called');
    this.httpClient
      .get("assets/json/diseaseStateDropdown.json")
      .subscribe(data => {
        this.diseaseStates = data;
      });
  }

  GetAgColumns() {
    this.grid1ColumnDefs = [
      {
        headerName: "ICD10_ID",
        field: "ICD10_ID",
        sortable: true,
        filter: true
      },
      { headerName: "Disease", field: "Disease", sortable: true, filter: true }
    ];

    this.grid2ColumnDefs = [
      {
        headerName: "Rx_Unique_ID",
        field: "Rx_Unique_ID",
        sortable: true,
        filter: true
      },
      { headerName: "Rx_Code", field: "Rx_Code", sortable: true, filter: true },
      {
        headerName: "Drugname",
        field: "Drugname",
        sortable: true,
        filter: true
      }
    ];

    this.grid3ColumnDefs = [
      {
        headerName: "GENERIC_PROD_ID_NAME",
        field: "GENERIC_PROD_ID_NAME",
        sortable: true,
        filter: true
      },
      { headerName: "COUNT", field: "COUNT", sortable: true, filter: true }
    ];

    this.grid4ColumnDefs = [
      { headerName: "Code", field: "Code", sortable: true, filter: true },
      { headerName: "NDC", field: "NDC", sortable: true, filter: true },
      { headerName: "STR", field: "STR", sortable: true, filter: true }
    ];
  }

  selectDiseaseState(item) {
    const tempIndex = this.diseaseStates.findIndex(x => x.UID === item.UID);

    if (tempIndex === -1) {
      this.diseaseStates.shift();
      this.diseaseStates.push(item);
    }
    this.diseaseStateAutocomplete.clear();
    setTimeout(() => {
      this.diseaseStateAutocomplete.searchInput.nativeElement.value = "";
    }, 10);
  }

  getDiseaseState(event) {
    this.httpClient
      .get("assets/json/diseaseStateDropdown.json")
      .subscribe(data => {
        this.diseaseStates = data;
      });
  }

  deleteAllTag() {
    this.selectedCriteria = "";
    this.selectedExlCriterias = [];
    this.selectedIncCriterias = [];
    this.inclusionCriteria = [];
    this.exclusionCriteria = [];
    this.isShowTag = false;
    this.isShowTag1 = false;
    this.showIncAddValue = false;
    this.showExcAddValue = false;
    this.DiseaseGrid =false;
    this.asthmaGrid=false;
    this.diabeticsGrid=false;
    // this.gridData1 =[];
    // this.gridData2 =[];
    // this.gridData3 =[];
    // this.gridData4 =[];
    // this.FormattedData1 =[];
    // this.FormattedData2 =[];
    // this.FormattedData3 =[];
    // this.FormattedData4 =[]; 
    window.location.reload();
    
  }

  deleteIncTag(i) {
    this.selectedIncCriterias.splice(i, 1);
    this.inclusionCriteria = this.selectedIncCriterias;
    if (this.selectedIncCriterias.length === 0) {
      this.isShowTag = false;
    }
  }

  deleteExcTag(i) {
    this.selectedExlCriterias.splice(i, 1);
    this.exclusionCriteria = this.selectedExlCriterias;
    if (this.selectedExlCriterias.length === 0) {
      this.isShowTag1 = false;
    }
  }

  addValue() {
    if (this.selectedIncCriterias.length !== 0) {
      this.showIncAddValue = true;
    }
    if (this.selectedExlCriterias.length !== 0) {
      this.showExcAddValue = true;
    }
  }

  dropInclusion(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      //this.inclusionCriteria = [];
      this.inclusionCriteria = event.container.data;
      if (this.inclusionCriteria.length !== 0) {
        for (let index = 1; index < this.inclusionCriteria.length; index++) {
          if (
            this.inclusionCriteria[index].id === this.inclusionCriteria[0].id
          ) {
            // this.selectedIncCriterias.splice(0, 1);
            this.inclusionCriteria.splice(0, 1);
            this.selectedIncCriterias = [...this.inclusionCriteria];
          }
          if (this.inclusionCriteria[index].id === 1) {
            this.add = index;
          }
        }
        this.selectedIncCriterias = [...this.inclusionCriteria];
      }
    }
    if (
      this.selectedIncCriterias.length !== 0 ||
      this.inclusionCriteria.length !== 0
    ) {
      this.isShowTag = true;
    }
    if (this.selectedExlCriterias.length !== 0) {
      this.isShowTag1 = true;
    }
  }

  dropExclusion(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.exclusionCriteria = event.container.data;
      if (this.exclusionCriteria.length !== 0) {
        for (let index = 1; index < this.exclusionCriteria.length; index++) {
          if (
            this.exclusionCriteria[index].id === this.exclusionCriteria[0].id
          ) {
            this.selectedExlCriterias.splice(0, 1);
            this.exclusionCriteria = [...this.selectedExlCriterias];
          }
          if (this.exclusionCriteria[index].id === 1) {
            this.add = index;
          }
        }
        this.exclusionCriteria = [...this.selectedExlCriterias];
      }
    }
    if (this.selectedIncCriterias.length !== 0) {
      this.isShowTag = true;
    }
    if (this.selectedExlCriterias.length !== 0) {
      this.isShowTag1 = true;
    }
  }

  saveAsCohort() {
    this.isPreview = true;
  }

  onChange(e, i) {
    if (e.target.value === "Between" || e.target.value === "Not Between") {
      this.isShowAgeInputs[i] = true;
    } else {
      this.isShowAgeInputs[i] = false;
    }
  }
  onChangeEx(e, i) {
    if (e.target.value === "Between" || e.target.value === "Not Between") {
      this.isShowExAgeInputs[i] = true;
    } else {
      this.isShowExAgeInputs[i] = false;
    }
  }
  onChangeIncDiseaseState(event, i) {
    this.selectedDiseaseStateFilter = event.target.value;
    if (this.selectedDiseaseStateFilter === "From List") {
      this.isFromListInc[i] = true;
    } else {
      this.isFromListInc[i] = false;
    }
  }

  onChangeExcDiseaseState(event, i) {
    if (event.target.value === "From List") {
      this.isFromListExc[i] = true;
    } else {
      this.isFromListExc[i] = false;
    }
  }

  excChecked() {}
  incChecked() {}

   diseaseStateGenerate(type, i) {
    this.showDiseaseState = true;
    let input = document.getElementById(type + i) as HTMLInputElement | null;
    
    
    if (input !== null) {
      this.diseaseName=input.value;
        }
    if (
      this.diseaseName === "asthma" ||
      this.diseaseName === "astma" ||
      this.diseaseName === "astmma" ||
      this.diseaseName === "asthma"
    ) {
      this.diseaseName = "asthma";
      this.asthmaGrid = true;
      this.allCount++;
    }
    if (
      this.diseaseName === "diabetic" ||
      this.diseaseName === "diabeteic" ||
      this.diseaseName === "diabetes type 2" ||
      this.diseaseName=== "type 2 diabetes" ||
      this.diseaseName=== "diabetes" ||
      this.diseaseName === "diabetestype2" ||
      this.diseaseName === "type2diabetes"
    ) {
      this.diseaseName = "diabetic";
      this.diabeticsGrid = true;
      this.allCount++;
      // this.getDrugInfoDiabetic( this.diseaseName);
    }
     this.DiseaseGrid=true;
      this.getDrugInfo(    this.diseaseName.toLowerCase()   );
    // }
    
  }

  getDrugInfo(name) {
    console.log("getdruginfo "+ name);
    this.AgLoad = true;

    this.appService

      .getGridData(1, name)
      .pipe(takeUntil(this.destroy$))
      .subscribe((gridData: any[]) => {
        setTimeout(() => {
          //console.log(gridData);
          for(let i =0;i<gridData.length;i++){
            this.FormattedData1.push({"ICD10_ID":gridData[i][0],"Disease":gridData[i][1]});
           
        }
      //  console.log(this.FormattedData1)
          this.gridData1 = this.FormattedData1;
         console.log(this.gridData1);
         // console.log(this.gridData1);
          this.getDrugInfo1(name);
        }, 4000);
      });
  }
  getDrugInfo1(name) {
    this.appService
      .getGridData(2, name)
      .pipe(takeUntil(this.destroy$))
      .subscribe((gridData: any[]) => {
        setTimeout(() => {
          for(let i =0;i<gridData.length;i++){
            this.FormattedData2.push({"Rx_Unique_ID":gridData[i][0],"Rx_Code":gridData[i][1],"Drugname":gridData[i][2]});
        }
          this.gridData2 = this.FormattedData2;
          this.getDrugInfo2(name);
        }, 4000);
      });
  }

  getDrugInfo2(name) {
    this.appService
      .getGridData(3, name)
      .pipe(takeUntil(this.destroy$))
      .subscribe((gridData: any[]) => {
        setTimeout(() => {
          for(let i =0;i<gridData.length;i++){
            this.FormattedData3.push({"ICD10_ID":gridData[i][0],"Disease":gridData[i][1]});
        }
          this.gridData3 = this.FormattedData3;
          this.getDrugInfo3(name);
        }, 4000);
      });
  }

  getDrugInfo3(name) {
    this.appService
      .getGridData(4, name)
      .pipe(takeUntil(this.destroy$))
      .subscribe((gridData: any[]) => {
        setTimeout(() => {
          for(let i =0;i<gridData.length;i++){
            this.FormattedData4.push({"Code":gridData[i][0],"NDC":gridData[i][1],"STR":gridData[i][2]});
        }
          this.gridData4 = this.FormattedData4;

          this.AgLoad = false;
        }, 4000);
      });
  }

  getDrugInfoDiabetic(name) {
    this.AgLoad = true;

    this.appService
      .getGridData(1, name)
      .pipe(takeUntil(this.destroy$))
      .subscribe((gridData: any[]) => {
        setTimeout(() => {
          this.gridDataD1 = gridData;

          this.getDrugInfoDiabetic1(name);
        }, 4000);
      });
  }
  getDrugInfoDiabetic1(name) {
    this.appService
      .getGridData(2, name)
      .pipe(takeUntil(this.destroy$))
      .subscribe((gridData: any[]) => {
        setTimeout(() => {
          this.gridDataD2 = gridData;
          this.getDrugInfoDiabetic2(name);
        }, 4000);
      });
  }

  getDrugInfoDiabetic2(name) {
    this.appService
      .getGridData(3, name)
      .pipe(takeUntil(this.destroy$))
      .subscribe((gridData: any[]) => {
        setTimeout(() => {
          this.gridDataD3 = gridData;
          this.getDrugInfoDiabetic3(name);
        }, 4000);
      });
  }

  getDrugInfoDiabetic3(name) {
    this.appService
      .getGridData(4, name)
      .pipe(takeUntil(this.destroy$))
      .subscribe((gridData: any[]) => {
        setTimeout(() => {
          this.gridDataD4 = gridData;

          this.AgLoad = false;
        }, 4000);
      });
  }

  addCohort(i) {
    let item = {
      id: 1,
      value: "diseasestate",
      name: "Disease State"
    };

    this.selectedIncCriterias.splice(i + 1, 0, item);
    this.add = i + 1;
  }
  addExcCohort(i) {
    let item = {
      id: 1,
      value: "diseasestate",
      name: "Disease State"
    };
    this.selectedExlCriterias.splice(i + 1, 0, item);
    this.add = i + 1;
  }

  generateCohort() {
    console.log("generate cohort line 569");
    console.log("generate cohort before for loop"+this.selectedIncCriterias.values)

    for (let index = 0; index < this.selectedIncCriterias.length; index++) {
      if (this.selectedIncCriterias[index].id === 1) {
        console.log("generate cohort line 572" +this.selectedIncCriterias.values);
        this.diseaseStateGenerate("inc", index);
      }else {
        console.log("generate cohort else part"+this.selectedIncCriterias.values)
      }
    }
  }

}





