"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon, Laptop2Icon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    { value: "light", label: "Light", icon: SunIcon },
    { value: "dark", label: "Dark", icon: MoonIcon },
    { value: "system", label: "System", icon: Laptop2Icon },
  ];

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className="w-36">
        <SelectValue placeholder="Select theme">
          {themeOptions.map(
            ({ value, label, icon: Icon }) =>
              theme === value && (
                <div key={value} className="flex items-center">
                  <Icon className="mr-2 h-4 w-4" />
                  {label}
                </div>
              ),
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {themeOptions.map(({ value, label, icon: Icon }) => (
          <SelectItem key={value} value={value}>
            <div className="flex items-center">
              <Icon className="mr-2 h-4 w-4" />
              {label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
