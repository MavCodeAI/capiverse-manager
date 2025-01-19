import { Card } from "@/components/ui/card";
import { Sidebar } from "@/components/Sidebar";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { BarChart, DollarSign, Package, ShoppingCart, TrendingDown, TrendingUp } from "lucide-react";

const Index = () => {
  const stats = [
    {
      title: "Total Sales",
      value: "PKR 125,000",
      icon: ShoppingCart,
      change: "+12.5%",
      trend: "up",
    },
    {
      title: "Inventory Items",
      value: "342",
      icon: Package,
      change: "-2.3%",
      trend: "down",
    },
    {
      title: "Monthly Revenue",
      value: "PKR 45,000",
      icon: DollarSign,
      change: "+8.1%",
      trend: "up",
    },
    {
      title: "Active Orders",
      value: "12",
      icon: BarChart,
      change: "+3.2%",
      trend: "up",
    },
  ];

  const recentOrders = [
    { id: "ORD001", customer: "احمد", product: "سفید ٹوپی", amount: "PKR 1,200", status: "Delivered" },
    { id: "ORD002", customer: "محمد", product: "سیاہ ٹوپی", amount: "PKR 900", status: "Processing" },
    { id: "ORD003", customer: "علی", product: "گولڈن ٹوپی", amount: "PKR 1,500", status: "Pending" },
  ];

  const lowStockItems = [
    { id: "PRD001", name: "سفید ٹوپی", stock: 5, reorderPoint: 10 },
    { id: "PRD002", name: "سیاہ ٹوپی", stock: 3, reorderPoint: 10 },
    { id: "PRD003", name: "گولڈن ٹوپی", stock: 8, reorderPoint: 15 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">ڈیش بورڈ</h1>
          <p className="text-gray-600">iCap Manager میں خوش آمدید</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="w-8 h-8 text-primary p-1.5 bg-primary/10 rounded-lg" />
                <span className={`text-sm font-medium flex items-center gap-1 ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {stat.change}
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-medium">حالیہ آرڈرز</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>آرڈر ID</TableHead>
                  <TableHead>کسٹمر</TableHead>
                  <TableHead>پروڈکٹ</TableHead>
                  <TableHead>رقم</TableHead>
                  <TableHead>سٹیٹس</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Processing"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {order.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
          
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-medium">کم اسٹاک آئٹمز</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>پروڈکٹ ID</TableHead>
                  <TableHead>نام</TableHead>
                  <TableHead>موجودہ اسٹاک</TableHead>
                  <TableHead>ری آرڈر پوائنٹ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStockItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <span className="text-red-600 font-medium">{item.stock}</span>
                    </TableCell>
                    <TableCell>{item.reorderPoint}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;