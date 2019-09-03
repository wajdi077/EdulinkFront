import {Component, OnInit, Input} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';
import {routerTransition} from '../../../../router.animations';
import {NgbModal, NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {Router, Params, ActivatedRoute} from '@angular/router'
import {SitesService} from '../../sites.service';
import { SelectionComponent } from '../../../../shared/generic-components/selection.component';

@Component({
    selector: 'app-usersites',
    templateUrl: './user-sites.component.html',
    styleUrls: ['./user-sites.component.scss'],
    providers: [NgbModal, SitesService],
    animations: [routerTransition()]
})
export class UserSitesComponent extends SelectionComponent implements OnInit {
    @Input() usites;
    n: any;
    sitesToDelete: any[] = [];

    HideFooterModalOne: boolean = false;
    UsersOutSites = [];

    constructor(private sitesService: SitesService, public activeModal: NgbActiveModal,
                private modalService: NgbModal, public route: ActivatedRoute) {
        super();
    }


    ngOnInit() {
    }

    modalRef: NgbModalRef;

    addSiteUser(n: any, modal) {
       /* this.route.params
            .switchMap((params: Params) => {
                return this.sitesService.getUsersOutSites(this.usites.username);
            })
            .subscribe((UsersOutSites) => {
                    this.UsersOutSites = UsersOutSites;
                }
            );*/

        this.sitesService.getUsersOutSites(this.usites.username)
            .subscribe((UsersOutSites) => {
                            this.UsersOutSites = UsersOutSites;
                        }
                    );
        this.n = n;
        this.HideFooterModalOne = true;
        this.modalRef = this.modalService.open(modal);
        this.modalRef.result.then((result) => {
            console.log('modal closed');

        }, (reason) => {
            console.log('modal dismissed');
            this.HideFooterModalOne = false;
        });

    }

    sitesToUpdate: any[] = [];

    checkUserSites(obj) {

        if (this.sitesToUpdate.find(x => x == obj)) {
            this.sitesToUpdate.splice(this.sitesToUpdate.indexOf(obj), 1)
        }
        else {
            this.sitesToUpdate.push(obj);
        }
        console.log(' checkUserSites', this.sitesToUpdate);
    }

    addSiteToUser() {
        this.usites.sites = this.usites.sites.concat(this.sitesToUpdate);
        this.sitesService.updateSiteUsers(this.usites.username, this.usites.sites)
            .subscribe((res) => { /*this.usites.sitesnames= res;*/
                    for (this.i = 0; this.i < this.sitesToUpdate.length; this.i++) {
                        if (this.UsersOutSites.find(x => x == this.sitesToUpdate[this.i])) {
                            this.UsersOutSites.splice(this.UsersOutSites.indexOf(this.sitesToUpdate[this.i]), 1);
                            //this.usites.sitesnames.concat(this.sitesToUpdate[this.i].name);
                        }
                    }
                    this.sitesToUpdate = [];

                },
                error => {
                    alert(error);
                });
    }

    i: number = 0;

    deleteSiteUser() {
        //liste de tt les sites d'un user
        let usersites = this.usites.sites;
        //liste des sites d'un user non selectionnés
        let sitesToKeep = usersites.filter(item => this._selected.indexOf(item) < 0);
        if (confirm('voulez vous vraiment supprimer?')) {
            this.sitesService.updateSiteUsers(this.usites.username, sitesToKeep)
                .subscribe((res) => {
                        for (this.i = -1; this.i < this._selected.length; this.i++) {
                            if (usersites.find(x => x == this._selected[this.i])) {
                                usersites.splice(usersites.indexOf(this._selected[this.i]), 1);
                            }
                        }
                    },
                    error => {
                        alert(error);
                    });
        }
    }


}
