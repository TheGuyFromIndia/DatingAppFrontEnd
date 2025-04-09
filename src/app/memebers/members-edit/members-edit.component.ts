import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../_models/member';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { TabsModule} from 'ngx-bootstrap/tabs'
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-members-edit',
  standalone: true,
  imports: [TabsModule, GalleryModule, FormsModule],
  templateUrl: './members-edit.component.html',
  styleUrl: './members-edit.component.css'
})
export class MembersEditComponent implements OnInit {
  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) notify($event: any){
    if(this.editForm?.dirty){
      $event.returnValue = true;
    }
  }
  member?: Member;
  private accountService = inject(AccountService);
  private memberService = inject(MembersService);
  private toasterService = inject(ToastrService);

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    const user = this.accountService.currentUser();
    if(!user){
      return;
    }

    this.memberService.getMember(user.userName).subscribe({
      next: member => {
        this.member = member;
      }
    })
  }

  editMemeber(){
    console.log(this.member);
    this.memberService.updateMember(this.member!).subscribe({
      next : () => {
        this.toasterService.success("Profile updated");
    this.editForm?.reset(this.member);
      }
    });
    
  }


}
