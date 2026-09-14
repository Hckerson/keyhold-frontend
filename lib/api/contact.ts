import { query } from "@/lib/api/client";
import { config } from "@/lib/constants";
import type {
    ContactActivity,
    SendLeadEmailInput,
} from "@/lib/validations/contact";

export const contactAPI = {
    history: (connectionId: string) =>
        query.get<ContactActivity[]>(config.api.contact.history(connectionId)),

    sendEmail: (connectionId: string, input: SendLeadEmailInput) =>
        query.post<ContactActivity>(
            config.api.contact.email(connectionId),
            input,
        ),

    startCall: (connectionId: string) =>
        query.post<ContactActivity>(config.api.contact.call(connectionId)),
};
