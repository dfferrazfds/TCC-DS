/**
 * Fonte única de verdade de todo o conteúdo da aplicação.
 * Para alterar textos, métricas ou rotas, edite apenas este arquivo.
 */

export type SectionId =
  | "inicio"
  | "manifesto"
  | "diagnostico"
  | "solucao"
  | "rotas"
  | "impacto"
  | "casos"
  | "vozes"
  | "faq"
  | "contato";

export type IconKey =
  | "leaf"
  | "clock"
  | "coins"
  | "route"
  | "radar"
  | "sparkles"
  | "truck"
  | "chart"
  | "shield"
  | "globe"
  | "users"
  | "mail"
  | "check"
  | "linkedin"
  | "instagram";

export interface SectionMeta {
  readonly id: SectionId;
  readonly navLabel: string;
  readonly tourTitle: string;
  readonly tourDescription: string;
}

interface SiteConfig {
  readonly brand: {
    readonly name: string;
    readonly prefix: string;
    readonly suffix: string;
    readonly tagline: string;
    readonly email: string;
    readonly location: string;
  };
  readonly sections: readonly SectionMeta[];
  readonly hero: {
    readonly eyebrow: string;
    readonly titleLines: readonly { readonly text: string; readonly accent?: boolean }[];
    readonly description: string;
    readonly primaryCta: { readonly label: string; readonly href: string };
    readonly secondaryCta: { readonly label: string; readonly href: string };
    readonly metrics: readonly { readonly value: string; readonly label: string }[];
    readonly mapLabel: string;
    readonly mapStops: readonly {
      readonly progress: number;
      readonly label: string;
      readonly detail: string;
    }[];
    readonly floatingCards: readonly {
      readonly icon: IconKey;
      readonly value: string;
      readonly label: string;
      readonly className: string;
      readonly delay: number;
    }[];
  };
  readonly manifesto: {
    readonly eyebrow: string;
    readonly title: string;
    readonly paragraphs: readonly string[];
    readonly principles: readonly {
      readonly icon: IconKey;
      readonly title: string;
      readonly description: string;
    }[];
    readonly quote: string;
    readonly quoteAuthor: string;
  };
  readonly diagnostics: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly stats: readonly {
      readonly value: string;
      readonly label: string;
      readonly description: string;
    }[];
    readonly bars: readonly { readonly label: string; readonly value: number; readonly caption: string }[];
    readonly note: string;
  };
  readonly solution: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly steps: readonly {
      readonly icon: IconKey;
      readonly title: string;
      readonly description: string;
      readonly duration: string;
    }[];
    readonly deliverables: readonly string[];
  };
  readonly routes: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly items: readonly {
      readonly id: string;
      readonly name: string;
      readonly origin: string;
      readonly destination: string;
      readonly distance: string;
      readonly co2: string;
      readonly time: string;
      readonly mode: string;
      readonly status: string;
      readonly stopIndex: number;
    }[];
    readonly mapHint: string;
  };
  readonly impact: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly kpis: readonly {
      readonly value: string;
      readonly label: string;
      readonly delta: string;
    }[];
    readonly goals: readonly {
      readonly label: string;
      readonly current: number;
      readonly target: number;
      readonly unit: string;
    }[];
    readonly statement: string;
  };
  readonly proof: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly cases: readonly {
      readonly client: string;
      readonly segment: string;
      readonly metric: string;
      readonly metricLabel: string;
      readonly title: string;
      readonly description: string;
      readonly tags: readonly string[];
    }[];
  };
  readonly testimonials: {
    readonly eyebrow: string;
    readonly title: string;
    readonly quotes: readonly {
      readonly text: string;
      readonly name: string;
      readonly role: string;
      readonly company: string;
      readonly initials: string;
    }[];
  };
  readonly faq: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly items: readonly { readonly question: string; readonly answer: string }[];
    readonly fallback: string;
  };
  readonly contact: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly services: readonly { readonly value: string; readonly label: string }[];
    readonly labels: {
      readonly name: string;
      readonly email: string;
      readonly phone: string;
      readonly service: string;
      readonly message: string;
      readonly consent: string;
      readonly submit: string;
      readonly submitting: string;
    };
    readonly placeholders: {
      readonly name: string;
      readonly email: string;
      readonly phone: string;
      readonly message: string;
    };
    readonly successTitle: string;
    readonly successDescription: string;
    readonly errorTitle: string;
    readonly errorDescription: string;
    readonly notConfigured: string;
  };
  readonly footer: {
    readonly description: string;
    readonly columns: readonly {
      readonly title: string;
      readonly links: readonly { readonly label: string; readonly href: string }[];
    }[];
    readonly socials: readonly {
      readonly label: string;
      readonly href: string;
      readonly icon: IconKey;
    }[];
    readonly copyright: string;
    readonly backToTop: string;
    readonly newsletterNote: string;
  };
  readonly tour: {
    readonly label: string;
    readonly play: string;
    readonly pause: string;
    readonly next: string;
    readonly previous: string;
    readonly exit: string;
    readonly hint: string;
    readonly intervalMs: number;
  };
  readonly a11y: {
    readonly skipLink: string;
    readonly openMenu: string;
    readonly closeMenu: string;
    readonly scrollProgress: string;
    readonly mapDescription: string;
    readonly toggleTour: string;
  };
}

