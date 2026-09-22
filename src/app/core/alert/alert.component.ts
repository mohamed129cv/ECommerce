import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AlertService } from '../apis/alert.service';
import { IAlert } from '../interface/alert-interface';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
 constructor(public AlertService : AlertService) {

 }
 alerts :IAlert[] = []
 ngOnInit(): void {
  this.AlertService.alerts$.subscribe(res=>{
    this.alerts = res
  })
 }

}
