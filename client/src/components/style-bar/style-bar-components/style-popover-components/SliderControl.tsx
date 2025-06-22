import { Slider } from "@/components/ui/slider";

interface SliderControlProps {
  value: number;
  title: string;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
}

export default function SliderControl({
  value,
  title,
  onChange,
  min,
  max,
  step,
  unit = "",
}: SliderControlProps) {
  return (
    <>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(values) => onChange(values[0])}
        className="m-0"
      />

      <div className="mt-1 flex flex-row items-center justify-between text-xs font-light">
        <p>{title}</p>
        <p>
          {value}
          {unit}
        </p>
      </div>
    </>
  );
}
