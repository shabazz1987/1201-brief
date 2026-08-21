(function(){
  document.querySelectorAll("[data-tabs]").forEach(function(bar){
    bar.addEventListener("click", function(e){
      var b = e.target.closest("button");
      if(!b) return;
      var id = b.getAttribute("data-t");
      var root = bar.parentElement;
      bar.querySelectorAll("button").forEach(function(x){ x.classList.toggle("on", x===b); });
      root.querySelectorAll(":scope > .tabp").forEach(function(p){
        p.classList.toggle("on", p.id === id);
      });
    });
  });
})();
