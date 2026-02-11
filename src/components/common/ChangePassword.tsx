"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const passwordRequirements = [
  { label: "At least 8 characters", test: (pw: string) => pw.length >= 8 },
  {
    label: "At least one uppercase letter",
    test: (pw: string) => /[A-Z]/.test(pw),
  },
  {
    label: "At least one lowercase letter",
    test: (pw: string) => /[a-z]/.test(pw),
  },
  { label: "At least one number", test: (pw: string) => /\d/.test(pw) },
  {
    label: "At least one special character",
    test: (pw: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pw),
  },
];

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else {
      const failedRequirements = passwordRequirements.filter(
        (r) => !r.test(formData.newPassword),
      );
      if (failedRequirements.length > 0) {
        newErrors.newPassword = "Password doesn't meet all requirements";
      }
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (
      formData.currentPassword &&
      formData.newPassword === formData.currentPassword
    ) {
      newErrors.newPassword =
        "New password must be different from current password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsPasswordChanging(true);
      const { data, error } = await authClient.changePassword({
        newPassword: formData.newPassword,
        currentPassword: formData.currentPassword,
        revokeOtherSessions: true,
      });

      if (error) {
        console.error("Password change error:", error);
        toast.error(
          error.message || "Failed to update password. Please try again.",
        );
        return;
      }

      console.log("Password change response:", data);

      toast.success("Your password has been updated successfully.");

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setErrors({});
    } catch (error: any) {
      console.error("Unexpected error during password change:", error);
      toast.error(
        error.message || "An unexpected error occurred. Please try again.",
      );
    } finally {
      setIsPasswordChanging(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="py-10">
        <div className="container mx-auto px-4 max-w-lg">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Change Password
          </h1>
          <p className="text-muted-foreground mb-8">
            Update your password to keep your account secure.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="glass-card rounded-xl p-6 space-y-6">
              {/* Current Password */}
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="currentPassword"
                    type={showPasswords.current ? "text" : "password"}
                    value={formData.currentPassword}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        currentPassword: e.target.value,
                      });
                      if (errors.currentPassword)
                        setErrors({ ...errors, currentPassword: "" });
                    }}
                    className="pl-10 pr-10"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords({
                        ...showPasswords,
                        current: !showPasswords.current,
                      })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPasswords.current ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.currentPassword && (
                  <p className="text-sm text-destructive">
                    {errors.currentPassword}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="newPassword"
                    type={showPasswords.new ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={(e) => {
                      setFormData({ ...formData, newPassword: e.target.value });
                      if (errors.newPassword)
                        setErrors({ ...errors, newPassword: "" });
                    }}
                    className="pl-10 pr-10"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords({
                        ...showPasswords,
                        new: !showPasswords.new,
                      })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPasswords.new ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-sm text-destructive">
                    {errors.newPassword}
                  </p>
                )}

                {/* Password Requirements */}
                <div className="mt-3 space-y-1.5">
                  {passwordRequirements.map((req) => {
                    const met = req.test(formData.newPassword);
                    return (
                      <div
                        key={req.label}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle2
                          className={`w-4 h-4 transition-colors ${
                            met ? "text-green-500" : "text-muted-foreground/40"
                          }`}
                        />
                        <span
                          className={
                            met ? "text-foreground" : "text-muted-foreground"
                          }
                        >
                          {req.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showPasswords.confirm ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      });
                      if (errors.confirmPassword)
                        setErrors({ ...errors, confirmPassword: "" });
                    }}
                    className="pl-10 pr-10"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords({
                        ...showPasswords,
                        confirm: !showPasswords.confirm,
                      })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPasswords.confirm ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {errors.confirmPassword}
                  </p>
                )}
                {formData.confirmPassword &&
                  formData.newPassword === formData.confirmPassword &&
                  !errors.confirmPassword && (
                    <p className="text-sm text-green-500 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Passwords match
                    </p>
                  )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit" variant="hero">
                {isPasswordChanging ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ChangePassword;
