
export {image_to_base64}

function image_to_base64(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    return reader.result
  }

  reader.onerror = function (error) {
    console.log('Error: ', error)
  }
}
