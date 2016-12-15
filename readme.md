Muuute
------
Mutate object in a css style

/!\ Work in Progress

Install
------

```
npm i -S styleee
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
  delay:Number Positive Integer,
  duration:Number Positive Integer,
  property:String,
  ease:Ease
}

Animation:Object :: {
  key:Key,
  play:Boolean,
  easeg:Ease,
  delay:Number Positive Integer,
  direction:'normal'|'reverse'|'alternate'|'alternate-reverse',
  duration:Number Positive Integer,
  fill:'none'|'forwards'|'backwards'|'both',
  iterations:Number Positive Integer,
}

Key:Object :: {
  0:{*:Number|Relative|Object},
  ...,
  100:{*:Number|Relative|Object},
}

Ease:Function :: in:Number BetweenZeroAndOne=>out:Number BetweenZeroAndOne

Relative:String :: '+139' | '-34'
``

Exemples
------

Pixi.js
------
```
const Pixi = require('pixi.js')
const {mute} = requier('muuute')

const transition = {transition:{duration:1000}}
const little = {scale:{x:0.5,y:0.5}}
const big = {scale:{x:2,y:2}}
const normal = {scale:{x:1,y:1}}

const square = new Pixi.Graphics()
square.beginFill(0xFF0000)
square.drawRect(0,0,100,100)

square.onmouseover = ()=>mute(square,little,transition)
square.onmousedown = ()=>mute(square,big,transition)
square.onmouseout = ()=>mute(square,normal,transition)
```
