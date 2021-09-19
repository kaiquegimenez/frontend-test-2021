import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

export interface MenuLink {
  id: number;
  icon: string | null;
  isActive: boolean; // indica se o link está ativo no momento.
  isEnabled: boolean; // indica se o link está disponível - alguns planos de contrato não têm todos os links.
  isVisible: boolean; // indica se o link deve ser mostrado - algumas funcionalidades são habilitadas no futuro.
  parentId: number | null; // id
  text: string;
  children: MenuLink[];
}

@Component({
  selector: 'ft-menu-body',
  templateUrl: './menu-body.component.html',
  styleUrls: ['./menu-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuBodyComponent implements OnInit {
  @Input() minimize = false;
  @Input() links: MenuLink[] = [];

  constructor() {}

  ngOnInit(): void {
    console.log(this.links[0].children?.length > 0)
    console.log(this.links);
  }
}
