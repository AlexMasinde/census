"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  {
    county: "NAIROBI CITY",
    percentageGap: 941993,
    fill: "var(--color-mandera)",
  },
  { county: "KIAMBU", percentageGap: 575148, fill: "var(--color-wajir)" },
  { county: "NAKURU", percentageGap: 510422, fill: "var(--color-garissa)" },
  { county: "BUNGOMA", percentageGap: 497398, fill: "var(--color-turkana)" },
  {
    county: "KAKAMEGA",
    percentageGap: 469141,
    fill: "var(--color-westpokot)",
  },
  { county: "KILIFI", percentageGap: 415394, fill: "var(--color-marsabit)" },
];

const chartConfig = {
  percentageGap: {
    label: "Percentage Gap",
  },
  garissa: {
    label: "Garissa",
    color: "hsl(var(--chart-1))",
  },
  turkana: {
    label: "turkana",
    color: "hsl(var(--chart-2))",
  },
  wajir: {
    label: "Wajir",
    color: "hsl(var(--chart-3))",
  },
  mandera: {
    label: "Mandera",
    color: "hsl(var(--chart-4))",
  },
  isiolo: {
    label: "Isiolo",
    color: "hsl(var(--chart-5))",
  },
  samburu: {
    label: "Samburu",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function ChartDiff() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.percentageGap, 0);
  }, []);

  return (
    <Card className="flex flex-col w-[450px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Unregistered Voters</CardTitle>
        <CardDescription>Top 6 Counties</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="percentageGap"
              nameKey="county"
              innerRadius={70}
              strokeWidth={10}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          11,884,731
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Unregistered Adults
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Counties with highest number of unregistered voters
        </div>
        <div className="leading-none text-muted-foreground">
          Deducted 2022 registered voters from projected population
        </div>
      </CardFooter>
    </Card>
  );
}
