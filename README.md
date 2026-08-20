# Task Manager

Aplicação web para gerenciamento de tarefas, desenvolvida com **Next.js, React, TypeScript e tRPC**.

## Tecnologias

* Next.js + React
* TypeScript
* tRPC
* TanStack Query
* Zod

## Como funciona

A aplicação permite **criar, visualizar, editar e excluir tarefas**.

O frontend utiliza **tRPC** para se comunicar com o backend, compartilhando os tipos TypeScript entre as duas partes.

```text
React / Next.js
      ↓
    tRPC
      ↓
   Backend
      ↓
  Persistência
```

## SOLID e DDD

O projeto aplica conceitos de **SOLID**, principalmente separação de responsabilidades e redução de acoplamento.

Também utiliza conceitos de **DDD** para separar as regras relacionadas ao domínio de tarefas da interface e da infraestrutura.

```text
Interface
   ↓
Application
   ↓
Domain
   ↓
Infrastructure
```

Por ser um projeto de pequeno porte, foi utilizada uma abordagem simplificada de DDD, com foco na organização e separação das responsabilidades.

## Como executar

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Objetivo

Este projeto foi desenvolvido como parte de uma **etapa técnica de processo seletivo**, com o objetivo de demonstrar conhecimentos em **desenvolvimento full-stack, arquitetura, organização de código e tecnologias do ecossistema Next.js/TypeScript**.

Também serviu como oportunidade para aplicar conceitos de **SOLID, DDD e tRPC**, relacionando-os aos conhecimentos prévios em **C# e ASP.NET Core**.
