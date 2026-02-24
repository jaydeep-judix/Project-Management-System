"use client";

import { Sidebar } from "./Sidebar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-10 w-10 text-zinc-500 hover:text-zinc-900 active:scale-95 transition-all"
        >
          <Menu size={20} />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64 border-none shadow-2xl">
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation Menu</SheetTitle>
        </SheetHeader>
        <Sidebar
          className="flex h-full w-full border-none"
          onClose={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
}
