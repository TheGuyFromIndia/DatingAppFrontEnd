import { Component, inject } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  model: any = {};
  loginContext : any = {}
  accountService = inject(AccountService);

  login() {
    this.accountService.login(this.model).subscribe({
      next: respone => {this.loginContext = respone;
      },
      error: err => console.log(err),
      complete: () =>console.log("login Succesful")
    }  
    )
  }

  logout() {
    this.accountService.logout();
  }
}
