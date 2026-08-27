import { use } from "react";
import { AdminUserProfileConsole } from "@/components/sections/admin/admin-user-profile-console";

export default function AdminUserProfilePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    return <AdminUserProfileConsole userId={id} />;
}
