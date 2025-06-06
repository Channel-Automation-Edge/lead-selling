import React from "react";
import iconMapping from "@/lib/iconMapping"; // Adjust path

interface IconComponentProps {
  name: string;
  className?: string;
}

const IconComponent: React.FC<IconComponentProps> = ({ name, className }) => {
  const Icon = iconMapping[name]; // Retrieve the component

  return Icon ? <Icon className={className} /> : null; // Render the component
};

export default IconComponent;