import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GestionParrainService } from '../gestion-parrain.service';

@Component({
  selector: 'app-gestion-parrain',
  templateUrl: './gestion-parrain.component.html',
  styleUrls: ['./gestion-parrain.component.scss']
})
export class GestionParrainComponent implements OnInit {
  listParrains: any;

  constructor(private parrainservice :GestionParrainService,private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.getParrain();
  }
  getParrain() {
    this.parrainservice.getAllParrain()
        .subscribe((data) => {
            this.listParrains = data;
            console.log(data);
        }, error => {
            console.log(error);
        });
}
}
