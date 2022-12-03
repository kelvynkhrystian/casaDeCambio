// Recebe e repassa o valor armazenado no input
const getValue = () => {
    const coinValue = document.getElementById('coin').value;
    getCoinsDatabase(coinValue);
}

// Onde tudo começa
// Evento pesquisar quando o botão é clickado
const search = () => {
    const pesquisar = document.getElementById('pesquisar');
    pesquisar.addEventListener('click', getValue);
}
search();

// faz a requisição na API e repassa os dados ŕecebidos
const getCoinsDatabase = async (coin) => {
    const response = await fetch(`https://api.exchangerate.host/latest?base=${coin}`);
    const data =  await response.json();
    renderCoin(data);
    reference(data)
}

const createCoinsBox = (element) => {
    const main = document.querySelector("#main")
    const coinPar = document.createElement("p");
    coinPar.innerHTML = `${element[0]}: ${element[1]}`
    main.appendChild(coinPar)

}

// recebe o valor da chave rates, por object destructing, devido ao valor data ser passado por arg
const renderCoin = ({rates}) => {
    const pares = Object.entries(rates);
    pares.forEach((element) => createCoinsBox(element));
}

// Renderiza valor referente dinamicamente dependendo da chave base da api
const reference = ({base}) => {
    const reference = document.getElementById('referencia');
    const referenceSpan = document.getElementById('referenciaspan');
    reference.style.display = 'flex';
    referenceSpan.innerHTML = `1 ${base}`;
}
