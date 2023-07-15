import { trigger, transition, style, animate, query, animateChild, group } from '@angular/animations';
export const routeAnimation =
  trigger('routeAnimation', [
    transition('HomePage <=> ProductPage', [
      style({ position: 'relative' }),
      query(':leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        })
      ]),
      query(':enter', [
        style({ 
          opacity: 0,
        })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ opacity: 1 }))
        ]),
      ]),
    ])
  ]);