import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Employee } from "../Employee";
import { AuthService } from "../auth.service";

@Component({
    selector: 'app-employee-list',
    imports: [CommonModule],
    templateUrl: './employee-list.component.html',
    styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employees$: Observable<Employee[]>;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.employees$ = of([]);
    this.fetchData();
  }

  fetchData() {
    const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjJhZjcwMmE0MjZjODllNjA3MDcyNDdiZGE5OGIyODExIiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAvYXBwbGljYXRpb24vby9lbXBsb3llZV9hcGkvIiwic3ViIjoiZTJmMjMxZGNhNTEzN2VkOGIwZGNjYTlkZWYxZTY0NDUzNGE1MjQxZDEwYmIwZTkzM2E4NThmZTJmODdkM2Q1MSIsImF1ZCI6ImVtcGxveWVlX2FwaV9jbGllbnQiLCJleHAiOjE3Njc3OTI2MjcsImlhdCI6MTc2Nzc4OTYyNywiYXV0aF90aW1lIjoxNzY3Nzg5NjI3LCJhY3IiOiJnb2F1dGhlbnRpay5pby9wcm92aWRlcnMvb2F1dGgyL2RlZmF1bHQiLCJhenAiOiJlbXBsb3llZV9hcGlfY2xpZW50IiwidWlkIjoiV0dpS25GcWZzUFVYWTVqeXZCV1NqOG9xNUNFTlAweWJCN2g5SVVBZiJ9.bmqYKUaGdDbo9hhcQPJBzgE-8UqoCaPGyQENMGQTdGRQVl55I4L1_GJvXuG0vuxlkSp4U61BJ6oLSWhurLY5Orn28BKFtrqHFWkL3kKeMKEx4Hdj0JLhb6sMHHn_qkFpZ4D0JhUMQdA9h1ABYh6wz5LBuK6615SZ6gV0WfX2wn3qFeVFIpLPVswfPJDgtEUxDVj6ifWr2IX803jA8XStY_ogmDDVh4a8cBcO3dPMSsTQ_7qq8IaJn3McngK-2a6yQ17ZoK3wyh_B004EAQ-P-4tVYXLPg3E4W9CPl5e1Ht7WsaDO_yrJ_JCnEdSOoC7xN0n5CtcCNYRwaV6BaOX6TTTdp13zxorEK5HNdudlTYMYhwpnE6RSwzsvAxxU8_bYmGSFKdBLWZY5q1p_0gZPrvUZaaUaBWE_C9RFQ85lr-_6ls0uHFDC-oW3k-6vH8fqmdzpQEmvk5oy_gFZRffSExWkxpCTxDKzXcddq7H7YdgXxVSESuw89vbPphXIzkgI7YNwunstcto8jcSqzh0PjeFsEZ9rnE2PoQY0TZ142Yr-xzx5bPHai2IjqMPbZ0WrJ9NN1uRa5A5rx_Y-0feXVEKOS4eXopi2JFx3iRZcpu0awNbXxtNfnWO6HG668tVA4jWjN4UCHRMGKbLoonEP5p6ovZ7fKokEL6iatkefVps"
    this.employees$ = this.http.get<Employee[]>('http://localhost:8089/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    });
  }
}
