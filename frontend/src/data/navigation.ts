import type { AppSection, IconName } from '../types/dashboard'

export type NavigationItem = {
  section: AppSection
  icon: IconName
}

export const primaryNavigation: NavigationItem[] = [
  { section: 'Dashboard', icon: 'dashboard' },
  { section: 'My Courses', icon: 'courses' },
  { section: 'AI Tutor', icon: 'tutor' },
  { section: 'Assignments', icon: 'assignment' },
  { section: 'Grades', icon: 'check' },
  { section: 'Timetable', icon: 'calendar' },
  { section: 'Quizzes & Exams', icon: 'quiz' },
  { section: 'Resources', icon: 'resources' },
  { section: 'Messages', icon: 'messages' },
]

export const accountNavigation: NavigationItem[] = [
  { section: 'Profile', icon: 'profile' },
  { section: 'Help', icon: 'help' },
]
