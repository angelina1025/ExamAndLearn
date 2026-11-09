import { QuestionSelection } from '@/app/(dashboard)/questions/select/_components/QuestionSelection';
import { INITIAL_QUESTIONS } from '@/data/initialData';

export default function QuestionSelectionPage() {
  return <QuestionSelection questions={INITIAL_QUESTIONS} />;
}
