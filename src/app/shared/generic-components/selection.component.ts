import {OnInit} from '@angular/core';

export interface SelectionComponentInterface {
    _selected: any[];

    _isSelected(obj);

    _toggleSelection(obj);
}

export class SelectionComponent implements SelectionComponentInterface {

    _selected: any[] = [];

    _isSelected(obj) {
        return this._selected.find(x => x == obj);

        /*if (this._selected.indexOf(obj) === -1) {
            return obj;
        }*/
    }

    _toggleSelectAll(objs: any[]) {
        if (objs.length == this._selected.length) {
            this._selected = [];
        } else {
            this._selected = objs;
        }
    }

    _isAllSelected(objs: any[]) {
        return (objs && objs.length == this._selected.length);
    }

    _toggleSelection(obj) {
        /* console.log("obj " + obj);
         console.log("this._selected " + this._selected);
        */
        if (this._selected.indexOf(obj) === -1) {
            this._selected.push(obj);
        }
        else {
            this._selected.splice(this._selected.indexOf(obj), 1);
        }
        //console.log("this._selected " + this._selected);

    }

    constructor() {
    }


}
