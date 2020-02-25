function error(){
    return window.alert('Dados inválidos!')
}

var estados = []
function addEstado() {
    var txte = document.getElementById('txtest')
    var txtest = txte.value.toLowerCase()

    if(txtest.length == 0 || estados.indexOf(txtest) != -1) {
        error()
        txte.value = ''
        txte.focus()
        return
    }

    var est = document.getElementById('est')
    estados.push(txtest)
    est.innerHTML = estados
    updateOption('est', estados)
    txte.value = ''
    txte.focus()
}

var simEntrada = ['λ']
function addSimEnt() {
    var txts = document.getElementById('txtsiment')
    var txtsiment = txts.value.toLowerCase()
    if(txtsiment.length == 0 || simEntrada.indexOf(txtsiment) != -1) {
        error()
        txts.value = ''
        txts.focus()
        return
    }

    simEntrada.push(txtsiment)
    siment.innerHTML = simEntrada
    updateOption('ent', simEntrada)
    txts.value = ''
    txts.focus()
}

var auxiliares = ['λ']
function addAuxiliares() {

    var txta = document.getElementById('txtaux')
    var txtaux = txta.value.toUpperCase()
    if(txtaux.length == 0 || auxiliares.indexOf(txtaux) != -1) {
        error()
        txta.value = ''
        txta.focus()
        return
    }
    
    var aux = document.getElementById('aux')
    auxiliares.push(txtaux)
    aux.innerHTML = auxiliares
    updateOption('aux', auxiliares)
    txta.value = ''
    txta.focus()
}

function updateOption(classe, array) {
    var classes = document.getElementsByClassName(classe)

    for( var i = 0; i < classes.length; i++ ) {
        classes[i].innerHTML = ''
      for( var id in array ) {
        classes[i].options.add( new Option( array[id], id ));
      }
    }
}

function createTrans() {
    var inc = document.getElementById('inc')
    inc.innerHTML += '<select name="tra" class="aux"></select>'
    updateOption('aux', auxiliares)
}

function printTrans() {
    var lp = document.getElementById('printt')
    var t = document.getElementsByName('tra')
    var a = []
    
    for(var n=0; n<t.length; n++){
        a.push(t[n].options[t[n].selectedIndex].text)
    }
    
    lp.innerHTML += `δ(${a[0]}, ${a[1]}, ${a[2]}) = (${a[3]}, `//${a[4]}) <br>`
    for(var x=4; x<a.length; x++){
        lp.innerHTML += `${a[x]}`
    }
    lp.innerHTML += `) <br>`
    printPal()
    ftrans.push(a)
}

function optionText(sel) {
    return sel.options[sel.selectedIndex].text
}

var u = true
function printPal() {
    if(u){
        var pal = document.getElementById('pal')
        //pal.innerHTML = 'aew!'
        pal.style.display = 'block'
        u = false
    }
}

var palavras = []
function addPal() {
    var smul = document.getElementById('smul')
    var txt = document.getElementById('paltxt')
    var item = document.createElement('option')

    if(txt.value.length < 1) return

    item.text = txt.value
    smul.appendChild(item)
    palavras.push(txt.value)
    txt.value = ''
    txt.focus()
}

var ftrans = []
function testar() {
    var base = optionText(document.getElementById('bas'))
    var estInicial = optionText(document.getElementById('ini'))
    var estAtual
    var pilha
    var z
    var topo

    //estAtual = estInicial
    
    var res = document.getElementById('res')
    res.innerHTML = ''
    res.innerHTML += '<h3>Resultado</h3>'
    
    for(var i = 0; i<palavras.length; i++) { // loop de cada palavra
        pilha = [base]
        estAtual = estInicial
        for(var n = 0; n<palavras[i].length; n++) { // loop de cada letra
            topo = pilha[pilha.length-1]
            z = 'n'
            for(var x = 0; x<ftrans.length; x++) { // loop de cada transição
                if( ( estAtual == ftrans[x][0] ) && ( palavras[i][n] == ftrans[x][1] ) && ( topo == ftrans[x][2] ) ) {
                    console.log(`1) palavra = ${palavras[i]} | pilha = ${pilha}`)
                    estAtual = ftrans[x][3]
                    pilha.pop()
                    for(var y = 4; y<ftrans[x].length; y++) {
                        if(ftrans[x][y] != 'λ') pilha.push(ftrans[x][y])
                        console.log(`2) palavra = ${palavras[i]} | pilha = ${pilha}`)
                    }
                    z = 'fez'
                    break
                }
            }
            if(z != 'fez') break
        }
        
        console.log(`3) palavra = ${palavras[i]} | pilha = ${pilha}`)
        if(pilha.length == 0 || (pilha == 'λ' && pilha.length == 1 && z == 'fez')) {
            res.innerHTML += `<p id="cgreen">${palavras[i]} = ACEITA!</p><br>`
        } else {
            res.innerHTML += `<p id="cred">${palavras[i]} = RECUSA!</p><br>`
        }
        
    }
}