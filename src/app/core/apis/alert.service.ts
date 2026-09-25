import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAlert } from '../interface/alert-interface';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }
  private alertsSub = new BehaviorSubject<IAlert[]>([])
  alerts$ = this.alertsSub.asObservable();
  private alerts: IAlert[] = [];
  add_alert(type: IAlert['alert_type'], msg: string, title: string, time: number) {
    const new_alert = {
      id: Date.now(),
      alert_type: type,
      alert_message: msg,
      alert_title: title,
      alert_show: false,
      alert_time: time
    }
    this.alerts.push(new_alert);
    this.alertsSub.next(this.alerts);
    setTimeout(()=>{
      new_alert.alert_show = true
      this.alertsSub.next(this.alerts);
    } , 20)
    setTimeout(() => {
      this.remove_alert(new_alert.id)
    }, time )
  }

  remove_alert(id: number) {
    let alert = this.alerts.find(alert => alert.id == id)
    if (!alert) return
    alert.alert_show = false
    this.alertsSub.next(this.alerts)
    setTimeout(()=>{
      this.alerts = this.alerts.filter(a => a.id !== id)
      this.alertsSub.next(this.alerts)
    },100)
  }

}
