"use client";

import { Plus, Trash2, Clock, Calendar, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { AvailabilitySlot } from "@/lib/types";
import * as z from "zod";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createAvailabilitySlot,
  updateAvailabilitySlot,
  deleteAvailabilitySlot,
  changeAvailabilitySlotStatus,
} from "@/services/tutor.service";

const days = [
  { value: "MONDAY", label: "Monday" },
  { value: "TUESDAY", label: "Tuesday" },
  { value: "WEDNESDAY", label: "Wednesday" },
  { value: "THURSDAY", label: "Thursday" },
  { value: "FRIDAY", label: "Friday" },
  { value: "SATURDAY", label: "Saturday" },
  { value: "SUNDAY", label: "Sunday" },
];

const times = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2)
    .toString()
    .padStart(2, "0");
  const minute = i % 2 === 0 ? "00" : "30";
  return `${hour}:${minute}`;
});

const AvailabilitySlotSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  tutorProfileId: z.number(),
  dayOfWeek: z.enum([
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ]),
  startTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  endTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  isActive: z.boolean().optional().default(true),
});

const TutorAvailability = ({
  tutorProfileId,
  availabilitySlots: availableSlots,
}: {
  tutorProfileId: string;
  availabilitySlots: AvailabilitySlot[];
}) => {
  console.log("TutorProfileId:", tutorProfileId);
  console.log("TutorAvailability component received slots:", availableSlots);
  const router = useRouter();
  const [slots, setSlots] = useState<AvailabilitySlot[]>(availableSlots || []);
  const [savingSlotId, setSavingSlotId] = useState<number | string | null>(
    null,
  );

  useEffect(() => {
    setSlots(availableSlots || []);
  }, [availableSlots]);

  const addSlot = () => {
    const tempId = `temp-${Date.now()}`;
    const newSlot: any = {
      id: tempId,
      tutorProfileId: Number(tutorProfileId) || 0,
      dayOfWeek: "MONDAY",
      startTime: "09:00",
      endTime: "17:00",
      isActive: true,
      isNew: true,
    };
    setSlots([...slots, newSlot]);
  };

  const updateSlotField = (index: number, field: string, value: any) => {
    const newSlots = [...slots];
    newSlots[index] = { ...newSlots[index], [field]: value };
    setSlots(newSlots);
  };

  const saveSlot = async (slot: any, index: number) => {
    setSavingSlotId(slot.id);
    const toastId = toast.loading(
      slot.isNew ? "Creating slot..." : "Updating slot...",
    );

    try {
      const slotData = {
        dayOfWeek: slot.dayOfWeek,
        startTime: slot.startTime,
        endTime: slot.endTime,
        isActive: slot.isActive ?? true,
        tutorProfileId: Number(tutorProfileId) || 0,
      };

      let response;
      if (slot.isNew) {
        response = await createAvailabilitySlot(slotData);
        const newSlots = [...slots];
        newSlots[index] = { ...response, isNew: false };
        setSlots(newSlots);
      } else {
        response = await updateAvailabilitySlot(slot.id, slotData);
      }

      toast.success(
        slot.isNew
          ? "Slot created successfully!"
          : "Slot updated successfully!",
        {
          id: toastId,
        },
      );

      router.refresh();
    } catch (error) {
      console.error("Error saving slot:", error);
      toast.error("Failed to save slot. Please try again.", { id: toastId });
    } finally {
      setSavingSlotId(null);
    }
  };

  const removeSlot = async (slot: any, index: number) => {
    if (slot.isNew) {
      setSlots(slots.filter((_, i) => i !== index));
      toast.success("Slot removed");
      return;
    }

    const toastId = toast.loading("Deleting slot...");
    try {
      await deleteAvailabilitySlot(slot.id);
      setSlots(slots.filter((_, i) => i !== index));
      toast.success("Slot deleted successfully!", { id: toastId });

      router.refresh();
    } catch (error) {
      console.error("Error deleting slot:", error);
      toast.error("Failed to delete slot. Please try again.", { id: toastId });
    }
  };

  const toggleSlotStatus = async (
    slot: any,
    index: number,
    newStatus: boolean,
  ) => {
    if (slot.isNew) {
      updateSlotField(index, "isActive", newStatus);
      return;
    }

    const toastId = toast.loading(
      newStatus ? "Activating slot..." : "Deactivating slot...",
    );

    try {
      await changeAvailabilitySlotStatus(slot.id, newStatus);

      const newSlots = [...slots];
      newSlots[index] = { ...newSlots[index], isActive: newStatus };
      setSlots(newSlots);

      toast.success(
        newStatus
          ? "Slot activated successfully!"
          : "Slot deactivated successfully!",
        { id: toastId },
      );

      router.refresh();
    } catch (error) {
      console.error("Error changing slot status:", error);
      toast.error("Failed to change status. Please try again.", {
        id: toastId,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16">
        <div className="max-w-6xl px-5 mx-auto max-w-4xl">
          <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
            <div className="flex items-start justify-between flex-col sm:flex-row gap-3">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    Manage Availability
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    Set your available time slots for tutoring sessions.
                    Students can book during these times.
                  </p>
                </div>
              </div>
              <Button onClick={addSlot} variant="hero" className="shrink-0">
                <Plus className="w-4 h-4 mr-2" />
                Add Slot
              </Button>
            </div>
          </div>

          <form
            id="slot-form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="space-y-3"
          >
            <div className="space-y-3">
              {slots?.map((slot: any, index: number) => {
                const dayLabel =
                  days.find((d) => d.value === slot.dayOfWeek)?.label ||
                  slot.dayOfWeek;
                const isSaving = savingSlotId === slot?.id;

                return (
                  <div
                    key={slot?.id}
                    className="glass-card rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3">
                        <div className="flex items-center gap-3 text-muted-foreground shrink-0">
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <Clock className="w-5 h-5 text-primary" />
                          </div>
                          <Badge
                            variant={slot.isNew ? "default" : "secondary"}
                            className="hidden sm:inline-flex"
                          >
                            {slot.isNew ? "New" : `Slot ${index + 1}`}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex lg:flex-1 gap-3 w-full lg:w-auto">
                          <Select
                            value={slot.dayOfWeek}
                            onValueChange={(value) =>
                              updateSlotField(index, "dayOfWeek", value)
                            }
                          >
                            <SelectTrigger className="w-full lg:w-40">
                              <SelectValue placeholder="Select day" />
                            </SelectTrigger>
                            <SelectContent>
                              {days.map((day) => (
                                <SelectItem key={day.value} value={day.value}>
                                  {day.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <div className="flex items-center gap-2 col-span-2">
                            <Select
                              value={slot.startTime}
                              onValueChange={(value) =>
                                updateSlotField(index, "startTime", value)
                              }
                            >
                              <SelectTrigger className="w-full sm:w-32">
                                <SelectValue placeholder="Start" />
                              </SelectTrigger>
                              <SelectContent>
                                {times.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <span className="text-muted-foreground font-medium">
                              to
                            </span>

                            <Select
                              value={slot.endTime}
                              onValueChange={(value) =>
                                updateSlotField(index, "endTime", value)
                              }
                            >
                              <SelectTrigger className="w-full sm:w-32">
                                <SelectValue placeholder="End" />
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

                          <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg">
                            <Switch
                              id={`active-${index}`}
                              checked={slot.isActive ?? true}
                              onCheckedChange={(checked) =>
                                toggleSlotStatus(slot, index, checked)
                              }
                              disabled={savingSlotId === slot?.id}
                            />
                            <Label
                              htmlFor={`active-${index}`}
                              className="text-sm font-medium cursor-pointer"
                            >
                              {slot.isActive ? "Active" : "Inactive"}
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2 border-t">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeSlot(slot, index)}
                          disabled={isSaving}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                        <Button
                          type="button"
                          variant="hero"
                          size="sm"
                          onClick={() => saveSlot(slot, index)}
                          disabled={isSaving}
                        >
                          {isSaving
                            ? "Saving..."
                            : slot.isNew
                              ? "Create Slot"
                              : "Update Slot"}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {slots.length === 0 && (
                <div className="glass-card rounded-2xl p-12 text-center">
                  <div className="bg-primary/10 p-6 rounded-full w-fit mx-auto mb-4">
                    <Clock className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl text-foreground mb-2">
                    No availability set
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Add time slots when you're available for tutoring. Students
                    will be able to book sessions during these times.
                  </p>
                  <Button onClick={addSlot} variant="hero">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Slot
                  </Button>
                </div>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TutorAvailability;
