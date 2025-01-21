### Como Rodar o Backend:

1. Necessita abrir um terminal, e rodar o docker com:

linux:
`sudo docker compose up --build`

windows precisará do docker desktop, e rodar o comando:
`docker compose up --build`

2. Após rodar o comando acima, e buildar o projeto, ele estará disponível em:
   `http://localhost:5000/`

3. Funcionalidades:

- [✅] Cadastro de Máquina;
- [✅] Listagem de Máquinas;
- [✅] Listagem de Máquinas por Nome (utilizado apenas no backend);
- [✅] Listagem de Máquinas por ID;
- [✅] Listagem de máquina por Status;
- [✅] Atualização de Máquina;
- [✅] Cronjob para simulação de telemetria(atualiza máquina a cada 5 segundos e emite eventos através de websocket);
- [✅] Monitoramento de informações que são alteradas pelo cron job com websockets;

### Tecnologias Utilizada

- NestJs;
- PrismaORM;
- Docker;
- Websockets;
- CronJob;
- Typescript;
- Postgres;