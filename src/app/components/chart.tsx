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
  { county: "GARISSA", percentageGap: 175, fill: "var(--color-mandera)" },
  { county: "TURKANA", percentageGap: 155, fill: "var(--color-wajir)" },
  { county: "WAJIR", percentageGap: 131, fill: "var(--color-garissa)" },
  { county: "MANDERA", percentageGap: 128, fill: "var(--color-turkana)" },
  {
    county: "ISIOLO",
    percentageGap: 96,
    fill: "var(--color-westpokot)",
  },
  { county: "SAMBURU", percentageGap: 92, fill: "var(--color-marsabit)" },
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

export function ChartSample() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.percentageGap, 0);
  }, []);

  return (
    <Card className="flex flex-col w-[450px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Percentage Difference</CardTitle>
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          53.77%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Difference
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
          Highest voter registration potential
        </div>
        <div className="leading-none text-muted-foreground">
          Expected to have a sizable increase in voter registration
        </div>
      </CardFooter>
    </Card>
  );
}
