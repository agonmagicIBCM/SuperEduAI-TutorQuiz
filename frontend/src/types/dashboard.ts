export type AppSection =
  | 'Dashboard'
  | 'My Courses'
  | 'AI Tutor'
  | 'Assignments'
  | 'Grades'
  | 'Timetable'
  | 'Quizzes & Exams'
  | 'Resources'
  | 'Messages'
  | 'Profile'
  | 'Help'

export type IconName =
  | 'dashboard'
  | 'courses'
  | 'tutor'
  | 'assignment'
  | 'quiz'
  | 'resources'
  | 'messages'
  | 'profile'
  | 'help'
  | 'search'
  | 'bell'
  | 'chevron'
  | 'arrow'
  | 'menu'
  | 'close'
  | 'code'
  | 'web'
  | 'database'
  | 'brain'
  | 'project'
  | 'interaction'
  | 'send'
  | 'sparkle'
  | 'book'
  | 'calendar'
  | 'play'
  | 'check'
  | 'more'

export type Course = {
  id: string
  title: string
  icon: IconName
}

export type TutorMessage = {
  id: string
  role: 'student' | 'tutor'
  text: string
}

export type QuizChoice = 'A' | 'B' | 'C' | 'D'
