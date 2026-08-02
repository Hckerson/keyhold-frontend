import { ActionRow } from "@/components/ui/action-row";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";

export function AgentAccountPanel() {
    return (
        <Panel title="Account" description="Manage your account security">
            <div className="space-y-2">
                <ActionRow
                    title="Change Password"
                    description="Update your password regularly"
                    action={
                        <Button variant="secondary" size="sm">
                            Change
                        </Button>
                    }
                />
                <ActionRow
                    title="Two-Factor Authentication"
                    description="Add an extra layer of security"
                    action={
                        <Button variant="secondary" size="sm">
                            Enable
                        </Button>
                    }
                />
                <ActionRow
                    danger
                    title="Delete Account"
                    description="Permanently delete your account and listings"
                    action={
                        <Button variant="outline-danger" size="sm">
                            Delete
                        </Button>
                    }
                />
            </div>
        </Panel>
    );
}
