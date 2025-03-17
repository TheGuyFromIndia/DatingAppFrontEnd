import { Component, inject } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule, RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  model: any = {};
  loginContext : any = {}
  accountService = inject(AccountService);
  private router = inject(Router);
  private toaster = inject(ToastrService);
  public username: string | undefined = '';

  login() {
    this.accountService.login(this.model).subscribe({
      next: _ => {this.router.navigateByUrl("/members")
        this.username = this.accountService.currentUser()?.username;
      },
      error: err => this.toaster.error(err.error.title),
      complete: () =>this.toaster.success("Login Success")
    }  
    )
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }
}
