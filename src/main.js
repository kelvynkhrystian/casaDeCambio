// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

// Recebe e repassa o valor armazenado no input
const getValue = () => {

  const coinValue = document.getElementById('coin').value;
  coinValue.toUpperCase();

  if (coinValue === '') {
    Swal.fire({
      title: 'Error!',
      text: 'Para pesquisar não deixe o espaço vazio!',
      icon: 'error',
      confirmButtonText: 'Entendi!'
    })
    throw new Error ('Campo de busca vazio!');

  } else if (coinValue.length < 3) {
    Swal.fire({
      title: 'Error!',
      text: 'Quantidade de letras insuficientes para encontrar alguma coisa',
      icon: 'error',
      confirmButtonText: 'Entendi!'
    })
    throw new Error ('Campo de busca possui menos de 3 caracteres');

  } else if (coinValue.length > 3) {
    Swal.fire({
      title: 'Error!',
      text: 'Letras demais... Pesquise somente pares de moedas válidos, ex: BRL, USD, EUR !!!',
      icon: 'error',
      confirmButtonText: 'Entendi!'
    })
    throw new Error ('Campo de busca possui mais de 3 caracteres');
  }

  // caso nenhuma das condições de erro forem atendidas o código segue normal
  getCoinsDatabase(coinValue.toUpperCase());
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
    if (coin !== data.base) {
      Swal.fire({
        title: 'Error!',
        text: 'Não encontramos o que procura,tente novamente!',
        icon: 'error',
        confirmButtonText: 'Entendi!'
      })
      throw new Error ('o que procura não existe, retornando dados padão')
    }
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
  const coinValue = element[1].toFixed(2);
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
  const referenceSpan = document.getElementById('referenciaspan');
  reference.style.display = 'flex';
  referenceSpan.innerHTML = `1 ${base}`;
}

const cleanResults = () => {
  const main = document.getElementById('main');
  main.innerHTML = "";
}


