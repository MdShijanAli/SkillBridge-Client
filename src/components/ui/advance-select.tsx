"use client";

import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface AdvanceSelectProps {
  options: SelectOption[];
  value?: (string | number)[] | string | number | "";
  onChange: (value: (string | number)[] | string | number | "") => void;
  placeholder?: string;
  emptyText?: string;
  searchPlaceholder?: string;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
}

export function AdvanceSelect({
  options,
  value,
  onChange,
  placeholder = "Select option...",
  emptyText = "No options found.",
  searchPlaceholder = "Search...",
  multiple = false,
  disabled = false,
  className,
  isLoading = false,
}: AdvanceSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Normalize value to array
  const selectedValues = React.useMemo(() => {
    if (!value || value === "") return [];
    if (Array.isArray(value)) return value;
    return [value];
  }, [value]);

  // Filter options based on search
  const filteredOptions = React.useMemo(() => {
    if (!searchQuery) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [options, searchQuery]);

  // Get selected labels
  const selectedLabels = React.useMemo(() => {
    return options
      .filter((option) => selectedValues.includes(option.value))
      .map((option) => option.label);
  }, [options, selectedValues]);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleSelect = (optionValue: string | number) => {
    if (disabled) return;

    if (multiple) {
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];
      onChange(newValues);
    } else {
      onChange(optionValue);
      setOpen(false);
    }
  };

  const handleRemove = (optionValue: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    const newValues = selectedValues.filter((v) => v !== optionValue);
    onChange(multiple ? newValues : "");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    onChange(multiple ? [] : "");
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => !disabled && !isLoading && setOpen(!open)}
        disabled={disabled || isLoading}
        className={cn(
          "flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          !selectedValues.length && "text-muted-foreground",
          open && "ring-2 ring-ring ring-offset-2",
        )}
      >
        <div className="flex gap-1 flex-wrap flex-1 items-center min-h-5">
          {isLoading ? (
            <span>Loading...</span>
          ) : selectedValues.length === 0 ? (
            <span>{placeholder}</span>
          ) : multiple ? (
            selectedLabels.map((label, index) => {
              const option = options.find((opt) => opt.label === label);
              return (
                <Badge key={index} variant="secondary" className="mr-1">
                  {label}
                  <button
                    type="button"
                    className="ml-1 hover:bg-muted rounded-full"
                    onClick={(e) => handleRemove(option?.value!, e)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              );
            })
          ) : (
            <span>{selectedLabels[0]}</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {selectedValues.length > 0 && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="hover:bg-muted rounded-full p-1"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <ChevronDown
            className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          />
        </div>
      </button>

      {open && (
        <div className="absolute z-[9999] mt-2 w-full rounded-md border bg-popover shadow-md">
          <div className="border-b p-2">
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="max-h-[300px] overflow-y-auto p-1">
            {filteredOptions.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                {emptyText}
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      !option.disabled && handleSelect(option.value)
                    }
                    disabled={option.disabled}
                    className={cn(
                      "flex w-full items-center rounded-sm px-2 py-2 text-sm outline-none",
                      "hover:bg-accent hover:text-accent-foreground",
                      "disabled:pointer-events-none disabled:opacity-50",
                      isSelected && "bg-accent/50",
                    )}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        isSelected ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {option.label}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
