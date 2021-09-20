import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuFooterButton, MenuLink, User } from './components';
@Component({
  selector: 'ft-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'frontend-test';
  menuFooterButtons: MenuFooterButton[] = [];
  menuLinks: MenuLink[] = [];
  menuMinimized = false;
  user: User | undefined;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient.get('assets/mock/menu.json').subscribe((data) => {
      this.menuLinks = this.handleMenuLinks(data);
      this.user = this.handleUser(data);
      this.menuFooterButtons = this.handleMenuFooterButtons(data);
    });
  }

  handleMenuToggle() {
    this.menuMinimized = !this.menuMinimized;
  }

  private handleMenuLinks(data: any): MenuLink[] {
    data.menu.links[0].isActive = true;
    let links = data.menu.links;
    const children = links.filter(this.validChildren);
    let parents = links.filter(this.validParents);
    parents.forEach((parent: MenuLink) => {
      parent.children = []
      if(!parent.parentId) {
        children.forEach((child: MenuLink) => {
          if(parent.id === child.parentId) {
            parent.children.push(child);
          }
        });
      }
    });
    return parents;
  }

  private validChildren(links: MenuLink) {
    return links.parentId !== null;
  }
  private validParents(links: MenuLink) {
    return links.parentId === null;
  }

  private handleUser(data: any): User {
    return data.user;
  }

  private handleMenuFooterButtons(data: any): MenuFooterButton[] {
    return data.menu.buttons;
  }
}
