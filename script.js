class Grafo {

    constructor(){
        this.vertices = [];
        this.listaAdjacencia = [];
    }

    addVertice(vertice){
        this.vertices.push(vertice)
        this.listaAdjacencia[vertice] = [];
    }

    adicionarAresta(vertice1, vertice2, peso = 0){
        this.listaAdjacencia[vertice1].push( {vertice: vertice2, peso : peso} )
        this.listaAdjacencia[vertice2].push( {vertice: vertice1, peso : peso} )
    }

    ligacoes() {
        for (let vertice of this.vertices) {
          let ligacoes = this.listaAdjacencia[vertice];
          let conexoes = "";
          let adj;
          for (adj of ligacoes) {
            conexoes += "ligacao: " + adj.vertice + ", valor: " + adj.peso + " ";
          }
          console.log(`${vertice} --> ${conexoes}`);
        }
    }

    dijkstra(origem, destino){
        let distanciaMinima = [];
        let menorCaminho = [];
        let visitados = [];
    
        for (let i = 0; i < this.vertices.length; i++){
            distanciaMinima[this.vertices[i]] = Infinity;
            menorCaminho[this.vertices[i]] = []
            visitados[this.vertices[i]] = false;
        }
    
        distanciaMinima[origem] = 0;
        console.log("Origem: " + origem)
    
        for (let i = 0; i < this.vertices.length; i++){
            const verticeAual = this.menorDistancia(distanciaMinima, visitados);
            visitados[verticeAual] = true;
            for (let vizinho of this.listaAdjacencia[verticeAual]){
                if (!visitados[vizinho.vertice] && (distanciaMinima[verticeAual] + vizinho.peso < distanciaMinima[vizinho.vertice])){

                    distanciaMinima[vizinho.vertice] = distanciaMinima[verticeAual] + vizinho.peso;
                    
                    menorCaminho[vizinho.vertice] = [];
                    for (let i = 0; i < menorCaminho[verticeAual].length; i++){
                        menorCaminho[vizinho.vertice].push(menorCaminho[verticeAual][i])
                    }
                    menorCaminho[vizinho.vertice].push(verticeAual);
                }
            }
        }
        console.log(menorCaminho[destino]);
        console.log(distanciaMinima[destino]);

        menorCaminho[destino].push(destino);

        return { distancia : distanciaMinima[destino].toFixed(2), caminho : menorCaminho[destino] };

    
    }

    menorDistancia(distanciaMinima, visitados){
        let menorDist = Infinity;
        let menorVertice = null;
        for (let i = 0; i < this.vertices.length; i++){
            if (distanciaMinima[this.vertices[i]] <= menorDist && !visitados[this.vertices[i]]){
                menorDist = distanciaMinima[this.vertices[i]];
                menorVertice = this.vertices[i];
            }
        }
        return menorVertice;
    }
}

let grafo = new Grafo();
grafo.addVertice("Feliz");
grafo.addVertice("Vale Real");
grafo.addVertice("S. S. do Cai");
grafo.addVertice("Alto Feliz");
grafo.addVertice("Bom Principio");
grafo.addVertice("Tupandi");
grafo.addVertice("Sao Vendelino");
grafo.adicionarAresta("Feliz", "Bom Principio", 9.1);
grafo.adicionarAresta("Feliz", "Alto Feliz", 10.9);
grafo.adicionarAresta("Feliz", "Vale Real", 9.3);
grafo.adicionarAresta("Feliz", "S. S. do Cai", 22.9);
grafo.adicionarAresta("Vale Real", "Alto Feliz", 11.3);
grafo.adicionarAresta("S. S. do Cai", "Bom Principio", 12.4);
grafo.adicionarAresta("Bom Principio", "Sao Vendelino", 15.4);
grafo.adicionarAresta("Sao Vendelino", "Alto Feliz", 10.2);
grafo.adicionarAresta("Tupandi", "Bom Principio", 10.3);
grafo.ligacoes();
pegaLinhas(grafo)


const botao = document.querySelector('#btnCalcular');

botao.addEventListener('click', aa);
function aa(){
    var origem = document.querySelector('#origem');
    var opcaoOrigem = origem.options[origem.selectedIndex].value;
    var destino = document.querySelector('#destino');
    var opcaoDestino = destino.options[destino.selectedIndex].value;
    var caminho = document.querySelector('#caminho');
    var distancia = document.querySelector('#distancia');
    var erro = document.querySelector('#erro');
    if (opcaoOrigem == opcaoDestino){
        erro.textContent = "Selecione uma opção de origem diferente da opção de destino!";
        caminho.textContent = "";
        distancia.textContent = "";
        mudaCorDoCaminho(grafo.vertices, null)
    } else {
        let resultDijkstra = grafo.dijkstra(opcaoOrigem, opcaoDestino);
        mudaCorDoCaminho(grafo.vertices, resultDijkstra.caminho);
        let caminhoFormatado = "Caminho: ";

        for (let i = 0; i < resultDijkstra.caminho.length - 1; i++){
            caminhoFormatado += resultDijkstra.caminho[i] + " --> ";
        }
        caminhoFormatado += resultDijkstra.caminho[resultDijkstra.caminho.length - 1]

        erro.textContent = "";
        caminho.textContent = caminhoFormatado;
        distancia.textContent = "Distancia: " + resultDijkstra.distancia + "KM";  
    } 
}

function mudaCorDoCaminho(vertices, caminho){
    for (let vertice of vertices){
        vertice = vertice.replace(/\./g, "").replace(/\s/g, '');
        let verticeHtml = document.querySelector(`.${vertice}`);
        verticeHtml.style.backgroundColor = 'blue';
    }
    for (let cidade of caminho){
        cidade = cidade.replace(/\./g, "").replace(/\s/g, '');
        let cidadeHtml = document.querySelector(`.${cidade}`);
        cidadeHtml.style.backgroundColor = 'green';
    }
}

function pegaLinhas(grafo){

    let visitados = [];

    for (let i = 0; i < grafo.vertices.length; i++){
        let verticeAtual = grafo.vertices[i];
        visitados.push(verticeAtual);
        let elemento1 = verticeAtual.replace(/\./g, "").replace(/\s/g, '');
        let e1 = document.querySelector(`.${elemento1}`);
        console.log(grafo.listaAdjacencia[verticeAtual])
        
        for (let j = 0; j < grafo.listaAdjacencia[verticeAtual].length; j++){

            let vizinho = grafo.listaAdjacencia[verticeAtual][j].vertice;

            if (!visitados.includes(vizinho)){
                let elemento2 = vizinho.replace(/\./g, "").replace(/\s/g, '');
                let e2 = document.querySelector(`.${elemento2}`);
                console.log(elemento1, elemento2)
                let line = document.createElement("div");
                line.id = `line${(i+j) * j}`;
                document.querySelector('#lines').appendChild(line);
                drawLine(e1, e2, line)
            }
        }    
    }
}



function drawLine(e1, e2, line){
    const rect1 = e1.getBoundingClientRect(); 
    const rect2 = e2.getBoundingClientRect(); 

    const x1 = rect1.left + rect1.width / 2; 
    const y1 = rect1.top + rect1.height / 2; 
    const x2 = rect2.left + rect2.width / 2; 
    const y2 = rect2.top + rect2.height / 2; 
    
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2); const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    
    line.style.width = `${length}px`; 
    line.style.transform = `rotate(${angle}deg)`; 
    line.style.top = `${y1}px`; 
    line.style.left = `${x1}px`;
}

