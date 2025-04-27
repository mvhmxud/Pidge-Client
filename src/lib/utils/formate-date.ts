// Create a new file DateFormatter.jsx/tsx
import { format, parseISO, isToday, isYesterday } from "date-fns";

export default function DateFormatter({ dateString }: { dateString: string }) {
  const date = parseISO(dateString);

  if (isToday(date)) {
    return format(date, "h:mm a");
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else {
    return format(date, "MMM d");
  }
}
