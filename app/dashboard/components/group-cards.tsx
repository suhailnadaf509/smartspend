import { MoreVertical, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

const groups = [
  {
    id: 1,
    name: "Weekend Hangout",
    members: 5,
    totalExpenses: 450,
    yourShare: 90,
    settled: 45,
  },
  {
    id: 2,
    name: "Roommates",
    members: 3,
    totalExpenses: 1200,
    yourShare: 400,
    settled: 400,
  },
  {
    id: 3,
    name: "Road Trip 2024",
    members: 6,
    totalExpenses: 800,
    yourShare: 133,
    settled: 100,
  },
];

export function GroupCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <Card key={group.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{group.name}</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Settle Up</DropdownMenuItem>
                <DropdownMenuItem>Leave Group</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <CardDescription>{group.members} members</CardDescription>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Your share</span>
                <span className="font-medium">${group.yourShare}</span>
              </div>
              <Progress
                value={(group.settled / group.yourShare) * 100}
                className="h-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Settled: ${group.settled}</span>
                <span>Total: ${group.yourShare}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
