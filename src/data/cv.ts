import type { Localized } from "../i18n/utils";
import { contact } from "./contact";

export interface Job {
  company: string;
  role: Localized<string>;
  /** "YYYY-MM" */
  start: string;
  /** "YYYY-MM", or null while it is the current job */
  end: string | null;
  bullets: Localized<string[]>;
  stack: string[];
}

export interface Study {
  center: string;
  title: Localized<string>;
  start: number;
  end: number;
}

export interface SkillGroup {
  name: Localized<string>;
  items: string[];
}

export interface SpokenLanguage {
  name: Localized<string>;
  level: Localized<string>;
}

export const profile = {
  name: "Duarte Domingos",
  email: contact.email,
  links: { linkedin: contact.linkedin, github: contact.github },
  eyebrow: {
    es: "Desarrollador de software · Andorra",
    en: "Software developer · Andorra",
    ca: "Desenvolupador de programari · Andorra",
  },
  tagline: {
    es: "Construyo software útil y mantenible con Java, Spring y SQL. Ahora, cada vez más cerca del front-end.",
    en: "I build useful, maintainable software with Java, Spring and SQL, and I'm moving closer to the front-end every day.",
    ca: "Construeixo programari útil i mantenible amb Java, Spring i SQL. Ara, cada cop més a prop del front-end.",
  },
  about: {
    es: "Soy desarrollador de software desde 2022. He hecho desarrollo full-stack con C# y .NET, he construido soluciones de datos con Python y Snowflake para el sector bancario y ahora desarrollo aplicaciones con Java y Spring. Me interesan el diseño de interfaces funcionales, la calidad del código y la mejora continua, y disfruto trabajando en equipo para crear software que sea útil para las personas.",
    en: "I've been a software developer since 2022. I've done full-stack work with C# and .NET, built data solutions with Python and Snowflake for the banking sector, and I now develop applications with Java and Spring. I care about functional interface design, code quality and continuous improvement, and I enjoy working in a team to build software that is genuinely useful to people.",
    ca: "Soc desenvolupador de programari des del 2022. He fet desenvolupament full-stack amb C# i .NET, he construït solucions de dades amb Python i Snowflake per al sector bancari i ara desenvolupo aplicacions amb Java i Spring. M'interessen el disseny d'interfícies funcionals, la qualitat del codi i la millora contínua, i gaudeixo treballant en equip per crear programari útil per a les persones.",
  },
  availability: {
    es: "Abierto a nuevas oportunidades en Barcelona (híbrido) o en remoto.",
    en: "Open to new opportunities in Barcelona (hybrid) or remote.",
    ca: "Obert a noves oportunitats a Barcelona (híbrid) o en remot.",
  },
  // Generated from this data by `npm run cv` (scripts/build-cv.mjs).
  cvPdf: {
    es: "/cv/duarte-domingos-cv-es.pdf",
    en: "/cv/duarte-domingos-cv-en.pdf",
    ca: "/cv/duarte-domingos-cv-ca.pdf",
  },
} satisfies {
  name: string;
  email: string;
  links: { linkedin: string; github: string };
  eyebrow: Localized<string>;
  tagline: Localized<string>;
  about: Localized<string>;
  availability: Localized<string>;
  cvPdf: Localized<string>;
};

