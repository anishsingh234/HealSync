"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Check,
  X,
  User as UserIcon,
  Medal,
  FileText,
  ExternalLink,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { updateDoctorStatus } from "@/actions/admin";
import useFetch from "@/app/hooks/user-fetch";
import { BarLoader } from "react-spinners";
import { User } from "../../../../../generated/prisma";

export function PendingDoctors({ doctors }: { doctors: User[] }) {
  const [selectedDoctor, setSelectedDoctor] = useState<User | null>(null);

  const {
    loading,
    data,
    fn: submitStatusUpdate,
  } = useFetch(updateDoctorStatus);

  const handleViewDetails = (doctor: User) => {
    setSelectedDoctor(doctor);
  };

  const handleCloseDialog = () => {
    setSelectedDoctor(null);
  };

  const handleUpdateStatus = async (doctorId: string, status: string) => {
    if (loading) return;

    const formData = new FormData();
    formData.append("doctorId", doctorId);
    formData.append("status", status);

    await submitStatusUpdate(formData);
  };

  useEffect(() => {
    if (data && data?.success) {
      handleCloseDialog();
    }
  }, [data]);

  return (
    <div>
      <Card className="bg-muted/20 border-emerald-900/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white">
            Pending Doctor Verifications
          </CardTitle>
          <CardDescription>
            Review and approve doctor applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          {doctors.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No pending verification requests at this time.
            </div>
          ) : (
            <div className="space-y-4">
              {doctors.map((doctor) => (
                <Card
                  key={doctor.id}
                  className="bg-background border-emerald-900/20 hover:border-emerald-700/30 transition-all"
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-muted/20 rounded-full p-2">
                          <UserIcon className="h-5 w-5 text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">
                            {doctor.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {doctor.specialty} • {doctor.experience} years
                            experience
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 self-end md:self-auto">
                        <Badge
                          variant="outline"
                          className="bg-amber-900/20 border-amber-900/30 text-amber-400"
                        >
                          Pending
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(doctor)}
                          className="border-emerald-900/30 hover:bg-muted/80"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Improved Doctor Details Dialog */}
      {selectedDoctor && (
        <Dialog open={!!selectedDoctor} onOpenChange={handleCloseDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
            <DialogHeader className="shrink-0 pb-2">
              <DialogTitle className="text-xl font-bold text-white">
                Doctor Verification Details
              </DialogTitle>
              <DialogDescription>
                Review the doctor&apos;s information carefully before making a
                decision
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto space-y-4 px-1">
              {/* Compact Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <h4 className="text-xs font-medium text-muted-foreground uppercase">
                    Full Name
                  </h4>
                  <p className="text-sm font-medium text-white">
                    {selectedDoctor.name}
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-medium text-muted-foreground uppercase">
                    Email
                  </h4>
                  <p className="text-sm font-medium text-white truncate">
                    {selectedDoctor.email}
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-medium text-muted-foreground uppercase">
                    Applied
                  </h4>
                  <p className="text-sm font-medium text-white">
                    {format(new Date(selectedDoctor.createdAt), "MMM dd, yyyy")}
                  </p>
                </div>
              </div>

              <Separator className="bg-emerald-900/20" />

              {/* Compact Professional Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Medal className="h-4 w-4 text-emerald-400" />
                  <h3 className="text-base font-semibold text-white">
                    Professional Credentials
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Compact Specialty Card */}
                  <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 rounded-lg p-3 border border-blue-700/30">
                    <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-1">
                      Specialty
                    </h4>
                    <p className="text-sm font-medium text-white">
                      {selectedDoctor.specialty}
                    </p>
                  </div>

                  {/* Compact Experience Card */}
                  <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 rounded-lg p-3 border border-purple-700/30">
                    <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wide mb-1">
                      Experience
                    </h4>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-white">
                        {selectedDoctor.experience}
                      </span>
                      <span className="text-xs text-slate-300">years</span>
                    </div>
                  </div>
                </div>

                {/* Compact Credentials Link */}
                <div className="bg-gradient-to-br from-teal-900/20 to-teal-800/20 rounded-lg p-3 border border-teal-700/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-teal-400 uppercase tracking-wide mb-1">
                        Credentials Document
                      </h4>
                      <p className="text-xs text-slate-400">
                        Professional certifications and licenses
                      </p>
                    </div>
                    <a
                      href={selectedDoctor.credentialUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 bg-teal-600/20 hover:bg-teal-600/30 text-teal-300 hover:text-teal-200 px-3 py-1.5 rounded-md border border-teal-500/30 hover:border-teal-400/50 transition-all duration-200 text-xs font-medium"
                    >
                      <FileText className="h-3 w-3" />
                      View
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>

              <Separator className="bg-emerald-900/20" />

              {/* Compact Description */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-emerald-400" />
                  <h3 className="text-base font-semibold text-white">
                    Service Description
                  </h3>
                </div>
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-lg p-3 border border-slate-600/30">
                  <p className="text-slate-300 leading-relaxed text-sm line-clamp-4">
                    {selectedDoctor.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Loading Bar */}
            {loading && (
              <div className="shrink-0 py-2">
                <BarLoader width={"100%"} color="#36d7b7" />
              </div>
            )}

            {/* Fixed Footer with Action Buttons */}
            <DialogFooter className="shrink-0 flex flex-row justify-end gap-2 pt-3 border-t border-emerald-900/20">
              <Button
                variant="outline"
                onClick={handleCloseDialog}
                disabled={loading}
                className="border-slate-600 hover:bg-slate-700"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() =>
                  handleUpdateStatus(selectedDoctor.id, "REJECTED")
                }
                disabled={loading}
                className="bg-red-600 hover:bg-red-700"
              >
                <X className="mr-1 h-4 w-4" />
                Reject
              </Button>
              <Button
                onClick={() =>
                  handleUpdateStatus(selectedDoctor.id, "VERIFIED")
                }
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Check className="mr-1 h-4 w-4" />
                Approve
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}