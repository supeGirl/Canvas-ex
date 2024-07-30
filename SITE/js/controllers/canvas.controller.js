// 'use strict'
var gElCanvas
var gCtx

var BRUSH_SIZE = 1
var BRUSH_PRESSURE = 1

const BRUSHES = ['circles', 'squares']
// const SCREEN_WIDTH = window.innerWidth
// const SCREEN_HEIGHT = window.innerHeight
// const PIXEL_RATIO = Math.max(1, window.devicePixelRatio)

function onInit() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')

    // gElCanvas.width = SCREEN_WIDTH * PIXEL_RATIO
    // gElCanvas.height = SCREEN_HEIGHT * PIXEL_RATIO
  gElCanvas.style.cursor = 'crosshair'
}

function onDraw(ev) {
  const {offsetX, offsetY} = ev
  switch (BRUSHES) {
    case 'circles':
      drawCircles(offsetX, offsetY)
      break
    case 'squares':
      drawSquares(offsetX, offsetY)
      break
  }
}

function onClearCanvas() {
  const isConfirm = confirm('Are you sure?')
  if (!isConfirm) {
    return
  } else {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
  }
}

function onSAveCanvas(elLink) {
  const imgContent = gElCanvas.toDataURL('image/jpeg')
  elLink.href = imgContent
}

function onInfoCanvas() {
  const elModal = document.querySelector('.info')

  elModal.showModal()
}
