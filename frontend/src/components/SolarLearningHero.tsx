import Button from './Button'
import Icon from './Icon'
import DashboardThemeScene from './DashboardThemeScene'
import type { Theme } from '../types/theme'

type SolarLearningHeroProps = {
  theme: Theme
  onContinue: () => void
  onAskTutor: () => void
}

function SolarLearningHero({ theme, onContinue, onAskTutor }: SolarLearningHeroProps) {
  return (
    <section className="solar-hero" data-atmosphere={theme} aria-labelledby="welcome-title">
      <span className="solar-hero__atmosphere" aria-hidden="true" />
      <div className="solar-hero__copy">
        <span className="solar-hero__eyebrow">IBCM · YOUR LEARNING SPACE</span>
        <h2 id="welcome-title">Welcome back,<br />Student</h2>
        <p>Your learning keeps moving. Pick up where you left off or ask for a hand.</p>
        <div className="solar-hero__actions">
          <Button type="button" onClick={onContinue}><Icon name="play" size={16} /> Continue learning</Button>
          <Button type="button" variant="secondary" onClick={onAskTutor}><Icon name="sparkle" size={16} /> Ask AI Tutor</Button>
        </div>
      </div>

      <div className={`solar-scene${theme === 'light' || theme === 'dark' ? '' : ` solar-scene--${theme}`}`} role="img" aria-label={theme === 'abyss' ? 'A crimson gravitational void with flowing energy arcs' : theme === 'astral' ? 'A small spiral galaxy surrounded by constellations and celestial paths' : 'A quiet orbital illustration representing learning, with three coordinated symbols around a luminous core'}>
        {theme !== 'light' && theme !== 'dark' ? (
          <DashboardThemeScene theme={theme} />
        ) : (
          <>
        <span className="solar-orbit solar-orbit--outer" aria-hidden="true">
          <span className="solar-planet solar-planet--course"><Icon name="book" size={17} /></span>
        </span>
        <span className="solar-orbit solar-orbit--middle" aria-hidden="true">
          <span className="solar-planet solar-planet--assignment"><Icon name="assignment" size={16} /></span>
        </span>
        <span className="solar-orbit solar-orbit--inner" aria-hidden="true">
          <span className="solar-planet solar-planet--tutor"><Icon name="sparkle" size={15} /></span>
        </span>
        <span className="solar-core"><Icon name="book" size={29} /><small>LEARN</small></span>
        <span className="solar-star solar-star--one" aria-hidden="true">✦</span>
        <span className="solar-star solar-star--two" aria-hidden="true">·</span>
        <span className="solar-star solar-star--three" aria-hidden="true">✧</span>
          </>
        )}
      </div>
    </section>
  )
}

export default SolarLearningHero
