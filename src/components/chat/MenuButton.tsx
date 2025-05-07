"use client";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useSidebar } from "../ui/sidebar";

const MenuButton = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      onClick={toggleSidebar}
      variant={"ghost"}
      className="absolute top-3 right-3 cursor-pointer md:hidden"
    >
      <Menu size={23} />
    </Button>
  );
};

export default MenuButton;
