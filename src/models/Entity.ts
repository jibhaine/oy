import { Body } from "matter-js";
import * as PIXI from "pixi.js";

/**
 * an entity is an aggregation fo two game concepts:
 * 
 * - something that can be placed in a level
 * - something that has a texture and a physics body
 *
 */
export class Entity {
	private sprite!: PIXI.Sprite;
	private body!: Body;
	private textureName: string;

	constructor() {
		this.textureName = "default";
	}

	initObjects() {
		this.sprite = new PIXI.Sprite();
		this.body = new Body();
	}

}
