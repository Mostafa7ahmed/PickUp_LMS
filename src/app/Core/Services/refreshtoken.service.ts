import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { timer, Subscription, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RefreshtokenService {

  private subscription: Subscription | undefined;

  constructor(private authService: LoginService) {}

  // startTokenRefresh() {
  //   this.subscription = timer(0,  80 * 60 * 2000)
  //     .pipe(
  //       switchMap(() => this.authService.setRefreshToken())
  //     )
  //     .subscribe({
  //       next: (res) => {

  //         localStorage.setItem("UserAuth", res.result.jwt);
  //         localStorage.setItem("refreshToken", res.result.refreshToken);

        
        
  //       },
  //       error: (err) => {
  //         console.log(err)
  //         if(err.error.statusCode =400){
  //           this.authService.SignOut()
  //         }
  //       },
  //     });
  // }
}
