import {Component, OnInit, Input} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';
import {routerTransition} from '../../../../router.animations';
import {NgbModal, ModalDismissReasons, NgbModalOptions, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {UtilisateursService} from "../../gestion-utilisateurs.service";
import { SelectionComponent } from '../../../../shared/generic-components/selection.component';

@Component({
    selector: 'app-mailuser',
    templateUrl: './mail-user.component.html',
    styleUrls: ['./mail-user.component.scss'],
    animations: [routerTransition()]
})
export class MailUserComponent extends SelectionComponent implements OnInit {
    @Input() userId;
    destinataires = [];


    constructor(public activeModal: NgbActiveModal,
                private utilisateursService: UtilisateursService) {
        super();
    }

    ngOnInit() {
        
    }


   


    deleteMsg() {
        if (confirm('voulez vous vraiment supprimer?')) {
            console.log("bla bla");
        }
    }
}
