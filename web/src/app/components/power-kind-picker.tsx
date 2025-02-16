import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const PowerKindPicker = () => {
  return (
    <Select onValueChange={(value) => console.log(value)}>
      <SelectTrigger>
        <SelectValue placeholder="Power" />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectItem value="0">Active Power</SelectItem>
        <SelectItem value="1">Reactive Power</SelectItem>
        <SelectItem value="2">Apparent Power</SelectItem>
      </SelectContent>
    </Select>
  );
};
