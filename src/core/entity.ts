
/**
 * Assinatura geral para entidades do jogo (jogador, NPCs etc.)
 */
export interface Entity {
    element: HTMLElement | HTMLImageElement;
    position: { x: number, y: number };
    velocity: { x: number, y: number };
}