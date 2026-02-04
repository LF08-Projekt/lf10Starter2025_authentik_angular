import {Component, input, output} from '@angular/core';
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
  currentPage = input<string>("");
  askToLeave = input<boolean>(false);

  onLeave = output<() => void>();

  constructor(private authService: AuthService, private router: Router) {

  }

  alreadyOnPage(page: string): boolean {
    return page === this.currentPage();
  }

  attemptLogout() {
    if (this.askToLeave()) {
      this.onLeave.emit(() => this.logout());
    }
    else {
      this.logout();
    }
  }
  logout() {
    this.authService.logout();
  }

  attemtNavigateToEmployees() {
    if (this.askToLeave()) {
      this.onLeave.emit(() => this.navigateToEmployees());
    }
    else {
      this.navigateToEmployees();
    }
  }
  navigateToEmployees() {
    this.router.navigate(['/employees']);
  }

  attemptNavigateToQualifications() {
    if (this.askToLeave()) {
      this.onLeave.emit(() => this.navigateToQualifications());
    }
    else {
      this.navigateToQualifications();
    }
  }
  navigateToQualifications() {
    this.router.navigate(['/qualification']);
  }
}
