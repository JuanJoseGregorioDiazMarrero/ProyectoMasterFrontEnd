window.addEventListener("load" ,function(){

    var template =document.getElementById("article-template");
    var articles =  this.document.getElementById("articles");
    for(var i=0; i<5 ; i++){
        var clonate =  template.cloneNode(true);
        clonate.removeAttribute('id');
        var h3 = clonate.getElementsByTagName("h3")[0];
        this.console.log(clonate);
        h3.innerHTML = h3.textContent + ' ' + i;
        articles.appendChild(clonate);
    }

});
