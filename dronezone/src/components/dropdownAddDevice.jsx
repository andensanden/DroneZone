import { DropdownMenu, DropdownMenuContent, DropdownMenuItem,  DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {Button  } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TbDrone } from "react-icons/tb";

export function DropdownAddDevice() {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" bg-gray-200 flex flex-row justify-center gap-3 items-center my-2 px-4 py-2 rounded-md shadow-lg hover:scale-105 transition-all duration-200  text-gray-700 font-bold text-sm">
        <p>Add new drone </p>
        <TbDrone size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Input placeholder="Name" className="mb-2" />
        <Input placeholder="Serial number" className="mb-2" />
        <Button className="block w-full">Add</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
