import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShareLinkBtnsComponent} from './share-link-btns/share-link-btns.component';
import {CopyLinkBtnComponent} from './copy-link-btn/copy-link-btn.component';
import {CopyApiBtnComponent} from './copy-api-btn/copy-api-btn.component';
import {LinkOverlayComponent} from './link-overlay/link-overlay.component';
import {TranslationsModule} from '@common/core/translations/translations.module';
import {CustomMenuModule} from '@common/core/ui/custom-menu/custom-menu.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    declarations: [
        ShareLinkBtnsComponent,
        CopyLinkBtnComponent,
        CopyApiBtnComponent,
        LinkOverlayComponent,
    ],
    imports: [
        CommonModule,
        TranslationsModule,
        CustomMenuModule,

        // material
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
    ],
    exports: [
        ShareLinkBtnsComponent,
        CopyLinkBtnComponent,
        CopyApiBtnComponent,
        LinkOverlayComponent,
    ]
})
export class SharedModule {
}
