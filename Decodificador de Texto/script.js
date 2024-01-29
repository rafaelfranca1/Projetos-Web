function criptografia() {
    let original = document.querySelector('.texto-entrada').value;

    if (original.length > 0 && original != 'Digite seu texto') {
        let saida = original.replaceAll('e', 'enter');
        saida = saida.replaceAll('i', 'imes');
        saida = saida.replaceAll('a', 'ai');
        saida = saida.replaceAll('o', 'ober');
        saida = saida.replaceAll('u', 'ufat');
        
        document.querySelector('.saida__conteudo').style.display = 'none';
        document.querySelector('.resultado').style.display = 'inline';

        let campo = document.querySelector('.texto-saida');
        campo.innerHTML = saida;
    } else {
        console.log('Erro: nenhum texto inserido');
    }  
}

function descriptografia() {
    let original = document.querySelector('.texto-entrada').value;

    if (original.length > 0 && original != 'Digite seu texto') {
        let saida = original.replaceAll('ufat', 'u');
        saida = saida.replaceAll('ober', 'o');
        saida = saida.replaceAll('ai', 'a');
        saida = saida.replaceAll('imes', 'i');
        saida = saida.replaceAll('enter','e');
        
        document.querySelector('.saida__conteudo').style.display = 'none';
        document.querySelector('.resultado').style.display = 'inline';

        let campo = document.querySelector('.texto-saida');
        campo.innerHTML = saida;
    } else {
        console.log('Erro: nenhum texto inserido');
    }  
}

function copiar() {
    let copiarTexto = document.querySelector('.texto-saida');
    let range = document.createRange();
    
    range.selectNode(copiarTexto);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
}