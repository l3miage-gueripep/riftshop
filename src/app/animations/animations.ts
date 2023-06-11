import { trigger, transition, style, animate, query, animateChild, group, state, sequence } from '@angular/animations';
export const slideRight = trigger('slideRight', [
    state('closed', style({
        width: '0px',
        justifySelf: 'start'
    })),
    state('open', style({
        width: '100%',
        justifySelf: 'end'
    })),


    //transition
    transition('closed => open', [
        animate('0.2s ease-in', style({ width: '100%' })),
    ]),
    transition('open => closed', [
        animate('0.1s ease-in', style({ width: '0px' })),
    ]),

])