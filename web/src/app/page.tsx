"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePickerWithPresets } from "@/app/components/date-picker-with-presets";
import { PowerKindPicker } from "@/app/components/power-kind-picker";
import { DeviceNav } from "@/app/components/device-nav";
import { DeviceRead } from "@/types/device-read";
import { useEffect, useState } from "react";
import useDeviceStore from "@/stores/device-store";
import useDashboardStore from "@/stores/dashboard-store";
import { PowerSummary } from "@/app/components/power-summary";
import { PowerOverview } from "@/app/components/power-overview";
import dynamic from "next/dynamic";

const UserNav = dynamic(() => import("../components/user-nav"), {
  ssr: false,
  loading: () => <div>Loading UserNav...</div>,
})

export default function DashboardPage() {
  const { device } = useDeviceStore();
  const { date } = useDashboardStore();
  const [deviceReads, setDeviceReads] = useState([] as DeviceRead[]);

  useEffect(() => {
    // todo: fetch device reads viem
    // Mock data for device reads

    const mockDeviceReads: DeviceRead[] = [
      { timestamp: Date.now() - 3600000 * 24, amps: 4.2 },
      { timestamp: Date.now() - 3600000 * 23, amps: 3.8 },
      { timestamp: Date.now() - 3600000 * 22, amps: 5.1 },
      { timestamp: Date.now() - 3600000 * 21, amps: 6.3 },
      { timestamp: Date.now() - 3600000 * 20, amps: 7.2 },
      { timestamp: Date.now() - 3600000 * 19, amps: 8.5 },
      { timestamp: Date.now() - 3600000 * 18, amps: 9.1 },
      { timestamp: Date.now() - 3600000 * 17, amps: 8.7 },
      { timestamp: Date.now() - 3600000 * 16, amps: 7.9 },
      { timestamp: Date.now() - 3600000 * 15, amps: 6.8 },
      { timestamp: Date.now() - 3600000 * 14, amps: 5.5 },
      { timestamp: Date.now() - 3600000 * 13, amps: 4.9 },
      { timestamp: Date.now() - 3600000 * 12, amps: 4.2 },
      { timestamp: Date.now() - 3600000 * 11, amps: 3.6 },
      { timestamp: Date.now() - 3600000 * 10, amps: 3.1 },
      { timestamp: Date.now() - 3600000 * 9, amps: 2.8 },
      { timestamp: Date.now() - 3600000 * 8, amps: 2.5 },
      { timestamp: Date.now() - 3600000 * 7, amps: 2.9 },
      { timestamp: Date.now() - 3600000 * 6, amps: 3.4 },
      { timestamp: Date.now() - 3600000 * 5, amps: 4.1 },
      { timestamp: Date.now() - 3600000 * 4, amps: 4.8 },
      { timestamp: Date.now() - 3600000 * 3, amps: 5.3 },
      { timestamp: Date.now() - 3600000 * 2, amps: 5.7 },
      { timestamp: Date.now() - 3600000, amps: 5.9 },
    ];

    setDeviceReads(mockDeviceReads);
  }, [device, date]);

  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <div className="ml-auto flex items-center space-x-4">
              <DeviceNav />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <DatePickerWithPresets />
              <PowerKindPicker />
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Power Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <PowerOverview deviceReads={deviceReads} />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardContent>
                  <PowerSummary deviceReads={deviceReads} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
