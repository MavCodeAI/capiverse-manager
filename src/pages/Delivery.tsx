import { Card } from "@/components/ui/card";
import { Sidebar } from "@/components/Sidebar";
import { useLanguage } from "@/contexts/LanguageContext";

const Delivery = () => {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{t("delivery")}</h1>
          <p className="text-gray-600">{t("welcome")}</p>
        </div>
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">{t("delivery")}</h2>
          {/* Add delivery content here */}
        </Card>
      </main>
    </div>
  );
};

export default Delivery;