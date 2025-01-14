import { CreditCard, Receipt, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const activities = [
  {
    id: 1,
    type: "expense",
    title: "Dinner at Italian Restaurant",
    amount: 120.5,
    group: "Weekend Hangout",
    user: "Sarah",
    time: "2 hours ago",
    icon: Receipt,
  },
  {
    id: 2,
    type: "settlement",
    title: "Settlement received",
    amount: 45.0,
    user: "Mike",
    time: "5 hours ago",
    icon: CreditCard,
  },
  {
    id: 3,
    type: "group",
    title: "Joined new group",
    group: "Road Trip 2024",
    user: "You",
    time: "1 day ago",
    icon: User,
  },
];

export function ActivityFeed() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={`/placeholder.svg?height=32&width=32`}
              alt="Avatar"
            />
            <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.title}</p>
            <p className="text-sm text-muted-foreground">
              {activity.type === "expense" &&
                `Added by ${activity.user} in ${activity.group}`}
              {activity.type === "settlement" && `Paid by ${activity.user}`}
              {activity.type === "group" && activity.group}
            </p>
          </div>
          <div className="ml-auto font-medium">
            {activity.amount && (
              <span
                className={
                  activity.type === "settlement" ? "text-green-500" : ""
                }
              >
                {activity.type === "settlement" ? "+" : ""}${activity.amount}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
