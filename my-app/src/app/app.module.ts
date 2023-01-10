import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridComponent } from './ag-grid/ag-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { InnovationAssuranceComponent } from './innovation-assurance/innovation-assurance.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { HttpClientModule } from '@angular/common/http';
import { SpinnersAngularModule } from 'spinners-angular';
import { AppRoutingModule } from './app.routing.module';
import { OurdataMethodologyComponent } from '../app/ourdata-methodology/ourdata-methodology.component';
import { AnalyticsLiveComponent } from '../app/analytics-live/analytics-live.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CohortBuilderComponent } from './cohort-builder/cohort-builder.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GenerateCohortComponent } from './generate-cohort/generate-cohort.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    AgGridComponent,
    InnovationAssuranceComponent,
    HeaderComponent,
    AnalyticsComponent,
    OurdataMethodologyComponent,
    AnalyticsLiveComponent,
    CohortBuilderComponent,
    GenerateCohortComponent

  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    HttpClientModule,
    SpinnersAngularModule,
    FormsModule ,
    DragDropModule,
    AutocompleteLibModule
  ],
  exports: [
    AppComponent,
    AgGridComponent,
    InnovationAssuranceComponent,
    HeaderComponent,
    AnalyticsComponent,
    SpinnersAngularModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }



