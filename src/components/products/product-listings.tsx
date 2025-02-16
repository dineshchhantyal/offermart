"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/ui/data-table";
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { ProductWithDetails } from "@/types/product";

interface ProductListingsProps {
  userId: string;
}

export function ProductListings({ userId }: ProductListingsProps) {
  console.log("ProductListingsProps", userId);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<ProductWithDetails[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/products/listings");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      console.log("data", data);
      setProducts(data.data);
    } catch (error) {
      setError("Failed to load products");
      toast.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      accessorKey: "title",
      header: "Product",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex items-center gap-3">
            <Image
              src={product.images[0]?.url}
              alt={product.title}
              className="h-10 w-10 rounded-md object-cover"
              width={40}
              height={40}
            />
            <div>
              <p className="font-medium">{product.title}</p>
              <p className="text-sm text-muted-foreground">
                {product.category.name}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"));
        return <div className="font-medium">${price.toFixed(2)}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <div className={`capitalize ${getStatusColor(status)}`}>{status}</div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const product = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleView(product.id)}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEdit(product.id)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(product.id)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleView = (id: string) => {
    router.push(`/products/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/sell/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      setIsLoading(true);
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      toast.success("Product deleted successfully");
      // Refresh the products list
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product", error);
      toast.error("Failed to delete product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 justify-center">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>My Listings</CardTitle>
            <CardDescription>
              Manage your product listings and track their status
            </CardDescription>
          </div>
          <Button onClick={() => router.push("/sell")}>Add New Product</Button>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="flex h-[400px] items-center justify-center text-destructive">
              {error}
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={products}
              loading={isLoading}
              emptyStateMessage="No products listed yet"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "pending":
      return "text-yellow-600";
    case "approved":
      return "text-green-600";
    case "rejected":
      return "text-red-600";
    case "draft":
      return "text-gray-600";
    default:
      return "text-gray-600";
  }
}
