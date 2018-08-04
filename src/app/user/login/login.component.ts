import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';

import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email:any;
  public password:any;

  constructor(public appService: AppService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
  }

  public signIn : any = () => {
    if(!this.email){
      this.toastr.warning("enter email");
    }
    else if(!this.password){
      this.toastr.warning("enter password");
    }
    else{
      let data = {
        email : this.email,
        password : this.password
      }
      console.log(data);

      this.appService.signInService(data).subscribe(
        data => {
          if(data.status === 200){
            console.log(data);
            
            this.router.navigate(['/chat']);
            // Setting the cookies using ng2-cookies
            Cookie.set('authtoken', data.data.authToken);
            Cookie.set('receiverId', data.data.userDetails.userId);
            Cookie.set('receiverName', data.data.userDetails.firstName+ ' ' + data.data.userDetails.lastName);
            
            // // Using the HTML5 local storage
            this.appService.setUserInfoInLocalStorage(data.data.userDetails);
            
            this.toastr.success("Successfully logged in");
            
          }
        },
        error => {
          this.toastr.error("Some Error Occured");
          console.log(error);
        }
      )
    }
  }
}
