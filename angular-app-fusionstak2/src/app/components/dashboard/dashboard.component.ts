import { AuthService } from './../../services/auth.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { UserStoreService } from 'src/app/services/user-store.service';
import { DialogAddnewuserComponent } from '../dialog-addnewuser/dialog-addnewuser.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditprofileComponent } from '../dialog-editprofile/DialogEditprofileComponent';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  public users: any = [];
  public role!: string;
  public fullName: string = "";
  public isDropdownOpen: boolean = false;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalPages: number = 1;
  pages: number[] = [];
  paginatedUsers: any[] = [];
  constructor(private api: ApiService, private auth: AuthService, private userStore: UserStoreService, private MatDialog: MatDialog) { }
  
  opendialog() {
    this.MatDialog.open(DialogAddnewuserComponent, {
      width: '600px',
      height: '320px'
    })
  }
  
  openeditdialog() {
    this.MatDialog.open(DialogEditprofileComponent, {
      width: '400px',
      height: '470px'
    })
  }

  ngOnInit() {
    this.itemsPerPage = 10;
    this.api.getUsers()
      .subscribe(res => {
        this.users = res;
        this.calculateTotalPages();
        this.updatePages();
        this.updatePaginatedUsers();
      });

    this.userStore.getFullNameFromStore()
      .subscribe(val => {
        const fullNameFromToken = this.auth.getfullNameFromToken();
        this.fullName = val || fullNameFromToken;
      });

    this.userStore.getRoleFromStore()
      .subscribe(val => {
        const roleFromToken = this.auth.getRoleFromToken();
        this.role = val || roleFromToken;
      });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    this.auth.signOut();
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
  }

  updatePages() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  updatePaginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedUsers();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedUsers();
    }
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedUsers();
  }
}
