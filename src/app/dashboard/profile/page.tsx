// src/app/dashboard/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { userAPI } from "@/lib/api";
import {
  User,
  Mail,
  Wallet,
  Building,
  Shield,
  Edit3,
  Save,
  X,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

const profileSchema = z.object({
  email: z.string().email("Invalid email address"),
  business_name: z.string().optional(),
  wallet_address: z.string().min(1, "Wallet address is required"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: user?.email || "",
      business_name: user?.business_name || "",
      wallet_address: user?.wallet_address || "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        email: user.email,
        business_name: user.business_name || "",
        wallet_address: user.wallet_address,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      const updatedUser = await userAPI.updateProfile(data);
      updateUser(updatedUser);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getKycStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getKycStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your account information and preferences
          </p>
        </div>
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2"
          >
            <Edit3 className="h-4 w-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditing(false);
                reset();
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSubmit(onSubmit)} disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        {...register("email")}
                        type="email"
                        className="pl-10"
                        error={errors.email?.message}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{user.email}</span>
                    </div>
                  )}
                </div>

                {user.user_type === "business" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Name
                    </label>
                    {isEditing ? (
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          {...register("business_name")}
                          className="pl-10"
                          placeholder="Your Business Name"
                          error={errors.business_name?.message}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                        <Building className="h-4 w-4 text-gray-400" />
                        <span>{user.business_name || "Not provided"}</span>
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Wallet Address
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        {...register("wallet_address")}
                        className="pl-10 font-mono text-sm"
                        placeholder="0x..."
                        error={errors.wallet_address?.message}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                      <Wallet className="h-4 w-4 text-gray-400" />
                      <span className="font-mono text-sm break-all">
                        {user.wallet_address}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Type
                  </label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                    <User className="h-4 w-4 text-gray-400" />
                    <Badge variant="outline" className="capitalize">
                      {user.user_type}
                    </Badge>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Member Since
                  </label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                    <span>
                      {new Date(user.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Account Status & KYC */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Account Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  KYC Verification
                </label>
                <div className="flex items-center gap-2 p-3 border rounded-md">
                  {getKycStatusIcon(user.kyc_status)}
                  <div className="flex-1">
                    <Badge className={getKycStatusColor(user.kyc_status)}>
                      {user.kyc_status}
                    </Badge>
                  </div>
                </div>
                {user.kyc_status === "pending" && (
                  <p className="text-sm text-gray-600 mt-2">
                    Your KYC verification is being processed. You'll be notified
                    once it's complete.
                  </p>
                )}
                {user.kyc_status === "rejected" && (
                  <div className="mt-2">
                    <p className="text-sm text-red-600 mb-2">
                      Your KYC verification was rejected. Please resubmit your
                      documents.
                    </p>
                    <Button size="sm" variant="outline">
                      Resubmit KYC
                    </Button>
                  </div>
                )}
                {user.kyc_status !== "approved" &&
                  user.kyc_status !== "pending" && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 mb-2">
                        Complete KYC verification to access all platform
                        features.
                      </p>
                      <Button size="sm">Start KYC Process</Button>
                    </div>
                  )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Two-Factor Authentication
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Download Data
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-red-600 hover:text-red-700"
              >
                Delete Account
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Invoices:</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Funded:</span>
                <span className="font-medium">$0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Success Rate:</span>
                <span className="font-medium">0%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
