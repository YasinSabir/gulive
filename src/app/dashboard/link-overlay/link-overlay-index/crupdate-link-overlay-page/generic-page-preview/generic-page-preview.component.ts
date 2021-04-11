import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'generic-page-preview',
  templateUrl: './generic-page-preview.component.html',
  styleUrls: ['./generic-page-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericPagePreviewComponent {}
