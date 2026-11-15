# Cifra Club Mobile

Aplicativo acadêmico inspirado no Cifra Club, desenvolvido com React Native, Expo e Expo Router.

## Requisitos

- Node.js 22.13 ou superior
- Expo Go compatível com o SDK 58 do projeto

## Instalar e iniciar

```bash
git clone https://github.com/Goubre/cifraclubmoblie-prova-marciop1.git
cd cifraclubmoblie-prova-marciop1
npm install
npx expo start
```

No Windows PowerShell, se `npx` estiver bloqueado, use `npx.cmd expo start`.

Para testar no celular, conecte o computador e o aparelho à mesma rede Wi-Fi, abra o Expo Go, escaneie o QR Code exibido no terminal e aguarde o carregamento. O Expo Go precisa ser compatível com o SDK 58.

Para abrir a versão web, inicie o projeto e pressione `W` no terminal do Expo.

## Telas

O aplicativo tem 15 rotas: Início, Listas, Busca, Academy, Mais, Comunidade, Artista, Música/Cifra, Favoritos, Detalhes da lista, Adicionar música à lista, Perfil da comunidade, Configurações, Conteúdo offline e Ajuda.

## Funcionalidades

- Busca e navegação por músicas e artistas
- Visualização de cifras, alteração de tom, modo simplificado e rolagem automática
- Criação de listas e adição de cifras às listas
- Favoritos salvos entre sessões
- Preferência de tema salva localmente
- Lista de perfis de comunidade e detalhes carregados de uma API
- Cache local dos dados da API, com uso dos dados salvos quando não há conexão
- Navegação com Expo Router e layouts responsivos usando `StyleSheet` e Flexbox

## API e armazenamento

Os perfis da comunidade são obtidos da API pública JSONPlaceholder (`/users` e `/users/:id`). Listas, favoritos, preferência de tema e cache da API são armazenados localmente com AsyncStorage.

## Verificações

```bash
npx expo lint
npx expo install --check
npx expo-doctor
```

## Integrantes

- Gabriel Velasco Leonel
- Gabriel Cardoso de Lemos

Projeto desenvolvido para fins acadêmicos. Alguns conteúdos são demonstrativos.
