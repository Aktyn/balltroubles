import Box2D from '@cocos/box2d'
import { DefaultProperties, OBJECT_TYPE } from '../engine/objects/common'
import { PhysicsParameters } from './utils'

export const Box2DShapes: { [key in OBJECT_TYPE]: Box2D.Shape } = {
  [OBJECT_TYPE.SMALL_BALL]: new Box2D.CircleShape(
    DefaultProperties[OBJECT_TYPE.SMALL_BALL].scale?.getAverage() *
      PhysicsParameters.SCALAR,
  ),
  [OBJECT_TYPE.BOX]: new Box2D.PolygonShape().SetAsBox(
    DefaultProperties[OBJECT_TYPE.BOX].scale.x * 0.5 * PhysicsParameters.SCALAR,
    DefaultProperties[OBJECT_TYPE.BOX].scale.y * 0.5 * PhysicsParameters.SCALAR,
  ),
  [OBJECT_TYPE.GROUND_BOX]: new Box2D.PolygonShape().SetAsBox(
    DefaultProperties[OBJECT_TYPE.GROUND_BOX].scale.x *
      0.5 *
      PhysicsParameters.SCALAR,
    DefaultProperties[OBJECT_TYPE.GROUND_BOX].scale.y *
      0.5 *
      PhysicsParameters.SCALAR,
  ),
}
