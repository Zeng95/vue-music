const addClass = (el, className) => {
  if (hasClass(el, className)) {
    return false
  }

  if (Array.isArray(className)) {
    // Add multiple new classes
    el.classList.add(...className)
    return false
  }

  // Use the classList API to add a new class
  el.classList.add(className)
}

const hasClass = (el, className) => {
  // Check if an element contains a class
  // We use the contains() method of the classList property of the element
  return el.classList.contains(className)
}

export { addClass, hasClass }
