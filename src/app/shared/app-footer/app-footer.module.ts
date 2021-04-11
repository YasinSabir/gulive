import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppFooterComponent} from './app-footer.component';
import {CustomMenuModule} from '@common/core/ui/custom-menu/custom-menu.module';
import {TranslationsModule} from '@common/core/translations/translations.module';


@NgModule({
    declarations: [
        AppFooterComponent
    ],
    imports: [
        CommonModule,
        CustomMenuModule,
        TranslationsModule,
    ],
    exports: [
        AppFooterComponent,
    ]
})
export class AppFooterModule {
}
