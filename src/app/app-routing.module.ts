import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddbookComponent } from './components/addbook/addbook.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { BooksComponent } from './components/books/books.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { IssuedbooksComponent } from './components/issuedbooks/issuedbooks.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{ path: '', component: LoginpageComponent, pathMatch: 'full' },
{ path: 'login', component: LoginpageComponent },
{ path: 'homepage', component: HomepageComponent },
{ path: 'books', component: BooksComponent },
{ path: 'addUser', component: AdduserComponent },
{ path: 'authors', component: AuthorsComponent },
{ path: 'users', component: UsersComponent },
{ path: 'categories', component: CategoriesComponent },
{ path: 'tickets', component: IssuedbooksComponent },
{ path: 'addBook', component: AddbookComponent },
{ path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
