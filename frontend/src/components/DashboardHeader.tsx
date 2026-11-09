import { useEffect, useRef } from 'react'
import type { Course, AppSection } from '../types/dashboard'
import { accountNavigation, primaryNavigation } from '../data/navigation'
import Icon from './Icon'
import ThemeToggle from './ThemeToggle'
import type { Theme } from '../types/theme'

type DashboardHeaderProps = {
  activeSection: AppSection
  theme: Theme
  courses: Course[]
  searchValue: string
  onSearchChange: (value: string) => void
  onThemeChange: (theme: Theme) => void
  onNavigate: (section: AppSection) => void
  onOpenCourse: (courseId: string) => void
  notificationsOpen: boolean
  profileOpen: boolean
  onToggleNotifications: () => void
  onToggleProfile: () => void
  onClosePopovers: () => void
  onSignOut: () => void
}

function DashboardHeader({
  activeSection,
  theme,
  courses,
  searchValue,
  onSearchChange,
  onThemeChange,
  onNavigate,
  onOpenCourse,
  notificationsOpen,
  profileOpen,
  onToggleNotifications,
  onToggleProfile,
  onClosePopovers,
  onSignOut,
}: DashboardHeaderProps) {
  const searchInput = useRef<HTMLInputElement>(null)
  const normalizedQuery = searchValue.trim().toLocaleLowerCase()
  const matchingCourses = normalizedQuery
    ? courses.filter((course) => course.title.toLocaleLowerCase().includes(normalizedQuery))
    : []
  const matchingSections = normalizedQuery
    ? [...primaryNavigation, ...accountNavigation].filter((item) => item.section.toLocaleLowerCase().includes(normalizedQuery))
    : []
  const hasSearchResults = matchingCourses.length > 0 || matchingSections.length > 0

  useEffect(() => {
    if (!notificationsOpen && !profileOpen) return

    function handleOutsideClick(event: PointerEvent) {
      if (
        event.target instanceof Element &&
        !event.target.closest('.header-popover-anchor')
      ) {
        onClosePopovers()
      }
    }

    document.addEventListener('pointerdown', handleOutsideClick)
    return () => document.removeEventListener('pointerdown', handleOutsideClick)
  }, [notificationsOpen, profileOpen, onClosePopovers])

  useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        searchInput.current?.focus()
      }
    }

    window.addEventListener('keydown', focusSearch)
    return () => window.removeEventListener('keydown', focusSearch)
  }, [])

  return (
    <header className="workspace-header">
      <div className="workspace-header__title-group">
        <p className="breadcrumb"><span>Workspace</span><span aria-hidden="true">/</span>{activeSection}</p>
        <h1>{activeSection}</h1>
      </div>
      <div className="workspace-header__tools">
        <div className="header-search-tools">
        <div className="header-search">
          <Icon name="search" size={19} />
          <input
            ref={searchInput}
            aria-label="Search sample courses and sections"
            aria-expanded={normalizedQuery.length > 0}
            aria-controls="course-search-results"
            autoComplete="off"
            placeholder="Search courses..."
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') onSearchChange('')
              if (event.key === 'Enter' && matchingCourses[0]) {
                onOpenCourse(matchingCourses[0].id)
                onSearchChange('')
              } else if (event.key === 'Enter' && matchingSections[0]) {
                onNavigate(matchingSections[0].section)
                onSearchChange('')
              }
            }}
          />
          <kbd aria-hidden="true">⌘ K</kbd>
          {normalizedQuery && (
            <div className="search-results" id="course-search-results" role="status">
              <p className="search-results__label">Sample matches</p>
              {matchingCourses.map((course) => (
                <button
                  type="button"
                  className="search-result"
                  key={course.id}
                  onClick={() => {
                    onOpenCourse(course.id)
                    onSearchChange('')
                  }}
                >
                  <Icon name={course.icon} size={17} />
                  <span>{course.title}</span>
                  <Icon name="arrow" size={15} />
                </button>
              ))}
              {matchingSections.map((item) => (
                <button
                  type="button"
                  className="search-result"
                  key={item.section}
                  onClick={() => {
                    onNavigate(item.section)
                    onSearchChange('')
                  }}
                >
                  <Icon name={item.icon} size={17} />
                  <span>{item.section}</span>
                  <Icon name="arrow" size={15} />
                </button>
              ))}
              {!hasSearchResults && (
                <p className="search-results__empty">No sample course or section names match “{searchValue}”.</p>
              )}
              <p className="search-results__note">Live topics and course data are not connected.</p>
            </div>
          )}
        </div>

          <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
        </div>

        <div className="header-account-tools">
        <div className="header-popover-anchor">
          <button
            className={`profile-trigger${profileOpen ? ' is-selected' : ''}`}
            type="button"
            aria-label="Open student menu"
            aria-expanded={profileOpen}
            aria-controls="profile-menu"
            onClick={onToggleProfile}
          >
            <span className="avatar" aria-hidden="true">S</span>
            <span className="profile-trigger__name">Student</span>
            <Icon name="chevron" size={16} />
          </button>
          {profileOpen && (
            <div className="header-popover profile-menu" id="profile-menu" role="menu" aria-label="Student menu">
              <div className="profile-menu__identity"><span className="avatar">S</span><span><strong>Student</strong><small>Preview profile</small></span></div>
              <button type="button" role="menuitem" onClick={() => { onNavigate('Profile'); onClosePopovers() }}><Icon name="profile" size={17} /> View profile</button>
              <button type="button" role="menuitem" onClick={() => { onNavigate('Help'); onClosePopovers() }}><Icon name="help" size={17} /> Help & support</button>
              <button type="button" role="menuitem" onClick={() => { onClosePopovers(); onSignOut() }}><Icon name="close" size={17} /> Sign out</button>
            </div>
          )}
        </div>

        <div className="header-popover-anchor header-popover-anchor--notifications">
          <button
            className={`icon-button${notificationsOpen ? ' is-selected' : ''}`}
            type="button"
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
            aria-controls="notifications-panel"
            onClick={onToggleNotifications}
          >
            <Icon name="bell" size={19} />
          </button>
          {notificationsOpen && (
            <div className="header-popover" id="notifications-panel" role="region" aria-label="Notifications">
              <div className="header-popover__heading">
                <div><span className="eyebrow">Updates</span><h2>Notifications</h2></div>
                <span className="header-popover__quiet">No live alerts</span>
              </div>
              <p className="popover-copy">This preview is not connected to college notifications.</p>
              <button
                className="popover-action"
                type="button"
                onClick={() => {
                  onNavigate('Dashboard')
                  onClosePopovers()
                  window.setTimeout(() => document.getElementById('announcements')?.scrollIntoView({ behavior: 'smooth' }), 0)
                }}
              >
                View sample announcements <Icon name="arrow" size={16} />
              </button>
            </div>
          )}
        </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
