import {
  ShoppingBasket,
  Laptop,
  Shirt,
  Baby,
  Home,
  Gift,
  Book,
  Dumbbell,
  Pizza,
  Car,
  Heart,
  Package,
  LucideIcon,
} from "lucide-react";

interface CategoryDetail {
  icon: LucideIcon;
  color: string;
  background: string;
}

const categoryDetails: Record<string, CategoryDetail> = {
  Groceries: {
    icon: ShoppingBasket,
    color: "text-green-500",
    background: "bg-green-50",
  },
  Electronics: {
    icon: Laptop,
    color: "text-blue-500",
    background: "bg-blue-50",
  },
  Fashion: {
    icon: Shirt,
    color: "text-purple-500",
    background: "bg-purple-50",
  },
  "Baby & Kids": {
    icon: Baby,
    color: "text-pink-500",
    background: "bg-pink-50",
  },
  "Home & Living": {
    icon: Home,
    color: "text-amber-500",
    background: "bg-amber-50",
  },
  Gifts: {
    icon: Gift,
    color: "text-red-500",
    background: "bg-red-50",
  },
  Books: {
    icon: Book,
    color: "text-yellow-500",
    background: "bg-yellow-50",
  },
  Sports: {
    icon: Dumbbell,
    color: "text-indigo-500",
    background: "bg-indigo-50",
  },
  "Food & Beverages": {
    icon: Pizza,
    color: "text-orange-500",
    background: "bg-orange-50",
  },
  Automotive: {
    icon: Car,
    color: "text-slate-500",
    background: "bg-slate-50",
  },
  Health: {
    icon: Heart,
    color: "text-rose-500",
    background: "bg-rose-50",
  },
};

interface CategoryHeaderProps {
  title: string;
  productCount: number;
}

export function CategoryHeader({ title, productCount }: CategoryHeaderProps) {
  const details = categoryDetails[title] || {
    icon: Package,
    color: "text-gray-500",
    background: "bg-gray-50",
  };
  const Icon = details.icon;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg ${details.background}`}>
          <Icon className={`h-8 w-8 ${details.color}`} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground">
            {productCount} {productCount === 1 ? "product" : "products"}{" "}
            available
          </p>
        </div>
      </div>
    </div>
  );
}
