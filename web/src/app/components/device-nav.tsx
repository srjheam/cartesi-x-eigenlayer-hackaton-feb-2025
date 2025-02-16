"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDeviceStore from "@/stores/device-store";
import { useEffect, useState } from "react";
import { Device } from "@/types/device";

export const DeviceNav = () => {
  const { device, setDevice } = useDeviceStore();

  const [devices, setDevices] = useState([] as Device[]);

  useEffect(() => {
    // todo: fetch devices viem
    setDevices([
      { id: 1, name: "Device 1" },
      { id: 2, name: "Device 2" },
      { id: 3, name: "Device 3" },
    ]);
  }, [device]);

  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Device" />
      </SelectTrigger>
      <SelectContent>
        {devices.map((device) => (
          <SelectItem
            key={device.id}
            value={device.id.toString()}
            onClick={() => setDevice(device)}
          >
            {device.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
