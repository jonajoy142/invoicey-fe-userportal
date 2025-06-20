// components/ui/calendar.tsx
"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export function Calendar({ className, ...props }: CalendarProps) {
    const currentYear = new Date().getFullYear();

    return (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-md">
            <DayPicker
                mode="single"
                captionLayout="dropdown"
                fromYear={currentYear - 10}
                toYear={currentYear + 5}
                className={cn("rdp-custom", className)}
                {...props}
            />
        </div>
    );
}
