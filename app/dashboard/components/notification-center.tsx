"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";

const notifications = [
  {
    id: 1,
    title: "New expense added",
    description: 'Sarah added "Dinner" ($120.50)',
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Payment received",
    description: "Mike settled their share ($45.00)",
    time: "5 hours ago",
  },
  {
    id: 3,
    title: "Group invitation",
    description: 'You were invited to "Road Trip 2024"',
    time: "1 day ago",
  },
];

export function NotificationCenter() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Bell className="h-4 w-4" />
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-primary" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[380px]">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[300px] overflow-auto">
          {notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className="flex flex-col items-start p-4"
            >
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <span className="text-xs text-muted-foreground">
                    {notification.time}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full text-center">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
