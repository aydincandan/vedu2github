import { Component } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import {
    NavigationCancel,
    Event,
    NavigationEnd,
    NavigationError,
    NavigationStart,
    Router
} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'vedu2';

    columnDefs = [
        { headerName: 'Make', field: 'make' },
        { headerName: 'Model', field: 'model' },
        { headerName: 'Price', field: 'price' }
    ];

    rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];

    constructor(private _loadingBar: SlimLoadingBarService, private _router: Router) {
        this._router.events.subscribe((event: Event) => {
            this.navigationInterceptor(event);
        });


    }
    
    private navigationInterceptor(event: Event): void {
        if (event instanceof NavigationStart) {
            this._loadingBar.start();
        }
        if (event instanceof NavigationEnd) {
            this._loadingBar.complete();
        }
        if (event instanceof NavigationCancel) {
            this._loadingBar.stop();
        }
        if (event instanceof NavigationError) {
            this._loadingBar.stop();
        }
    }
}
