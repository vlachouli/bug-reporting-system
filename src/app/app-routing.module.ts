import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BugListComponent } from './bug-list/bug-list.component';
import { BugNewComponent } from './bug-new/bug-new.component';

const routes: Routes = [
  // Redirect for empty path.
  {path: "", redirectTo: "bug", pathMatch: "full"},

  {path: "bug", component: BugListComponent},

  {path: "bug/new", component: BugNewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
