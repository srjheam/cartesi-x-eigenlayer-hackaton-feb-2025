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
import { useAccount, usePublicClient } from "wagmi";
//import { getContract } from "viem";
//import { classifierCallerAbi } from "@/generated";

const DeviceNav = () => {
  const { isConnected, address } = useAccount();
  const client = usePublicClient();

  const { device, setDevice } = useDeviceStore();

  const [devices, setDevices] = useState([] as Device[]);

  useEffect(() => {
    const fetchDevices = async () => {
      //const contract = getContract({
      //  client,
      //  address: process.env
      //    .NEXT_PUBLIC_CLASSIFIER_CALLER_CONTRACT_ADDRESS as `0x${string}`,
      //  abi: classifierCallerAbi,
      //});
      //
      //const devices = await contract.read.getDevices([address!], {});
      //
      //return devices.map((device) => ({
      //  id: Number(device.id),
      //  name: device.name,
      //}));

      return [
        { id: 1, name: "Device 1" },
        { id: 2, name: "Device 2" },
        { id: 3, name: "Device 3" },
      ];
    };

    if (!isConnected) return;

    fetchDevices()
      .then(setDevices)
      .catch((error) => {
        console.error("Failed to fetch devices", error);
      });
  }, [address, client, device, isConnected]);

  return (
    <Select
      disabled={!isConnected}
      onValueChange={(id) =>
        setDevice(devices.find((d) => d.id.toString() === id)!)
      }
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={device ? device.name : "Select device"} />
      </SelectTrigger>
      <SelectContent>
        {devices.map((device) => (
          <SelectItem key={device.id} value={device.id.toString()}>
            {device.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DeviceNav;
