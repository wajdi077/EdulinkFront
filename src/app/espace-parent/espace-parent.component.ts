import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-espace-parent',
  templateUrl: './espace-parent.component.html',
  styleUrls: ['./espace-parent.component.scss']
})
export class EspaceParentComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
    //this.router.navigate(['/espaceParent']);
  }

}
