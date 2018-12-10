import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {User} from '../../interfaces/user.interface';
import Swal from 'sweetalert2';
import {isNullOrUndefined} from 'util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  user: User = {
    nombre: '',
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onLogin(formLogin: NgForm) {
    if (formLogin.valid) {
      this.authService
        .login(this.user)
        .then(res => {
          this.router.navigate(['/']);
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
}
