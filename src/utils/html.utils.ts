interface ClassTagObj {
  [key: string]: string,
}

export function cloneAndSetStyle(el: HTMLElement, styles: ClassTagObj = {}): HTMLElement {
  const cloneEl = el.cloneNode(true) as HTMLElement;

  for (const [styleTag, value] of Object.entries(styles)) {
    cloneEl.style[styleTag as any] = value;
  }

  el.parentElement!.appendChild(cloneEl);

  return cloneEl;
}
