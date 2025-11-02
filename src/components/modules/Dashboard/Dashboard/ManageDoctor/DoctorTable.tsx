'use client';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DoctorFormDialog } from "./DoctorFormDialog";
import Image from "next/image";
import { useDoctors } from "@/hooks/useDoctor";
import { IDoctor } from "@/types/user";
import HeartbeatLoader from "@/components/shared/Loader";

export function DoctorTable() {

  const { doctors, isLoading, removeDoctor } = useDoctors()

  if (isLoading) {
    return <HeartbeatLoader />
  }

  const handleDelete = async (id: string) => {

    if (!window.confirm("Are you sure you want to delete this doctor?")) return
    await removeDoctor.mutateAsync(id);
  };

  const handleEdit = (id: string) => {
    console.log(id)
  };


  return (
    <main className="mt-10 p-10 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold">Manage Doctors</h2>
          <p className="text-muted-foreground mt-1">
            Add, update, and delete doctors with ease.
          </p>
        </div>
        <DoctorFormDialog />
      </div>

      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Qualification</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors?.length > 0 ? (
            doctors.map((doctor: IDoctor) => (
              <TableRow key={doctor.id}>
                <TableCell>
                  {doctor.profilePhoto ? (
                    <Image
                      src={doctor.profilePhoto}
                      alt={doctor.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell>{doctor.name}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>{doctor.qualification}</TableCell>
                <TableCell>${doctor.appointmentFee}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(doctor.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={()=> handleDelete(doctor.id) }
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No doctors found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </main>
  );
}