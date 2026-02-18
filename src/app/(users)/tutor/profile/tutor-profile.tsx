"use client";

import { DollarSign, GraduationCap, Globe, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { FieldError } from "@/components/ui/field";
import { formatTextlabel } from "@/lib/utils";
import {
  createTutorProfile,
  updateTutorProfile,
} from "@/services/tutor.service";
import { useState } from "react";
import { apiRoutes } from "@/api/apiRoutes";
import { useQuery } from "@/hooks/useQuery";
import { AdvanceSelect, SelectOption } from "@/components/ui/advance-select";

const TutorProfileFormSchema = z.object({
  specialization: z
    .string()
    .min(5, "Specialization must be at least 5 characters"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  hourlyRate: z.coerce.number().min(5, "Hourly rate must be at least $5"),
  education: z.string().min(5, "Education must be at least 5 characters"),
  yearsExperience: z.coerce
    .number()
    .min(0, "Years of experience must be at least 0"),
  categoryIds: z.array(z.number()).min(1, "At least one category is required"),
  subjects: z.array(z.string()).min(1, "At least one subject is required"),
  languages: z.array(z.string()).min(1, "At least one language is required"),
});

const TutorProfile = ({ userData }: { userData: any }) => {
  const [createdProfile, setCreatedProfile] = useState(false);

  const {
    data: categories,
    isLoading,
    error,
    isError,
  } = useQuery(apiRoutes.categories.getAll);

  console.log("Categories:", categories);
  const categoryOptions: SelectOption[] =
    categories?.data
      ?.filter((cat: any) => cat.isActive)
      .map((cat: any) => ({
        label: cat.name,
        value: cat.id,
      })) || [];

  console.log("User Data in TutorProfile:", userData);

  const form = useForm({
    defaultValues: {
      specialization: userData?.specialization || "",
      bio: userData?.bio || "",
      hourlyRate: userData?.hourlyRate || 0,
      education: userData?.education || "",
      categoryIds:
        userData?.categories?.map((cat: any) => cat.categoryId) || [],
      yearsExperience: userData?.yearsExperience || 0,
      subjects: userData?.subjects || [],
      languages: userData?.languages || [],
    },
    validators: {
      onSubmit: TutorProfileFormSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("Form submitted with values:", value);
      const formData = {
        ...value,
        yearsExperience: Number(value.yearsExperience),
      };
      const toastId = toast.loading("Updating profile...");
      try {
        let response;
        if (userData?.userId || createdProfile) {
          response = await updateTutorProfile(formData);
        } else {
          response = await createTutorProfile(formData);
          if (!response?.error) {
            setCreatedProfile(true);
          }
        }
        console.log("Profile update/create response:", response);
        if (response?.error) {
          throw new Error(response.error || "Unknown error");
        }

        toast.success("Profile updated successfully!", { id: toastId });
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to update profile.",
          { id: toastId },
        );
        return;
      }
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16">
        <div className="max-w-6xl px-5 mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold mb-8">Edit Tutor Profile</h1>

          <form
            id="tutor-profile-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-8"
          >
            {/* Avatar */}
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-center gap-3">
                <Avatar className="h-24 w-24 ring-4 ring-primary/20">
                  <AvatarImage src={userData?.user?.image || userData?.image} />
                  <AvatarFallback>
                    {(userData?.user?.name || userData?.name)
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">
                    {userData?.user?.name || userData?.name}
                  </h3>
                  <p className="text-sm text-primary">
                    {userData?.specialization || "Tutor"}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="badge-completed">Verified</Badge>
                    {userData?.totalSessions > 0 && (
                      <span className="text-sm text-muted-foreground">
                        {userData?.totalSessions} sessions completed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="glass-card p-6 rounded-xl space-y-3">
              <h2 className="text-lg font-semibold">Basic Information</h2>

              <div className="grid sm:grid-cols-2 gap-3">
                {["specialization", "hourlyRate"].map((fieldName) => (
                  <form.Field key={fieldName} name={fieldName as any}>
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;

                      const icons: any = {
                        specialization: <GraduationCap className="icon" />,
                        hourlyRate: <DollarSign className="icon" />,
                      };

                      return (
                        <div className="space-y-2">
                          <Label>{formatTextlabel(fieldName)}</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                              {icons[fieldName]}
                            </span>
                            <Input
                              type={
                                fieldName === "hourlyRate" ? "number" : "text"
                              }
                              className="pl-10"
                              value={
                                (field.state.value as string | number) ?? ""
                              }
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                            />
                          </div>
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </div>
                      );
                    }}
                  </form.Field>
                ))}
              </div>

              {/* Bio */}
              <form.Field name="bio">
                {(field) => (
                  <div className="space-y-2">
                    <Label>Bio</Label>
                    <Textarea
                      rows={4}
                      value={(field.state.value as string) ?? ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </div>
                )}
              </form.Field>

              <div className="grid sm:grid-cols-2 gap-3">
                {["education", "yearsExperience"].map((name) => (
                  <form.Field key={name} name={name as any}>
                    {(field) => (
                      <div className="space-y-2">
                        <Label>{formatTextlabel(name)}</Label>
                        <Input
                          type={name === "yearsExperience" ? "number" : "text"}
                          value={(field.state.value as string | number) ?? ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <FieldError errors={field.state.meta.errors} />
                      </div>
                    )}
                  </form.Field>
                ))}
              </div>
            </div>

            {/* Categories */}
            <form.Field name="categoryIds">
              {(field) => (
                <div className="glass-card p-6 rounded-xl space-y-3 relative z-50">
                  <h2 className="text-lg font-semibold">Categories</h2>
                  <p className="text-sm text-muted-foreground">
                    Select categories that match your expertise
                  </p>

                  <AdvanceSelect
                    options={categoryOptions}
                    value={field.state.value || []}
                    onChange={(value) => field.handleChange(value as number[])}
                    placeholder="Select categories..."
                    searchPlaceholder="Search categories..."
                    emptyText="No categories found."
                    multiple={true}
                    isLoading={isLoading}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </div>
              )}
            </form.Field>

            {/* Subjects */}
            <form.Field name="subjects">
              {(field) => (
                <div className="glass-card p-6 rounded-xl space-y-3">
                  <h2 className="text-lg font-semibold">Subjects</h2>

                  <div className="flex flex-wrap gap-2">
                    {field.state.value.map((s: string) => (
                      <Badge key={s} variant="secondary">
                        {s}
                        <button
                          type="button"
                          className="ml-2"
                          onClick={() =>
                            field.handleChange(
                              field.state.value.filter((x: string) => x !== s),
                            )
                          }
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>

                  <Input
                    placeholder="Add subject"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const v = e.currentTarget.value.trim();
                        if (v && !field.state.value.includes(v)) {
                          field.handleChange([...field.state.value, v]);
                          e.currentTarget.value = "";
                        }
                      }
                    }}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </div>
              )}
            </form.Field>

            {/* Languages */}
            <form.Field name="languages">
              {(field) => (
                <div className="glass-card p-6 rounded-xl space-y-3">
                  <h2 className="text-lg font-semibold">Languages</h2>

                  <div className="flex flex-wrap gap-2">
                    {field.state.value.map((l: string) => (
                      <Badge key={l} variant="secondary">
                        <Globe className="w-3 h-3 mr-1" />
                        {l}
                        <button
                          type="button"
                          className="ml-2"
                          onClick={() =>
                            field.handleChange(
                              field.state.value.filter((x: string) => x !== l),
                            )
                          }
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>

                  <Input
                    placeholder="Add language"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const v = e.currentTarget.value.trim();
                        if (v && !field.state.value.includes(v)) {
                          field.handleChange([...field.state.value, v]);
                          e.currentTarget.value = "";
                        }
                      }
                    }}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </div>
              )}
            </form.Field>

            <div className="flex justify-end">
              <Button
                form="tutor-profile-form"
                type="submit"
                variant="hero"
                disabled={form.state.isSubmitting}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TutorProfile;
