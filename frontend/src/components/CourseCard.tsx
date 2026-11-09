import type { Course } from '../types/dashboard'
import Button from './Button'
import Icon from './Icon'

type CourseCardProps = {
  course: Course
  onOpen: (courseId: string) => void
}

function CourseCard({ course, onOpen }: CourseCardProps) {
  return (
    <article className="course-card">
      <div className={`course-card__icon course-card__icon--${course.icon}`}>
        <Icon name={course.icon} size={22} />
      </div>
      <div className="course-card__body">
        <span className="sample-label">Sample course</span>
        <h3>{course.title}</h3>
      </div>
      <Button
        className="course-card__action"
        variant="quiet"
        type="button"
        onClick={() => onOpen(course.id)}
        aria-label={`Open ${course.title} course preview`}
      >
        Open course <Icon name="arrow" size={16} />
      </Button>
    </article>
  )
}

export default CourseCard
