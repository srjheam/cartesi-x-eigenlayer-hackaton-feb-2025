import { useReadContract, useWriteContract } from "wagmi";
import { toHex } from "viem";
import { useEffect, useState } from "react";    

const CONTRACT_ADDRESS = "0xCONTRATO"; 
const CONTRACT_ABI = "../../../contracts/CONTRATO.json"; // Caminho para a ABI do contrato

export function useContract(userAddress?: string, userName?: string, deviceId?: number) {

    const [contractABI, setContractABI] = useState<[]>([]);
    const { writeContract } = useWriteContract();

    useEffect(() => {
        async function fetchABI() {
          try {
            const response = await fetch(CONTRACT_ABI); 
            const abi = await response.json();
            setContractABI(abi);
          } catch (error) {
            console.error("Erro ao buscar a ABI:", error);
          }
        }
        fetchABI();
    }, []);

    // function runExecution(bytes calldata input)
    const runExecution = async (inputData: string) => {
      try {
        const inputBytes = toHex(inputData);
        await writeContract({
          address: CONTRACT_ADDRESS,
          abi: contractABI,
          functionName: "runExecution",
          args: [inputBytes],
        });
      } catch (error) {
        console.error("Erro ao executar `runExecution`:", error);
      }
    };

    // function sendData(uint256[] memory currents, uint256 timestamp) external userExists(msg.sender)
    const sendData = async (currents: number[], timestamp: number) => {
        try {
            const currentsUint256 = currents.map(current => BigInt(current) );
            await writeContract({
                address: CONTRACT_ADDRESS,
                abi: contractABI,
                functionName: "sendData",
                args: [currentsUint256, BigInt(timestamp)],
            });
        } catch (error) {
          console.error("Erro ao enviar `sendData`:", error);
        }
      };
    
    // function getDevices (address user) public view userExists(user) returns (DeviceView[] memory)
    const { data: devices, refetch: refetchDevices } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: contractABI,
        functionName: "getDevices",
        args: [userAddress],
        query: { 
            enabled: !!userAddress 
        },
    });

    // function getDeviceCurrentData(address user, uint256 id) public view userExists(user) returns (DeviceReportView[] memory)
    const { data: deviceData, refetch: refetchDeviceData } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: contractABI,
        functionName: "getDeviceCurrentData",
        args: [userAddress, deviceId],
        query: {
          enabled: !!userAddress && deviceId !== undefined,
        },
    });

    // function addUser(address user, string memory  name) external onlySuperAdmin
    const addUser = async (userAddress: string, userName: string) => {
        try {
          await writeContract({
            address: CONTRACT_ADDRESS,
            abi: contractABI,
            functionName: "addUser",
            args: [userAddress, userName],
          });
        } catch (error) {
          console.error("Erro ao adicionar usuário:", error);
        }
    };

    // function addDevice(address user, string memory name, uint256 id) external userExists(user) onlySuperAdmin
    const addDevice = async (userAddress: string, deviceName: string, deviceId: number) => {
        try {
            await writeContract({
            address: CONTRACT_ADDRESS,
            abi: contractABI,
            functionName: "addDevice",
            args: [userAddress, deviceName, BigInt(deviceId)],
            });
        } catch (error) {
            console.error("Erro ao adicionar dispositivo:", error);
        }
    };

  return { runExecution, sendData, devices, refetchDevices, deviceData, refetchDeviceData, addUser, addDevice };
}
