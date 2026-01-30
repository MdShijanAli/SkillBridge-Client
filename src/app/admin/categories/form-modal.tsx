"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  editData?: Category;
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
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    validators: {
      onSubmit: CategorySchema,
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      console.log("Form Values:", value);
      try {
        let response;
        if (isEditing && editData?.id) {
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

  useEffect(() => {
    if (!open) return;

    if (editData) {
      setIsEditing(true);
      console.log("Edit Data:", editData);
      form.reset({
        name: editData.name ?? "",
        description: editData.description ?? "",
      });
    } else {
      setIsEditing(false);
      form.reset({
        name: "",
        description: "",
      });
    }
  }, [editData, open]);

  return (
    <BaseModal
      open={open}
      onOpenChange={onClose}
      title={isEditing ? "Edit Category" : "Create Category"}
      onSubmit={form.handleSubmit}
      isSubmitting={isSubmitting}
      submitButtonText={isEditing ? "Update Category" : "Create Category"}
      size="2xl"
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
