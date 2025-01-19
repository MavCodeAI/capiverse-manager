import { Card } from "@/components/ui/card";
import { Sidebar } from "@/components/Sidebar";
import { BarChart, DollarSign, Package, ShoppingCart } from "lucide-react";

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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to iCap Manager</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="w-8 h-8 text-primary p-1.5 bg-primary/10 rounded-lg" />
                <span className={`text-sm font-medium ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
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
            <h3 className="mb-4 text-lg font-medium">Recent Orders</h3>
            <div className="space-y-4">
              <p className="text-gray-600">Coming soon...</p>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-medium">Inventory Status</h3>
            <div className="space-y-4">
              <p className="text-gray-600">Coming soon...</p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;