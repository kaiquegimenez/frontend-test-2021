import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

export interface User {
  name: string;
  role: string;
}

@Component({
  selector: 'ft-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuHeaderComponent {
  @Input() minimize = false;
  @Input() user: User | undefined;
  @Output() toggle = new EventEmitter();

  handleClick() {
    this.toggle.emit();
  }

  shortName(name: any) {
    const arrayName = name?.split(' ');
    let shortName = '';
    arrayName?.forEach((name: string) => {
      shortName += name[0]
    });
    return shortName;
  }
}
