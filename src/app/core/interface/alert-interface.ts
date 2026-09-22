export interface IAlert {
  id : number ,
  alert_type: ''|'main' | 'success' | 'info' | 'error' | 'primary' | 'warning';
  alert_message: string;
  alert_title: string;
  alert_show: boolean;
  alert_time: number;
}

