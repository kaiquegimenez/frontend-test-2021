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
    for(let i =0; i < links.length; i++) {
      links[i].children = [];
      if(!links[i].parentId) {
        for(let x=0; x < links.length; x++) {
          if(links[x].parentId === links[i].id) {
            links[i].children?.push(links[x]);
          }
        }
      }
    }
    return links;
  }

  private handleUser(data: any): User {
    return data.user;
  }

  private handleMenuFooterButtons(data: any): MenuFooterButton[] {
    return data.menu.buttons;
  }
}
