import type { Course } from '../types/dashboard'

// Preview-only sample content supplied for the dashboard demonstration.
// This data is not live, verified, or connected to IBCM systems.
export const sampleCourses: Course[] = [
  { id: 'software-engineering', title: 'Software Engineering', icon: 'code' },
  { id: 'web-development', title: 'Web Development', icon: 'web' },
  { id: 'databases', title: 'Databases', icon: 'database' },
  { id: 'artificial-intelligence', title: 'Artificial Intelligence', icon: 'brain' },
  { id: 'project-management', title: 'Project Management', icon: 'project' },
  { id: 'human-computer-interaction', title: 'Human Computer Interaction', icon: 'interaction' },
]

export const sampleLearning = {
  course: sampleCourses[0],
  progressPercent: 68,
}

export const sampleAssignment = {
  title: 'Project Proposal',
  courseTitle: 'Software Engineering',
  dueDate: null,
}

export const sampleAnnouncements = [
  { id: 'guidelines', title: 'Project guidelines published', icon: 'book' as const },
  { id: 'tutor', title: 'AI Tutor is now available', icon: 'sparkle' as const },
  { id: 'midterm', title: 'Midterm exam schedule', icon: 'calendar' as const },
]
