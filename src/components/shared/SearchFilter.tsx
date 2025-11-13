"use client"
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchFilterProps {
    placeholder?: string;
    paramName?: string;
}


const SearchFilter = ({
    placeholder = "Search...",
    paramName = "searchTerm",
}: SearchFilterProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [value, setValue] = useState(searchParams.get(paramName) || "");
    const [isPending, startTransition] = useTransition();
    const debouncedValue = useDebounce(value, 500);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())

        const initialValue = searchParams.get(paramName) || ""
        if (debouncedValue === initialValue) {
            return
        }

        if (debouncedValue) {
            params.set(paramName, debouncedValue)
            params.set("page", "1")
        } else {
            params.delete(paramName, debouncedValue)
            params.delete("page", "1")
        }

        startTransition(() => {
             router.push(`?${params.toString()}`);
        })

    }, [debouncedValue, paramName, router, searchParams])

    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder={placeholder}
                className="pl-10"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={isPending}
            />
        </div>
    );
};

export default SearchFilter;