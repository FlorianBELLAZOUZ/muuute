Muuute
------
**Mutate object in a css style**

*/!\ Work in Progress*

Install
------

```
npm i -S muuute
```

Get starting
------

```
const {class} = require('style')

const down = {y:100, transition:{duration:1000}}

let a = {x:0,y:0}

mute(a,down) // a.x will increase during 1000 milleseconds
```

Api
------
```
mute :: el:Object => class:ArrayClass => el:Object
update :: time:Number Positive Integer => time:Number Positive Integer

Ease:Object :: {
  Linear:{None}
  Back:{In, Out, InOut},
  Quadratic:{In, Out, InOut},
  Cubic:{In, Out, InOut},
  Quartic:{In, Out, InOut},
  Quintic:{In, Out, InOut},
  Sinusoidal:{In, Out, InOut},
  Exponential:{In, Out, InOut},
  Circular:{In, Out, InOut},
  Elastic:{In, Out, InOut},
  Back:{In, Out, InOut},
  Bounce:{In, Out, InOut},
}
```

Objects utility
------
```
Class:Object :: {
  *:Number|Relative|Object,
  transition:ArrayTransition|transition,
  animation:ArrayAnimation|animation
}

Transition:Object :: {
  duration:Number Positive Integer,
  property:String|ArrayString|'all',
  ease:Ease
  delay:Number Positive Integer,
}

Animation:Object :: {
  property:String,
  keys:ArrayNumber|ArrayRelative,
  duration:Number Positive Integer,
  iterations:Number Positive Integer,
  delay:Number Positive Integer,
  direction:'normal'|'alternate',
  interpolation:'linear'|'bezier'|'catmullrom',
  play:Boolean,
  fill:'none'|'forwards'|'backwards'|'both',
}

Ease:Function :: in:Number BetweenZeroAndOne=>out:Number BetweenZeroAndOne

Relative:String :: '+139' | '-34'
```

Exemples
------

Pixi.js
------
```
const Pixi = require('pixi.js')
const {style,update} = require('muuute')

const renderer = Pixi.autoDetectRenderer(1000,1000)

const transition = {transition:{duration:1000}}
const little = {scale:{x:0.5,y:0.5}}
const big = {scale:{x:2,y:2}}
const normal = {scale:{x:1,y:1}}

const square = new Pixi.Graphics()
square.beginFill(0xFF0000)
square.drawRect(-50,-50,100,100)
square.position = {x:500,y:500}

square.interactive = true
square.mouseover = ()=>style(square,big,transition)
square.mousedown = ()=>style(square,little,transition)
square.mouseup = ()=>style(square,big,transition)
square.mouseout = ()=>style(square,normal,transition)

const frame = ()=>{
  requestAnimationFrame(frame)
  update()
  renderer.render(square)
}

frame()

document.body.append(renderer.view)

```
