import { Hero } from '@/components/home/Hero'
import { Features } from '@/components/home/Features'
import { Stats } from '@/components/home/Stats'
import { FarmShowcase } from '@/components/home/FarmShowcase'
import { CTA } from '@/components/home/CTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <FarmShowcase />
      <CTA />
    </>
  )
}
