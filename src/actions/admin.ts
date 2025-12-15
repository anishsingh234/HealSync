"use server";

import { db } from "@/lib/prismaClient";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { VerificationStatus } from "../../generated/prisma";

/**
 * Checks whether the current user is an admin
 */
export async function verifyAdmin(): Promise<boolean> {
  const { userId } = await auth();

  if (!userId) {
    return false;
  }

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId
      }
    });

    return user?.role === "ADMIN";
  } catch (error) {
    console.error("Error verifying admin:", error);
    return false;
  }
}

/**
 * Fetch all doctors whose verification status is PENDING
 */
export async function getPendingDoctors() {
  const isAdmin = await verifyAdmin();

  if (!isAdmin) {
    throw new Error("unauthorized");
  }

  try {
    const pendingDoctors = await db.user.findMany({
      where: {
        role: "DOCTOR",
        verificationStatus: "PENDING"
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return {
      doctors: pendingDoctors
    };
  } catch (_error) {
    throw new Error("failed to fetch pending doctors");
  }
}

/**
 * Fetch all VERIFIED doctors
 */
export async function getVerifiedDoctors() {
  const isAdmin = await verifyAdmin();

  if (!isAdmin) {
    throw new Error("unauthorized");
  }

  try {
    const verifiedDoctors = await db.user.findMany({
      where: {
        role: "DOCTOR",
        verificationStatus: "VERIFIED"
      },
      orderBy: {
        name: "asc"
      }
    });

    return {
      doctors: verifiedDoctors
    };
  } catch (error) {
    console.error("Error fetching verified doctors:", error);
    return {
      error: "failed to fetch verified doctors"
    };
  }
}

/**
 * Update verification status of a doctor (VERIFIED / REJECTED)
 */
export async function updateDoctorStatus(formData: FormData) {
  const isAdmin = await verifyAdmin();

  if (!isAdmin) {
    throw new Error("unauthorized");
  }

  const doctorId = formData.get("doctorId");
  const status = formData.get("status");

  if (
    !doctorId ||
    !["VERIFIED", "REJECTED"].includes(status as string)
  ) {
    throw new Error("invalid input");
  }

  try {
    await db.user.update({
      where: {
        id: doctorId as string
      },
      data: {
        verificationStatus: status as VerificationStatus
      }
    });

    revalidatePath("/admin");

    return {
      success: true
    };
  } catch (error) {
    console.error("Error updating doctor status:", error);
    throw new Error("failed to update doctor status");
  }
}

/**
 * Suspend or activate a doctor account
 */
export async function updateDoctorActiveStatus(formData: FormData) {
  const isAdmin = await verifyAdmin();

  if (!isAdmin) {
    throw new Error("unauthorized");
  }

  const doctorId = formData.get("doctorId");
  const suspend = formData.get("suspend") === "true";

  if (!doctorId) {
    throw new Error("Doctor ID is required");
  }

  try {
    const status: VerificationStatus = suspend
      ? "PENDING"
      : "VERIFIED";

    await db.user.update({
      where: {
        id: doctorId as string
      },
      data: {
        verificationStatus: status
      }
    });

    revalidatePath("/admin");

    return {
      success: true
    };
  } catch (error) {
    console.error("Error updating doctor active status:", error);
    throw new Error("failed to update doctor active status");
  }
}
