import { Component } from "../core/component.js";

export interface HasCollision extends Component {
	hitbox: { width: number, height: number };
}