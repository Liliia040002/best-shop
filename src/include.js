async function loadComponent(id, file) {
  const res = await fetch(file);
  const data = await res.text();
  document.getElementById(id).innerHTML = data;
}

loadComponent("header", "/src/html/components/header.html");
loadComponent("footer", "/src/html/components/footer.html");