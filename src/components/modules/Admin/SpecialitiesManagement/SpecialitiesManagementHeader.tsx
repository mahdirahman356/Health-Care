"use client"
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import SpecialitiesFormDialog from "./SpecialitiesFormDialog";
import { Plus } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

const SpecialitiesManagementHeader = () => {
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [, startTransition] = useTransition();

    const handleSuccess = () => {
        startTransition(() => {
            router.refresh()
        })
    }

    return (
        <div>
            <>
                <SpecialitiesFormDialog
                    open={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    onSuccess={handleSuccess}
                />

                <ManagementPageHeader
                    title="Specialties Management"
                    description="Manage Specialties information and details"
                    action={{
                        label: "Add Specialty",
                        icon: Plus,
                        onClick: () => setIsDialogOpen(true),
                    }}
                />
            </>
        </div>
    );
};

export default SpecialitiesManagementHeader;