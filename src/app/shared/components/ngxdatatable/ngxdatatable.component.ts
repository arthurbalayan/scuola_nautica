import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { Student } from '../../../models/student';
import { NgxdatatableService } from './ngxdatatable.service';

@Component({
    selector   : 'app-ngxdatatable',
    templateUrl: './ngxdatatable.component.html',
    styleUrls  : ['./ngxdatatable.component.scss']
})
export class NgxdatatableComponent implements OnInit, OnChanges, OnDestroy {

    @Input() rows: any[] = [];
    @Input() columns: any[] = [];
    @Input() expandable: boolean;
    @ViewChild(DatatableComponent) table: DatatableComponent;
    students: { [id: number]: Array<Student[]> } = {};
    temp: any[] = [];
    subs: Subscription;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private snackBar: MatSnackBar,
                private service: NgxdatatableService) {
    }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.rows) {
            this.temp = [...this.rows];
        }
    }

    ngOnDestroy(): void {
        if (this.subs) {
            this.subs.unsubscribe();
        }
    }

    /**
     * @description filter for search field
     * @param event input event
     */
    updateFilter(event): void {
        const val = event.target.value.toLowerCase();

        // filter our data
        // update the rows
        this.rows = this.temp.filter((d) => {
            if (d.Nome) {
                return d.Nome.toLowerCase().indexOf(val) !== -1 || d.email.toLowerCase().indexOf(val) !== -1 || !val;
            } else {
                return d.Argomento.toLowerCase().indexOf(val) !== -1 || !val;
            }
        });
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    }

    /**
     * @description row click event redirect to edit component
     * @param event ngx-datatable event type(https://swimlane.gitbook.io/ngx-datatable/api/table/outputs)
     */
    onRowClick(event: any): void {
        if (event.type === 'click') {
            if (event.row['TelegramChatID'] && event.column.prop === 'TelegramChatID') {
                if (event.row.TelegramChatID > 0) {
                    this.copyToClickBoard(event.row.TelegramChallenge);
                }
            } else {
                this.router.navigate([event.row.id], { relativeTo: this.route });
            }
        }
    }

    /**
     * @description function to copy in clipboard
     * @param text to copy
     */
    copyToClickBoard(text: string): void {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            const msg = successful ? 'successful' : 'unsuccessful';
            this.snackBar.open('Copied to Clipboard', 'Close', {
                duration: 2000
            });
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }

        document.body.removeChild(textArea);
    }

    /**
     * @description redirect to new
     */
    redirectNew(): void {
        this.router.navigate(['new'], { relativeTo: this.route });
    }

    toggleExpandRow(row) {
        this.table.rowDetail.toggleExpandRow(row);
        if ( !this.students[row.id]) {
            this.subs = this.service.getStudents(row['Link'] ? 'sessioni-in-barca' : 'sessioni-in-aula', row.id)
                .subscribe(value => {
                    this.students[row.id] = value;
                });
        }
    }
}
