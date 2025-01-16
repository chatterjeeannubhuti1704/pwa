import { Routes } from '@angular/router';
import path from 'path';
import { OfflineFormComponent } from './offline-form/offline-form.component';
import { ButtonComponent } from './button/button.component';
import { StructureComponent } from './structure/structure.component';
import { ShowMapComponent } from './show-map/show-map.component';

export const routes: Routes = [
    {
        path:"",
       component:ButtonComponent
    },
    {
        path:"offline-form",
        component:OfflineFormComponent
    },
    {
        path:"structure",
        component:StructureComponent

    },
    {
        path:"map",
        component:ShowMapComponent
    }
];
