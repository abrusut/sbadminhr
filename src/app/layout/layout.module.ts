import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { UsersPaginateComponent } from './users-paginate/users-paginate.component';
import { RegisterComponent } from './register/register.component';
import { EvaluationsComponent } from './evaluations/evaluations.component';
import { EvaluationListComponent } from './evaluation-list/evaluation-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';


@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        BrowserAnimationsModule,
        TableModule,
        PaginatorModule,
        DropdownModule,
        MessagesModule,
        AutoCompleteModule,
        ToastModule
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent
        , UsersPaginateComponent, RegisterComponent, EvaluationsComponent, EvaluationListComponent, UserDetailComponent
    ],
    providers: [MessageService]
})
export class LayoutModule {}
