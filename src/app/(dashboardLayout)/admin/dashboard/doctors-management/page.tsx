import DoctorFilters from "@/components/modules/Admin/DoctorsManagement/DoctorFilters";
import DoctorsManagementHeader from "@/components/modules/Admin/DoctorsManagement/DoctorsManagementHeader";
import DoctorsTable from "@/components/modules/Admin/DoctorsManagement/DoctorsTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getDoctors } from "@/services/admin/doctorManagement";
import { getSpecialities } from "@/services/admin/specialitiesManagement";
import { ISpecialty } from "@/types/specialities.interface";
import { Suspense } from "react";

const AdminDoctorManagementPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const specialitiesResult = await getSpecialities();
    const doctorsResult = await getDoctors(queryString);
    const totalPages = Math.ceil(
        doctorsResult?.meta?.total / doctorsResult?.meta?.limit
    );
    return (
        <div className="space-y-6">
            <DoctorsManagementHeader specialities={specialitiesResult?.data || []} />
            <DoctorFilters specialties={specialitiesResult?.data || []} />
            <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
                <DoctorsTable
                    doctors={doctorsResult.data}
                    specialities={specialitiesResult.data}
                />
                <TablePagination
                    currentPage={doctorsResult.meta.page}
                    totalPages={totalPages}
                />
            </Suspense>
        </div>
    );
};

export default AdminDoctorManagementPage;