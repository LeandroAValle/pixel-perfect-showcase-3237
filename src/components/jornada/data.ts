export type Experiencia = {
  periodo: string;
  titulo: string;
  papel: string;
  resumo: string;
  nota: string;
  antecipa?: string;
};

export const experiencias: Experiencia[] = [
  {
    periodo: "2011 — 2013",
    titulo: "Universidade de Brasília",
    papel: "SOCIUS · formação e pesquisa",
    resumo: "Formação em sociologia e primeiros estudos sobre cidade, moradia e desigualdade.",
    nota: "Aprendi a ler a cidade pelos seus conflitos: quem decide, quem é ouvido, quem fica de fora.",
    antecipa: "Método",
  },
  {
    periodo: "2014",
    titulo: "Tribunal de Contas da União",
    papel: "Análise de políticas públicas",
    resumo: "Avaliação de programas federais, critérios de análise e leitura crítica de dados.",
    nota: "Aqui o método virou rotina: dados, critérios e responsabilidade pública.",
    antecipa: "Dados",
  },
  {
    periodo: "2015 — 2017",
    titulo: "FSB",
    papel: "Pesquisa e comunicação",
    resumo: "Estudos de opinião e tradução de resultados para públicos muito diferentes.",
    nota: "Descobri que comunicar bem é tão importante quanto medir com rigor.",
    antecipa: "Comunicação",
  },
  {
    periodo: "2018",
    titulo: "Senado Federal",
    papel: "Articulação institucional",
    resumo: "Apoio a comissões e mediação entre áreas técnicas, gabinetes e sociedade civil.",
    nota: "Aprendi a articular pessoas e instituições em torno de um mesmo objetivo.",
    antecipa: "Articulação",
  },
  {
    periodo: "2020 — 2026",
    titulo: "Prefeitura de Macaubal",
    papel: "Gestão pública municipal",
    resumo: "Políticas locais, orçamento e trabalho diário junto da comunidade.",
    nota: "A gestão pública me ensinou a transformar diagnóstico em ação concreta.",
    antecipa: "Gestão Pública",
  },
  {
    periodo: "desde 2026",
    titulo: "Rede Cerrado",
    papel: "Conservação e território",
    resumo: "Conservação ambiental e articulação de redes junto de comunidades do Cerrado.",
    nota: "Aqui a linha se abre: tudo o que veio antes passa a funcionar junto.",
    antecipa: "Conservação",
  },
];

export type Competencia = {
  id: string;
  nome: string;
  origem: string;
  detalhe: string;
};

export const competencias: Competencia[] = [
  {
    id: "metodo",
    nome: "Método",
    origem: "UnB · SOCIUS",
    detalhe:
      "Construído na formação em sociologia, entre leitura teórica e trabalho de campo, e depois sistematizado nas análises do TCU.",
  },
  {
    id: "pesquisa",
    nome: "Pesquisa",
    origem: "UnB e FSB",
    detalhe:
      "Da pesquisa acadêmica aos estudos de opinião na FSB: desenhar perguntas, escolher amostras e sustentar conclusões.",
  },
  {
    id: "dados",
    nome: "Dados",
    origem: "TCU e FSB",
    detalhe:
      "Tratar, cruzar e interpretar grandes volumes de informação pública sem perder de vista o que os números significam.",
  },
  {
    id: "comunicacao",
    nome: "Comunicação",
    origem: "FSB",
    detalhe:
      "Traduzir resultados complexos para gestores, imprensa e comunidades, mantendo precisão e clareza.",
  },
  {
    id: "articulacao",
    nome: "Articulação",
    origem: "Senado Federal e Prefeitura",
    detalhe:
      "Aproximar áreas técnicas, instituições e pessoas com interesses distintos até chegar a um caminho comum.",
  },
  {
    id: "gestao",
    nome: "Gestão Pública",
    origem: "Prefeitura de Macaubal",
    detalhe:
      "Planejar, priorizar e executar políticas municipais com recursos limitados e resultado visível na vida das pessoas.",
  },
  {
    id: "conservacao",
    nome: "Conservação",
    origem: "Rede Cerrado",
    detalhe:
      "Trabalho com conservação ambiental e fortalecimento de redes locais no Cerrado — o ramo mais recente da trajetória.",
  },
];
