"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePickerWithPresets } from "@/app/components/date-picker-with-presets";
import { UserNav } from "@/app/(app)/examples/dashboard/components/user-nav";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DashboardPage() {
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
              <Select onValueChange={(value) => console.log(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Device" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="0">Ferro elétrico</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Power Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <PowerOverview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardContent>
                  <PowerSummary />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
