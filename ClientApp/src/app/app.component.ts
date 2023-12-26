import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {    
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router : Router) {
    this.authService.logInState$.subscribe((val: boolean) => {
      this.isLoggedIn = val;
    })
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
