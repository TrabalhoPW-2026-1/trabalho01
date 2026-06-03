export type EntityType =
  | 'player'
  | 'car'
  | 'bicycle'
  | 'pizzabox'
  | 'customer'
  | 'turbo'
  | 'helmet';

export interface Entity {
  element: HTMLElement;
  position: { x: number; y: number };
  size: { width: number; height: number };
  velocity: { x: number; y: number };
  type: EntityType;
}
