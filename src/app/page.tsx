import { DataTable } from "./components/table";
import TableHeader from "./components/tableHeader";

export default function Home() {
  return (
    <div>
      <div className="container mx-auto">
        <p className="text-center font-medium text-xl mt-4">
          Projected Adult Population 2027
        </p>
      </div>
      <DataTable />
    </div>
  );
}
