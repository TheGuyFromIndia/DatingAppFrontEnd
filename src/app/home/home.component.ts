import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.getUsers();
  }
  htttp = inject(HttpClient);
  isRegisterd: boolean = false;
  users:any = {};

  toggleRegistration(){
    this.isRegisterd = !this.isRegisterd; 
  }

  getUsers(){
    this.htttp.get('https://localhost:5001/api/Users').subscribe({
      next: respone => this.users = respone,
      error: err => console.log(err),
      complete: () => console.log("Request has been completed")
    })
  }

  cancelRegisterMode(event:boolean){
    this.isRegisterd = event;
  }
}
