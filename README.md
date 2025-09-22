# Apply To Go project
## MeuGuru.tech
## https://plataformas-vagas.meuguru.tech/

## Como contribuir com novas plataformas

Se você gostaria de adicionar uma nova plataforma de vagas ao site, siga este processo de contribuição:

### 1. Configuração inicial

Primeiro, certifique-se de ter o projeto configurado localmente:

```sh
# Clone o repositório
git clone <URL_DO_REPOSITORIO>
cd applytogo-react-js-frontend

# Instale as dependências
npm i

# Execute o projeto para testar
npm run dev
```

### 2. Criar uma nova branch

Crie uma nova branch para sua contribuição:

```sh
# Certifique-se de estar na branch main e atualizada
git checkout main
git pull origin main

# Crie uma nova branch com um nome descritivo
git checkout -b feature/adicionar-plataforma-[nome-da-plataforma]
```

### 3. Adicionar a nova plataforma

Edite o arquivo `public/data.json` e adicione sua nova plataforma ao array `jobSites`. Use o próximo ID disponível e siga este formato:

```json
{
  "id": "56",
  "name": "Nome da Plataforma",
  "category": "categoria-adequada",
  "description": "Descrição da plataforma",
  "url": "https://www.exemplo.com/",
  "requiresLogin": true
}
```

#### Categorias disponíveis:
- `"plataformas internacionais"` - Para plataformas globais (LinkedIn, Indeed, etc.)
- `"plataformas brasileiras"` - Para plataformas específicas do Brasil
- `"consultorias internacionais"` - Para consultorias globais (Accenture, Deloitte, etc.)
- `"consultorias brasileiras"` - Para consultorias brasileiras

#### Campos obrigatórios:
- `id`: Número sequencial único (string)
- `name`: Nome da plataforma
- `category`: Categoria da plataforma (uma das listadas acima)
- `description`: Descrição breve da plataforma
- `url`: URL principal da plataforma
- `requiresLogin`: `true` se precisa de login, `false` caso contrário

### 4. Testar as mudanças

Após adicionar a plataforma, teste localmente:

```sh
npm run dev
```

Verifique se:
- A nova plataforma aparece na lista
- Os links funcionam corretamente
- A categoria está correta
- Não há erros no console

### 5. Fazer commit e push

```sh
# Adicione as mudanças
git add public/data.json

# Faça o commit com uma mensagem descritiva
git commit -m "feat: adicionar [Nome da Plataforma] às plataformas de vagas"

# Faça push da branch
git push origin feature/adicionar-plataforma-[nome-da-plataforma]
```

### 6. Criar Pull Request

1. Vá até o repositório no GitHub
2. Clique em "Compare & pull request" (aparecerá automaticamente após o push)
3. Preencha o título e descrição do PR:
   - **Título**: `feat: adicionar [Nome da Plataforma]`
   - **Descrição**: 
     ```
     ## Descrição
     Adiciona [Nome da Plataforma] à lista de plataformas de vagas disponíveis.
     
     ## Categoria
     [plataformas internacionais/plataformas brasileiras/consultorias internacionais/consultorias brasileiras]
     
     ## URL
     https://www.exemplo.com/
     
     ## Requer Login
     [Sim/Não]
     ```
4. Marque os revisores apropriados
5. Crie o Pull Request

### 7. Aguardar revisão

- Sua contribuição será revisada pela equipe
- Podem ser solicitadas alterações ou melhorias
- Após a aprovação, o PR será mergeado na branch `main`

### Exemplo de contribuição

```json
{
  "id": "56",
  "name": "AngelList",
  "category": "plataformas internacionais",
  "description": "Startup job board and funding platform",
  "url": "https://angel.co/",
  "requiresLogin": true
}
```

### Dicas importantes

- ✅ Verifique se a plataforma não já existe na lista
- ✅ Use o próximo ID sequencial disponível
- ✅ Mantenha a consistência no formato e estilo
- ✅ Teste localmente antes de fazer o PR
- ✅ Use mensagens de commit claras e descritivas
- ❌ Não adicione plataformas duplicadas
- ❌ Não altere IDs existentes
- ❌ Não adicione campos extras além dos obrigatórios
