"use client";

import { useState } from "react";
import { Plus, Trash2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { currentTutor } from "@/lib/data";
import { toast } from "sonner";

interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const times = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0");
  return `${hour}:00`;
});

const TutorAvailability = () => {
  const [slots, setSlots] = useState<TimeSlot[]>(currentTutor.availability);

  const addSlot = () => {
    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      day: "Monday",
      startTime: "09:00",
      endTime: "17:00",
    };
    setSlots([...slots, newSlot]);
  };

  const removeSlot = (id: string) => {
    setSlots(slots.filter((s) => s.id !== id));
  };

  const updateSlot = (id: string, field: keyof TimeSlot, value: string) => {
    setSlots(slots.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const handleSave = () => {
    toast.success("Availability saved successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Manage Availability
              </h1>
              <p className="text-muted-foreground mt-2">
                Set your available time slots for tutoring sessions.
              </p>
            </div>
            <Button onClick={addSlot}>
              <Plus className="w-4 h-4 mr-2" />
              Add Slot
            </Button>
          </div>

          <div className="space-y-4">
            {slots.map((slot) => (
              <div key={slot.id} className="glass-card rounded-xl p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-5 h-5" />
                  </div>

                  <Select
                    value={slot.day}
                    onValueChange={(value) => updateSlot(slot.id, "day", value)}
                  >
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {days.map((day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="flex items-center gap-2 flex-1">
                    <Select
                      value={slot.startTime}
                      onValueChange={(value) =>
                        updateSlot(slot.id, "startTime", value)
                      }
                    >
                      <SelectTrigger className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {times.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <span className="text-muted-foreground">to</span>

                    <Select
                      value={slot.endTime}
                      onValueChange={(value) =>
                        updateSlot(slot.id, "endTime", value)
                      }
                    >
                      <SelectTrigger className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {times.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSlot(slot.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            {slots.length === 0 && (
              <div className="glass-card rounded-xl p-8 text-center">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">
                  No availability set
                </h3>
                <p className="text-muted-foreground mb-4">
                  Add time slots when you're available for tutoring.
                </p>
                <Button onClick={addSlot}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Slot
                </Button>
              </div>
            )}
          </div>

          {slots.length > 0 && (
            <div className="mt-8 flex justify-end gap-4">
              <Button variant="outline">Cancel</Button>
              <Button variant="hero" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TutorAvailability;
