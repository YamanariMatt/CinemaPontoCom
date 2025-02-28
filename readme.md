# CinemaPontoCom

CinemaPontoCom é um projeto web que permite aos usuários explorar filmes populares, lançamentos, filmes mais bem avaliados, tendências, e muito mais. O projeto utiliza a API do The Movie Database (TMDB) para obter informações sobre filmes, atores e plataformas de streaming.

## Funcionalidades

- Exibir carrosséis de filmes populares, lançamentos, mais bem avaliados, tendências, e por gênero.
- Exibir detalhes de filmes, incluindo elenco, diretor, sinopse, e plataformas de streaming.
- Exibir detalhes de atores, incluindo biografia e filmes em que atuaram.

## Estrutura do Projeto

- `assets/js/api/`: Contém arquivos JavaScript para interagir com a API do TMDB.
  - `TMDB.js`: Funções para buscar detalhes de filmes e atores.
  - `SlickCarousel.js`: Configurações para os carrosséis de filmes usando a biblioteca Slick.
- `assets/js/pages/`: Contém arquivos JavaScript específicos para cada página.
  - `index.js`: Lógica para a página inicial, carregando carrosséis de filmes.
  - `movieDetails.js`: Lógica para a página de detalhes do filme.
  - `castDetails.js`: Lógica para a página de detalhes do ator.

## Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/CinemaPontoCom.git
   ```
2. Navegue até o diretório do projeto:
   ```sh
   cd CinemaPontoCom
   ```
3. Abra o arquivo `index.html` no seu navegador para visualizar o projeto.

## Dependências

- [jQuery](https://jquery.com/)
- [Slick Carousel](https://kenwheeler.github.io/slick/)

## Configuração

1. Obtenha uma chave de API do [The Movie Database (TMDB)](https://www.themoviedb.org/documentation/api).
2. Substitua a variável `apiKey` em `assets/js/api/TMDB.js` pela sua chave de API:
   ```javascript
   const apiKey = "SUA_CHAVE_DE_API";
   ```

## Uso

- Navegue pela página inicial para ver os carrosséis de filmes.
- Clique em um filme para ver mais detalhes sobre ele.
- Clique em um ator para ver mais detalhes sobre ele.

## Contribuição

1. Faça um fork do projeto.
2. Crie uma nova branch:
   ```sh
   git checkout -b minha-nova-funcionalidade
   ```
3. Faça suas alterações e commit:
   ```sh
   git commit -m 'Adiciona nova funcionalidade'
   ```
4. Envie para o repositório remoto:
   ```sh
   git push origin minha-nova-funcionalidade
   ```
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
