function calcularRaiz() {
    inputFuncao = document.getElementById('inputFuncao').value;
    inputA = parseFloat(document.getElementById('inputA').value);
    inputB = parseFloat(document.getElementById('inputB').value);
    inputEpsilon = parseFloat(document.getElementById('inputEpsilon').value);

    bissecao(inputA, inputB, inputEpsilon, inputFuncao)
}

function calc_funcao(input_funcao, x_funcao) {
    input_funcao = input_funcao.replace(/sen/g, 'Math.sin')
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/log/g, 'Math.log')
        .replace(/exp/g, 'Math.exp')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/pi/g, 'Math.PI')
        .replace(/\be\b/g, 'Math.E')
        .replace(/pow/g, 'Math.pow')
        .replace(/x/g, `(${x_funcao})`)
    
    return eval(input_funcao)
}

function bissecao(a, b, epsilon, f) {
    let tabelaConteudo = "";

    let k = 0
    let x = (a + b) / 2
    let f_x = calc_funcao(f, x)
    let f_a = calc_funcao(f, a)
    let f_b = calc_funcao(f, b)

    while(Math.abs(f_x) > epsilon) {
        tabelaConteudo += `
        <tr>
            <th scope="row">${k}</th>
            <td>${a.toFixed(6)}</td>
            <td>${b.toFixed(6)}</td>
            <td>${f_a.toFixed(6)}</td>
            <td>${f_b.toFixed(6)}</td>
            <td>${x.toFixed(6)}</td>
            <td>${f_x.toFixed(6)}</td>
        </tr>
        `;

        if (f_a * f_x < 0) {
            b = x
        } else {
            a = x
        }

        f_a = calc_funcao(f, a)
        f_b = calc_funcao(f, b)

        x = (a + b) / 2

        f_x = calc_funcao(f, x)
        k++
    }

    tabelaConteudo += `
    <tr>
        <th scope="row">${k}</th>
        <td>${a.toFixed(6)}</td>
        <td>${b.toFixed(6)}</td>
        <td>${f_a.toFixed(6)}</td>
        <td>${f_b.toFixed(6)}</td>
        <td>${x.toFixed(6)}</td>
        <td>${f_x.toFixed(6)}</td>
    </tr>
    `;

    document.getElementById('resultados').innerHTML = `
        <h1 id="formulaFuncao" class="mb-3"></h1> 

        <table class="table table-striped text-center">
            <thead>
                <tr>
                    <th scope="col">n</th>
                    <th scope="col">a</th>
                    <th scope="col">b</th>
                    <th scope="col">f(a)</th>
                    <th scope="col">f(b)</th>
                    <th scope="col">x</th>
                    <th scope="col">f(x)</th>
                </tr>
            </thead>
            <tbody id="tabelaDados"></tbody>
        </table>

        <h1 id="valorX">x: ${x}</h1>
    `
    document.getElementById('formulaFuncao').innerHTML = `Função: \\(${f.replace(/\*\*/g, '^')}\\)`;
    MathJax.typeset();
    document.getElementById('tabelaDados').innerHTML = tabelaConteudo;
}