export const site = {
  brand: {
    name: "ecologistica",
    prefix: "eco",
    suffix: "logistica",
    tagline: "Logística que devolve mais do que consome.",
    email: "contato@ecologistica.com.br",
    location: "São Paulo · Brasil",
  },

  sections: [
    {
      id: "inicio",
      navLabel: "Início",
      tourTitle: "Um novo ponto de partida",
      tourDescription: "Comece pelo mapa vivo: cada ponto representa uma entrega que poderia ter emitido menos.",
    },
    {
      id: "manifesto",
      navLabel: "Manifesto",
      tourTitle: "Por que existimos",
      tourDescription: "Eficiência e regeneração não são opostas. Elas precisam acontecer na mesma rota.",
    },
    {
      id: "diagnostico",
      navLabel: "Diagnóstico",
      tourTitle: "O custo invisível",
      tourDescription: "Números que revelam onde o desperdício se esconde na operação de transporte.",
    },
    {
      id: "solucao",
      navLabel: "Solução",
      tourTitle: "Como funciona",
      tourDescription: "Quatro movimentos simples, da leitura dos dados à execução em campo.",
    },
    {
      id: "rotas",
      navLabel: "Rotas",
      tourTitle: "A malha em ação",
      tourDescription: "Selecione uma rota e veja como a otimização muda distância, tempo e carbono.",
    },
    {
      id: "impacto",
      navLabel: "Impacto",
      tourTitle: "Resultados reais",
      tourDescription: "Indicadores que importam para o financeiro, para o cliente e para o planeta.",
    },
    {
      id: "casos",
      navLabel: "Casos",
      tourTitle: "Quem já mudou de rota",
      tourDescription: "Projetos em operações de varejo, indústria e distribuição.",
    },
    {
      id: "vozes",
      navLabel: "Depoimentos",
      tourTitle: "A visão de quem opera",
      tourDescription: "Gestores que transformaram complexidade logística em vantagem competitiva.",
    },
    {
      id: "faq",
      navLabel: "FAQ",
      tourTitle: "Perguntas frequentes",
      tourDescription: "As dúvidas que aparecem antes de dar o primeiro passo.",
    },
    {
      id: "contato",
      navLabel: "Contato",
      tourTitle: "Vamos conversar",
      tourDescription: "Conte o seu desafio e a equipe entra em contato diretamente.",
    },
  ],

  hero: {
    eyebrow: "LOGÍSTICA REGENERATIVA · SÃO PAULO",
    titleLines: [
      { text: "A rota mais" },
      { text: "inteligente", accent: true },
      { text: "deixa o mundo" },
      { text: "melhor." },
    ],
    description:
      "Unimos inteligência de dados, energia limpa e design de processos para transformar cada entrega em um movimento a favor do clima — sem abrir mão de velocidade ou margem.",
    primaryCta: { label: "Quero meu diagnóstico", href: "mailto:contato@ecologistica.com.br" },
    secondaryCta: { label: "Ver como funciona", href: "#solucao" },
    metrics: [
      { value: "−38%", label: "de CO₂ por entrega" },
      { value: "1.240", label: "rotas otimizadas" },
      { value: "99,4%", label: "de pontualidade" },
    ],
    mapLabel: "Malha viva · Sudeste & Centro-Oeste",
    mapStops: [
      { progress: 0.01, label: "São Paulo", detail: "Centro de distribuição" },
      { progress: 0.28, label: "Campinas", detail: "Consolidação" },
      { progress: 0.52, label: "Ribeirão Preto", detail: "Entrega regional" },
      { progress: 0.76, label: "Uberlândia", detail: "Cross-dock" },
      { progress: 0.99, label: "Goiânia", detail: "Ponto final" },
    ],
    floatingCards: [
      {
        icon: "leaf",
        value: "−38% CO₂",
        label: "por quilômetro rodado",
        className: "left-[2%] top-[8%]",
        delay: 0,
      },
      {
        icon: "clock",
        value: "−4,2 h",
        label: "de tempo por rota",
        className: "right-[1%] top-[38%]",
        delay: 1.6,
      },
      {
        icon: "coins",
        value: "+12,6%",
        label: "de margem operacional",
        className: "bottom-[4%] left-[26%]",
        delay: 3.1,
      },
    ],
  },

  manifesto: {
    eyebrow: "01 / NOSSO MANIFESTO",
    title: "Eficiência sem regeneração é só economia empurrada para frente.",
    paragraphs: [
      "Durante anos, a logística foi medida por um único número: o custo por entrega. O que não cabia nessa planilha — combustível queimado, horas paradas no trânsito, retornos vazios — simplesmente desaparecia de vista.",
      "Nós colocamos esses números de volta no centro da decisão. Não como uma peça de marketing, mas como critério técnico de planejamento, compra de frota e desenho de rede.",
    ],
    principles: [
      {
        icon: "radar",
        title: "Medir antes de prometer",
        description: "Nenhuma meta de carbono sem linha de base auditável e telemetria ponta a ponta.",
      },
      {
        icon: "route",
        title: "Desenhar a rede, não só o caminhão",
        description: "Mudamos CDs, horizontes de entrega e mix modal antes de trocar veículo.",
      },
      {
        icon: "users",
        title: "Operação primeiro",
        description: "Motoristas e gestores coconstruem a solução. Se não funciona no chão, não funciona.",
      },
    ],
    quote: "Sustentabilidade de verdade se mede em quilômetros evitados, não em selos na parede.",
    quoteAuthor: "Marina Queiroz · CEO & cofundadora",
  },

  diagnostics: {
    eyebrow: "02 / O DIAGNÓSTICO",
    title: "O desperdício já está na sua operação. Ele só não aparece no relatório.",
    description:
      "Em uma frota média, até um quarto dos quilômetros rodados é evitável. O diagnóstico revela onde, quando e por quê.",
    stats: [
      { value: "24%", label: "dos km são evitáveis", description: "Rotas retrabalhadas, retornos vazios e janelas mal dimensionadas." },
      { value: "3,1×", label: "de retorno por parada", description: "Cada nova tentativa custa tempo, combustível e confiança do cliente." },
      { value: "R$ 0,18", label: "por km invisível", description: "Custo médio de carbono e ineficiência não contabilizado no CMV." },
    ],
    bars: [
      { label: "Retrabalho de entrega", value: 38, caption: "38% dos km" },
      { label: "Retorno vazio", value: 26, caption: "26% dos km" },
      { label: "Janela mal planejada", value: 21, caption: "21% dos km" },
      { label: "Rota enxuta", value: 15, caption: "15% dos km" },
    ],
    note: "Base: amostra de 68 operações de distribuição urbana e regional analisadas entre 2022 e 2025.",
  },

  solution: {
    eyebrow: "03 / A SOLUÇÃO",
    title: "Quatro movimentos para uma operação que respira.",
    description:
      "Um método leve, aplicado em paralelo à operação atual — sem exigir troca de sistema antes de gerar resultado.",
    steps: [
      {
        icon: "radar",
        title: "Ler a operação",
        description: "Integramos telemetria, pedidos e frota para montar o mapa real de desperdícios.",
        duration: "Semana 1",
      },
      {
        icon: "chart",
        title: "Simular cenários",
        description: "Modelamos rede, janelas e mix de veículos com custo e carbono lado a lado.",
        duration: "Semana 2",
      },
      {
        icon: "truck",
        title: "Executar em campo",
        description: "Acompanhamos as primeiras rotas com a equipe e ajustamos o plano junto.",
        duration: "Semanas 3–4",
      },
      {
        icon: "sparkles",
        title: "Aprender e escalar",
        description: "Cada ciclo realimenta o modelo e reaponta a próxima oportunidade de ganho.",
        duration: "Contínuo",
      },
    ],
    deliverables: [
      "Linha de base de emissões auditável",
      "Matriz de priorização por rota",
      "Plano de transição para frota limpa",
      "Painel de acompanhamento em tempo real",
    ],
  },

  routes: {
    eyebrow: "04 / AS ROTAS",
    title: "A malha viva, quilômetro por quilômetro.",
    description:
      "Cada corredor é monitorado em tempo real. Selecione uma rota para ver o ganho estimado em relação ao traçado anterior.",
    items: [
      {
        id: "sp-go",
        name: "Corredor Sudeste–Centro-Oeste",
        origin: "São Paulo",
        destination: "Goiânia",
        distance: "1.010 km",
        co2: "−41%",
        time: "−6h10",
        mode: "Elétrico + biofrete",
        status: "Operando",
        stopIndex: 4,
      },
      {
        id: "sp-campinas",
        name: "Consolidação metropolitana",
        origin: "São Paulo",
        destination: "Campinas",
        distance: "96 km",
        co2: "−52%",
        time: "−1h15",
        mode: "100% elétrico",
        status: "Operando",
        stopIndex: 1,
      },
      {
        id: "ribeirao",
        name: "Regional interior",
        origin: "Campinas",
        destination: "Ribeirão Preto",
        distance: "255 km",
        co2: "−29%",
        time: "−2h05",
        mode: "Híbrido",
        status: "Em implantação",
        stopIndex: 2,
      },
      {
        id: "uberlandia",
        name: "Travessia do Triângulo",
        origin: "Ribeirão Preto",
        destination: "Uberlândia",
        distance: "340 km",
        co2: "−34%",
        time: "−3h20",
        mode: "Biofrete",
        status: "Em implantação",
        stopIndex: 3,
      },
    ],
    mapHint: "Toque em uma rota para destacar o destino no mapa.",
  },

  impact: {
    eyebrow: "05 / IMPACTO",
    title: "Números que fecham a conta — e o ciclo do carbono.",
    description:
      "Cada indicador é medido antes e depois da intervenção, com metodologia aberta e auditoria externa anual.",
    kpis: [
      { value: "8.420 t", label: "de CO₂e evitados", delta: "+31% vs. 2024" },
      { value: "R$ 4,7 mi", label: "economizados em frete", delta: "em 12 meses" },
      { value: "2,8 mi", label: "de km não rodados", delta: "equivalente a 56 voltas ao mundo" },
      { value: "96%", label: "de aproveitamento da frota", delta: "antes: 71%" },
    ],
    goals: [
      { label: "Frota eletrificada", current: 62, target: 100, unit: "%" },
      { label: "Cobertura de telemetria", current: 94, target: 100, unit: "%" },
      { label: "Retornos vazios eliminados", current: 71, target: 90, unit: "%" },
    ],
    statement: "Meta 2030: operação neutra em carbono no Escopo 1 e 2, com redução absoluta de 50% no Escopo 3.",
  },

  proof: {
    eyebrow: "06 / CASOS",
    title: "Prova viva em três operações muito diferentes.",
    description: "Do varejo alimentar à indústria de componentes, o padrão se repete: menos km, mais controle.",
    cases: [
      {
        client: "Verde Mercado",
        segment: "Varejo alimentar",
        metric: "−44%",
        metricLabel: "CO₂ por entrega",
        title: "Entregas urbanas em 90 minutos, sem combustão",
        description:
          "Reorganizamos 7 micro-hubs e trocamos 60% da frota por elétricos. O tempo de entrega caiu enquanto a pegada de carbono encolhia.",
        tags: ["Última milha", "Frota elétrica"],
      },
      {
        client: "Aurora Components",
        segment: "Indústria",
        metric: "−19%",
        metricLabel: "custo de frete",
        title: "Consolidação inteligente entre plantas",
        description:
          "Um modelo de cross-dock regional eliminou 14 viagens semanais e reduziu estoque em trânsito sem perder nível de serviço.",
        tags: ["Cross-dock", "Biofrete"],
      },
      {
        client: "Farmácia Viva",
        segment: "Distribuição",
        metric: "99,8%",
        metricLabel: "de pontualidade",
        title: "Rota crítica com janelas dinâmicas",
        description:
          "Janelas recalculadas a cada 15 minutos e priorização por criticidade de pedido transformaram a confiabilidade da rede.",
        tags: ["Tempo real", "SaaS"],
      },
    ],
  },

  testimonials: {
    eyebrow: "07 / DEPOIMENTOS",
    title: "Quem opera sabe: o ganho aparece no dia a dia.",
    quotes: [
      {
        text: "Achei que seria mais um relatório bonito. Em seis semanas estávamos rodando 30% menos quilômetros com o mesmo volume entregue.",
        name: "Rafael Menezes",
        role: "Diretor de Operações",
        company: "Verde Mercado",
        initials: "RM",
      },
      {
        text: "O time entendeu nossa planta antes de propor qualquer mudança. Por isso a transição foi rápida e sem atrito com a equipe de campo.",
        name: "Carla Tavares",
        role: "Gerente de Supply Chain",
        company: "Aurora Components",
        initials: "CT",
      },
      {
        text: "Passamos a tomar decisão com dados de carbono na mesma mesa que o custo. Isso mudou o jeito de comprar frete na empresa.",
        name: "Diego Nascimento",
        role: "Head de Logística",
        company: "Farmácia Viva",
        initials: "DN",
      },
    ],
  },

  faq: {
    eyebrow: "08 / PERGUNTAS FREQUENTES",
    title: "Antes de mudar a rota, tire as dúvidas.",
    description: "Não encontrou sua resposta? Escreva para nós — respondemos em até 2 dias úteis.",
    items: [
      {
        question: "Preciso trocar de sistema ou frota para começar?",
        answer:
          "Não. O diagnóstico roda sobre os dados que você já tem (pedidos, telemetria e notas de frete). As primeiras melhorias vêm do desenho da rede; a troca de frota é uma decisão posterior, baseada em simulação de retorno.",
      },
      {
        question: "Como vocês medem as emissões evitadas?",
        answer:
          "Calculamos a linha de base com metodologia GHG Protocol e fatores de emissão atualizados. Cada cenário é comparado com dados reais de distância, carga e modo de transporte. O relatório é auditado anualmente por terceiros.",
      },
      {
        question: "Quanto tempo leva até o primeiro resultado?",
        answer:
          "O diagnóstico é entregue em até duas semanas. A primeira rota otimizada costuma entrar em operação na terceira semana, com acompanhamento presencial ou remoto da nossa equipe.",
      },
      {
        question: "Funciona para operações pequenas?",
        answer:
          "Sim. A metodologia escala de 5 a 5.000 veículos. Para operações menores, oferecemos um formato enxuto de diagnóstico com foco nas rotas de maior impacto.",
      },
      {
        question: "Vocês substituem nossa transportadora?",
        answer:
          "Não somos transportadora. Trabalhamos junto à sua equipe e aos parceiros atuais, criando os critérios e os dados para que a operação existente performe melhor.",
      },
      {
        question: "Os dados da nossa operação ficam seguros?",
        answer:
          "Sim. Os dados são criptografados em trânsito e em repouso, com acesso restrito por projeto. Você pode solicitar a exclusão completa a qualquer momento.",
      },
    ],
    fallback: "Não encontrou sua resposta? Fale com a nossa equipe.",
  },

  contact: {
    eyebrow: "09 / CONTATO",
    title: "Conte o seu desafio. Nós respondemos com uma rota.",
    description:
      "Preencha os dados abaixo para solicitar nossos serviços. Um especialista da ecologistica entra em contato diretamente por e-mail ou telefone.",
    services: [
      { value: "diagnostico", label: "Diagnóstico de carbono" },
      { value: "otimizacao", label: "Otimização de rotas" },
      { value: "frota", label: "Transição para frota limpa" },
      { value: "consultoria", label: "Consultoria em logística" },
      { value: "outro", label: "Outro serviço" },
    ],
    labels: {
      name: "Nome completo",
      email: "E-mail",
      phone: "Telefone / WhatsApp",
      service: "Serviço desejado",
      message: "Conte um pouco sobre sua operação",
      consent: "Autorizo a ecologistica a entrar em contato pelos dados informados.",
      submit: "Solicitar contato",
      submitting: "Enviando...",
    },
    placeholders: {
      name: "Como podemos chamar você?",
      email: "voce@empresa.com.br",
      phone: "(11) 99999-9999",
      message: "Ex.: temos 40 veículos e queremos entender onde estamos emitindo mais.",
    },
    successTitle: "Solicitação enviada!",
    successDescription:
      "Recebemos seus dados e um especialista da ecologistica entra em contato em breve.",
    errorTitle: "Não foi possível enviar",
    errorDescription: "Tente novamente em instantes ou fale com a gente pelo e-mail abaixo.",
    notConfigured:
      "O formulário ainda não está configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY no ambiente de build.",
  },

  footer: {
    description:
      "Inteligência de rotas e logística regenerativa. Menos quilômetros, mais futuro — em cada entrega.",
    columns: [
      {
        title: "Navegação",
        links: [
          { label: "Manifesto", href: "#manifesto" },
          { label: "Como funciona", href: "#solucao" },
          { label: "Rotas", href: "#rotas" },
          { label: "Impacto", href: "#impacto" },
        ],
      },
      {
        title: "Conhecimento",
        links: [
          { label: "Casos", href: "#casos" },
          { label: "Depoimentos", href: "#vozes" },
          { label: "Perguntas frequentes", href: "#faq" },
          { label: "Fale com a gente", href: "mailto:contato@ecologistica.com.br" },
        ],
      },
    ],
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
      { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
    ],
    copyright: "© 2026 ecologistica. Feito com menos carbono e mais intenção.",
    backToTop: "Voltar ao topo",
    newsletterNote: "Assine nosso boletim trimestral",
  },

  tour: {
    label: "Tour guiado",
    play: "Iniciar tour",
    pause: "Pausar tour",
    next: "Próxima seção",
    previous: "Seção anterior",
    exit: "Encerrar tour",
    hint: "Use ← → para navegar e Esc para sair",
    intervalMs: 8000,
  },

  a11y: {
    skipLink: "Pular para o conteúdo principal",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    scrollProgress: "Progresso de leitura",
    mapDescription: "Mapa ilustrativo da malha logística com cinco pontos e um veículo percorrendo a rota.",
    toggleTour: "Ativar tour guiado",
  },
} as const satisfies SiteConfig;

export const tourSections: readonly SectionMeta[] = site.sections;
