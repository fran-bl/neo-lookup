import { LucideIcon } from "lucide-react";
import React from "react";

interface StatProps {
    icon: LucideIcon;
    label: string;
    value: string | number;
}

export const Stat: React.FC<StatProps> = ({ icon: Icon, label, value }) => {
    return (
        <div className="flex items-center space-x-2">
            <Icon className="h-6 w-6 text-primary" />
            <div>
                <div className="text-lg">{label}</div>
                <div className="font-bold">{value}</div>
            </div>
        </div>
    );
}