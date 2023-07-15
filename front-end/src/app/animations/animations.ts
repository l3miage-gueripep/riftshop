import { trigger, transition, style, animate, query, animateChild, group, state, sequence } from '@angular/animations';
export const slide = trigger('slide', [
    state('closed', style({
        width: '0%',
        justifySelf: 'start'
    })),
    state('open', style({
        width: '100%',
        justifySelf: 'end'
    })),


    //transition
    transition('closed => open', [
        animate('0.3s ease-out', style({ width: '100%' })),
    ]),
    transition('open => closed', [
        animate('0.2s ease-out', style({ width: '0%' })),
    ]),

])