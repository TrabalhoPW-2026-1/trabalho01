import { Component } from '../core/component.js';

export interface VisualAttachment {
	id: string;
	element: HTMLElement;
	offset: { x: number, y: number };
	isVisible: boolean;
}

export interface HasVisualAttachments extends Component {
	visualAttachments: VisualAttachment[];
}