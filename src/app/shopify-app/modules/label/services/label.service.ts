
import { Injectable } from '@angular/core';
//
import { Observable } from 'rxjs';
//
import { ConfigService } from '../../../../config/services/config.service';
import { ErrorHandlingHttpService } from '../../../../error-handling/services/error-handling-http.service';
import { PesLabel } from 'app/shopify-app/models/pes-label';
import { map } from 'rxjs/operators';



export const ASCENDING = 'asc';

@Injectable({
    providedIn: 'root'
})
export class LabeltService {

    apiEndpoint: string;

    constructor(
        private configService: ConfigService,
        private http: ErrorHandlingHttpService) {
    }

    getLabels(filter: any): Observable<PesLabel[]> {
        const queryParams = this.formatQueryParams(filter);
        return this.http.get<PesLabel[]>(this.apiEndpoint + queryParams);
    }

    getLabel(id: string): Observable<PesLabel> {
        return this.http.get<PesLabel>(this.apiEndpoint + id);
    }

    formatQueryParams(filter?: any, sortColumn?: string, sortDirection?: string, pageIndex?: number, pageSize?: number): string {
        let queryParams = '';

        if (filter.name) {
            queryParams += queryParams.length > 0 ? '&' : '?';
            queryParams += `name=${filter.name}`;
        }
        if (filter.rangeDate) {
            queryParams += queryParams.length > 0 ? '&' : '?';
            queryParams += `startDate=${new Date(filter.rangeDate.start).toISOString() }` + '&';
            queryParams += `endDate=${new Date(filter.rangeDate.end).toISOString()}`;
        }

        return queryParams;
    }

    getStaticLabel(): Observable<PesLabel> {
        return this.http.get<PesLabel>('assets/data/labels.json').pipe(map(response => response));
    }

}

