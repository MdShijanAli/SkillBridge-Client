import { apiRoutes } from "@/api/apiRoutes";
import { BaseTableList } from "@/components/ui/BaseTableList";
import { Category } from "@/lib/types";

export default function Categories() {
  const categoryColumns = [
    { key: "name", title: "Name" },
    { key: "description", title: "Description" },
    {
      key: "isActive",
      title: "Active",
      // render: (v: boolean) => (v ? "Yes" : "No"),
    },
    {
      key: "createdAt",
      title: "Created At",
      // render: (v: string) => new Date(v).toLocaleString(),
    },
  ];
  return (
    <BaseTableList<Category>
      tableName="Categories"
      description="Manage all categories in the system."
      searchPlaceholder="Search categories by name..."
      addNewButton={true}
      endpoint={apiRoutes.categories.getAll}
      columns={categoryColumns}
    />
  );
}
