
/**
 * Assinatura geral para entidades do jogo (jogador, NPCs etc.)
 */

export type EntityType = 'player' | 'obstacle' | 'coin' | 'powerup' | 'lifeup' | 'ufo';

export interface Entity {
    element: HTMLElement | HTMLImageElement;
    position: { x: number, y: number };
    size: { width: number, height: number };
    velocity: { x: number, y: number };
    type: EntityType;
}