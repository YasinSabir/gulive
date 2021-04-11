import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClickChartsComponent} from './click-charts.component';
import {ChartsModule} from '@common/shared/charts/charts.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {TranslationsModule} from '@common/core/translations/translations.module';
import {ReactiveFormsModule} from '@angular/forms';
import {LoadingIndicatorModule} from '@common/core/ui/loading-indicator/loading-indicator.module';
import {BetweenDateInputModule} from '../../../common/core/ui/between-date-input/between-date-input.module';


@NgModule({
    declarations: [
        ClickChartsComponent,
    ],
    imports: [
        CommonModule,
        ChartsModule,
        TranslationsModule,
        ReactiveFormsModule,
        LoadingIndicatorModule,
        BetweenDateInputModule,

        // material
        MatButtonModule,
        MatIconModule,
        MatButtonToggleModule,
    ],
    exports: [
        ClickChartsComponent,
    ]
})
export class ClickChartsModule {
}
