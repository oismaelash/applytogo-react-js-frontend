export interface JobSite {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  requiresLogin: boolean;
}

export const jobSites: JobSite[] = [
  {
    id: "1",
    name: "LinkedIn",
    category: "geral",
    description: "A maior rede profissional do mundo com milhares de vagas em todas as áreas.",
    url: "https://linkedin.com/jobs",
    requiresLogin: true,
  },
  {
    id: "2",
    name: "InfoJobs",
    category: "geral",
    description: "Um dos maiores portais de emprego do Brasil com vagas em diversas áreas.",
    url: "https://infojobs.com.br",
    requiresLogin: true,
  },
  {
    id: "3",
    name: "Programathor",
    category: "tecnologia",
    description: "Portal especializado em vagas para desenvolvedores e profissionais de TI.",
    url: "https://programathor.com.br",
    requiresLogin: false,
  },
  {
    id: "4",
    name: "AngelList",
    category: "startups",
    description: "Plataforma focada em startups e empresas de tecnologia inovadoras.",
    url: "https://angel.co",
    requiresLogin: true,
  },
  {
    id: "5",
    name: "Stack Overflow Jobs",
    category: "tecnologia",
    description: "Vagas para desenvolvedores na maior comunidade de programação do mundo.",
    url: "https://stackoverflow.com/jobs",
    requiresLogin: true,
  },
  {
    id: "6",
    name: "Glassdoor",
    category: "geral",
    description: "Portal de vagas com avaliações detalhadas das empresas por funcionários.",
    url: "https://glassdoor.com.br",
    requiresLogin: true,
  },
  {
    id: "7",
    name: "GitHub Jobs",
    category: "tecnologia",
    description: "Vagas para desenvolvedores diretamente no GitHub, focadas em tech.",
    url: "https://jobs.github.com",
    requiresLogin: false,
  },
  {
    id: "8",
    name: "Catho",
    category: "geral",
    description: "Portal brasileiro tradicional com vagas em todas as áreas profissionais.",
    url: "https://catho.com.br",
    requiresLogin: true,
  },
  {
    id: "9",
    name: "GeekHunter",
    category: "tecnologia",
    description: "Plataforma que conecta desenvolvedores com empresas de tecnologia.",
    url: "https://geekhunter.com.br",
    requiresLogin: true,
  },
  {
    id: "10",
    name: "VAGAS.com",
    category: "geral",
    description: "Um dos portais de emprego mais antigos e confiáveis do Brasil.",
    url: "https://vagas.com.br",
    requiresLogin: true,
  },
  {
    id: "11",
    name: "Trampos.co",
    category: "startups",
    description: "Portal focado em vagas criativas e startups com cultura diferenciada.",
    url: "https://trampos.co",
    requiresLogin: false,
  },
  {
    id: "12",
    name: "Indeed",
    category: "geral",
    description: "Agregador global de vagas que coleta oportunidades de diversos sites.",
    url: "https://br.indeed.com",
    requiresLogin: false,
  },
];