const previewField = document.getElementById("preview")
const textArea = document.getElementById("input")

function displayInput() {
  previewField.innerHTML = marked(textArea.value)
}

textArea.addEventListener('keyup', displayInput)