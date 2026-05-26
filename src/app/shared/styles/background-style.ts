import { NgStyle } from '@angular/common';

interface BackgroundOptions {
  size?: string;
  position?: string;
  repeat?: string;
  overlay?: string;
}

export function backgroundImageStyle(
  image: string,
  options: BackgroundOptions = {}
): NgStyle['ngStyle'] {
  const {
    size = 'cover',
    position = 'center',
    repeat = 'no-repeat',
    overlay,
  } = options;

  return {
    backgroundImage: overlay
      ? `${overlay}, url('${image}')`
      : `url('${image}')`,

    backgroundSize: size,
    backgroundPosition: position,
    backgroundRepeat: repeat,
  };
}