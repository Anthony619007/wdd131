
(function() {
  const yearSpan = document.getElementById('currentyear');
  if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
  }
  
  const lastModifiedPara = document.getElementById('lastModified');
  if (lastModifiedPara) {
    lastModifiedPara.textContent = 'Last Modified: ' + document.lastModified;
  }
})();