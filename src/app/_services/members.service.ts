import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/member';
import { of } from 'rxjs/internal/observable/of';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private http = inject(HttpClient);
  members = signal<Member[]>([]); 
  baseUrl = environment.apiUrl;

  getMembers(){
    return this.http.get<Member[]>(this.baseUrl +  'users').subscribe({
      next: member => this.members.set(member)
    });
  }

  getMember(username: string){
    const member = this.members().find(x => x.name === username);

    if(member !== undefined){
      return of(member);
    }
    return this.http.get<Member>(this.baseUrl + 'users/' + username)
  }

  updateMember(member: Member){
    return this.http.put(this.baseUrl + "users", member).pipe(
      tap(() => {
        this.members.update(x => x.map( m => m.name === member.name ? member : m))
      })
    );
  }

}
