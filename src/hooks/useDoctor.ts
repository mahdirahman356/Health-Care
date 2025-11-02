import {
    useQuery,
    useMutation,
    useQueryClient,

} from '@tanstack/react-query'

const baseUrl = process.env.NEXT_PUBLIC_API_URL
export const getDoctors = async () => {
    const res = await fetch(`${baseUrl}/doctor`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })

    if (!res.ok) throw new Error("Failed to fetch doctors")
    const data = await res.json()
    return data.data
}

export const createDoctor = async (formdata: FormData) => {
    const res = await fetch(`${baseUrl}/user/create-doctor`, {
        method: "POST",
        credentials: "include",
        body: formdata,
    });
    if (!res.ok) throw new Error("Failed to create doctor");
    const data = await res.json();
    return data.data;
}

export const updateDoctor = async (id: string, formdata: FormData) => {
    const res = await fetch(`${baseUrl}/doctor/${id}`, {
        method: "PATCH",
        credentials: "include",
        body: formdata,
    });
    if (!res.ok) throw new Error("Failed to update doctor");
    const data = await res.json();
    return data.data;
}

export const deleteDoctor = async (id: string) => {
    const res = await fetch(`${baseUrl}/doctor/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to delete doctor");
    const data = await res.json();
    return data.message;
}

export function useDoctors() {
    const queryClient = useQueryClient();

    const { data: doctors, isLoading } = useQuery({
        queryKey: ["doctors"],
        queryFn: getDoctors
    })

    const addDoctor = useMutation({
        mutationFn: createDoctor,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["doctors"] })
        }
    })

    const editDoctor = useMutation({
        mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
            updateDoctor(id, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['doctors'] });
        },
    });

    const removeDoctor = useMutation({
        mutationFn: deleteDoctor,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['doctors'] });
        },
    });

    return { doctors, isLoading, addDoctor, editDoctor, removeDoctor };

}