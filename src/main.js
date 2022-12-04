// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

const error = (coinValue, data) => {
  const coinUp = coinValue.toUpperCase();
  
  if (coinUp === '') {
    Swal.fire({
      title: 'Error!',
      text: 'O espaço de pesquisa está vazio!',
      icon: 'error',
      confirmButtonText: 'Entendi!',
      background: '#2f3135',
      color: '#fff'
    })
    throw new Error ('Campo de busca vazio!');

  } else if (coinUp.length < 3) {
    Swal.fire({
      title: 'Error!',
      text: 'Quantidade de letras insuficientes para encontrar alguma coisa!',
      icon: 'error',
      confirmButtonText: 'Entendi!',
      background: '#2f3135',
      color: '#fff'
    })
    throw new Error ('Campo de busca possui menos de 3 caracteres');

  } else if (coinUp.length > 3) {
    Swal.fire({
      title: 'Error!',
      text: 'Letras demais... Não existem pares disponíveis com mais de 3 letras!',
      icon: 'error',
      confirmButtonText: 'Entendi!',
      background: '#2f3135',
      color: '#fff'
    })
    throw new Error ('Campo de busca possui mais de 3 caracteres');
  } else if (coinUp !== data) {
    Swal.fire({
      title: 'Error!',
      text: 'Não encontramos o que procura,tente novamente!',
      icon: 'error',
      confirmButtonText: 'Entendi!',
      background: '#2f3135',
      color: '#fff'
    })
    throw new Error ('o que procura não existe, retornando dados padão')
  }
}

// Recebe e repassa o valor armazenado no input
const getValue = () => {
  const coinValue = document.getElementById('coin').value;
  getCoinsDatabase(coinValue);
}

const blockNumber = (e) => {
  const keyCode = (e.keyCode ? e.keyCode : e.which);
  if (keyCode > 47 && keyCode < 58) {
    e.preventDefault();
  }
}

// Onde tudo começa
// Evento pesquisar quando o botão é clickado
const search = () => {
  const pesquisar = document.getElementById('pesquisar');
  const coin = document.getElementById('coin');
  pesquisar.addEventListener('click', getValue);
  coin.addEventListener("keypress", blockNumber);
}
search();

// faz a requisição na API e repassa os dados ŕecebidos
const getCoinsDatabase = async (coin) => {
  try {
    const response = await fetch(`https://api.exchangerate.host/latest?base=${coin}`);
    const data =  await response.json();
    error(coin, data.base);
    renderCoin(data);
    reference(data);
  }
  catch (erro) {
    console.log(erro.message);
  }
}

const createCoinsBox = (element) => {
  const main = document.querySelector("#main");
  const coinPar = document.createElement("p");
  const inputNumber = document.getElementById('number').value;
  const coinValue = (element[1] * inputNumber).toFixed(2);
  coinPar.innerHTML = `<b>${element[0]}: </b> ${coinValue}`;
  coinPar.style.margin = '5px';
  coinPar.style.padding = '5px';
  coinPar.style.borderRadius = '10px';
  main.style.display = 'flex';
  main.appendChild(coinPar);
}

// recebe o valor da chave rates, por object destructing, devido ao valor data ser passado por arg
const renderCoin = ({rates}) => {
  cleanResults();
  const pares = Object.entries(rates);
  pares.forEach((element) => createCoinsBox(element));
}

// Renderiza valor referente dinamicamente dependendo da chave base da api
const reference = ({base}) => {
  const reference = document.getElementById('referencia');
  const inputNumber = document.getElementById('number').value;
  const referenceSpan = document.getElementById('referenciaspan');
  reference.style.display = 'flex';
  referenceSpan.innerHTML = `${inputNumber} ${base}`;
}

const cleanResults = () => {
  const main = document.getElementById('main');
  main.innerHTML = "";
}


