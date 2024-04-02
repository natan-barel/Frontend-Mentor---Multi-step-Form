import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, of, map, switchMap } from "rxjs";
import { FormService } from "@wizard/services/form.service";
import { submitForm, updateForm } from "./multi-step-form.action";

@Injectable()
export class AssociateEffects {
    constructor(private action$: Actions, private formService: FormService) {

    }

    // submitForm = createEffect(() => {
    //     this.action$.pipe(
    //         ofType(submitForm),
    //         exhaustMap((action) => {
    //             return of(true)
    //         })
    //     )
    // })

}