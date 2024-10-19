import React, { useState, useMemo } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Maximize2, CirclePlus } from "lucide-react";
import Tabs from "./Tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Constants
const TAB_LIST = [
  { label: "Summary" },
  { label: "Chart" },
  { label: "Statistics" },
  { label: "Analysis" },
  { label: "Settings" },
];

const TIME_RANGES = ["1d", "3d", "1w", "1m", "6m", "1y", "max"];

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

// Mock data for the chart
const CHART_DATA = [
  { date: 'Jan 31', price: 53321.24 },
  { date: 'Jan 06', price: 60255.62 },
  { date: 'Jan 07', price: 53479.09 },
  { date: 'Jan 22', price: 58866.79 },
  { date: 'Jan 27', price: 61719.03 },
  { date: 'Jan 23', price: 64517.15 },
  { date: 'Feb 27', price: 52359.03 },
  { date: 'Feb 13', price: 68259.17 },
  { date: 'Feb 03', price: 64233.04 },
  { date: 'Feb 02', price: 68103.21 },
  { date: 'Mar 27', price: 60594.44 },
  { date: 'Mar 08', price: 57334.22 },
  { date: 'Mar 19', price: 62738.7 },
  { date: 'Mar 01', price: 58795.52 },
  { date: 'Mar 02', price: 69603.77 },
  { date: 'Mar 13', price: 50630.6 },
  { date: 'Mar 25', price: 59595.45 },
  { date: 'Apr 04', price: 60514.12 },
  { date: 'Apr 05', price: 61046.02 },
  { date: 'Apr 02', price: 68006.1 },
  { date: 'Apr 19', price: 59755.73 },
  { date: 'Apr 07', price: 63436.1 },
  { date: 'May 12', price: 67444.97 },
  { date: 'May 04', price: 62396.25 },
  { date: 'May 18', price: 56424.8 },
  { date: 'May 13', price: 54816.3 },
  { date: 'Jun 20', price: 67717.76 },
  { date: 'Jun 22', price: 50180.94 },
  { date: 'Jun 23', price: 69049.52 },
  { date: 'Jun 04', price: 54463.15 },
  { date: 'Jun 18', price: 59222.18 },
  { date: 'Jun 25', price: 55473.09 },
  { date: 'Jul 03', price: 69072.43 },
  { date: 'Jul 01', price: 68578.95 },
  { date: 'Jul 19', price: 53844.77 },
  { date: 'Jul 12', price: 53879.04 },
  { date: 'Jul 17', price: 55358.36 },
  { date: 'Aug 08', price: 67485.6 },
  { date: 'Aug 01', price: 68864.01 },
  { date: 'Aug 19', price: 58039.33 },
  { date: 'Aug 17', price: 55101.39 },
  { date: 'Aug 02', price: 69812.82 },
  { date: 'Aug 16', price: 61972.08 },
  { date: 'Sep 23', price: 55592.87 },
  { date: 'Sep 15', price: 62339.54 },
  { date: 'Sep 12', price: 50778.01 },
  { date: 'Sep 21', price: 67944.49 },
  { date: 'Sep 02', price: 69316.26 },
  { date: 'Oct 30', price: 62706.63 },
  { date: 'Oct 12', price: 69271.75 },
  { date: 'Oct 10', price: 65421.43 },
  { date: 'Oct 02', price: 59771.17 },
  { date: 'Oct 21', price: 66335.28 },
  { date: 'Oct 19', price: 51905.03 },
  { date: 'Nov 24', price: 55546.98 },
  { date: 'Nov 21', price: 57091.8 },
  { date: 'Nov 10', price: 65895.26 },
  { date: 'Nov 04', price: 50967.96 },
  { date: 'Nov 18', price: 53479.27 },
  { date: 'Nov 11', price: 54636.05 },
  { date: 'Nov 29', price: 65901.91 },
  { date: 'Dec 10', price: 57643.8 },
  { date: 'Dec 23', price: 65638.05 },
  { date: 'Dec 25', price: 56922.25 },
  { date: 'Dec 28', price: 65144.93 },
  { date: 'Dec 29', price: 62714.93 },
  { date: 'Dec 31', price: 58744.93 },
  { date: 'Dec 31', price: 68744.93 }
]
const PriceChart = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("1w");

  const parseDate = (dateString) => {
    const [month, day] = dateString.split(' ');
    const monthIndex = MONTHS.indexOf(month);
    return new Date(new Date().getFullYear(), monthIndex, parseInt(day));
  };

  const filteredChartData = useMemo(() => {
    const lastDate = parseDate(CHART_DATA[CHART_DATA.length - 1].date);
    let startDate = new Date(lastDate);

    switch (selectedTimeRange) {
      case "1d":
        startDate.setDate(lastDate.getDate() - 1);
        break;
      case "3d":
        startDate.setDate(lastDate.getDate() - 3);
        break;
      case "1w":
        startDate.setDate(lastDate.getDate() - 7);
        break;
      case "1m":
        startDate.setMonth(lastDate.getMonth() - 1);
        break;
      case "6m":
        startDate.setMonth(lastDate.getMonth() - 6);
        break;
      case "1y":
        startDate.setFullYear(lastDate.getFullYear() - 1);
        break;
      case "max":
        return CHART_DATA;
      default:
        startDate.setDate(lastDate.getDate() - 7);
    }

    const startTimestamp = startDate.getTime();
    const endTimestamp = lastDate.getTime();

    return CHART_DATA
      .map(item => ({
        ...item,
        parsedDate: parseDate(item.date)
      }))
      .filter(item => {
        const itemTimestamp = item.parsedDate.getTime();
        return itemTimestamp >= startTimestamp && itemTimestamp <= endTimestamp;
      })
      .sort((a, b) => a.parsedDate - b.parsedDate);
  }, [selectedTimeRange]);

  const renderTimeRangeButtons = () => (
    <div className="flex space-x-2">
      {TIME_RANGES.map((range) => (
        <Button
          key={range}
          variant={selectedTimeRange === range ? "primary" : "ghost"}
          className={`${
            selectedTimeRange === range
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          } border-none shadow-none`}
          size="sm"
          onClick={() => setSelectedTimeRange(range)}
        >
          {range}
        </Button>
      ))}
    </div>
  );

  return (
    <div className="container">
      <Card className="w-full max-w-4xl overflow-scroll">
        <CardHeader className="flex flex-col space-y-4">
          <div className="flex justify-between items-baseline">
            <div>
              <div className="flex items-baseline">
                <h2 className="text-4xl font-bold">63,179.71</h2>
                <span className="ml-2 text-gray-400">USD</span>
              </div>
              <p className="text-green-500 font-semibold flex items-center">
                +2,161.42 (3.54%)
              </p>
            </div>
          </div>
          <Tabs tabs={TAB_LIST} />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Maximize2 className="h-4 w-4 mr-2" />
                Fullscreen
              </Button>
              <Button variant="outline" size="sm">
                <CirclePlus className="h-4 w-4 mr-2" />
                Compare
              </Button>
            </div>
            {renderTimeRangeButtons()}
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" minWidth={"600px"} height="100%">
              <AreaChart
                data={filteredChartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis
                  domain={["auto", "auto"]}
                  tickFormatter={(value) => `${value.toLocaleString()}`}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorPrice)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PriceChart;