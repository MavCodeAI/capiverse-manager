import { Home, Package, DollarSign, ShoppingCart, Menu, Box, TruckIcon, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: Home, label: "ڈیش بورڈ", path: "/" },
    { icon: Package, label: "انوینٹری", path: "/inventory" },
    { icon: DollarSign, label: "اخراجات", path: "/expenses" },
    { icon: ShoppingCart, label: "سیلز", path: "/sales" },
    { icon: Box, label: "پیکیجنگ", path: "/packaging" },
    { icon: TruckIcon, label: "ڈلیوری", path: "/delivery" },
    { icon: Users, label: "ری سیلرز", path: "/resellers" },
  ];

  return (
    <div className={`bg-white border-r border-gray-200 h-screen transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && <h1 className="text-xl font-bold text-primary">iCap Manager</h1>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      <nav className="p-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center gap-4 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <item.icon className="w-5 h-5" />
            {!isCollapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};