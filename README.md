# 🏨 Sistema de Gestão Hoteleira

<div align="center">
  <p>
    <strong>Plataforma completa para gerenciamento de reservas, hóspedes e operações hoteleiras</strong>
  </p>
</div>

## 📋 Sobre o Projeto

O **Sistema de Gestão Hoteleira** é uma aplicação web desenvolvida para facilitar a administração de hotéis e estabelecimentos de hospedagem. A plataforma oferece funcionalidades essenciais para:

- 📊 **Dashboard**: Visualização em tempo real de métricas importantes como check-ins do dia, reservas pendentes, operações concluídas e estatísticas mensais
- 🎯 **Atividades**: Gerenciamento completo de reservas com informações detalhadas sobre hóspedes, status e valores
- 💰 **Financeiro**: Acompanhamento de faturamento, extrato financeiro por quarto/suíte e geração de relatórios
- ⚙️ **Configurações**: Personalização das configurações do hotel, como disponibilidade e aceite automático de reservas

### 🎓 Finalidade Educacional

> **Importante**: Este projeto foi desenvolvido para fins de **treinamento e aprendizado** em desenvolvimento web moderno, arquitetura de software e boas práticas de programação. Não deve ser utilizado em ambiente de produção sem as devidas adaptações e implementações de segurança.

---

## 🚀 Tecnologias Utilizadas

### Core
- **[React](https://react.dev/)** - Biblioteca JavaScript para construção de interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[Vite](https://vitejs.dev/)** - Build tool e dev server ultra-rápido

### Roteamento e Estado
- **[React Router DOM](https://reactrouter.com/)** - Roteamento declarativo para React
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Gerenciamento de estado leve e performático
- **[TanStack Query](https://tanstack.com/query)** - Gerenciamento de estado assíncrono e cache

### Formulários e Validação
- **[React Hook Form](https://react-hook-form.com/)** - Biblioteca performática para formulários
- **[Zod](https://zod.dev/)** - Schema validation com TypeScript

### UI e Estilização
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Radix UI](https://www.radix-ui.com/)** - Componentes acessíveis e não estilizados
- **[Lucide React](https://lucide.dev/)** - Ícones modernos e customizáveis
- **[Recharts](https://recharts.org/)** - Biblioteca de gráficos para React

### HTTP e Mocks
- **[Axios](https://axios-http.com/)** - Cliente HTTP baseado em Promises
- **[Axios Mock Adapter](https://github.com/ctimmerm/axios-mock-adapter)** - Simulação de API para desenvolvimento

### Testes
- **[Vitest](https://vitest.dev/)** - Framework de testes rápido
- **[Testing Library](https://testing-library.com/)** - Utilitários para testes de componentes React

### Utilitários
- **[clsx](https://github.com/lukeed/clsx)** - Construtor de classNames condicional
- **[class-variance-authority](https://cva.style/docs)** - Gerenciamento de variantes de componentes
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Merge inteligente de classes Tailwind

---

## 🛠️ Como Rodar o Projeto

### Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **pnpm** (versão 9.12.0 ou superior)

> Se você não tem o pnpm instalado, execute: `npm install -g pnpm`

### Instalação

1. **Clone o repositório** (ou extraia os arquivos do projeto)
   ```bash
   cd /caminho/do/projeto
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   ```

### Executar em Desenvolvimento

```bash
pnpm dev
```

A aplicação estará disponível em: **http://localhost:5173**

### Build para Produção

```bash
pnpm build
```

Os arquivos otimizados serão gerados na pasta `dist/`

### Visualizar Build de Produção

```bash
pnpm preview
```

### Executar Testes

```bash
# Modo watch
pnpm test

# Executar uma vez
pnpm test:run
```

---

## 🏗️ Arquitetura

O projeto segue princípios de **Clean Architecture** com separação clara de responsabilidades:

### Camadas

1. **Services** - Simulação de API e lógica de negócio
2. **Hooks** - Lógica de estado e efeitos colaterais
3. **Components** - Componentes de apresentação
4. **Pages** - Orquestração de componentes

### Padrões Utilizados

- ✅ **Separation of Concerns** - Cada módulo tem responsabilidade única
- ✅ **Custom Hooks** - Encapsulamento de lógica reutilizável
- ✅ **Component Composition** - Composição sobre herança
- ✅ **Type Safety** - TypeScript para segurança de tipos
- ✅ **Mock Services** - Simulação de API para desenvolvimento independente

---

## 📄 Licença

Este projeto é de código aberto e está disponível para fins educacionais.

---

<div align="center">
  <p>
    <strong>⭐ Se este projeto te ajudou, considere dar uma estrela!</strong>
  </p>
</div>
