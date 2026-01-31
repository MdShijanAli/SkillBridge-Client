"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { BaseModal } from "@/components/modals/base-modal";
import { Category } from "@/lib/types";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { storeItem, updateItem } from "@/services/api.service";
import { apiRoutes } from "@/api/apiRoutes";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

interface CategoryDialogProps {
  open: boolean;
  onClose: () => void;
  editData?: Category | null;
}

const CategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
});

export default function FormModal({
  open,
  onClose,
  editData,
}: CategoryDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      name: editData?.name || "",
      description: editData?.description || "",
    },
    validators: {
      onSubmit: CategorySchema,
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      console.log("Form Values:", value);
      try {
        let response;
        if (editData?.id) {
          response = await updateItem({
            endpoint: apiRoutes.categories.update(editData.id),
            data: value,
          });
          toast.success("Category updated successfully");
        } else {
          response = await storeItem({
            endpoint: apiRoutes.categories.create,
            data: value,
          });
          toast.success("Category created successfully");
        }
        console.log("Response:", response);
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
      title={editData ? "Edit Category" : "Create Category"}
      onSubmit={form.handleSubmit}
      isSubmitting={isSubmitting}
      submitButtonText={editData ? "Update Category" : "Create Category"}
      size="xl"
      closeButtonText="Cancel"
    >
      <div className="grid gap-6">
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
                    placeholder="Enter category name"
                    value={field.state.value ?? ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="description"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    placeholder="Enter category description"
                    value={field.state.value ?? ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                    rows={3}
                  />
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
