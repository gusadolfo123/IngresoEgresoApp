import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  logout() {
    this.authService
      .logout()
      .then(res => {
        this.router.navigate(['/login']);
      })
      .catch(error => {
        Swal({
          title: 'Error!',
          text: error.message,
          type: 'error',
        });
      });
  }
}
