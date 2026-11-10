import { useState, useMemo } from 'react';
import { Question, SubjectFilter, QuestionType, DifficultyLevel } from '@/types';

/**
 * 題目與試卷搜尋、排序、篩選 Custom Hook
 */
export function useQuestionFilter(questions: Question[], subjectId: SubjectFilter = 'all') {
  const [activeTab, setActiveTab] = useState<QuestionType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | DifficultyLevel>('all');

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (subjectId !== 'all' && q.subjectId !== subjectId) return false;
      if (activeTab !== 'all' && q.type !== activeTab) return false;
      if (difficultyFilter !== 'all' && q.difficulty !== difficultyFilter) return false;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchId = q.id.toLowerCase().includes(query);
        const matchContent = q.content.toLowerCase().includes(query);
        const matchTags = q.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchId && !matchContent && !matchTags) return false;
      }
      return true;
    });
  }, [questions, subjectId, activeTab, difficultyFilter, searchQuery]);

  return {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    difficultyFilter,
    setDifficultyFilter,
    filteredQuestions,
  };
}

