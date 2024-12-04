import { DataTable } from "./components/table";
import TableHeader from "./components/tableHeader";

export default function Home() {
  return (
    <div>
      <div className="container mx-auto">
        <p className="text-center text-lg mt-4">
          Projected Adult Population 2027 Based on 2019 Census
        </p>
      </div>
      <DataTable />
    </div>
  );
}
