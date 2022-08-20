let fileElement = document.getElementById('img');
let chosenImage = document.getElementById('chosen-image');
let fileName = document.getElementById('img');


fileElement.onchange = () => {
  console.log('change');
   let reader = new FileReader();
  reader.readAsDataURL(fileElement.files[0]);
  reader.onload = () => {
    chosenImage.setAttribute('src', reader.result);
  };

  fileName.textContent = fileElement.files[0].name;
};

document.getElementById('img').addEventListener('click',()=>{console.log("abc")})