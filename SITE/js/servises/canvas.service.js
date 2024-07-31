'use strict'

let gCanvasDate = {
  brusher: 'circles',
  borderColor: '#15C1B5',
  fillColor: '#ffffff',
  brushSize : 5,
}

function setCanvasData(date) {
  gCanvasDate = {...gCanvasDate, ...date}
}

function getCanvasData() {
  return gCanvasDate
}

