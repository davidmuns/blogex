import { trigger, style, transition, animate, keyframes } from '@angular/animations';

export const fadeInZoom = trigger('fadeInZoom', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.8)' }),
    animate('2s ease-in-out', style({ opacity: 1, transform: 'scale(1)' }))
  ])
]);

// Animación: Fade In
export const fadeIn = trigger('fadeIn', [
    transition('void => *', [
      style({ opacity: 0 }),
      animate('2s', style({ opacity: 1 }))
    ]),
    transition('* => void', [
      animate('2s', style({ opacity: 0 }))
    ])
  ]);
  
  // Animación: Slide In
  export const slideIn = trigger('slideIn', [
    transition('void => *', [
      style({ transform: 'translateX(-100%)' }),
      animate('2s', style({ transform: 'translateX(0)' }))
    ]),
    transition('* => void', [
      animate('2s', style({ transform: 'translateX(100%)' }))
    ])
  ]);
  
  // Animación: Zoom In/Out
  export const zoomInOut = trigger('zoomInOut', [
    transition('void => *', [
      style({ transform: 'scale(0)' }),
      animate('2s ease-out', style({ transform: 'scale(1)' }))
    ]),
    transition('* => void', [
      animate('2s ease-in', style({ transform: 'scale(0)' }))
    ])
  ]);
  
  // Animación: Rotate
  export const rotate = trigger('rotate', [
    transition('void => *', [
      style({ transform: 'rotate(0deg)' }),
      animate('2s', style({ transform: 'rotate(360deg)' }))
    ])
  ]);
  
  // Animación: Scale Up
  export const scaleUp = trigger('scaleUp', [
    transition('void => *', [
      style({ transform: 'scale(0)' }),
      animate('2s ease-out', style({ transform: 'scale(1)' }))
    ]),
    transition('* => void', [
      animate('2s ease-in', style({ transform: 'scale(0)' }))
    ])
  ]);
  
  // Animación: Bounce
  export const bounce = trigger('bounce', [
    transition('void => *', [
      animate('2s', keyframes([
        style({ transform: 'translateY(-100px)', offset: 0 }),
        style({ transform: 'translateY(10px)', offset: 0.5 }),
        style({ transform: 'translateY(-5px)', offset: 0.7 }),
        style({ transform: 'translateY(0)', offset: 1 })
      ]))
    ])
  ]);
  
  // Animación: Pulse
  export const pulse = trigger('pulse', [
    transition('* => *', [
      animate('3s ease-in-out', keyframes([
        style({ transform: 'scale(1)', offset: 0 }),
        style({ transform: 'scale(1.1)', offset: 0.5 }),
        style({ transform: 'scale(1)', offset: 1 })
      ]))
    ])
  ]);
  
  // Animación: Fade Slide
  export const fadeSlide = trigger('fadeSlide', [
    transition('void => *', [
      style({ opacity: 0, transform: 'translateY(50px)' }),
      animate('1s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ])
  ]);