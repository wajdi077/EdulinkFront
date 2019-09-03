import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { AffectationEleveService } from './gestion-affecte-eleve.service';

@Component({
  selector: 'app-gestion-affecte-eleve',
  templateUrl: './gestion-affecte-eleve.component.html',
  styleUrls: ['./gestion-affecte-eleve.component.scss']
})
export class GestionAffecteEleveComponent implements OnInit {
  title = 'Upload Data';
description = 'importer les données réferentiels ';
  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }

  constructor(private AffectationEleveService: AffectationEleveService) { }

  ngOnInit() {
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0)
    this.AffectationEleveService.pushFileToStorageAffectationEleve(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    })

    this.selectedFiles = undefined
  }
}
