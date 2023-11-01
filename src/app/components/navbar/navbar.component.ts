import { Component, Input, inject, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  router = inject(Router);
  @Input() username: string | null | undefined;
  usernameFirstLetter: string | null | undefined;

  constructor() {}

  ngOnInit() {
    this.usernameFirstLetter = this.username?.charAt(0).toUpperCase();
  }

  logout() {
    localStorage.removeItem('username')
    this.router.navigate(['']);
  }
}
