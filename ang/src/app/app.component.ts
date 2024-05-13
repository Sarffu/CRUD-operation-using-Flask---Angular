import { Component, OnInit } from '@angular/core';
import { UserDataService } from './services/user-data.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userId: number | undefined
  addUser(arg0: any) {
    throw new Error('Method not implemented.');
  }
  title = 'Flask-Angular Api CRUD';
  users: any;
  showUpdateForm: any;
  updateId: any;
  // userId:any;
  constructor(private userData: UserDataService) {
    // UserdataService's const is created by userData..
    userData.users().subscribe((data) => {
      console.warn("data", data);
      this.users = data
      this.refresh();
    })

  }
  ngOnit(): void {
    this.refresh();
  }
  refresh() {
    this.userData.users().subscribe((data) => {
      this.users = data;
    }

    )
  }
  getUserFormData(data: any) {
    // console.warn(data);
    this.userData.SaveUsers(data).subscribe((result) => {
      console.warn(result)
      window.alert("User Added Successfully...")
      // window.location.reload();
      this.refresh();
    })
  }
  deleteUser(id: any) {

    this.userData.deleteUser(id).subscribe((result) => {
      console.log(result)
      window.alert(id + "is Deleted Successfully..")
      // window.location.reload();
      this.refresh();

    });
  }
  update(user: any) {
    this.showUpdateForm = { ...user };

    console.log("id", user)
    this.updateId = user.id
    // window.alert(user.id + "is Updated Successfully..")
    // window.location.reload();

  }
  updateUser() {
    this.userData.updateUser(this.updateId!, this.showUpdateForm).subscribe((result) => {
      console.log(result);
      this.showUpdateForm = {};
      this.updateId = null;
      this.refresh();
      window.alert("User Updated Successfully..")

    });
  }
}