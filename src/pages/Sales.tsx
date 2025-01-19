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

interface Sale {
  id: number;
  customer: string;
  product: string;
  quantity: number;
  amount: number;
  date: string;
}

const Sales = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [sales, setSales] = useState<Sale[]>([
    {
      id: 1,
      customer: "Ahmed Trading",
      product: "Standard Cap",
      quantity: 50,
      amount: 25000,
      date: "2024-03-15",
    },
    {
      id: 2,
      customer: "Malik Enterprises",
      product: "Premium Cap",
      quantity: 30,
      amount: 24000,
      date: "2024-03-14",
    },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newSale, setNewSale] = useState({
    customer: "",
    product: "",
    quantity: "",
    amount: "",
    date: "",
  });

  const handleAddSale = () => {
    if (!newSale.customer || !newSale.product || !newSale.quantity || !newSale.amount || !newSale.date) {
      toast({
        title: t("error"),
        description: t("fillAllFields"),
        variant: "destructive",
      });
      return;
    }

    const saleToAdd: Sale = {
      id: sales.length + 1,
      customer: newSale.customer,
      product: newSale.product,
      quantity: Number(newSale.quantity),
      amount: Number(newSale.amount),
      date: newSale.date,
    };

    setSales([...sales, saleToAdd]);
    setNewSale({ customer: "", product: "", quantity: "", amount: "", date: "" });
    setIsAdding(false);
    toast({
      title: t("success"),
      description: t("saleAdded"),
    });
  };

  const handleDeleteSale = (id: number) => {
    setSales(sales.filter((sale) => sale.id !== id));
    toast({
      title: t("success"),
      description: t("saleDeleted"),
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{t("sales")}</h1>
          <p className="text-gray-600">{t("managementSystem")}</p>
        </div>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">{t("sales")}</h2>
            <Button onClick={() => setIsAdding(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              {t("newSale")}
            </Button>
          </div>

          {isAdding && (
            <div className="mb-6 p-4 border rounded-lg">
              <h3 className="text-lg font-medium mb-4">{t("newSale")}</h3>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="customer">{t("customer")}</Label>
                  <Input
                    id="customer"
                    value={newSale.customer}
                    onChange={(e) =>
                      setNewSale({ ...newSale, customer: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="product">{t("product")}</Label>
                  <Input
                    id="product"
                    value={newSale.product}
                    onChange={(e) =>
                      setNewSale({ ...newSale, product: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="quantity">{t("quantity")}</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newSale.quantity}
                    onChange={(e) =>
                      setNewSale({ ...newSale, quantity: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="amount">{t("amount")}</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newSale.amount}
                    onChange={(e) =>
                      setNewSale({ ...newSale, amount: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="date">{t("date")}</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newSale.date}
                    onChange={(e) =>
                      setNewSale({ ...newSale, date: e.target.value })
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddSale}>{t("add")}</Button>
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
                <TableHead>{t("customer")}</TableHead>
                <TableHead>{t("product")}</TableHead>
                <TableHead>{t("quantity")}</TableHead>
                <TableHead>{t("amount")}</TableHead>
                <TableHead>{t("date")}</TableHead>
                <TableHead>{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{sale.customer}</TableCell>
                  <TableCell>{sale.product}</TableCell>
                  <TableCell>{sale.quantity}</TableCell>
                  <TableCell>Rs. {sale.amount.toLocaleString()}</TableCell>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteSale(sale.id)}
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

export default Sales;