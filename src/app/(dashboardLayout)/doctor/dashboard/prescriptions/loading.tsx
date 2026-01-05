import { TableSkeleton } from "@/components/shared/TableSkeleton";

export default function DoctorPrescriptionsLoading() {
  return <TableSkeleton columns={8} rows={10} />;
}