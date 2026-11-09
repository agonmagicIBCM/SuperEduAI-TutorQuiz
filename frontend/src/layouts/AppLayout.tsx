import { useCallback, useEffect, useState, type ReactNode } from 'react'
import type { AppSection, Course } from '../types/dashboard'
import type { Theme } from '../types/theme'
import AppSidebar from '../components/AppSidebar'
import DashboardHeader from '../components/DashboardHeader'
import AmbientEnvironment from '../components/AmbientEnvironment'

type AppLayoutProps = {
  activeSection: AppSection
  children: ReactNode
  courses: Course[]
  onNavigate: (section: AppSection) => void
  onOpenCourse: (courseId: string) => void
  theme: Theme
  onThemeChange: (theme: Theme) => void
  onSignOut: () => void
}

function AppLayout({
  activeSection,
  children,
  courses,
  onNavigate,
  onOpenCourse,
  theme,
  onThemeChange,
  onSignOut,
}: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const closePopovers = useCallback(() => {
    setNotificationsOpen(false)
    setProfileOpen(false)
  }, [])

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closePopovers()
        setSearchValue('')
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [closePopovers])

  function toggleNotifications() {
    setNotificationsOpen((open) => !open)
    setProfileOpen(false)
  }

  function toggleProfile() {
    setProfileOpen((open) => !open)
    setNotificationsOpen(false)
  }

  return (
    <>
    <AmbientEnvironment />
    <div className={`app-shell${collapsed ? ' is-collapsed' : ''}`}>
      <AppSidebar
        activeSection={activeSection}
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((value) => !value)}
        onNavigate={onNavigate}
      />
      <div className="workspace">
        <div className="workspace-header-row">
          <DashboardHeader
            activeSection={activeSection}
            theme={theme}
            courses={courses}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            onThemeChange={onThemeChange}
            onNavigate={onNavigate}
            onOpenCourse={onOpenCourse}
            notificationsOpen={notificationsOpen}
            profileOpen={profileOpen}
            onToggleNotifications={toggleNotifications}
            onToggleProfile={toggleProfile}
            onClosePopovers={closePopovers}
            onSignOut={onSignOut}
          />
        </div>
        <div className="workspace-content">{children}</div>
        <footer className="workspace-footer">
          <span>IBCM SuperEduAI</span>
          <span className="preview-disclaimer">Student dashboard preview · sample content only</span>
        </footer>
      </div>
    </div>
    </>
  )
}

export default AppLayout
