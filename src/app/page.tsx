import { Card } from "@/components/ui/card";
import { ChartSample } from "./components/chart";
import { ChartDiff } from "./components/chartDiff";
import { ChartVoters } from "./components/chartVoters";
import { DataTable } from "./components/table";
import TableHeader from "./components/tableHeader";

export default function Home() {
  return (
    <div>
      <div className="container mx-auto">
        <p className="text-xl font-bold mt-12">
          Projected Adult Population 2027 Based on 2019 Census
        </p>
      </div>
      <div className="flex  container mx-auto justify-between py-12">
        <ChartVoters />
        <ChartDiff />
        <ChartSample />
      </div>
      <Card className="container mx-auto mt-8 px-4 py-12">
        <DataTable />
      </Card>
    </div>
  );
}
