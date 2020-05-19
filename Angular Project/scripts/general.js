window.addEventListener("load" ,function(){

    var template =document.getElementById("article-template");
    var articles =  this.document.getElementById("articles");
    for(var i=0; i<5 ; i++){
        var clonate =  template.cloneNode(true);
        clonate.removeAttribute('id');
        var h5 = clonate.getElementsByTagName("h5")[0];
        this.console.log(clonate);
        h5.innerHTML = h5.textContent + ' ' + i;
        articles.appendChild(clonate);
    }

});
