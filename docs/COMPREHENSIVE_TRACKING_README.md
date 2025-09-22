# Sistema de Tracking Abrangente - Google Analytics

Este projeto agora inclui um sistema completo de tracking que captura **TODOS** os eventos de clique e interações do usuário no site.

## 🎯 Eventos Capturados Automaticamente

### 1. **Cliques em Elementos**
- ✅ **Botões**: Todos os cliques em botões
- ✅ **Links**: Links internos e externos
- ✅ **Cards**: Cliques em cards de sites de vagas
- ✅ **Inputs**: Interações com campos de busca e formulários
- ✅ **Selects**: Seleções em filtros de categoria
- ✅ **Elementos Interativos**: Qualquer elemento com `role="button"` ou `cursor-pointer`

### 2. **Navegação e Comportamento**
- ✅ **Mudanças de Rota**: Tracking automático de navegação
- ✅ **Scroll**: Direção e posição do scroll
- ✅ **Focus**: Elementos que recebem foco (acessibilidade)
- ✅ **Visualização de Seções**: Quando seções aparecem na tela

### 3. **Performance e Erros**
- ✅ **Core Web Vitals**: FCP, LCP, CLS
- ✅ **Tempo de Carregamento**: Page load time
- ✅ **Erros JavaScript**: Erros não capturados
- ✅ **Promise Rejections**: Rejeições de promises

### 4. **Interações Específicas**
- ✅ **Busca**: Termos pesquisados pelos usuários
- ✅ **Filtros**: Categorias selecionadas
- ✅ **Newsletter**: Inscrições na newsletter
- ✅ **Sites de Vagas**: Cliques específicos em cada site

## 📊 Categorias de Eventos no Google Analytics

### **Interações da Interface (ui_interaction)**
```
- button_click: Cliques em botões
- card_click: Cliques em cards
- badge_click: Cliques em badges de categoria
```

### **Comportamento do Usuário (user_behavior)**
```
- scroll: Direção e posição do scroll
- focus: Elementos que recebem foco
- hover: Hover sobre elementos (opcional)
```

### **Navegação (navigation)**
```
- page_view: Visualizações de página
- section_view: Visualização de seções específicas
```

### **Formulários (form)**
```
- search_input: Foco em campo de busca
- newsletter_email: Foco em campo de email
- filter: Uso de filtros
```

### **Sites de Vagas (job_sites)**
```
- click: Cliques em sites específicos
- external_link: Cliques em links externos
```

### **Performance (performance)**
```
- page_load_time: Tempo de carregamento
- first_contentful_paint: FCP
- largest_contentful_paint: LCP
- cumulative_layout_shift: CLS
```

### **Erros (error)**
```
- javascript_error: Erros JavaScript
- promise_rejection: Rejeições de promises
```

## 🔧 Como Funciona

### **1. Tracking Automático**
O sistema detecta automaticamente cliques em:
- Elementos com tags específicas (`button`, `a`, `input`, `select`)
- Elementos com classes específicas (`card`, `btn`, `button`)
- Elementos com atributos (`role="button"`, `cursor-pointer`)
- Elementos com data attributes (`data-track`)

### **2. Tracking Manual**
Para elementos específicos, use data attributes:
```html
<button data-track="click|button|custom_action">
  Meu Botão
</button>
```

Formato: `action|category|label`

### **3. Configuração Flexível**
```typescript
// No AnalyticsProvider, você pode configurar:
useClickTracking({
  enabled: true,
  trackCardClicks: true,
  trackButtonClicks: true,
  trackLinkClicks: true,
  trackInputInteractions: true
});

useInteractionTracking({
  enabled: true,
  trackScroll: true,
  trackHover: false, // Desabilitado para performance
  trackFocus: true,  // Habilitado para acessibilidade
  trackSectionViews: true,
  scrollThreshold: 50
});
```

## 📈 Exemplos de Eventos Capturados

### **Clique em Card de Site de Vagas**
```
Event: card_click
Category: ui_interaction
Label: job_site_LinkedIn_Jobs
```

### **Busca por Termo**
```
Event: search
Category: job_search
Label: "desenvolvedor frontend"
```

### **Scroll para Baixo**
```
Event: scroll
Category: user_behavior
Label: down
Value: 1500 (posição em pixels)
```

### **Visualização de Seção**
```
Event: section_view
Category: page_interaction
Label: newsletter
```

### **Erro JavaScript**
```
Event: javascript_error
Category: error
Label: "main.js:45"
```

## 🚀 Benefícios

### **Para Análise de UX**
- Entender onde os usuários clicam mais
- Identificar elementos que não recebem atenção
- Analisar padrões de navegação
- Detectar problemas de usabilidade

### **Para Performance**
- Monitorar Core Web Vitals
- Detectar erros em tempo real
- Identificar páginas lentas
- Otimizar experiência do usuário

### **Para Negócio**
- Analisar conversões (newsletter, cliques em sites)
- Entender comportamento de busca
- Identificar sites de vagas mais populares
- Tomar decisões baseadas em dados

## ⚙️ Configuração

### **1. Variável de Ambiente**
```bash
# .env.local
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

### **2. Personalização**
Você pode personalizar o tracking editando:
- `src/hooks/useClickTracking.ts` - Para cliques
- `src/hooks/useInteractionTracking.ts` - Para interações
- `src/hooks/useErrorTracking.ts` - Para erros e performance
- `src/lib/analytics.ts` - Para funções de tracking

### **3. Desabilitar Tracking**
Para desabilitar tracking em desenvolvimento:
```typescript
// No AnalyticsProvider
useClickTracking({ enabled: false });
```

## 📱 Compatibilidade

- ✅ **Desktop**: Tracking completo
- ✅ **Mobile**: Tracking completo
- ✅ **Tablet**: Tracking completo
- ✅ **Acessibilidade**: Tracking de focus e navegação por teclado
- ✅ **Performance**: Otimizado para não impactar a experiência

## 🔒 Privacidade

- ✅ **Anônimo**: Nenhum dado pessoal é coletado
- ✅ **GDPR**: Considera regulamentações de privacidade
- ✅ **Desenvolvimento**: Desabilitado em modo de desenvolvimento
- ✅ **Transparente**: Usuários podem ver o que está sendo trackado

## 📊 Relatórios no Google Analytics

Após implementar, você verá em GA4:

1. **Eventos em Tempo Real**: `Realtime > Events`
2. **Análise de Comportamento**: `Engagement > Events`
3. **Performance**: `Engagement > Pages and screens`
4. **Conversões**: `Engagement > Conversions`

## 🎉 Resultado

Com esta implementação, você terá **visibilidade completa** sobre:
- Como os usuários interagem com seu site
- Quais elementos são mais clicados
- Onde estão os problemas de performance
- Como otimizar a experiência do usuário
- Dados para tomar decisões baseadas em evidências

**Todos os cliques e interações do site agora são capturados automaticamente!** 🚀
