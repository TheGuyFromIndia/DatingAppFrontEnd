import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  htttp = inject(HttpClient);
  title = 'This is a test';
  users: any;

  ngOnInit(): void {
    this.htttp.get('https://localhost:7147/api/UsersControlller').subscribe({
      next: respone => this.users = respone,
      error: err => console.log(err),
      complete: () => console.log("Request has been completed")
    })
  }
}
