import { GUIController } from '../gui'
import { PhysicsWorld } from '../physics/world'
import { objectsAreInstancesOf } from './common/helpers'
import { Steering } from './common/steering'
import { GameMap } from './gameMap'
import { ObjectBase } from './objects/objectBase'
import { Player } from './objects/player'
import { Portal } from './objects/portal'

export class GameEngine extends PhysicsWorld {
  readonly map: GameMap

  constructor(gui: GUIController) {
    super()
    this.map = new GameMap(gui)
  }

  destroy() {
    this.map.destroy()
    super.destroy()
  }

  getMap(): Readonly<GameMap> {
    return this.map
  }

  update(deltaTime: number) {
    super.update(deltaTime)
    this.map.update(deltaTime)
  }

  spawnPlayer(steering: Steering, isCameraTarget = false) {
    const player = new Player(steering, this.world)

    this.map.addObject(player)
    if (isCameraTarget) {
      this.map.setCameraTarget(player)
    }
    return player
  }

  private onPlayerPortalCollision(player: Player, portal: Portal) {
    const exitPortal = this.map.objects.find(
      (obj) =>
        obj instanceof Portal &&
        obj !== portal &&
        obj.groupNumber === portal.groupNumber,
    )
    if (!exitPortal) {
      console.warn(`No exit portal found. Group number: ${portal.groupNumber}`)
      return
    }
    portal.teleport(player, exitPortal as Portal)
  }
  private onPlayerPortalCollisionEnd(player: Player, portal: Portal) {
    portal.objectLeftTeleport(player)
  }

  onCollisionStart(objectA: ObjectBase, objectB: ObjectBase): void {
    objectsAreInstancesOf(
      objectA,
      objectB,
      Player,
      Portal,
      this.onPlayerPortalCollision.bind(this),
    )
  }

  onCollisionEnd(objectA: ObjectBase, objectB: ObjectBase): void {
    objectsAreInstancesOf(
      objectA,
      objectB,
      Player,
      Portal,
      this.onPlayerPortalCollisionEnd.bind(this),
    )
  }
}
