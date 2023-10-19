import { useState, ReactNode } from "react";
import { Input } from "@/components/ui/input";

export default function useCourseInputs() {
    const [courseInputs, setCourseInputs] = useState<ReactNode[]>([
        <Input placeholder="ID Cours" className="w-1/3" key={0} />,
      ]);
    
      const addCourseInput = () => {
        setCourseInputs([
          ...courseInputs,
          <Input
            placeholder="ID Cours"
            className="w-1/3"
            key={courseInputs.length}
          />,
        ]);
      };

      return { courseInputs, addCourseInput };
}