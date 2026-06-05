import { Component } from '../core/component.js';

export interface VisualAttachment {
	id: string;
	element: HTMLImageElement;
	offset: { x: number, y: number };
	isVisible: boolean;
	mirrorOnLeft?: boolean;
}

export interface HasVisualAttachments extends Component {
	visualAttachments: VisualAttachment[];
}