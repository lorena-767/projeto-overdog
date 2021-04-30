var lsProduto = getLsProdutos();
localStorage.setItem("lsProduto", JSON.stringify(lsProduto));
function carregarTabela() {
    lsProduto = JSON.parse(localStorage.getItem("lsProduto"));
    txtTabela = "";
    for (i in lsProduto) {
        p = lsProduto[i]
        txtTabela += `<tr onclick="editar(${i})""><td>${p.cod}</td><td>${p.grupo}</td><td>${p.descricao}</td><td>${p.valor}</td><td><span onclick='mudar(${i},-1)' >&and;</span><span onclick='mudar(${i},1)'>&or;</span></td></tr>`;
    }
    document.getElementById("corpoTabela").innerHTML = txtTabela;

}
function editar(i) {
    p = lsProduto[i];
    document.getElementById("id").value = i;
    document.getElementById("cod").value = p.cod;
    document.getElementById("valor").value = p.valor;
    document.getElementById("descricao").value = p.descricao;
    document.getElementById("grupo").value = p.grupo;
    document.getElementById("tipo").value = p.tipo;
}

function apagar() {
    var id = document.getElementById("id").value;
    if (id == '') {
        return;
    }
    if (confirm("Você realmente deseja apagar esse registro?")) {
        lsProduto.splice(id, 1);
        localStorage.setItem("lsProduto", JSON.stringify(lsProduto));
        carregarTabela();
        novo();
    }
}

function gavar() {
    p = {}
    i = document.getElementById("id").value
    p.cod = document.getElementById("cod").value
    p.valor = Number(document.getElementById("valor").value)
    p.descricao = document.getElementById("descricao").value
    p.grupo = document.getElementById("grupo").value
    p.tipo = document.getElementById("tipo").value
    p.qt = 0;

    if (i == '') {
        lsProduto.push(p);
    } else {
        lsProduto[i] = p;
    }
    localStorage.setItem("lsProduto", JSON.stringify(lsProduto));
    novo();
    carregarTabela();
}

function novo() {
    document.getElementById("formulario").reset();
    document.getElementById("id").value = "";
}
function mudar(i, proximo) {
    i = Number(i)
    proximo = Number(proximo)
    if (lsProduto[i + proximo] == undefined) {
        return;
    }
    x = lsProduto[i];
    lsProduto[i] = lsProduto[i + proximo];
    lsProduto[i + proximo] = x;
    localStorage.setItem("lsProduto", JSON.stringify(lsProduto))
    carregarTabela()
}

carregarTabela();