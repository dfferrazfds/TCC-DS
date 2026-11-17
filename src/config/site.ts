export const siteConfig = {
  name: 'EcoLogística Guarulhos',
  shortName: 'EcoLogística',
  location: 'Guarulhos • SP',
  tagline: 'Entrega urbana de emissão zero, com trabalho digno.',
  description:
    'Modelo de negócios e projeções da operação-piloto de entregas ecológicas em Guarulhos: frota elétrica, inclusão de jovens e viabilidade econômica.',

  nav: [
    { label: 'Início', href: '#inicio' },
    { label: 'Modelo', href: '#modelo' },
    { label: 'Números', href: '#numeros' },
    { label: 'Impacto', href: '#impacto' },
  ],

  hero: {
    badge: 'Operação-piloto • Guarulhos',
    eyebrow: 'Modelo de negócios + projeções',
    titleTop: 'A última milha',
    titleMiddle: 'pode ser a',
    titleAccent: 'primeira mudança.',
    subtitle:
      'Bicicletas e utilitários elétricos, rotas inteligentes e entregadores com carteira assinada. Um desenho de operação que cuida do bairro, do clima e de quem pedala.',
    primaryCta: { label: 'Explorar o modelo', href: '#modelo' },
    secondaryCta: { label: 'Ver os números', href: '#numeros' },
    facts: [
      { value: '10', label: 'entregadores CLT' },
      { value: '8', label: 'bikes elétricas' },
      { value: '2', label: 'utilitários elétricos' },
    ],
  },

  ticker: [
    '0 g de CO₂ na operação',
    '3.600 entregas / mês',
    '98%+ de SLA',
    'R$ 14 mil de resultado líquido / mês',
    '53,4 t de CO₂ evitadas / ano',
    '12 empregos formais',
  ],

  canvas: [
    {
      step: 1,
      id: 'parceiros',
      label: 'Parceiros-chave',
      icon: 'Handshake',
      body: 'Fornecedores de bicicletas, fabricantes de veículos elétricos e empresas parceiras.',
      extra: '+ Prefeitura de Guarulhos, ONGs e instituições de capacitação profissional.',
      tone: 'clay',
      size: 'tall',
    },
    {
      step: 2,
      id: 'atividades',
      label: 'Atividades-chave',
      icon: 'Route',
      body: 'Realizar entregas, organizar rotas e capacitar entregadores.',
      extra: '+ Meta média de 3.600 entregas/mês (~140/dia útil) com manutenção preventiva.',
      tone: 'mint',
      size: 'short',
    },
    {
      step: 3,
      id: 'proposta',
      label: 'Proposta de valor',
      icon: 'Sparkles',
      body: 'Entregas ecológicas, rápidas e com trabalho digno.',
      extra: 'Emissão zero de CO₂ em Guarulhos (~53,4 t/ano evitadas), inclusão de jovens e carteira assinada.',
      tone: 'lime',
      size: 'feature',
    },
    {
      step: 4,
      id: 'relacionamento',
      label: 'Relacionamento com clientes',
      icon: 'HeartHandshake',
      body: 'Atendimento de qualidade e acompanhamento das entregas.',
      extra: '+ Rastreabilidade em tempo real, SLA acima de 98% e selo verde para parceiros.',
      tone: 'amber',
      size: 'short',
    },
    {
      step: 5,
      id: 'segmentos',
      label: 'Segmentos de clientes',
      icon: 'Users',
      body: 'Lojas, empresas e consumidores que precisam de entregas.',
      extra: '+ Média inicial de 35 a 45 comércios locais de Guarulhos e jovens da periferia.',
      tone: 'mint',
      size: 'tall',
    },
    {
      step: 6,
      id: 'recursos',
      label: 'Recursos-chave',
      icon: 'Bike',
      body: 'Bicicletas, veículos elétricos, entregadores e tecnologia.',
      extra: 'Equipe base: 10 entregadores CLT + 2 gestores, 8 bikes elétricas e 2 utilitários elétricos.',
      tone: 'sky',
      size: 'tall',
    },
    {
      step: 7,
      id: 'canais',
      label: 'Canais',
      icon: 'Radio',
      body: 'Aplicativo, site, telefone e redes sociais.',
      extra: 'Integração direta via API/WhatsApp com comércios locais de Guarulhos.',
      tone: 'clay',
      size: 'note',
    },
    {
      step: 8,
      id: 'receita',
      label: 'Fontes de receita',
      icon: 'Wallet',
      body: 'Cobrança por entrega e contratos com empresas.',
      extra: 'Média de R$ 64.000/mês (ticket R$ 13,00/entrega + planos B2B e incentivos ESG).',
      tone: 'mint',
      size: 'note',
    },
    {
      step: 9,
      id: 'custos',
      label: 'Estrutura de custos',
      icon: 'Receipt',
      body: 'Salários, manutenção, transporte, equipamentos e tecnologia.',
      extra: 'Média de R$ 50.000/mês (73% folha CLT/benefícios + 27% frota, energia, app e base).',
      tone: 'amber',
      size: 'note',
    },
  ] as const,

  financials: {
    eyebrow: 'Projeção financeira & operacional',
    title: 'Viabilidade que aparece na planilha — e na rua.',
    description:
      'Médias estimadas da operação-piloto de Guarulhos, com folha CLT, frota elétrica, tecnologia e capital de giro.',
    pill: 'Base: 10 entregadores • 8 bikes • 2 utilitários',
    kpis: [
      {
        label: 'Investimento inicial',
        sublabel: 'CAPEX',
        value: 145000,
        format: 'brl',
        note: 'Frota elétrica, EPIs, sistema e capital de giro',
        tone: 'sky',
        highlight: false,
      },
      {
        label: 'Receita média mensal',
        sublabel: 'ENTRADAS',
        value: 64000,
        format: 'brl',
        note: '~3.600 entregas (R$ 13) + contratos B2B e ESG',
        tone: 'mint',
        highlight: false,
      },
      {
        label: 'Custo médio mensal',
        sublabel: 'SAÍDAS',
        value: 50000,
        format: 'brl',
        note: 'Folha CLT (R$ 36,5k) + frota, app e gestão (R$ 13,5k)',
        tone: 'amber',
        highlight: false,
      },
      {
        label: 'Resultado líquido médio',
        sublabel: 'MARGEM 21,9%',
        value: 14000,
        format: 'brl-plus',
        note: 'Payback em ~10,4 meses',
        tone: 'lime',
        highlight: true,
      },
    ],
    costBreakdown: [
      { label: 'Folha CLT e benefícios', percent: 73, value: 'R$ 36.500', detail: 'salário justo, encargos, VR/VT e seguro', color: '#c9f24d' },
      { label: 'Frota elétrica', percent: 13.6, value: 'R$ 6.800', detail: 'recarga, pneus e revisão', color: '#7de0a8' },
      { label: 'Base administrativa', percent: 7, value: 'R$ 3.500', detail: 'ponto de apoio e contabilidade', color: '#f4b942' },
      { label: 'Tecnologia e operação', percent: 6.4, value: 'R$ 3.200', detail: 'app de rotas, rastreio e EPIs', color: '#e07a5f' },
    ],
    annual: [
      { label: 'Faturamento anual estimado', value: 'R$ 768.000', detail: 'crescimento gradual após o 4º mês' },
      { label: 'Volume anual de entregas', value: '~43.200', detail: 'entregas urbanas limpas e rastreadas' },
      { label: 'Redução de emissões', value: '~53,4 t', detail: 'CO₂ evitadas por ano frente a motos/vans a combustão' },
      { label: 'Geração de renda digna', value: '12', detail: 'empregos formais diretos com capacitação contínua' },
    ],
  },

  impact: {
    eyebrow: 'Impacto socioambiental',
    title: 'Cada rota entrega mais do que um pacote.',
    description:
      'A operação foi desenhada para gerar renda formal e reduzir emissões no mesmo movimento — sem terceirizar o cuidado com as pessoas.',
    heroMetric: {
      value: '53,4',
      unit: 't CO₂',
      label: 'evitadas por ano',
      detail: 'comparado a uma operação equivalente com motos e vans a combustão',
    },
    cards: [
      { value: '43.200', label: 'entregas urbanas limpas e rastreadas por ano', icon: 'PackageCheck', tone: 'lime' },
      { value: '12', label: 'empregos formais diretos com capacitação contínua', icon: 'Users', tone: 'mint' },
      { value: '98%+', label: 'SLA de entrega com rastreabilidade em tempo real', icon: 'Timer', tone: 'amber' },
    ],
  },

  assumptions: {
    eyebrow: 'Premissas da operação',
    title: 'Os números por trás da rota.',
    description: 'Detalhamento das médias usadas na projeção — tudo editável em um único arquivo de configuração.',
    items: [
      {
        title: 'Por que R$ 50.000/mês de custo?',
        content:
          '73% da estrutura é folha CLT e benefícios (R$ 36.500/mês): salário justo, encargos, vale-refeição, vale-transporte e seguro. Os 27% restantes cobrem frota elétrica e manutenção (R$ 6.800), base administrativa (R$ 3.500) e tecnologia/operação (R$ 3.200).',
      },
      {
        title: 'Como se chega a R$ 64.000/mês de receita?',
        content:
          'A base é ~3.600 entregas mensais a R$ 13,00 por entrega, somada a contratos B2B e incentivos ESG. No cenário de crescimento gradual após o 4º mês, o faturamento anual estimado é de R$ 768.000.',
      },
      {
        title: 'Qual é a base da frota e da equipe?',
        content:
          '10 entregadores CLT e 2 gestores operam 8 bicicletas elétricas e 2 utilitários elétricos, com manutenção preventiva e recarga elétrica previstas no custo mensal.',
      },
      {
        title: 'O que significa o payback de ~10,4 meses?',
        content:
          'Com R$ 145.000 de investimento inicial e resultado líquido médio de R$ 14.000/mês (margem de 21,9%), o capital é recuperado em aproximadamente 10,4 meses de operação estabilizada.',
      },
    ],
  },

  footer: {
    ctaTitle: 'O próximo bairro pode começar aqui.',
    ctaDescription:
      'Modelo pronto para apresentar, testar e adaptar a novas operações de entrega limpa em Guarulhos.',
    ctaLabel: 'Voltar ao topo',
    note: 'Projeto reformulado. A versão original permanece preservada como backup.',
  },

  tourSteps: [
    'Parceiros-chave',
    'Atividades-chave',
    'Proposta de valor',
    'Relacionamento com clientes',
    'Segmentos de clientes',
    'Recursos-chave',
    'Canais',
    'Fontes de receita',
    'Estrutura de custos',
    'Projeção financeira',
  ],
} as const

export type CanvasBlock = (typeof siteConfig.canvas)[number]
