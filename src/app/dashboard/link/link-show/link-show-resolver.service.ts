import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {BackendResponse} from '@common/core/types/backend-response';
import {AppHttpClient} from '@common/core/http/app-http-client.service';
import {catchError, mergeMap} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {GetLinkResponse, LinkService} from '../../../shared/link/link.service';

@Injectable({
    providedIn: 'root'
})
export class LinkShowResolverService implements Resolve<BackendResponse<GetLinkResponse>> {
    constructor(
        private router: Router,
        private http: AppHttpClient,
        private link: LinkService,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): BackendResponse<GetLinkResponse> {
        return this.link.get(route.params.linkId).pipe(
            catchError(() => {
                this.router.navigate(['/dashboard/links']);
                return EMPTY;
            }),
            mergeMap(response => {
                if (response) {
                    return of(response);
                } else {
                    this.router.navigate(['/dashboard/links']);
                    return EMPTY;
                }
            })
        );
    }
}

