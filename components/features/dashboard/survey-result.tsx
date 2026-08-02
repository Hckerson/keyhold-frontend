import { Star } from "lucide-react";
import { SummaryRow } from "@/components/ui/summary-row";

export interface ViewingSurvey {
    rating: number;
    interest: string;
    notes: string;
}

export function SurveyResult({ survey }: { survey: ViewingSurvey }) {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <p className="micro-label">Your Rating</p>
                <span
                    className="flex items-center gap-0.5"
                    aria-label={`${survey.rating} out of 5`}
                >
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                            key={index}
                            size={12}
                            strokeWidth={1.5}
                            className={
                                index < survey.rating
                                    ? "fill-highlight text-highlight"
                                    : "text-border-dark"
                            }
                        />
                    ))}
                </span>
            </div>
            <SummaryRow label="Interest level" value={survey.interest} />
            <div>
                <p className="micro-label">Notes</p>
                <p className="text-text-secondary mt-0.5 text-xs">
                    {survey.notes}
                </p>
            </div>
        </div>
    );
}

SurveyResult.displayName = "SurveyResult";
