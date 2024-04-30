import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { HoverCardTrigger, HoverCardContent, HoverCard } from "@/components/ui/hover-card"
interface CalendarDaysIconProps {
  className?: string;
}
export default function Avat(props : {username : string}) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Avatar>
          <AvatarImage alt="@shadcn" src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage alt="@shadcn" src="https://github.com/shadcn.png" />
            <AvatarFallback>SS</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@{props.username}</h4>
            <p className="text-sm">The Soup Dashboard – created and maintained by @aryan_570.</p>
            <div className="flex items-center pt-2">
              <CalendarDaysIcon className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Joined December 2023</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

function CalendarDaysIcon(props : CalendarDaysIconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  )
}