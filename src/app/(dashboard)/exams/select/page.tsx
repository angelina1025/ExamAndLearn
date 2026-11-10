import { ExamPaperSelection } from '@/app/(dashboard)/exams/select/_components/ExamPaperSelection';
import { INITIAL_EXAM_PAPERS } from '@/data/initialData';

export default function ExamPaperSelectionPage() {
  const publishedPapers = INITIAL_EXAM_PAPERS.filter((paper) => paper.status === 'published');
  return <ExamPaperSelection papers={publishedPapers} />;
}
