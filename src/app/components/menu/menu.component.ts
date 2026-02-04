import {Component, input} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-menu',
  imports: [
    RouterLink
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  canLeavePage = input<() => boolean>(() => true);
  currentPage = input<string>("");

  constructor(private authService: AuthService, private router: Router) {

  }

  alreadyOnPage(page: string): boolean {
    return page === this.currentPage();
  }

  logout(): void {
    if (this.canLeavePage()) {
      this.authService.logout();
    }
  }

  navigateToEmployees(): void {
    if (this.canLeavePage()) {
      this.router.navigate(['/employees']);
    }
  }

  navigateToQualifications(): void {
    if (this.canLeavePage()) {
      this.router.navigate(['/qualification']);
    }
  }
}
