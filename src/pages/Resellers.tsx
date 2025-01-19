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

interface Reseller {
  id: number;
  name: string;
  contact: string;
  commission: number;
  totalSales: number;
}

const Resellers = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [resellers, setResellers] = useState<Reseller[]>([
    {
      id: 1,
      name: "Ahmed Trading",
      contact: "+92 300 1234567",
      commission: 15,
      totalSales: 150000,
    },
    {
      id: 2,
      name: "Malik Enterprises",
      contact: "+92 321 9876543",
      commission: 12,
      totalSales: 230000,
    },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newReseller, setNewReseller] = useState({
    name: "",
    contact: "",
    commission: "",
  });

  const handleAddReseller = () => {
    if (!newReseller.name || !newReseller.contact || !newReseller.commission) {
      toast({
        title: t("error"),
        description: t("fillAllFields"),
        variant: "destructive",
      });
      return;
    }

    const resellerToAdd: Reseller = {
      id: resellers.length + 1,
      name: newReseller.name,
      contact: newReseller.contact,
      commission: Number(newReseller.commission),
      totalSales: 0,
    };

    setResellers([...resellers, resellerToAdd]);
    setNewReseller({ name: "", contact: "", commission: "" });
    setIsAdding(false);
    toast({
      title: t("success"),
      description: t("resellerAdded"),
    });
  };

  const handleDeleteReseller = (id: number) => {
    setResellers(resellers.filter((reseller) => reseller.id !== id));
    toast({
      title: t("success"),
      description: t("resellerDeleted"),
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{t("resellers")}</h1>
          <p className="text-gray-600">{t("managementSystem")}</p>
        </div>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">{t("resellersList")}</h2>
            <Button onClick={() => setIsAdding(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              {t("addReseller")}
            </Button>
          </div>

          {isAdding && (
            <div className="mb-6 p-4 border rounded-lg">
              <h3 className="text-lg font-medium mb-4">{t("addNewReseller")}</h3>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="name">{t("resellerName")}</Label>
                  <Input
                    id="name"
                    value={newReseller.name}
                    onChange={(e) =>
                      setNewReseller({ ...newReseller, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="contact">{t("contact")}</Label>
                  <Input
                    id="contact"
                    value={newReseller.contact}
                    onChange={(e) =>
                      setNewReseller({ ...newReseller, contact: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="commission">{t("commission")} (%)</Label>
                  <Input
                    id="commission"
                    type="number"
                    value={newReseller.commission}
                    onChange={(e) =>
                      setNewReseller({ ...newReseller, commission: e.target.value })
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddReseller}>{t("add")}</Button>
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
                <TableHead>{t("resellerName")}</TableHead>
                <TableHead>{t("contact")}</TableHead>
                <TableHead>{t("commission")}</TableHead>
                <TableHead>{t("totalSales")}</TableHead>
                <TableHead>{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resellers.map((reseller) => (
                <TableRow key={reseller.id}>
                  <TableCell>{reseller.name}</TableCell>
                  <TableCell>{reseller.contact}</TableCell>
                  <TableCell>{reseller.commission}%</TableCell>
                  <TableCell>Rs. {reseller.totalSales.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteReseller(reseller.id)}
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

export default Resellers;