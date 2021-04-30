var lsProduto = getLsProdutos();
function addProduto(i, qt) {
    produto = lsProduto[i];
    produto.qt += qt;
    (produto.qt < 0) ? produto.qt = 0 : "";
    document.getElementById("cod-" + i).innerHTML = `R$ ${(produto.valor * produto.qt).toFixed(1)} (x${produto.qt})`;
}

function criar() {
    g = "";
    p = lsProduto[1];
    for (i in lsProduto) {
        p = lsProduto[i];

        if (g != p.grupo) {
            var grupo = document.createElement("div");
            grupo.classList.add("grupo");
            grupo.innerHTML = `<h4>${p.grupo}<span>${p.tipo}</span></h4>`;
            document.getElementById("conteudo").appendChild(grupo);
            g = p.grupo;
        }

        if (p.cod != '') {
            var produto = document.getElementsByClassName("produtor")[0].cloneNode(true);
            produto.getElementsByClassName("descricao")[0].innerHTML = p.descricao;
            produto.getElementsByClassName("cod")[0].innerHTML = p.cod;
            produto.getElementsByClassName("valor")[0].innerHTML = `R$ ${p.valor.toFixed(1)}`;
            setEvents(produto);
            // document.getElementById("conteudo").appendChild(produto);
        } else {
            var produto = document.getElementsByClassName("outros")[0].cloneNode(true);
            produto.getElementsByClassName("outros-desc")[0].innerHTML = p.descricao;
            produto.getElementsByClassName("outros-valor")[0].innerHTML = `R$ ${p.valor.toFixed(1)}`;
            setEvents(produto);
            p.cod = p.descricao;

        }
        document.getElementById("conteudo").appendChild(produto);
    }

    none = document.createAttribute("style");
    none.value = `display: none`;
    document.getElementsByClassName("produtor")[0].setAttributeNode(none)
    document.getElementsByClassName("outros")[0].style.display = 'none';
}
var pedido = '';

function setEvents(produto) {
    var btSoma = produto.getElementsByClassName("bt-soma")[0];
    addP = document.createAttribute("onclick");
    addP.value = `addProduto(${i}, 1)`;
    btSoma.setAttributeNode(addP)

    var btSubtrai = produto.getElementsByClassName("bt-subtrai")[0];
    addS = document.createAttribute("onclick");
    addS.value = `addProduto(${i}, -1)`;
    btSubtrai.setAttributeNode(addS)

    var idValor = document.createAttribute("id");
    idValor.value = `cod-${i}`;
    produto.getElementsByClassName("parcial")[0].setAttributeNode(idValor);
}

function enviar() {
    modal.style.display = "block";
    total = 0;
    extrato = "";
    for (i in lsProduto) {
        p = lsProduto[i]
        if (p.qt > 0) {
            (p.cod.length > 3) ? extrato += '' : extrato += '№ ';
            extrato += `${p.cod} (${p.qt}x R$${p.valor.toFixed(1)}) = R$${(p.qt * p.valor).toFixed(1)} <br>`;
            total += p.qt * p.valor;
        }
    }
    if (extrato != "") {
        extrato += `TOTAL PRODUTOS = R$${total.toFixed(1)}`;
        document.getElementById("complemeto").style.display = 'block';
        document.getElementById("bt-enviarws").style.display = 'block';
    } else {
        extrato = ' Escolha um produto.';
        document.getElementById("complemeto").style.display = 'none';
        document.getElementById("bt-enviarws").style.display = 'none';
    }

    document.getElementById("pedido").innerHTML = extrato;
    pedido = extrato;

}
//enviar via whatsapp
function enviarWs() {
    fone = '5561983122921';
    nome = document.getElementById("nome").value;
    endereco = document.getElementById("endereco").value;
    (endereco != '') ? pedido += `<br>endereco: ${endereco}`:'';
    if (nome == '') {alert("Digite seu nome"); return ;}
    pedido += `<br>Nome: ${nome}`;
    pedido = pedido.replaceAll('<br>', '\n');
    pedido = encodeURI(pedido);
    console.log(pedido)
    link = `https://api.whatsapp.com/send?phone=${fone}&text=${pedido}`;
    window.open(link,'_blank');
    
}
criar();
var acc = document.getElementsByClassName("item");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {

        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

var btn = document.getElementById("btEnviar");
var modal = document.getElementById("modal");

btn.onclick = function () {
    enviar();
}

var btnX = document.getElementsByClassName("fechar")[0];
btnX.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    
    if (event.target == modal) {
        modal.style.display = "none";
    }
}