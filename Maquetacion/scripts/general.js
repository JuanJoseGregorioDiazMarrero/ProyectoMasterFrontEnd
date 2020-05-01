window.addEventListener("load" ,function(){

    var template =document.getElementById("article-template");
    var articles =  this.document.getElementById("articles");
    for(var i=0; i<5 ; i++){
        var clonate =  template.cloneNode(true);
        clonate.removeAttribute('id');
        var h2 = clonate.getElementsByTagName("h2")[0];
        this.console.log(clonate);
        h2.innerHTML = h2.textContent + ' ' + i;
        articles.appendChild(clonate);
    }

});
