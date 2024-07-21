function calc_funcao(input_funcao, x_funcao) {
    input_funcao = input_funcao.replace(/sen/g, 'Math.sin')
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/log/g, 'Math.log')
        .replace(/exp\(/g, 'Math.exp(')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/pi/g, 'Math.PI')
        .replace(/\be\b/g, 'Math.E')
        .replace(/pow/g, 'Math.pow')
        .replace(/\bx\b/g, `(${x_funcao})`)
    
    return eval(input_funcao)
}

function calc_derivada(input_funcao, x_funcao) {
    let h = 0.00001;
    let f_x = calc_funcao(input_funcao, x_funcao);
    let f_x_mais_h = calc_funcao(input_funcao, x_funcao + h);
    return (f_x_mais_h - f_x) / h;
}

function bissecao() {
    let f = document.getElementById('inputFuncao').value;
    let a = parseFloat(document.getElementById('inputA').value);
    let b = parseFloat(document.getElementById('inputB').value);
    let epsilon = parseFloat(document.getElementById('inputEpsilon').value);

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

function falsaPosicao() {
    let f = document.getElementById('inputFuncao').value;
    let a = parseFloat(document.getElementById('inputA').value);
    let b = parseFloat(document.getElementById('inputB').value);
    let epsilon = parseFloat(document.getElementById('inputEpsilon').value);

    let tabelaConteudo = "";
    let k = 0
    let x = (a * calc_funcao(f, b) - b * calc_funcao(f, a)) / (calc_funcao(f, b) - calc_funcao(f, a))
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

        x = (a * calc_funcao(f, b) - b * calc_funcao(f, a)) / (calc_funcao(f, b) - calc_funcao(f, a))

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

function newton() {
    let f = document.getElementById('inputFuncao').value;
    let x0 = parseFloat(document.getElementById('inputA').value);
    let epsilon = parseFloat(document.getElementById('inputEpsilon').value);

    let tabelaConteudo = "";
    
    let k = 0
    let f_x = calc_funcao(f, x0)
    let f_derivada_x = calc_derivada(f, x0)

    while(Math.abs(f_x) > epsilon) {
        tabelaConteudo += `
        <tr>
            <th scope="row">${k}</th>
            <td>${x0.toFixed(6)}</td>
            <td>${f_x.toFixed(6)}</td>
            <td>${f_derivada_x.toFixed(6)}</td>
        </tr>
        `;

        x0 = x0 - (f_x / f_derivada_x)
        f_x = calc_funcao(f, x0)
        f_derivada_x = calc_derivada(f, x0)

        k++
    }

    tabelaConteudo += `
    <tr>
        <th scope="row">${k}</th>
        <td>${x0.toFixed(6)}</td>
        <td>${f_x.toFixed(6)}</td>
        <td>${f_derivada_x.toFixed(6)}</td>
    </tr>
    `;

    document.getElementById('resultados').innerHTML = `
        <h1 id="formulaFuncao" class="mb-3"></h1> 

        <table class="table table-striped text-center">
            <thead>
                <tr>
                    <th scope="col">n</th>
                    <th scope="col">x_n</th>
                    <th scope="col">f(x_n)</th>
                    <th scope="col">f'(x_n)</th>
                </tr>
            </thead>
            <tbody id="tabelaDados"></tbody>
        </table>

        <h1 id="valorX">x: ${x0}</h1>
    `
    document.getElementById('formulaFuncao').innerHTML = `Função: \\(${f.replace(/\*\*/g, '^')
                                                            .replace(/\*/g, '')
                                                            .replace(/exp\((.*?)\)/g, 'e^{$1}')}\\)`;
    MathJax.typeset();
    document.getElementById('tabelaDados').innerHTML = tabelaConteudo;
}

function secante() {
    let f = document.getElementById('inputFuncao').value;
    let x_n_menos1 = parseFloat(document.getElementById('inputA').value);
    let x_n = parseFloat(document.getElementById('inputB').value);
    let epsilon = parseFloat(document.getElementById('inputEpsilon').value);

    let tabelaConteudo = "";

    let k = 0

    let f_x_n = calc_funcao(f, x_n)
    let f_x_n_menos1 = calc_funcao(f, x_n_menos1)
    let x_n_mais1 = (x_n_menos1 * f_x_n - x_n *  f_x_n_menos1) / (f_x_n - f_x_n_menos1)
    let f_x_n_mais1 = calc_funcao(f, x_n_mais1)

    while(Math.abs(f_x_n) > epsilon) {
        tabelaConteudo += `
        <tr>
            <th scope="row">${k}</th>
            <td>${x_n_menos1.toFixed(6)}</td>
            <td>${x_n.toFixed(6)}</td>
            <td>${x_n_mais1.toFixed(6)}</td>
            <td>${f_x_n_menos1.toFixed(6)}</td>
            <td>${f_x_n.toFixed(6)}</td>
            <td>${f_x_n_mais1.toFixed(6)}</td>
        </tr>
        `;

        x_n_menos1 = x_n
        x_n = x_n_mais1
    
        f_x_n = calc_funcao(f, x_n)
        f_x_n_menos1 = calc_funcao(f, x_n_menos1)
        x_n_mais1 = (x_n_menos1 * f_x_n - x_n *  f_x_n_menos1) / (f_x_n - f_x_n_menos1)
        f_x_n_mais1 = calc_funcao(f, x_n_mais1)
        k++
    }

    tabelaConteudo += `
    <tr>
        <th scope="row">${k}</th>
        <td>${x_n_menos1.toFixed(6)}</td>
        <td>${x_n.toFixed(6)}</td>
        <td>${x_n_mais1.toFixed(6)}</td>
        <td>${f_x_n_menos1.toFixed(6)}</td>
        <td>${f_x_n.toFixed(6)}</td>
        <td>${f_x_n_mais1.toFixed(6)}</td>
    </tr>
    `;

    document.getElementById('resultados').innerHTML = `
        <h1 id="formulaFuncao" class="mb-3"></h1> 

        <table class="table table-striped text-center">
            <thead>
                <tr>
                    <th scope="col">n</th>
                    <th scope="col">xn-1</th>
                    <th scope="col">xn</th>
                    <th scope="col">xn+1</th>
                    <th scope="col">f(xn-1)</th>
                    <th scope="col">f(xn)</th>
                    <th scope="col">f(xn+1)</th>
                </tr>
            </thead>
            <tbody id="tabelaDados"></tbody>
        </table>

        <h1 id="valorX">x: ${x_n}</h1>
    `
    document.getElementById('formulaFuncao').innerHTML = `Função: \\(${f.replace(/\*\*/g, '^').replace(/\*/g, '')}\\)`;
    MathJax.typeset();
    document.getElementById('tabelaDados').innerHTML = tabelaConteudo;
}

function trocaPagina(pagina) {
    var conteudoPaginas = {
        paginaBisseccao: `
            <h1 class="mb-4 display-1">Metodo da Bissecção</h1>
            <p class="mb-3 fs-5">
                O método de bissecção em matemática é um método de localização de raízes que divide repetidamente um intervalo ao meio e, em seguida, seleciona um subintervalo no qual uma raiz deve estar para processamento posterior.
            </p>

            <div class="container mt-5 mb-5">
                <div class="card p-4">
                    <div class="card-body">
                        <div class="input-group mb-3">
                            <span class="input-group-text">f(x)</span>
                            <div class="form-floating">
                                <input type="text" class="form-control" id="inputFuncao" placeholder="Função">
                                <label for="inputFuncao">Função</label>
                            </div>
                        </div>

                        <div class="row g-3">
                            <div class="col-md-4">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="inputA" placeholder="a">
                                    <label for="inputA">Limite inferior (a)</label>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="inputB" placeholder="b">
                                    <label for="inputB">Limite superior (b)</label>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="inputEpsilon" placeholder="epsilon">
                                    <label for="inputEpsilon">Precisão (epsilon)</label>
                                </div>
                            </div>
                        </div>

                        <button onclick="bissecao()" type="submit" class="btn btn-primary mb-3">Calcular</button>

                        <div id="resultados"></div>
                    </div>
                </div>
            </div>
        `,
        paginaFalsaPosicao: `
            <h1 class="mb-4 display-1">Metodo da Falsa Posição</h1>
            <p class="mb-3 fs-5">
                O método da falsa posição é um método numérico para resolver equações não lineares. Ele é uma modificação do método da bissecção, que é mais lento.
            </p>

            <div class="container mt-5 mb-5">
                <div class="card p-4">
                    <div class="card-body">
                        <div class="input-group mb-3">
                            <span class="input-group-text">f(x)</span>
                            <div class="form-floating">
                                <input type="text" class="form-control" id="inputFuncao" placeholder="Função">
                                <label for="inputFuncao">Função</label>
                            </div>
                        </div>

                        <div class="row g-3">
                            <div class="col-md-4">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="inputA" placeholder="a">
                                    <label for="inputA">Limite inferior (a)</label>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="inputB" placeholder="b">
                                    <label for="inputB">Limite superior (b)</label>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="inputEpsilon" placeholder="epsilon">
                                    <label for="inputEpsilon">Precisão (epsilon)</label>
                                </div>
                            </div>
                        </div>

                        <button onclick="falsaPosicao()" type="submit" class="btn btn-primary mb-3">Calcular</button>

                        <div id="resultados"></div>
                    </div>
                </div>
            </div>
        `,
        paginaNewton: `
            <h1 class="mb-4 display-1">Metodo de Newton</h1>
            <p class="mb-3 fs-5">
                O método de Newton, também conhecido como método de Newton-Raphson, é um método iterativo para encontrar raízes de equações polinomiais e funções transcendentes.
            </p>

            <div class="container mt-5 mb-5">
                <div class="card p-4">
                    <div class="card-body">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <div class="input-group mb-3">
                                    <span class="input-group-text">f(x)</span>
                                    <div class="form-floating">
                                        <input type="text" class="form-control" id="inputFuncao" placeholder="Função">
                                        <label for="inputFuncao">Função</label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="inputA" placeholder="a">
                                    <label for="inputA">Limite inferior (a)</label>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="inputEpsilon" placeholder="epsilon">
                                    <label for="inputEpsilon">Precisão (epsilon)</label>
                                </div>
                            </div>
                        </div>

                        <button onclick="newton()" type="submit" class="btn btn-primary mb-3">Calcular</button>

                        <div id="resultados"></div>
                    </div>
                </div>
            </div>
        `,          
        paginaSecante: `
            <h1 class="mb-4 display-1">Metodo da Secante</h1>
            <p class="mb-3 fs-5">
                O método da secante é um método numérico para encontrar raízes de uma função real. É uma técnica de interpolação linear que usa duas aproximações iniciais para uma raiz.
            </p>

            <div class="container mt-5 mb-5">
                <div class="card p-4">
                    <div class="card-body">
                        <div class="input-group mb-3">
                            <span class="input-group-text">f(x)</span>
                            <div class="form-floating">
                                <input type="text" class="form-control" id="inputFuncao" placeholder="Função">
                                <label for="inputFuncao">Função</label>
                            </div>
                        </div>

                        <div class="row g-3">
                            <div class="col-md-4">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="inputA" placeholder="a">
                                    <label for="inputA">Limite inferior (a)</label>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="inputB" placeholder="b">
                                    <label for="inputB">Limite superior (b)</label>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="inputEpsilon" placeholder="epsilon">
                                    <label for="inputEpsilon">Precisão (epsilon)</label>
                                </div>
                            </div>
                        </div>

                        <button onclick="secante()" type="submit" class="btn btn-primary mb-3">Calcular</button>

                        <div id="resultados"></div>
                    </div>
                </div>
            </div>
        `
    }

    var nomePaginas = ["paginaBisseccao", "paginaFalsaPosicao", "paginaNewton", "paginaSecante"]

    nomePaginas.forEach(p => document.getElementById(p).classList.remove("active"))
    document.getElementById(pagina).classList.add("active");
    document.querySelector('main').innerHTML = conteudoPaginas[pagina]
}

document.getElementById("paginaBisseccao").addEventListener("click", function(evento) {
    evento.preventDefault(); 
    trocaPagina("paginaBisseccao")
});

document.getElementById("paginaFalsaPosicao").addEventListener("click", function(evento) {
    evento.preventDefault(); 
    trocaPagina("paginaFalsaPosicao")
});

document.getElementById("paginaNewton").addEventListener("click", function(evento) {
    evento.preventDefault(); 
    trocaPagina("paginaNewton")       
});

document.getElementById("paginaSecante").addEventListener("click", function(evento) {
    evento.preventDefault(); 
    trocaPagina("paginaSecante") 
});

trocaPagina("paginaBisseccao")