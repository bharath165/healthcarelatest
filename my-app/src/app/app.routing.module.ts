import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AnalyticsComponent } from './analytics/analytics.component';
import { InnovationAssuranceComponent } from './innovation-assurance/innovation-assurance.component';
import { OurdataMethodologyComponent } from '../app/ourdata-methodology/ourdata-methodology.component';
import { AnalyticsLiveComponent } from '../app/analytics-live/analytics-live.component';
import { CohortBuilderComponent } from '../app/cohort-builder/cohort-builder.component';

@NgModule({
    declarations: [
    ],
    imports: [
        RouterModule.forRoot([
            { path: 'analytics', component: AnalyticsComponent },
            { path: 'analytics-live', component: AnalyticsLiveComponent },
            { path: 'ourdata-methodology', component: OurdataMethodologyComponent },
            { path: '', component : InnovationAssuranceComponent},
            { path: 'cohort-builder', component : CohortBuilderComponent}
        ]),
        RouterModule.forChild([
            { path: 'analytics', component: AnalyticsComponent },
            { path: 'analytics-live', component: AnalyticsLiveComponent },
            { path: 'ourdata-methodology', component: OurdataMethodologyComponent },
            { path: '', component : InnovationAssuranceComponent},
            { path: 'cohort-builder', component : CohortBuilderComponent}
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [],

})
export class AppRoutingModule { }


