async function deleteFormHandler(event) {
  event.preventDefault();
  let url="/shopping/"+event.target.id;
  console.log(url);
  const response = await fetch(url, {
    method: 'DELETE'
  })
  
  document.location.replace('/dashboard');

}

document.getElementById('display').addEventListener('click', deleteFormHandler);
