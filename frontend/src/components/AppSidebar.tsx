import { accountNavigation, primaryNavigation } from '../data/navigation'
import type { AppSection, IconName } from '../types/dashboard'
import Icon from './Icon'

type AppSidebarProps = {
  activeSection: AppSection
  collapsed: boolean
  onToggleCollapsed: () => void
  onNavigate: (section: AppSection) => void
}

function AppSidebar({
  activeSection,
  collapsed,
  onToggleCollapsed,
  onNavigate,
}: AppSidebarProps) {
  function renderLink(section: AppSection, icon: IconName) {
    const isActive = section === activeSection

    return (
      <button
        className={`sidebar-link${isActive ? ' is-active' : ''}`}
        type="button"
        key={section}
        aria-current={isActive ? 'page' : undefined}
        aria-label={section}
        title={collapsed ? section : undefined}
        onClick={() => {
          onNavigate(section)
        }}
      >
        <Icon name={icon} size={19} />
        <span className="sidebar-link__label">{section}</span>
        {isActive && <span className="sidebar-link__indicator" aria-hidden="true" />}
      </button>
    )
  }

  return (
      <aside className={`sidebar${collapsed ? ' is-collapsed' : ''}`} aria-label="Application navigation">
        <div className="sidebar__brand-row">
          <button
            className="brand-lockup"
            type="button"
            aria-label="IBCM SuperEduAI dashboard"
            onClick={() => {
              onNavigate('Dashboard')
            }}
          >
            <span className="brand-lockup__mark" aria-hidden="true">IBCM</span>
            <span className="brand-lockup__name">
              <strong>SuperEduAI</strong>
              <small>Learning platform</small>
            </span>
          </button>
          <button
            className="sidebar__collapse"
            type="button"
            aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
            aria-expanded={!collapsed}
            onClick={onToggleCollapsed}
          >
            <Icon name="chevron" size={17} />
          </button>
        </div>

        <p className="sidebar__section-label">Learning</p>
        <nav className="sidebar__nav" aria-label="Main navigation">
          {primaryNavigation.map((item) => renderLink(item.section, item.icon))}
        </nav>

        <div className="sidebar__bottom">
          <div className="sidebar__divider" />
          <nav className="sidebar__nav" aria-label="Account navigation">
            {accountNavigation.map((item) => renderLink(item.section, item.icon))}
          </nav>
          <div className="sidebar__demo-note">
            <span className="demo-dot" aria-hidden="true" />
            <span className="sidebar-link__label">Preview environment</span>
          </div>
        </div>
      </aside>
  )
}

export default AppSidebar
