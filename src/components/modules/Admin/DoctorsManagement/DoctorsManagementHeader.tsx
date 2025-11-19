"use client"
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { ISpecialty } from "@/types/specialities.interface";
import { Plus } from "lucide-react";
import { useState, useTransition } from "react";
import DoctorFormDialog from "./DoctorFormDialog";
import { useRouter } from "next/navigation";

interface DoctorsManagementHeaderProps {
  specialities?: ISpecialty[];
}

const DoctorsManagementHeader = ({
  specialities,
}: DoctorsManagementHeaderProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogKey, setDialogKey] = useState(0);


  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleOpenDialog = () => {
    setDialogKey((prev) => prev + 1); // Force remount
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <>
      <DoctorFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
        specialities={specialities}
      />

      <ManagementPageHeader
        title="Doctors Management"
        description="Manage Doctors information and details"
        action={{
          label: "Add Doctor    ",
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />
    </>
  );
};

export default DoctorsManagementHeader;