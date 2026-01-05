import { TableSkeleton } from "@/components/shared/TableSkeleton";

export default function DoctorSchedulesLoading() {
  return <TableSkeleton columns={8} rows={10} />;
}