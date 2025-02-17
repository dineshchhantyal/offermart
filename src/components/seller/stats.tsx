"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface SellerStatsProps {
  seller: {
    _count: {
      sales: number;
      sellerProducts: number;
      reviews: number;
    };
    // Add more statistics as needed
  };
}

export function SellerStats({ seller }: SellerStatsProps) {
  console.log(seller);
  // Sample data - replace with actual stats
  const data = [
    { name: "Jan", sales: 12 },
    { name: "Feb", sales: 18 },
    { name: "Mar", sales: 15 },
    // Add more months
  ];

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>Monthly sales performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar
                  dataKey="sales"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Add more stat cards as needed */}
    </div>
  );
}
