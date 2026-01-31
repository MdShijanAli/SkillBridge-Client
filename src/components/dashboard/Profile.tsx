"use client";

import { Mail, Phone, MapPin, Camera, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { formatDate } from "@/lib/utils";
import { User as UserType } from "@/lib/types";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { Roles } from "@/constants/roles";
import { FieldError, FieldGroup } from "../ui/field";
import { updateItem } from "@/services/api.service";
import { apiRoutes } from "@/api/apiRoutes";

const UserFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  location: z.string().optional(),
  bio: z.string().max(500, "Bio must be at most 500 characters").optional(),
});

const Profile = ({ userData }: { userData: UserType }) => {
  const form = useForm({
    defaultValues: {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      location: userData.location || "New York, USA",
      bio:
        userData.bio ||
        "Passionate learner looking to improve my skills in programming and mathematics.",
    },
    validators: {
      onSubmit: UserFormSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Saving profile...");
      try {
        const response = await updateItem({
          endpoint: apiRoutes.users.update(userData.id),
          data: value,
        });
        console.log("Profile updated:", response);
        toast.success("Profile updated successfully!", { id: toastId });
      } catch (error) {
        toast.error("Failed to update profile. Please try again.", {
          id: toastId,
        });
      } finally {
        toast.dismiss(toastId);
      }
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-3xl font-bold text-foreground mb-8">
            My Profile
          </h1>

          <form
            id="user-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(e);
            }}
            className="space-y-8"
          >
            <FieldGroup>
              {/* Avatar Section */}
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={userData.image} />
                      <AvatarFallback className="text-2xl">
                        {userData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center"
                    >
                      <Camera className="w-4 h-4 text-primary-foreground" />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {userData.name}
                    </h3>
                    <Badge
                      variant={
                        userData.role === Roles.TUTOR ? "secondary" : "success"
                      }
                      className="mb-2"
                    >
                      {userData.role}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      Member since {formatDate(userData.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="glass-card rounded-xl p-6 space-y-6">
                <h2 className="text-lg font-semibold text-foreground">
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <form.Field
                    name="name"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <div className="space-y-2">
                          <Label htmlFor={field.name}>Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              id={field.name}
                              name={field.name}
                              value={field.state.value ?? ""}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              className="pl-10"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </div>
                        </div>
                      );
                    }}
                  />

                  <form.Field
                    name="email"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <div className="space-y-2">
                          <Label htmlFor={field.name}>Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              id={field.name}
                              type="email"
                              name={field.name}
                              value={field.state.value ?? ""}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              className="pl-10"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </div>
                        </div>
                      );
                    }}
                  />

                  <form.Field
                    name="phone"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <div className="space-y-2">
                          <Label htmlFor={field.name}>Phone</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              id={field.name}
                              name={field.name}
                              type="tel"
                              value={field.state.value ?? ""}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              className="pl-10"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </div>
                        </div>
                      );
                    }}
                  />

                  <form.Field
                    name="location"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <div className="space-y-2">
                          <Label htmlFor={field.name}>Location</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              id={field.name}
                              name={field.name}
                              value={field.state.value ?? ""}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              className="pl-10"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </div>
                        </div>
                      );
                    }}
                  />
                </div>

                <form.Field
                  name="bio"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <div className="space-y-2">
                        <Label htmlFor={field.name}>Bio</Label>
                        <Textarea
                          id={field.name}
                          name={field.name}
                          value={field.state.value ?? ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                          rows={4}
                          placeholder="Tell us about yourself..."
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </div>
                    );
                  }}
                />
              </div>

              {/* Save Button */}
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button
                  form="user-form"
                  type="submit"
                  variant="hero"
                  disabled={form.state.isSubmitting}
                >
                  Save Changes
                </Button>
              </div>
            </FieldGroup>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Profile;
