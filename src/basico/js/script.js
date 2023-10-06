// Função para calcular a média de notas
const calcularMedia = (notas) => {
    let soma = 0;
    for (let c = 0; c < notas.length; c++) {
        soma += notas[c];
    }

    const media = soma / notas.length;

    return media;
}

// Função para verificar a aprovação com base na média
const aprovacao = (notas) => {
    const media = calcularMedia(notas);

    const condicao = media >= 8 ? "aprovado" : "reprovado";

    return `Média: ${media} - Resultado: ${condicao}`;
}



// Formulário envio de dados para cálculo da média
const formulario1 = document.getElementById('formulario-01');
const resultadoElement = document.getElementById('resultado');

if (formulario1) {
    formulario1.addEventListener('submit', function (evento) {
        evento.preventDefault();
        evento.stopPropagation();

        if (this.getAttribute('class').match(/erro/)) {
            return false;
        }

        const dados = new FormData(this);

        const notas = [];

        for (const key of dados.keys()) {
            const numero = dados.get(key).match(/\d*/) ? Number(dados.get(key)) : 0; // é um número

            if (!isNaN(numero)) {
                notas.push(numero);
            }
        }

        console.log(notas);

        const texto = aprovacao(notas)

        resultadoElement.innerHTML = texto;
    });
}

// Função de validação de campo genérica
const validaCampo = (elemento) => {
    elemento.addEventListener('focusout', function (event) {
        event.preventDefault();

        if (this.value == "") {
            document.querySelector('.mensagem').innerHTML = "verifique o preenchimento dos campos em vermelho";
            this.classList.add('erro');
            this.parentNode.classList.add('erro');
            return false;
        } else {
            document.querySelector('.mensagem').innerHTML = "";
            this.classList.remove('erro');
            this.parentNode.classList.remove('erro');
        }
    });
}

// Função de validação de campo numérico genérica
const validaCampoNumerico = (elemento) => {
    elemento.addEventListener('focusout', function (event) {
        event.preventDefault();

        const numero = this.value.match(/^\d+$/) ? Number(this.value) : this.value;

        if (numero != "" && !isNaN(numero) && numero >= 0 && numero <= 10) {
            document.querySelector('.mensagem').innerHTML = "";
            this.classList.remove('erro');
            this.parentNode.classList.remove('erro');
        } else {
            document.querySelector('.mensagem').innerHTML = "verifique o preenchimento dos campos em destaque";
            this.classList.add('erro');
            this.parentNode.classList.add('erro');
            return false;
        }
    });
}

// Função de validação de email genérica
const validaEmail = (elemento) => {
    elemento.addEventListener('focusout', function (event) {
        event.preventDefault();

        const emailValido = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?/i;
        if (this.value.match(emailValido)) {
            document.querySelector('.mensagem').innerHTML = "";
            this.classList.remove('erro');
            this.parentNode.classList.remove('erro');
        } else {
            document.querySelector('.mensagem').innerHTML = "verifique o preenchimento dos campos em destaque";
            this.classList.add('erro');
            this.parentNode.classList.add('erro');
            return false;
        }
    });
}

// Seleção de campos para validação
const camposObrigatorios = document.querySelectorAll('input.obrigatorio');
const camposNumericos = document.querySelectorAll('input.numero');
const camposEmail = document.querySelectorAll('input.email');

for (const emFoco of camposObrigatorios) {
    validaCampo(emFoco);
}

for (const emFoco of camposNumericos) {
    validaCampoNumerico(emFoco);
}

for (const emFoco of camposEmail) {
    validaEmail(emFoco);
}
