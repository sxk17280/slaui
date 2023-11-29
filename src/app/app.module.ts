import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { NavigationbarComponent } from './components/navigationbar/navigationbar.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AdduserComponent } from './components/adduser/adduser.component';
import { BooksComponent } from './components/books/books.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { sharedService } from './services/sharedservice.service';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthorsComponent } from './components/authors/authors.component';
import { UsersComponent } from './components/users/users.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { IssuedbooksComponent } from './components/issuedbooks/issuedbooks.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import { AddbookComponent } from './components/addbook/addbook.component';
import { AuthordialogComponent } from './components/authordialog/authordialog.component';
import { CategorydialogComponent } from './components/categorydialog/categorydialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from './home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    HomepageComponent,
    NavigationbarComponent,
    AdduserComponent,
    BooksComponent,
    AuthorsComponent,
    UsersComponent,
    CategoriesComponent,
    IssuedbooksComponent,
    AddbookComponent,
    AuthordialogComponent,
    CategorydialogComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatTabsModule,
    MatDatepickerModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSelectModule,
    MatSlideToggleModule,MatTableModule,MatMenuModule,MatDialogModule
    
  ],
  providers: [sharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
