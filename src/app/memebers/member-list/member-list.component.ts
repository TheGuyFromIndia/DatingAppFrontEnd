import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/member';
import { ToastrService } from 'ngx-toastr';
import { MemberCardComponent } from "../member-card/member-card.component";

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {

  private memberservice = inject(MembersService);
  private toastrservice = inject(ToastrService);
  members: Member[] = [];

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void{
    this.memberservice.getMembers().subscribe({
      next: resp => this.members = resp,
      error: err => {
        this.toastrservice.error("Something Went Wrong");
        console.log(err);
      }
    })
  }

}
