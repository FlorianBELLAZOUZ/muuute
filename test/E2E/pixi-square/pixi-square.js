const Pixi = require('pixi.js')
const {mute} = require('../../..')

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
square.mouseover = ()=>mute(square,big,transition)
square.mousedown = ()=>mute(square,little,transition)
square.mouseup = ()=>mute(square,big,transition)
square.mouseout = ()=>mute(square,normal,transition)

const frame = ()=>{
  requestAnimationFrame(frame)
  renderer.render(square)
}

frame()

document.body.append(renderer.view)
