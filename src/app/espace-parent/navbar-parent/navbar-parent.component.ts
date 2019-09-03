import { Component, OnInit, Input } from '@angular/core';
import * as decode from 'jwt-decode';

@Component({
  selector: 'app-navbar-parent',
  templateUrl: './navbar-parent.component.html',
  styleUrls: ['./navbar-parent.component.scss']
})
export class NavbarParentComponent implements OnInit {

  constructor() { }


   username;

  ngOnInit() {
    if(localStorage.getItem('token')!=null){
      var decoded= decode(localStorage.getItem('token'));
      this.username= decoded.sub;
    }
  }

  onLoggedout(){
    localStorage.removeItem('token');
  }

}
