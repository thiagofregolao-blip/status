import type { Testimonial } from '@/lib/types';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    studentName: 'Carlos Benítez',
    city: 'Katueté, PY',
    courseTitle: {
      pt: 'Operador de Máquinas Agrícolas',
      es: 'Operador de Máquinas Agrícolas',
    },
    photoUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    text: {
      pt: 'Comecei sem experiência e hoje trabalho em uma fazenda grande da região. As aulas práticas fizeram toda a diferença — peguei a colheitadeira no primeiro dia.',
      es: 'Empecé sin experiencia y hoy trabajo en una finca grande de la región. Las clases prácticas fueron clave — manejé la cosechadora el primer día.',
    },
    rating: 5,
    featured: true,
    track: 'tecnica',
  },
  {
    id: '2',
    studentName: 'Mariana Silva',
    city: 'Foz do Iguaçu, BR',
    courseTitle: {
      pt: 'Prompt Engineering com ChatGPT e Claude',
      es: 'Prompt Engineering con ChatGPT y Claude',
    },
    photoUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    text: {
      pt: 'Tenho escritório de contabilidade e reduzi pela metade o tempo de tarefas repetitivas. O curso foi direto ao ponto e cheio de casos reais.',
      es: 'Tengo un estudio contable y reduje a la mitad el tiempo de tareas repetitivas. El curso fue directo al punto y con casos reales.',
    },
    rating: 5,
    featured: true,
    track: 'ia_tech',
  },
  {
    id: '3',
    studentName: 'Joaquim Ferreira',
    city: 'Cascavel, BR',
    courseTitle: {
      pt: 'Instalação e Manutenção de Ar Condicionado Split',
      es: 'Instalación y Mantenimiento de Aire Acondicionado Split',
    },
    photoUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    text: {
      pt: 'Larguei meu trampo de entregador e montei meu negócio de instalação. Os professores são técnicos que ainda atuam, aprendi truques que não tem em vídeo nenhum.',
      es: 'Dejé mi trabajo de delivery y monté mi negocio de instalación. Los profes son técnicos activos, aprendí trucos que no están en videos.',
    },
    rating: 5,
    featured: true,
    track: 'tecnica',
  },
  {
    id: '4',
    studentName: 'Laura Cáceres',
    city: 'Ciudad del Este, PY',
    courseTitle: {
      pt: 'Automação com IA: n8n, Make e Agentes',
      es: 'Automatización con IA: n8n, Make y Agentes',
    },
    photoUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80',
    text: {
      pt: 'Comecei a vender automações para lojas da região. Em 2 meses paguei o curso e já tenho 4 clientes mensais. O conteúdo é prático de verdade.',
      es: 'Empecé a vender automatizaciones a tiendas de la zona. En 2 meses pagué el curso y ya tengo 4 clientes mensuales. El contenido es realmente práctico.',
    },
    rating: 5,
    featured: true,
    track: 'ia_tech',
  },
  {
    id: '5',
    studentName: 'Rodrigo Almeida',
    city: 'Santa Terezinha de Itaipu, BR',
    courseTitle: {
      pt: 'Operador de Drone Agrícola',
      es: 'Operador de Dron Agrícola',
    },
    photoUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    text: {
      pt: 'Trabalho com pulverização há 3 meses e já recuperei o investimento. Mercado quente demais — não consigo atender tudo que aparece.',
      es: 'Trabajo con pulverización hace 3 meses y ya recuperé la inversión. El mercado está caliente — no logro atender todo lo que aparece.',
    },
    rating: 5,
    featured: true,
    track: 'tecnica',
  },
];
