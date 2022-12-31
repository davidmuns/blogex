import {
    trigger,
    transition,
    style,
    query,
    group,
    animate,
    AnimationTriggerMetadata
} from '@angular/animations';

const side1: string = 'right';
const side2: string = 'left';

export const slider: AnimationTriggerMetadata =
    trigger('routeAnimations', [

        transition('blog => article', slideTo(side1)),
        transition('article => blog', slideTo(side2)),

        transition('images => videos', slideTo(side1)),
        transition('videos => images', slideTo(side2)),
      
    ]);

function slideTo(direction: string) {
    const optional = { optional: true };
    return [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                [direction]: 0,
                width: '100%'
            }),
        ], optional),
        query(':enter', [
            style({ [direction]: '-100%' })
        ]),
        group([
            query(':leave', [
                animate('500ms ease', style({ [direction]: '100%' }))
            ], optional),
            query(':enter', [
                animate('500ms ease', style({ [direction]: '0%' }))
            ])
        ]),
    ];
}

