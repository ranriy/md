import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { DetailsComponent } from './details/details.component'



const routes: Routes = [
{ path: '', pathMatch: 'full', redirectTo: '/products' },
{ path: 'products',component: ListComponent },
{ path: 'new',component: AddComponent },
{ path: 'products/edit/:id', component: UpdateComponent },
{ path: 'products/:id', component: DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
