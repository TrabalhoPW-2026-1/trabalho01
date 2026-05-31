import { Component } from '../core/component.js';

export interface HasInvincibility extends Component{
    activateInvincibility: boolean;
    invincibilityTimeRemaining: number;
}