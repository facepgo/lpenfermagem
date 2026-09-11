import { siteContent } from '../data/siteContent';
import { ScheduleCard } from './ScheduleCard';
import { SectionHeading } from './SectionHeading';

const { schedule } = siteContent;

/** Seção azul-marinho “Como funciona” com as três opções de horário. */
export function ScheduleSection() {
  return (
    <section id={schedule.id} className="bg-deep py-20 text-deep-foreground sm:py-24">
      <div className="container-page">
        <SectionHeading eyebrow={schedule.eyebrow} title={schedule.title} tone="deep" />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {schedule.options.map((option, index) => (
            <ScheduleCard key={option.badge} option={option} delay={index * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
