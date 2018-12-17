import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent],
  // indica a angular que estos pueden ser usados externamente (en el Dashboard para este ejemplo)
  exports: [FooterComponent, NavbarComponent, SidebarComponent],
})
export class SharedModule {}