export const jobs: Job[] = [
  {
    company: "Vargroup Andorra",
    role: { es: "Desarrollador Java", en: "Java developer", ca: "Desenvolupador Java" },
    start: "2026-01",
    end: null,
    bullets: {
      es: [
        "Desarrollo de nuevas funcionalidades con Java y Spring en aplicaciones de gran tamaño.",
        "Análisis funcional, revisión de funcionalidades y resolución de incidencias junto al equipo.",
      ],
      en: [
        "Building new features with Java and Spring in large applications.",
        "Functional analysis, feature reviews and incident resolution together with the team.",
      ],
      ca: [
        "Desenvolupament de noves funcionalitats amb Java i Spring en aplicacions de gran mida.",
        "Anàlisi funcional, revisió de funcionalitats i resolució d'incidències amb l'equip.",
      ],
    },
    stack: ["Java", "Spring", "SQL"],
  },
  {
    company: "Vargroup Andorra",
    role: {
      es: "Desarrollador de software · sector bancario",
      en: "Software developer · banking sector",
      ca: "Desenvolupador de programari · sector bancari",
    },
    start: "2023-11",
    end: "2026-01",
    bullets: {
      es: [
        "Datalake en la nube: procesamiento de grandes volúmenes de datos con Python y Snowflake, procesos ETL con Airflow y cargas diarias y mensuales automatizadas.",
        "Automatización y validación de procesos de datos a partir de ficheros diarios: detección de inconsistencias, duplicados y datos incompletos.",
        "Aplicaciones web con .NET y SQL Server: procedimientos almacenados y consultas optimizadas.",
        "Clasificación automática de correos con IA en Python (pandas) para reducir trabajo manual.",
        "Herramientas internas en VBA (Excel y Access) y conversión de mensajes financieros SWIFT en Java.",
      ],
      en: [
        "Cloud data lake: processing large data volumes with Python and Snowflake, ETL pipelines with Airflow and automated daily and monthly loads.",
        "Automation and validation of data processes fed by daily files: detecting inconsistencies, duplicates and incomplete data.",
        "Web applications with .NET and SQL Server: stored procedures and optimised queries.",
        "AI-based email classification in Python (pandas) to reduce manual work.",
        "Internal tools in VBA (Excel and Access) and conversion of SWIFT financial messages in Java.",
      ],
      ca: [
        "Datalake al núvol: processament de grans volums de dades amb Python i Snowflake, processos ETL amb Airflow i càrregues diàries i mensuals automatitzades.",
        "Automatització i validació de processos de dades a partir de fitxers diaris: detecció d'inconsistències, duplicats i dades incompletes.",
        "Aplicacions web amb .NET i SQL Server: procediments emmagatzemats i consultes optimitzades.",
        "Classificació automàtica de correus amb IA en Python (pandas) per reduir feina manual.",
        "Eines internes en VBA (Excel i Access) i conversió de missatges financers SWIFT amb Java.",
      ],
    },
    stack: ["Python", "Snowflake", "Airflow", "AWS", "SQL Server", ".NET", "SAS", "Java"],
  },
  {
    company: "BDR Informàtica",
    role: {
      es: "Programador junior full-stack",
      en: "Junior full-stack developer",
      ca: "Programador júnior full-stack",
    },
    start: "2022-07",
    end: "2023-11",
    bullets: {
      es: [
        "Desarrollo full-stack con C#, Blazor, .NET y SQL.",
        "Gestión y mantenimiento de sitios WordPress (Divi, Elementor).",
      ],
      en: [
        "Full-stack development with C#, Blazor, .NET and SQL.",
        "Management and maintenance of WordPress sites (Divi, Elementor).",
      ],
      ca: [
        "Desenvolupament full-stack amb C#, Blazor, .NET i SQL.",
        "Gestió i manteniment de llocs WordPress (Divi, Elementor).",
      ],
    },
    stack: ["C#", "Blazor", ".NET", "SQL", "WordPress"],
  },
];

const aixovall = "Centre de Formació Professional d'Aixovall";

export const studies: Study[] = [
  {
    center: "Universitat d'Andorra",
    title: {
      es: "Grado en Informática",
      en: "Bachelor's Degree in Computer Science",
      ca: "Grau en Informàtica",
    },
    start: 2019,
    end: 2023,
  },
  {
    center: aixovall,
    title: {
      es: "Bachillerato Profesional en Sistemas y Redes",
      en: "Advanced Diploma in Systems and Networks",
      ca: "Batxillerat Professional en Sistemes i Xarxes",
    },
    start: 2018,
    end: 2019,
  },
  {
    center: aixovall,
    title: {
      es: "Grado Medio en Microinformática y Redes",
      en: "Intermediate Diploma in Microinformatics and Networks",
      ca: "Grau Mitjà en Microinformàtica i Xarxes",
    },
    start: 2016,
    end: 2018,
  },
];

export const skills: SkillGroup[] = [
  {
    name: { es: "Back-end", en: "Back-end", ca: "Back-end" },
    items: ["Java", "Spring", "C#", ".NET", "WPF"],
  },
  {
    name: { es: "Datos", en: "Data", ca: "Dades" },
    items: ["Python", "SQL Server", "Snowflake", "Airflow", "AWS", "SAS"],
  },
  {
    name: { es: "Front-end y móvil", en: "Front-end and mobile", ca: "Front-end i mòbil" },
    items: ["Flutter", "Firebase", "Blazor", "TypeScript", "Astro", "Tailwind CSS"],
  },
  {
    name: { es: "Herramientas", en: "Tools", ca: "Eines" },
    items: ["Git", "AWS CodeCommit", "SVN", "VBA", "Scrum"],
  },
];

export const spokenLanguages: SpokenLanguage[] = [
  {
    name: { es: "Español", en: "Spanish", ca: "Castellà" },
    level: { es: "Nativo", en: "Native", ca: "Natiu" },
  },
  {
    name: { es: "Portugués", en: "Portuguese", ca: "Portuguès" },
    level: { es: "Nativo", en: "Native", ca: "Natiu" },
  },
  {
    name: { es: "Catalán", en: "Catalan", ca: "Català" },
    level: { es: "C1", en: "C1", ca: "C1" },
  },
  {
    name: { es: "Inglés", en: "English", ca: "Anglès" },
    level: { es: "B2", en: "B2", ca: "B2" },
  },
  {
    name: { es: "Francés", en: "French", ca: "Francès" },
    level: { es: "Básico", en: "Basic", ca: "Bàsic" },
  },
];
