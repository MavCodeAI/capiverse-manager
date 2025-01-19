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

interface Delivery {
  id: number;
  trackingNumber: string;
  customer: string;
  address: string;
  status: string;
  date: string;
}

const Delivery = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    {
      id: 1,
      trackingNumber: "TRK001",
      customer: "Ahmed Trading",
      address: "123 Main St, Karachi",
      status: "In Transit",
      date: "2024-03-15",
    },
    {
      id: 2,
      trackingNumber: "TRK002",
      customer: "Malik Enterprises",
      address: "456 Market Rd, Lahore",
      status: "Delivered",
      date: "2024-03-14",
    },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newDelivery, setNewDelivery] = useState({
    trackingNumber: "",
    customer: "",
    address: "",
    status: "",
    date: "",
  });

  const handleAddDelivery = () => {
    if (!newDelivery.trackingNumber || !newDelivery.customer || !newDelivery.address || !newDelivery.status || !newDelivery.date) {
      toast({
        title: t("error"),
        description: t("fillAllFields"),
        variant: "destructive",
      });
      return;
    }

    const deliveryToAdd: Delivery = {
      id: deliveries.length + 1,
      trackingNumber: newDelivery.trackingNumber,
      customer: newDelivery.customer,
      address: newDelivery.address,
      status: newDelivery.status,
      date: newDelivery.date,
    };

    setDeliveries([...deliveries, deliveryToAdd]);
    setNewDelivery({
      trackingNumber: "",
      customer: "",
      address: "",
      status: "",
      date: "",
    });
    setIsAdding(false);
    toast({
      title: t("success"),
      description: t("deliveryAdded"),
    });
  };

  const handleDeleteDelivery = (id: number) => {
    setDeliveries(deliveries.filter((delivery) => delivery.id !== id));
    toast({
      title: t("success"),
      description: t("deliveryDeleted"),
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{t("delivery")}</h1>
          <p className="text-gray-600">{t("managementSystem")}</p>
        </div>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">{t("delivery")}</h2>
            <Button onClick={() => setIsAdding(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              {t("addDelivery")}
            </Button>
          </div>

          {isAdding && (
            <div className="mb-6 p-4 border rounded-lg">
              <h3 className="text-lg font-medium mb-4">{t("addDelivery")}</h3>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="trackingNumber">{t("trackingNumber")}</Label>
                  <Input
                    id="trackingNumber"
                    value={newDelivery.trackingNumber}
                    onChange={(e) =>
                      setNewDelivery({ ...newDelivery, trackingNumber: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="customer">{t("customer")}</Label>
                  <Input
                    id="customer"
                    value={newDelivery.customer}
                    onChange={(e) =>
                      setNewDelivery({ ...newDelivery, customer: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="address">{t("address")}</Label>
                  <Input
                    id="address"
                    value={newDelivery.address}
                    onChange={(e) =>
                      setNewDelivery({ ...newDelivery, address: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="status">{t("status")}</Label>
                  <Input
                    id="status"
                    value={newDelivery.status}
                    onChange={(e) =>
                      setNewDelivery({ ...newDelivery, status: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="date">{t("date")}</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newDelivery.date}
                    onChange={(e) =>
                      setNewDelivery({ ...newDelivery, date: e.target.value })
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddDelivery}>{t("add")}</Button>
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
                <TableHead>{t("trackingNumber")}</TableHead>
                <TableHead>{t("customer")}</TableHead>
                <TableHead>{t("address")}</TableHead>
                <TableHead>{t("status")}</TableHead>
                <TableHead>{t("date")}</TableHead>
                <TableHead>{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliveries.map((delivery) => (
                <TableRow key={delivery.id}>
                  <TableCell>{delivery.trackingNumber}</TableCell>
                  <TableCell>{delivery.customer}</TableCell>
                  <TableCell>{delivery.address}</TableCell>
                  <TableCell>{delivery.status}</TableCell>
                  <TableCell>{delivery.date}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteDelivery(delivery.id)}
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

export default Delivery;