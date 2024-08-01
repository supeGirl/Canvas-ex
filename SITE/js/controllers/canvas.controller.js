'use strict'

let gElCanvas
let gCtx

let gLasPos = {
  x: 0,
  y: 0,
}

let gIsDrawing = false

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
const SCREEN_WIDTH = window.innerWidth
const SCREEN_HEIGHT = window.innerHeight
const PIXEL_RATIO = Math.max(1, window.devicePixelRatio)

function onInit() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')

  gElCanvas.width = SCREEN_WIDTH * PIXEL_RATIO
  gElCanvas.height = SCREEN_HEIGHT * PIXEL_RATIO
  gElCanvas.style.cursor = 'crosshair'

  resizeCanvas()
  insertInitFromDate()
  addListeners()
}

function insertInitFromDate() {
  const {brusher, borderColor, fillColor, brushSize} = getCanvasData()
  document.querySelector('.brushers').value = brusher
  document.querySelector('input[name="border-color"]').value = borderColor
  document.querySelector('input[name="fill-color"]').value = fillColor
  document.querySelector('input.brush-size').value = brushSize
  document.querySelector('span.brush-size-value').innerText = brushSize
}

function onDown(ev) {
  gIsDrawing = true
}

function onMove(ev) {
  if (!gIsDrawing) return
  onDraw(ev)
}

function onUp() {
  gIsDrawing = false
  gLasPos = {}
}

function onClearCanvas() {
  const isConfirm = confirm('Are you sure?')
  if (!isConfirm) {
    return
  } else {
    gCtx.clearRect(0, 0, gElCanvas.width / PIXEL_RATIO, gElCanvas.height / PIXEL_RATIO)
  }
}

function onSelectBrusher(brusher) {
  setCanvasData({brusher})
}

function onChangeBorderColor(borderColor) {
  setCanvasData({borderColor})
}

function onChangeFillColor(fillColor) {
  setCanvasData({fillColor})
}

function onChangeBrushSize(brushSize) {
  setCanvasData({brushSize})
  document.querySelector('.brush-size-value').innerText = brushSize
}

function onDraw(ev) {
  const {x, y} = getEvPos(ev)
  // console.log('offsetX', x)
  // console.log('offsetY', y)

  const {brusher} = getCanvasData()
  switch (brusher) {
    case 'circles':
      drawCircles(x, y, ev)
      break
    case 'rects':
      drawRects(x, y)
      break
    case 'pencil':
      drawPencil(x, y)
      break
  }
}

function drawCircles(x, y, ev) {
  const {borderColor, fillColor, brushSize} = getCanvasData()
  const {movementX, movementY} = ev

  gCtx.beginPath()
  gCtx.lineWidth = brushSize

  const size = Math.abs(movementX * movementY) / 50

  console.log('size', size)

  gCtx.arc(x, y, size, 0, Math.PI * 2)

  gCtx.strokeStyle = borderColor
  gCtx.fillStyle = fillColor
  gCtx.fill()
  gCtx.stroke()

  console.log('circle', gCtx)
}

function drawRects(x, y) {
  const {borderColor, fillColor, brushSize} = getCanvasData()

  gCtx.beginPath()
  gCtx.fillStyle = fillColor
  gCtx.strokeStyle = borderColor

  gCtx.lineWidth = brushSize
  gCtx.rect(x, y, getRandomInt(10, 50), getRandomInt(10, 50))
  gCtx.fill()
  gCtx.stroke()
}

function drawPencil(x, y) {
  const {borderColor, brushSize} = getCanvasData()

  gCtx.beginPath()
  gCtx.lineWidth = brushSize
  gCtx.strokeStyle = borderColor
  gCtx.moveTo(gLasPos.x, gLasPos.y)
  gCtx.lineTo(x, y)
  gCtx.stroke()
  console.log('gCtx', gCtx)

  gLasPos = {x, y}
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = (elContainer.clientWidth - 40) * PIXEL_RATIO
  gElCanvas.height = (elContainer.clientHeight - 40) * PIXEL_RATIO
  gCtx.scale(PIXEL_RATIO, PIXEL_RATIO)
}

function onInfoCanvas() {
  const elModal = document.querySelector('.info')

  elModal.showModal()
}

function onSAveCanvas(elLink) {
  const imgContent = gElCanvas.toDataURL('image/jpeg')
  elLink.href = imgContent
}

//* Handle the listeners

function addListeners() {
  addMouseListeners()
  addTouchListeners()
  //* Listen for resize ev
  window.addEventListener('resize', resizeCanvas)
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mousemove', onMove)
  document.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchmove', onMove)
  document.addEventListener('touchend', onUp)
}

function getEvPos(ev) {
  let pos = {
    x: ev.offsetX / PIXEL_RATIO,
    y: ev.offsetY / PIXEL_RATIO,
  }

  if (TOUCH_EVS.includes(ev.type)) {
    //* Prevent triggering the mouse screen dragging event
    ev.preventDefault()
    //* Gets the first touch point
    ev = ev.changedTouches[0]
    //* Calc the right pos according to the touch screen
    pos = {
      x: (ev.pageX - ev.target.offsetLeft - ev.target.clientLeft) / PIXEL_RATIO,
      y: (ev.pageY - ev.target.offsetTop - ev.target.clientTop) / PIXEL_RATIO,
    }
  }
  return pos
}
