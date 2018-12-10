import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {User} from '../../interfaces/user.interface';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  user: User = {
    nombre: '',
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onSubmit(formRegister: NgForm) {
    this.authService
      .register(this.user)
      .then(res => this.router.navigate(['/']))
      .catch(error =>
        Swal({
          title: 'Error!',
          text: error.message,
          type: 'error',
        }),
      );
  }
}
