import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../socket.service';
import { AppService } from '../../app.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Cookie } from 'ng2-cookies/ng2-cookies';


@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
  providers: [SocketService]
  // Above providers make the socket service 
  // local to the module not global.
})
export class ChatBoxComponent implements OnInit {

  public authToken: any;
  public userInfo: any;
  public receiverId: any;
  public receiverName: any;
  // user list is what that contain the names of persons
  // who comes online
  public userList: any [];
  public disconnectedSocket: boolean;


  constructor(public appService: AppService, public socketService: SocketService, public router: Router, public toastr: ToastrService) {
    this.receiverId = Cookie.get('receiverId');
    
    this.receiverName = Cookie.get('receiverName');
   }

  // About App Service
  // Using App Component in this chat-box
  // helps to get the already available data
  // rather than recreating that is already present.

  // About Socket Service
  // It is made global bcoz in future,
  // we can use the already present socket service
  // In other components if needed,
  // rather than creating socket service for each and every module.

  
  ngOnInit() {
    this.authToken = Cookie.get('authToken');

    this.userInfo = this.appService.getUserInfoFromLocalStorage();

    this.checkStatus();

    this.verifyUserConfirmation();

    this.getOnlineUserList();

  }

  // This method enable us to check if the user is authorized to login or not
  // There may be chances that cookie gets destroyed for some reason.
  public checkStatus: any = () => {
    
    if (Cookie.get('authToken') === undefined || Cookie.get('authToken') === '' || Cookie.get('authToken') === null){
      this.router.navigate(['/']);
      return false;
    } else{
      return true;
    }
  }

  public verifyUserConfirmation: any = () => {
    
    this.socketService.verifyUser().subscribe(
      data =>{
        this.disconnectedSocket = false;

        this.socketService.setUser(this.authToken);
        this.getOnlineUserList();
    });
  }

  public getOnlineUserList : any = () => {
    
    this.socketService.onlineUserList().subscribe(
      userList => {
        this.userList = [];

        for(let x in userList) {
          let temp={ 
            'userId':x,
            'name' : userList[x],
            'unread': 0,
            'chatting': false
          };

          this.userList.push(temp);
        }
        console.log(this.userList);
      }
    );

  }
}
