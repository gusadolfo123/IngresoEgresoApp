import {Component, OnInit} from '@angular/core';
import {IngresoEgresoService} from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  constructor(private ingEgreService: IngresoEgresoService) {}

  ngOnInit() {
    this.ingEgreService.initIngresoEgresoListener();
  }
}
