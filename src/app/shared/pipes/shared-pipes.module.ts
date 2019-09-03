import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiFilterPipe } from './multi-filter.pipe';
import { MakeFilterPipe } from './make-filter.pipe';
import {Ng2OrderModule} from "ng2-order-pipe";
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgxPaginationModule} from "ngx-pagination";
import { FilterTestPipe} from "./filter-test.pipe";

@NgModule({
    imports: [
        CommonModule,
        NgxPaginationModule,
        Ng2OrderModule,
    ],
    declarations: [MakeFilterPipe, MultiFilterPipe,FilterTestPipe],
    exports:[
        MakeFilterPipe,
        MultiFilterPipe,
        FilterTestPipe,
        NgxPaginationModule,
        Ng2SearchPipeModule,
        Ng2OrderModule
    ]
})
export class SharedPipesModule { }
