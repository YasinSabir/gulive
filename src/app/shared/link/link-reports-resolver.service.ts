import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {AppHttpClient} from '@common/core/http/app-http-client.service';
import {catchError, mergeMap} from 'rxjs/operators';
import {EMPTY, Observable, of} from 'rxjs';
import {LinkService, LinkStats} from './link.service';

@Injectable({
    providedIn: 'root'
})
export class LinkReportsResolverService implements Resolve<Observable<LinkStats>> {
    constructor(
        private router: Router,
        private http: AppHttpClient,
        private link: LinkService,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LinkStats> {
        return this.link.getCurrentUserReports().pipe(
            catchError(() => {
                this.router.navigate(['/dashboard']);
                return EMPTY;
            }),
            mergeMap(response => {
                if (response) {
                    return of(response.analytics);
                } else {
                    this.router.navigate(['/dashboard']);
                    return EMPTY;
                }
            })
        );
    }
}

