import {
    Children,
    cloneElement,
    isValidElement,
    type HTMLAttributes,
    type MouseEvent,
    type MouseEventHandler,
} from "react";
import { cn } from "@/lib/utils";

type SlotProps = HTMLAttributes<HTMLElement>;

function composeClick(
    slot: MouseEventHandler<HTMLElement> | undefined,
    child: MouseEventHandler<HTMLElement> | undefined,
) {
    if (!slot || !child) return slot ?? child;
    return (event: MouseEvent<HTMLElement>) => {
        child(event);
        if (!event.defaultPrevented) slot(event);
    };
}

function Slot({ children, className, onClick, ...props }: SlotProps) {
    const child = Children.only(children);
    if (!isValidElement<SlotProps>(child)) return null;

    return cloneElement(child, {
        ...props,
        ...child.props,
        className: cn(className, child.props.className),
        onClick: composeClick(onClick, child.props.onClick),
    });
}

Slot.displayName = "Slot";

export { Slot };
export type { SlotProps };
