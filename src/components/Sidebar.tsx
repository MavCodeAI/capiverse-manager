import { Home, Package, DollarSign, ShoppingCart, Menu, Box, TruckIcon, Users } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: t("dashboard"), path: "/" },
    { icon: Package, label: t("inventory"), path: "/inventory" },
    { icon: DollarSign, label: t("expenses"), path: "/expenses" },
    { icon: ShoppingCart, label: t("sales"), path: "/sales" },
    { icon: Box, label: t("packaging"), path: "/packaging" },
    { icon: TruckIcon, label: t("delivery"), path: "/delivery" },
    { icon: Users, label: t("resellers"), path: "/resellers" },
  ];

  return (
    <div className={`bg-white border-r border-gray-200 h-screen transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center justify-between w-full">
            <h1 className="text-xl font-bold text-primary">iCap Manager</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className="ml-2"
            >
              {language === 'en' ? 'اردو' : 'EN'}
            </Button>
          </div>
        )}
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
            className={`flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors ${
              location.pathname === item.path ? "bg-gray-100" : ""
            }`}
          >
            <item.icon className="w-5 h-5" />
            {!isCollapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};