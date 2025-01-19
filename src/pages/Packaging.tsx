import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Sidebar } from "@/components/Sidebar";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle, Edit2, Trash2 } from "lucide-react";

interface PackagingItem {
  id: number;
  type: string;
  materials: string;
  quantity: number;
  cost: number;
}

const Packaging = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [items, setItems] = useState<PackagingItem[]>([
    {
      id: 1,
      type: "Standard Box",
      materials: "Cardboard",
      quantity: 1000,
      cost: 20,
    },
    {
      id: 2,
      type: "Premium Box",
      materials: "Rigid Box",
      quantity: 500,
      cost: 50,
    },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({
    type: "",
    materials: "",
    quantity: "",
    cost: "",
  });

  const handleAddItem = () => {
    if (!newItem.type || !newItem.materials || !newItem.quantity || !newItem.cost) {
      toast({
        title: t("error"),
        description: t("fillAllFields"),
        variant: "destructive",
      });
      return;
    }

    const itemToAdd: PackagingItem = {
      id: items.length + 1,
      type: newItem.type,
      materials: newItem.materials,
      quantity: Number(newItem.quantity),
      cost: Number(newItem.cost),
    };

    setItems([...items, itemToAdd]);
    setNewItem({ type: "", materials: "", quantity: "", cost: "" });
    setIsAdding(false);
    toast({
      title: t("success"),
      description: t("packagingAdded"),
    });
  };

  const handleDeleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
    toast({
      title: t("success"),
      description: t("packagingDeleted"),
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{t("packaging")}</h1>
          <p className="text-gray-600">{t("managementSystem")}</p>
        </div>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">{t("packaging")}</h2>
            <Button onClick={() => setIsAdding(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              {t("addPackaging")}
            </Button>
          </div>

          {isAdding && (
            <div className="mb-6 p-4 border rounded-lg">
              <h3 className="text-lg font-medium mb-4">{t("addPackaging")}</h3>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="type">{t("packagingType")}</Label>
                  <Input
                    id="type"
                    value={newItem.type}
                    onChange={(e) =>
                      setNewItem({ ...newItem, type: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="materials">{t("materials")}</Label>
                  <Input
                    id="materials"
                    value={newItem.materials}
                    onChange={(e) =>
                      setNewItem({ ...newItem, materials: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="quantity">{t("quantity")}</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newItem.quantity}
                    onChange={(e) =>
                      setNewItem({ ...newItem, quantity: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="cost">{t("price")}</Label>
                  <Input
                    id="cost"
                    type="number"
                    value={newItem.cost}
                    onChange={(e) =>
                      setNewItem({ ...newItem, cost: e.target.value })
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddItem}>{t("add")}</Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsAdding(false)}
                  >
                    {t("cancel")}
                  </Button>
                </div>
              </div>
            </div>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("packagingType")}</TableHead>
                <TableHead>{t("materials")}</TableHead>
                <TableHead>{t("quantity")}</TableHead>
                <TableHead>{t("price")}</TableHead>
                <TableHead>{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.materials}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>Rs. {item.cost}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>
  );
};

export default Packaging;