"use client";

import { useState } from "react";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { Search, Filter } from "lucide-react";
import { Slider } from "../ui/slider";

export function SearchFilters() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showDeliveryOnly, setShowDeliveryOnly] = useState(false);

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 rounded-md border"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Price Range</label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              min={0}
              max={1000}
              step={10}
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="delivery"
              checked={showDeliveryOnly}
              onCheckedChange={setShowDeliveryOnly}
            />
            <label htmlFor="delivery" className="text-sm font-medium">
              Show items with delivery only
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
