'use client';

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ProductFiltersProps {
  filters: {
    category: string;
  };
  onFilterChange: (filters: { category: string }) => void;
}

const categories = ["All", "Apparel", "Accessories", "Art"];

export const ProductFilters = ({ filters, onFilterChange }: ProductFiltersProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold">Category</h3>
      <RadioGroup
        value={filters.category}
        onValueChange={(value) => onFilterChange({ ...filters, category: value })}
        className="mt-4 space-y-2"
      >
        {categories.map(category => (
          <div key={category} className="flex items-center space-x-2">
            <RadioGroupItem value={category.toLowerCase()} id={category.toLowerCase()} />
            <Label htmlFor={category.toLowerCase()}>{category}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
