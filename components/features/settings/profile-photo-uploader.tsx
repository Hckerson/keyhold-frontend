"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { Trash2, Upload } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { INITIAL_PROFILE } from "@/lib/data/dashboard-settings";
import { initialsOf } from "@/lib/utils";

export function ProfilePhotoUploader() {
    const [photo, setPhoto] = useState<string | null>(null);
    const photoInputRef = useRef<HTMLInputElement>(null);

    useEffect(
        () => () => {
            if (photo) URL.revokeObjectURL(photo);
        },
        [photo],
    );

    const handlePhoto = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setPhoto(URL.createObjectURL(file));
    };

    const removePhoto = () => {
        setPhoto(null);
        if (photoInputRef.current) photoInputRef.current.value = "";
    };

    return (
        <div className="border-border-light mb-3 flex flex-wrap items-center gap-3 border-b pb-3">
            <Avatar
                size="xl"
                src={photo ?? undefined}
                initials={initialsOf(INITIAL_PROFILE.fullName)}
                alt="Profile photo"
            />
            <div className="space-y-1.5">
                <p className="micro-label">Profile Photo</p>
                <div className="flex flex-wrap gap-2">
                    <input
                        ref={photoInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhoto}
                        aria-hidden="true"
                        tabIndex={-1}
                    />
                    <Button
                        variant="secondary"
                        size="sm"
                        type="button"
                        onClick={() => photoInputRef.current?.click()}
                    >
                        <Upload
                            size={12}
                            strokeWidth={1.5}
                            className="mr-1.5"
                        />
                        {photo ? "Replace" : "Upload"}
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        type="button"
                        className="text-error hover:text-error"
                        disabled={!photo}
                        onClick={removePhoto}
                    >
                        <Trash2
                            size={12}
                            strokeWidth={1.5}
                            className="mr-1.5"
                        />
                        Remove
                    </Button>
                </div>
                <p className="text-text-muted text-xs">
                    JPG or PNG, at least 400 × 400 pixels.
                </p>
            </div>
        </div>
    );
}
