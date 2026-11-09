import { sampleAssignment, sampleLearning } from '../data/dashboardDemo'
import Button from './Button'
import Icon from './Icon'
import ProgressBar from './ProgressBar'

type StudyPlannerPanelProps = {
  onViewAssignments: () => void
}

function StudyPlannerPanel({ onViewAssignments }: StudyPlannerPanelProps) {
  return (
    <section className="dashboard-section study-planner-panel" aria-labelledby="study-planner-title">
      <div className="section-title-row section-title-row--compact">
        <div><span className="eyebrow">Study planning</span><h2 id="study-planner-title">Upcoming deadlines</h2></div>
        <span className="planner-icon"><Icon name="calendar" size={17} /></span>
      </div>
      <p className="planner-empty"><strong>No due dates provided</strong><span>There are no confirmed upcoming deadlines in the sample assignment data.</span></p>
      <div className="planner-assignment">
        <span className="planner-assignment__icon"><Icon name="assignment" size={16} /></span>
        <div><strong>{sampleAssignment.title}</strong><span>{sampleAssignment.courseTitle}</span></div>
        <span className="planner-assignment__status">Date unavailable</span>
      </div>
      <div className="planner-progress">
        <div><span>Learning progress · example</span><strong>{sampleLearning.progressPercent}%</strong></div>
        <ProgressBar value={sampleLearning.progressPercent} label={`${sampleLearning.course.title} illustrative progress: ${sampleLearning.progressPercent}%`} />
      </div>
      <Button variant="quiet" className="planner-action" type="button" onClick={onViewAssignments}>View assignments <Icon name="arrow" size={15} /></Button>
    </section>
  )
}

export default StudyPlannerPanel
