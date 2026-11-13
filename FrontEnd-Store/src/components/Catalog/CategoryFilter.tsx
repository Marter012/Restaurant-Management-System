import { CategoryButton, CategoryRail } from "./CategoryFilterStyles.ts";
interface Props { categories: string[]; selected: string; onSelect: (category: string) => void; }
export const CategoryFilter = ({ categories, selected, onSelect }: Props) => <CategoryRail aria-label="Categorías">{categories.map((item) => <CategoryButton key={item} type="button" $active={selected === item} onClick={() => onSelect(item)}>{item}</CategoryButton>)}</CategoryRail>;
