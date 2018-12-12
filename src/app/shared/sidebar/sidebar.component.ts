import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {User} from '../../interfaces/user.interface';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  user: User = {
    nombre: '',
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authService.getCurrentUser().subscribe(user => {
      if (!isNullOrUndefined(user)) {
        this.user.nombre = user.email;
        this.user.email = user.email;
      }
    });
  }

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
