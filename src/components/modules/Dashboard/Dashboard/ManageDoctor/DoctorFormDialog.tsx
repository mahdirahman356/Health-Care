/* eslint-disable @typescript-eslint/no-explicit-any */
// components/DoctorFormDialog.tsx
'use client';

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDoctors } from "@/hooks/useDoctor";

export function DoctorFormDialog() {
  const {addDoctor} = useDoctors();
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [formData, setFormData] = React.useState({
    email: "",
    name: "",
    contactNumber: "",
    address: "",
    registrationNumber: "",
    experience: "",
    gender: "MALE",
    appointmentFee: "",
    qualification: "",
    currentWorkingPlace: "",
    designation: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formPayload = new FormData();

    if(file){
      formPayload.append("file", file);
    }

    const data = {
      password: "123456",
      doctor:{
        ...formData,
        experience: Number(formData.experience),
        appointmentFee: Number(formData.appointmentFee)
      }
    }

    formPayload.append("data", JSON.stringify(data));

    await addDoctor.mutateAsync(formPayload);

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Doctor</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Doctor</DialogTitle>
            <DialogDescription>
              Fill in the doctor’s details below.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {[
              "name",
              "email",
              "contactNumber",
              "address",
              "registrationNumber",
              "experience",
              "appointmentFee",
              "qualification",
              "currentWorkingPlace",
              "designation",
            ].map((key) => (
              <div className="grid gap-2" key={key}>
                <Label htmlFor={key}>{key}</Label>
                <Input
                  id={key}
                  name={key}
                  value={(formData as any)[key]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            <div className="grid gap-2">
              <Label htmlFor="gender">Gender</Label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="border rounded-md p-2"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="file">Upload Image</Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">
             add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}