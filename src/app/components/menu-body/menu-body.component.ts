import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';

export interface MenuLink {
  id: number;
  icon: string | null;
  isActive: boolean; // indica se o link está ativo no momento.
  isEnabled: boolean; // indica se o link está disponível - alguns planos de contrato não têm todos os links.
  isVisible: boolean; // indica se o link deve ser mostrado - algumas funcionalidades são habilitadas no futuro.
  isExpanded: boolean;
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
  @ViewChild('childrenOptions') childrenOptions: HTMLElement | any;

  constructor() {}

  ngOnInit(): void {}

  dropOptions(index: any) {
    this.links[index].isExpanded = !this.links[index].isExpanded;
  }
}
