import { Trash2Icon } from "lucide-react";
import { Button } from "./button";

export default function DeleteButton({
  removeFunction,
}: {
  removeFunction: () => void;
}) {
  return (
    <Button
      variant="destructive"
      onClick={removeFunction}
      className="h-full"
    >
      <Trash2Icon className="w-4" />
    </Button>
  );
}
