'use strict'

//Local Storage
function loadFromStorage(key) {
  const valueStr = localStorage.getItem(key)
  return JSON.parse(valueStr)
}

function saveToStorage(key, value) {
  const valueStr = JSON.stringify(value)
  localStorage.setItem(key, valueStr)
}
