// Delete Product
async function deleteFormHandler(event) {
  event.preventDefault();

  const id =
    event.target.parentElement.parentElement.parentElement.getAttribute(
      'data-product-id'
    );

  const response = await fetch(`/api/products/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

const delbtns = document
  .querySelector('#right_list')
  .querySelectorAll('#btn-delete');

for (i of delbtns) {
  i.addEventListener('click', deleteFormHandler);
}
