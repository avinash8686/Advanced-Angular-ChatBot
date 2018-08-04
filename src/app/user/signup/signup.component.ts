import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName: any;
  public lastName: any;
  public mobileNumber: any;
  public email: any;
  public password: any;
  public apiKey: any;


  constructor(public appService: AppService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  public signUp : any = () => {
      if(!this.firstName){
        this.toastr.warning("Enter first name");
      }
      else if(!this.lastName){
        this.toastr.warning("Enter last name");
      }
      else if(!this.mobileNumber){
        this.toastr.warning("Enter mobile number");
      }
      else if(!this.email){
        this.toastr.warning("Enter email");
      }
      else if(!this.password){
        this.toastr.warning("Enter password");
      }
      else if(!this.apiKey){
        this.toastr.warning("Enter api key");
      }
      else {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        mobileNumber: this.mobileNumber,
        email: this.email,
        password: this.password,
        apiKey: this.apiKey
      }
      console.log(data);

      this.appService.signUpService(data).subscribe(
        data=> {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      )
    }
  }
}
