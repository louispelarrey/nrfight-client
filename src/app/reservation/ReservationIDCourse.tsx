import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

interface ReservationIDCourseProps {
  courseInputs: ReactNode[];
  addCourseInput: () => void;
}

export default function ReservationIDCourse({ courseInputs, addCourseInput }: ReservationIDCourseProps) {
  return (
    <div className="flex flex-col gap-3">
      <h2>ID des cours à réserver</h2>
      <div className="flex flex-row gap-3 flex-wrap">
        {courseInputs}
        <Button variant="secondary" className="w-1/3" onClick={addCourseInput}>
          Ajouter des cours
        </Button>
      </div>
    </div>
  );
}
