import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";

interface DynamicIconProps extends LucideProps {
  name: string;
}

export default function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const Icon = (LucideIcons as any)[name];

  if (!Icon) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return <LucideIcons.HelpCircle {...props} />;
  }

  return <Icon {...props} />;
}
