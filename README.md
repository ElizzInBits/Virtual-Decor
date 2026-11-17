# VirtualDecor
O projeto é um sistema interativo de design de interiores, com um catálogo de móveis e objetos 3D em formato GLB que eu peguei no Sketchfab. Na parte de VR, é possível montar uma sala e adicionar os itens como quiser. Já na AR, a ideia é visualizar e testar esses itens no ambiente físico usando a câmera do celular. Porém, essas funcionalidade ainda precisa de ajustes, que é onde estou tendo mais dificuldades, então deem mais atenção a ela.

## Pré-requisitos

- **Node.js 20.19 ou superior** (Eu recomendado 20 LTS ou 22).
  Baixar em https://nodejs.org/ e verifique no terminal com:
  ```bash
  node -v
  npm -v
  ```
> Esse projeto usa Vite 8

## Como baixar e rodar

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/ElizzInBits/Virtual-Decor.git
   cd virtual-decor
   ```

2. **Instalar as dependências:**
   ```bash
   npm install
   ```
   Isso vai baixar o React, Three.js, @react-three/fiber, @react-three/drei e o
   @google/model-viewer.

3. **Rodar em modo desenvolvimento:**
   ```bash
   npm run dev
   ```
   Então é só abrir o endereço mostrado no terminal (por padrão http://localhost:5173).

   ou
      ```bash
   npm run dev -- --host
   ```
   Vai abrir mais um endereço com o ip da rede que você estp conectado com a porta padrão 5173, com isso é possível testar pelo celular conectado na mesma rede, utilizado esse endereço.

   Outra forma de testar pelo celular e poder compartilhar o endereço para outro dispositivo sem que estejam conectados na mesma rede, é utilizando a função Foward a Port do VS code, basta colocar a porta padrão 5173 e gerar o endereço.


## Outros comandos


 `npm run build`: Gera a versão de produção na pasta `dist/` 

 `npm run preview`: Serve localmente o que foi gerado em `dist/` 

 `npm run lint`: Roda o Oxlint para checar o código 

## Observações 

- Os arquivos `.glb` em `public/models/` são parte do sistema e
  precisam serão baixados juntos. Sem eles, os itens não aprecem.
