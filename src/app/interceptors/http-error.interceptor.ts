import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError as observableThrowError, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // return next.handle(req).pipe(
        //     catchError((err) => {
        //         console.log(err)
        //         return observableThrowError(err)
        //     })
        // )
        return next.handle(req).pipe(catchError(err => {
            const error = err.error?.message || err.statusText
            alert(JSON.stringify(err.error))
            return throwError(error)
        }))
    }
}