import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { MemberCardComponent } from "../member-card/member-card.component";

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {

  memberservice = inject(MembersService);

  ngOnInit(): void {
    if(this.memberservice.members().length === 0){
      this.loadMembers();
    }
  }

  loadMembers(): void{
    this.memberservice.getMembers();
  }

}
