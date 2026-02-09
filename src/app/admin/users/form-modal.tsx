"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { BaseModal } from "@/components/modals/base-modal";
import { User } from "@/lib/types";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { updateItem } from "@/services/api.service";
import { apiRoutes } from "@/api/apiRoutes";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Roles } from "@/constants/roles";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserDialogProps {
  open: boolean;
  onClose: () => void;
  editData?: User | null;
  setRefreshKey?: (prev: (prev: number) => number) => void;
}

const UserSchema = z.object({
  name: z.string().min(1, "User name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
  role: z.enum([Roles.ADMIN, Roles.TUTOR, Roles.STUDENT]).optional(),
});

export default function FormModal({
  open,
  onClose,
  editData,
  setRefreshKey,
}: UserDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      name: editData?.name || "",
      email: editData?.email || "",
      phone: editData?.phone || "",
      role: editData?.role || "",
    },
    validators: {
      onSubmit: UserSchema,
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      console.log("Form Values:", value);
      try {
        let response;
        if (editData?.id) {
          response = await updateItem({
            endpoint: apiRoutes.users.update(editData.id),
            data: value,
          });
          toast.success("User updated successfully");
        }
        console.log("Response:", response);
        setRefreshKey?.((prev) => prev + 1);
        onClose();
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <BaseModal
      open={open}
      onOpenChange={onClose}
      title={editData ? "Edit User" : "Create User"}
      onSubmit={form.handleSubmit}
      isSubmitting={isSubmitting}
      submitButtonText={editData ? "Update User" : "Create User"}
      size="xl"
      closeButtonText="Cancel"
    >
      <div className="grid gap-3">
        <FieldGroup>
          <form.Field
            name="name"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="Enter user name"
                    value={field.state.value ?? ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="email"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="Enter user email"
                    value={field.state.value ?? ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="phone"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="Enter user phone"
                    value={field.state.value ?? ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="role"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Role</FieldLabel>

                  <Select
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value)}
                  >
                    <SelectTrigger id={field.name}>
                      <SelectValue placeholder="Select user role" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value={Roles.ADMIN}>ADMIN</SelectItem>
                      <SelectItem value={Roles.TUTOR}>TUTOR</SelectItem>
                      <SelectItem value={Roles.STUDENT}>STUDENT</SelectItem>
                    </SelectContent>
                  </Select>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>
      </div>
    </BaseModal>
  );
}
