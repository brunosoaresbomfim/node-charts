window.onload = () => { new MyChart(); };

class MyChart {

    constructor() {
        this.iniciaElementos();
        this.carregaElemento().then(() => this.render());
    }

    iniciaElementos() {
        this.cadastrar = document.querySelector('#cadastrar');
        this.cadastrar.addEventListener('click', () => {
            this.cadastrarCliente()
                .then(() => this.carregaElemento()
                    .then(() => this.render()));

        });
        this.sexoChartElement = document.querySelector('#sexoChart');
        this.chartSexo = this.criarChartSexo();
        this.dataChartElement = document.querySelector('#dataChart');
        this.dataChart = this.criarDataChart();

        this.refresh = document.querySelector('#refresh');
        this.refresh.addEventListener('click', () => {
            this.carregaElemento()
                .then(() => this.render())
        });
    }

    cadastrarCliente() {
        const nome = document.querySelector('#nome');
        const sexo = document.querySelector('input[name="sexo"]:checked');

        const dados = {
            nome: nome.value,
            sexo: sexo.dataset.value,
            data: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }

        return axios
            .post("/save", dados)
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                alert("Oops, something went wrong!", error);
            });

    }

    carregaElemento() {
        return axios
            .get("/all")
            .then((result) => {
                //console.log(result.data);
                this.preparaElemento(result.data);
            }).catch((error) => {
                alert("Oops, something went wrong!", error);
            });
    }

    preparaElemento(dados) {
        this.dadosSexo = [
            dados.filter(dado => dado.sexo == 1).length,
            dados.filter(dado => dado.sexo == 2).length
        ]

        this.labelData = {};

        dados.forEach(element => {
            const dataFormatada = new Date(element.data).toISOString().split("T")[0];
            this.labelData[dataFormatada] = this.labelData[dataFormatada] + 1 || 1;
        });
    }

    render() {
        this.chartSexo.data.datasets[0].data = this.dadosSexo;
        this.chartSexo.update();

        this.dataChart.data.labels = Object.keys(this.labelData);
        this.dataChart.data.datasets[0].data = Object.values(this.labelData);
        this.dataChart.update();
    }

    criarChartSexo() {
        return new Chart(this.sexoChartElement, {
            type: "bar",
            data: {
                labels: ['Masculino', 'Feminino'],
                datasets: [{
                    label: 'Total',
                    data: [],
                    backgroundColor: ["rgba(29, 0, 207, 0.7)", "rgba(255, 0, 0, 0.7)"]
                }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                title: {
                    display: true,
                    text: 'Total por sexo'
                },
                legend: {
                    display: false
                }
            }
        });
    }

    criarDataChart() {
        return new Chart(this.dataChartElement, {
            type: "line",
            data: {
                labels: [],
                datasets: [{
                    label: 'Total',
                    data: [],
                    borderColor: 'blue'
                }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                title: {
                    display: true,
                    text: 'Total por data'
                },
                legend: {
                    display: false
                }
            }
        });
    }
}