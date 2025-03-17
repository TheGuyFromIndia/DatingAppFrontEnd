import { Component, inject, output, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  cancelRegister = output<boolean>();
  model: any = {};
  accountService = inject(AccountService);
  private toastr = inject(ToastrService);
  
  register() {
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error : err => this.toastr.error(err.error)
    });
    console.log(this.model);
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

}
