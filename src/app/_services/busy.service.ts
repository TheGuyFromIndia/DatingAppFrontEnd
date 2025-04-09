import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busySpinnerCount = 0;
  private spinnerService = inject(NgxSpinnerService);

  busy(){
    this.busySpinnerCount++;
    this.spinnerService.show(undefined,{
      type: 'pacman',
      bdColor: '(rgba(255,255,255,0))',
      color: '#FFFF00'
    });
  }

  idle(){
    this.busySpinnerCount--;
    if(this.busySpinnerCount <= 0){
      this.busySpinnerCount = 0;
      this.spinnerService.hide();
    }
  }

}
