import { prisma } from '@/lib/prisma';
import { TracksBarClient } from './TracksBarClient';

export async function TracksBar() {
  let counts = { tecnica: 0, ia_tech: 0 };
  try {
    const [tecnica, iaTech] = await Promise.all([
      prisma.course.count({ where: { status: 'active', track: 'tecnica' } }),
      prisma.course.count({ where: { status: 'active', track: 'ia_tech' } }),
    ]);
    counts = { tecnica, ia_tech: iaTech };
  } catch {
    // DB indisponível — renderiza sem os pills de contagem (graceful).
  }
  return <TracksBarClient counts={counts} />;
}
