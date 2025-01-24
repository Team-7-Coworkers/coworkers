import ServiceIntro from '@/app/components/Landing/ServiceIntro';
import Section1 from '@/app/components/Landing/Section1';
import Section2 from '@/app/components/Landing/Section2';
import Section3 from '@/app/components/Landing/Section3';
import ServiceOutro from '@/app/components/Landing/ServiceOutro';

export default function LandingPage() {
  return (
    <div>
      <ServiceIntro />
      <div className="px-4 sm:px-6">
        <Section1 />
        <Section2 />
        <Section3 />
      </div>
      <ServiceOutro />
    </div>
  );
}
