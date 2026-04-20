/*
 * Idempotent seed — safe to run on every startup.
 * Creates/updates:
 *  - Admin user (from ADMIN_EMAIL + ADMIN_PASSWORD env)
 *  - 6 cursos, 4 FAQs, 3 depoimentos
 *
 * Written in CommonJS so it runs without ts-node.
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function ensureAdmin() {
  const email = (process.env.ADMIN_EMAIL || 'thiago.fregolao@gmail.com').toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD || '1571jn';
  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.upsert({
    where: { email },
    update: { password: hashed },
    create: { email, password: hashed, name: 'Admin' },
  });
  console.log(`[seed] admin ensured: ${email}`);
}

const courses = [
  {
    slug: 'operador-maquinas-agricolas',
    titlePt: 'Operador de Máquinas Agrícolas',
    titleEs: 'Operador de Máquinas Agrícolas',
    descriptionShortPt: 'Colheitadeira, pulverizador, trator e transbordo com aulas 100% práticas em campo.',
    descriptionShortEs: 'Cosechadora, pulverizador, tractor y transbordo con clases 100% prácticas en el campo.',
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&auto=format&fit=crop&q=70',
    track: 'tecnica',
    category: 'agricola',
    modality: 'presencial',
    price: 1497,
    installments: 3,
    installmentValue: 499,
    workloadHours: 40,
    startDate: new Date('2026-05-12'),
    endDate: new Date('2026-05-23'),
    locationPt: 'Katueté, Paraguai',
    locationEs: 'Katueté, Paraguay',
    totalSeats: 12,
    seatsTaken: 9,
    status: 'active',
    featured: true,
    nrsCovered: ['NR-11', 'NR-12', 'NR-31'],
    toolsCovered: [],
    includesPt: ['Certificado bilíngue', 'Carteirinha', 'Ficha de estágio', 'Apoio na colocação'],
    includesEs: ['Certificado bilingüe', 'Carnet', 'Ficha de práctica', 'Apoyo de colocación'],
    machinesUsed: ['John Deere S440', 'Pulverizador Jacto', 'Trator Massey 7150', 'Transbordo'],
    order: 1,
  },
  {
    slug: 'instalacao-manutencao-ar-split',
    titlePt: 'Instalação e Manutenção de Ar Condicionado Split',
    titleEs: 'Instalación y Mantenimiento de Aire Acondicionado Split',
    descriptionShortPt: 'Do primeiro ciclo de refrigeração à instalação de equipamentos residenciais e comerciais.',
    descriptionShortEs: 'Del primer ciclo de refrigeración a la instalación en equipos residenciales y comerciales.',
    imageUrl: 'https://images.unsplash.com/photo-1631545806609-ae6a3ebbe7a3?w=1200&auto=format&fit=crop&q=70',
    track: 'tecnica',
    category: 'climatizacao',
    modality: 'presencial',
    price: 897,
    installments: 3,
    installmentValue: 299,
    workloadHours: 32,
    startDate: new Date('2026-05-05'),
    endDate: new Date('2026-05-14'),
    locationPt: 'Katueté, Paraguai',
    locationEs: 'Katueté, Paraguay',
    totalSeats: 10,
    seatsTaken: 8,
    status: 'active',
    featured: true,
    nrsCovered: ['NR-10', 'NR-35'],
    toolsCovered: [],
    includesPt: ['Certificado bilíngue', 'Kit de ferramentas básicas', 'Carteirinha'],
    includesEs: ['Certificado bilingüe', 'Kit de herramientas básicas', 'Carnet'],
    machinesUsed: ['Splits 9k/12k/18k BTU', 'Bomba de vácuo', 'Manifold', 'Detector de vazamento'],
    order: 2,
  },
  {
    slug: 'prompt-engineering-chatgpt-claude',
    titlePt: 'Prompt Engineering com ChatGPT e Claude',
    titleEs: 'Prompt Engineering con ChatGPT y Claude',
    descriptionShortPt: 'Domine as melhores práticas para extrair o máximo dos modelos de IA no seu dia a dia.',
    descriptionShortEs: 'Domina las mejores prácticas para sacar el máximo de los modelos de IA en tu día a día.',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop&q=70',
    track: 'ia_tech',
    category: 'ia',
    modality: 'online_ao_vivo',
    price: 697,
    installments: 3,
    installmentValue: 232,
    workloadHours: 24,
    startDate: new Date('2026-05-15'),
    endDate: new Date('2026-06-05'),
    locationPt: 'Online ao vivo (Zoom)',
    locationEs: 'Online en vivo (Zoom)',
    totalSeats: 30,
    seatsTaken: 27,
    status: 'active',
    featured: true,
    nrsCovered: [],
    toolsCovered: ['ChatGPT', 'Claude', 'Perplexity', 'Gemini'],
    includesPt: ['Certificado digital', 'Gravação das aulas', 'Comunidade no Discord', 'Templates prontos'],
    includesEs: ['Certificado digital', 'Grabación de clases', 'Comunidad en Discord', 'Plantillas listas'],
    machinesUsed: [],
    order: 3,
  },
  {
    slug: 'automacao-ia-n8n-make-agentes',
    titlePt: 'Automação com IA: n8n, Make e Agentes',
    titleEs: 'Automatización con IA: n8n, Make y Agentes',
    descriptionShortPt: 'Construa fluxos que conversam entre si, economizam horas e abrem espaço para serviços recorrentes.',
    descriptionShortEs: 'Crea flujos que se conectan entre sí, ahorran horas y abren espacio para servicios recurrentes.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=70',
    track: 'ia_tech',
    category: 'automacao',
    modality: 'hibrido',
    price: 1297,
    installments: 6,
    installmentValue: 216,
    workloadHours: 36,
    startDate: new Date('2026-05-20'),
    endDate: new Date('2026-06-24'),
    locationPt: 'Híbrido — Katueté + Online',
    locationEs: 'Híbrido — Katueté + Online',
    totalSeats: 15,
    seatsTaken: 6,
    status: 'active',
    featured: true,
    nrsCovered: [],
    toolsCovered: ['n8n', 'Make', 'Zapier', 'OpenAI API', 'Anthropic API'],
    includesPt: ['Certificado', 'Acesso ao template de agentes', 'Mentoria em grupo', 'Comunidade no Discord'],
    includesEs: ['Certificado', 'Acceso al template de agentes', 'Mentoría en grupo', 'Comunidad en Discord'],
    machinesUsed: [],
    order: 4,
  },
  {
    slug: 'operador-drone-agricola',
    titlePt: 'Operador de Drone Agrícola',
    titleEs: 'Operador de Dron Agrícola',
    descriptionShortPt: 'Pulverização, mapeamento NDVI e regulamentação para operar drones em lavouras.',
    descriptionShortEs: 'Pulverización, mapeo NDVI y regulación para operar drones en cultivos.',
    imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&auto=format&fit=crop&q=70',
    track: 'tecnica',
    category: 'agricola',
    modality: 'presencial',
    price: 2197,
    installments: 6,
    installmentValue: 366,
    workloadHours: 48,
    startDate: new Date('2026-06-02'),
    endDate: new Date('2026-06-13'),
    locationPt: 'Katueté, Paraguai',
    locationEs: 'Katueté, Paraguay',
    totalSeats: 8,
    seatsTaken: 2,
    status: 'active',
    featured: false,
    nrsCovered: ['ANAC', 'DINAC'],
    toolsCovered: [],
    includesPt: ['Certificado', 'Horas de voo supervisionadas', 'Manual de regulamentação'],
    includesEs: ['Certificado', 'Horas de vuelo supervisadas', 'Manual de regulación'],
    machinesUsed: ['DJI Agras T40', 'Mavic 3M', 'Phantom 4 RTK'],
    order: 5,
  },
  {
    slug: 'desenvolvimento-assistido-ia',
    titlePt: 'Desenvolvimento Assistido por IA',
    titleEs: 'Desarrollo Asistido por IA',
    descriptionShortPt: 'Cursor, Claude Code e v0 para desenvolver aplicações reais em ritmo de startup.',
    descriptionShortEs: 'Cursor, Claude Code y v0 para crear aplicaciones reales al ritmo de una startup.',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=70',
    track: 'ia_tech',
    category: 'dev',
    modality: 'online_ao_vivo',
    price: 1497,
    installments: 6,
    installmentValue: 249,
    workloadHours: 40,
    startDate: new Date('2026-06-10'),
    endDate: new Date('2026-07-15'),
    locationPt: 'Online ao vivo (Zoom)',
    locationEs: 'Online en vivo (Zoom)',
    totalSeats: 25,
    seatsTaken: 25,
    status: 'active',
    featured: false,
    nrsCovered: [],
    toolsCovered: ['Cursor', 'Claude Code', 'v0', 'GitHub Copilot', 'Next.js'],
    includesPt: ['Certificado', 'Acesso vitalício às aulas', 'Comunidade no Discord'],
    includesEs: ['Certificado', 'Acceso vitalicio a las clases', 'Comunidad en Discord'],
    machinesUsed: [],
    order: 6,
  },
];

const faqs = [
  {
    questionPt: 'Os certificados são reconhecidos no Brasil e Paraguai?',
    questionEs: '¿Los certificados son reconocidos en Brasil y Paraguay?',
    answerPt: 'Sim. Todos os certificados são bilíngues, com validade reconhecida em ambos os países e referência às normas regulamentadoras aplicáveis.',
    answerEs: 'Sí. Todos los certificados son bilingües, con validez reconocida en ambos países y referencia a las normas reguladoras aplicables.',
    order: 1,
  },
  {
    questionPt: 'Como funcionam as aulas práticas?',
    questionEs: '¿Cómo funcionan las clases prácticas?',
    answerPt: 'Nos cursos presenciais você opera equipamentos reais em campo, com instrutores certificados. Toda turma tem no máximo 15 alunos para garantir tempo hands-on.',
    answerEs: 'En los cursos presenciales operás equipos reales en el campo, con instructores certificados. Cada grupo tiene máximo 15 alumnos para garantizar tiempo práctico.',
    order: 2,
  },
  {
    questionPt: 'Posso parcelar?',
    questionEs: '¿Puedo pagar en cuotas?',
    answerPt: 'Sim, em até 6x sem juros no cartão ou via PIX à vista com 5% de desconto.',
    answerEs: 'Sí, hasta en 6 cuotas sin interés en tarjeta o vía PIX en efectivo con 5% de descuento.',
    order: 3,
  },
  {
    questionPt: 'O que acontece se eu perder uma aula?',
    questionEs: '¿Qué pasa si pierdo una clase?',
    answerPt: 'Cursos online têm gravação disponível por 6 meses. Presenciais têm reposição agendada na turma seguinte, sem custo extra.',
    answerEs: 'Los cursos online tienen grabación disponible por 6 meses. Los presenciales tienen reposición en el grupo siguiente, sin costo extra.',
    order: 4,
  },
];

const testimonials = [
  {
    name: 'Carlos Mendoza',
    role: 'Operador de colheitadeira',
    location: 'Katueté, PY',
    quotePt: 'Entrei no curso sem nunca ter pilotado uma máquina. Três semanas depois estava trabalhando na safra ganhando em dólar.',
    quoteEs: 'Entré al curso sin haber manejado nunca una máquina. Tres semanas después estaba trabajando en la cosecha cobrando en dólares.',
    imageUrl: 'https://randomuser.me/api/portraits/men/43.jpg',
    rating: 5,
    featured: true,
    order: 1,
  },
  {
    name: 'Luana Ferreira',
    role: 'Técnica em climatização',
    location: 'Foz do Iguaçu, BR',
    quotePt: 'Depois do curso de split abri minha própria empresa. Faturamento triplicou em 4 meses.',
    quoteEs: 'Después del curso de split abrí mi propia empresa. La facturación se triplicó en 4 meses.',
    imageUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 5,
    featured: true,
    order: 2,
  },
  {
    name: 'Miguel Ângelo Silva',
    role: 'Automação com IA',
    location: 'Salto del Guairá, PY',
    quotePt: 'O curso de n8n me fez abrir um serviço recorrente para escritórios. Hoje tenho 8 clientes fixos.',
    quoteEs: 'El curso de n8n me permitió abrir un servicio recurrente para oficinas. Hoy tengo 8 clientes fijos.',
    imageUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
    rating: 5,
    featured: true,
    order: 3,
  },
];

async function main() {
  await ensureAdmin();

  for (const course of courses) {
    await prisma.course.upsert({
      where: { slug: course.slug },
      update: course,
      create: course,
    });
  }
  console.log(`[seed] ${courses.length} courses upserted`);

  for (const faq of faqs) {
    const existing = await prisma.faq.findFirst({ where: { questionPt: faq.questionPt } });
    if (existing) {
      await prisma.faq.update({ where: { id: existing.id }, data: faq });
    } else {
      await prisma.faq.create({ data: faq });
    }
  }
  console.log(`[seed] ${faqs.length} FAQs upserted`);

  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({ where: { name: t.name } });
    if (existing) {
      await prisma.testimonial.update({ where: { id: existing.id }, data: t });
    } else {
      await prisma.testimonial.create({ data: t });
    }
  }
  console.log(`[seed] ${testimonials.length} testimonials upserted`);
}

main()
  .catch((e) => {
    console.error('[seed] failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
