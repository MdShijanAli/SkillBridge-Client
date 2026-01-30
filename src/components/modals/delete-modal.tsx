import { ReactNode } from "react";
import { BaseModal } from "./base-modal";

export interface DeleteModalProps {
  open: boolean;
  onClose: (open: boolean) => void;
  title?: string;
  description?: string | ReactNode;
  onConfirm: () => void;
  isDeleting?: boolean;
  children?: ReactNode;
  submitButtonText?: string;
  submitButtonVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

export default function DeleteModal({
  open,
  onClose,
  title = "Are you sure?",
  description,
  onConfirm,
  isDeleting = false,
  children,
  submitButtonText,
  submitButtonVariant = "destructive",
}: DeleteModalProps) {
  return (
    <BaseModal
      open={open}
      onOpenChange={onClose}
      title={title}
      onSubmit={onConfirm}
      isSubmitting={isDeleting}
      submitButtonText={submitButtonText || t("delete")}
      submitButtonVariant={submitButtonVariant || "destructive"}
      closeButtonText={t("cancel")}
      size="md"
    >
      <div className="space-y-4">
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {children}
      </div>
    </BaseModal>
  );
}
