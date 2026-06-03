import { World } from "./world.js";

export interface System {
  update(world: World): void;
}
