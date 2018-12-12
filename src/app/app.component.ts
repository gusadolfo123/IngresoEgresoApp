import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'AppAdmin';

  constructor(private authServices: AuthService) {}

  ngOnInit() {
    this.authServices.initAuthListener();
  }
}
