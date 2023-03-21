const downloadButtons = document.querySelectorAll('.download-button');

downloadButtons.forEach(button => {
  button.addEventListener('click', () => {
    const imageUrl = button.previousElementSibling.src;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = imageUrl.split('/').pop();
    link.click();
  });
});
