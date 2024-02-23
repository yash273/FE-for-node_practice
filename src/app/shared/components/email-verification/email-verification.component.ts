import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [HttpClientModule, MatButtonModule, CommonModule, MatIconModule],
  providers: [UserService],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.scss'
})
export class EmailVerificationComponent {

  message: string = '';
  isSuccess : boolean = false;
  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const token = params['token'];
      if (token) {
        const link = `verify/${token}`;
        this.userService.executeGetUserService(link)
          .subscribe({
            next: (v: any) => {
              this.isSuccess = true;
              this.message = v.message
            },
            error: (e) => {
              this.isSuccess = false;
              this.message = e.error.message
            },
          });
      }
    });
  }
}
