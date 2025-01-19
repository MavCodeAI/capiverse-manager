import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'ur';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Dashboard
    "dashboard": "Dashboard",
    "welcome": "Welcome to iCap Manager",
    "totalSales": "Total Sales",
    "inventoryItems": "Inventory Items",
    "monthlyRevenue": "Monthly Revenue",
    "activeOrders": "Active Orders",
    "recentOrders": "Recent Orders",
    "lowStockItems": "Low Stock Items",
    "orderID": "Order ID",
    "customer": "Customer",
    "product": "Product",
    "amount": "Amount",
    "status": "Status",
    "stock": "Stock",
    "reorderPoint": "Reorder Point",
    
    // Inventory
    "inventory": "Inventory",
    "addItem": "Add Item",
    "editItem": "Edit Item",
    "deleteItem": "Delete Item",
    "itemName": "Item Name",
    "quantity": "Quantity",
    "price": "Price",
    
    // Expenses
    "expenses": "Expenses",
    "addExpense": "Add Expense",
    "category": "Category",
    "date": "Date",
    "description": "Description",
    
    // Sales
    "sales": "Sales",
    "newSale": "New Sale",
    "saleDate": "Sale Date",
    "total": "Total",
    
    // Packaging
    "packaging": "Packaging",
    "packagingType": "Packaging Type",
    "materials": "Materials",
    
    // Delivery
    "delivery": "Delivery",
    "deliveryStatus": "Delivery Status",
    "address": "Address",
    "trackingNumber": "Tracking Number",
    
    // Resellers
    "resellers": "Resellers",
    "resellerName": "Reseller Name",
    "contact": "Contact",
    "commission": "Commission",
  },
  ur: {
    // Dashboard
    "dashboard": "ڈیش بورڈ",
    "welcome": "iCap Manager میں خوش آمدید",
    "totalSales": "کل فروخت",
    "inventoryItems": "انوینٹری آئٹمز",
    "monthlyRevenue": "ماہانہ آمدنی",
    "activeOrders": "فعال آرڈرز",
    "recentOrders": "حالیہ آرڈرز",
    "lowStockItems": "کم اسٹاک آئٹمز",
    "orderID": "آرڈر ID",
    "customer": "کسٹمر",
    "product": "پروڈکٹ",
    "amount": "رقم",
    "status": "سٹیٹس",
    "stock": "اسٹاک",
    "reorderPoint": "ری آرڈر پوائنٹ",
    
    // Inventory
    "inventory": "انوینٹری",
    "addItem": "آئٹم شامل کریں",
    "editItem": "آئٹم میں ترمیم کریں",
    "deleteItem": "آئٹم حذف کریں",
    "itemName": "آئٹم کا نام",
    "quantity": "مقدار",
    "price": "قیمت",
    
    // Expenses
    "expenses": "اخراجات",
    "addExpense": "خرچہ شامل کریں",
    "category": "زمرہ",
    "date": "تاریخ",
    "description": "تفصیل",
    
    // Sales
    "sales": "سیلز",
    "newSale": "نئی سیل",
    "saleDate": "سیل کی تاریخ",
    "total": "کل",
    
    // Packaging
    "packaging": "پیکیجنگ",
    "packagingType": "پیکیجنگ کی قسم",
    "materials": "مواد",
    
    // Delivery
    "delivery": "ڈلیوری",
    "deliveryStatus": "ڈلیوری کی حیثیت",
    "address": "پتہ",
    "trackingNumber": "ٹریکنگ نمبر",
    
    // Resellers
    "resellers": "ری سیلرز",
    "resellerName": "ری سیلر کا نام",
    "contact": "رابطہ",
    "commission": "کمیشن",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('ur');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};