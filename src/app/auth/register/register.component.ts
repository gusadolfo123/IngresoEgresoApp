import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onSubmit(formRegister: NgForm) {
    console.log(formRegister);
  }
}
