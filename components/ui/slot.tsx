import {
    Children,
    cloneElement,
    isValidElement,
    type HTMLAttributes,
    type MouseEvent,
    type MouseEventHandler,
    type Ref,
} from "react";
import { cn, composeRefs } from "@/lib/utils";

interface SlotProps extends HTMLAttributes<HTMLElement> {
    ref?: Ref<HTMLElement>;
}

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

function Slot({ children, className, onClick, ref, ...props }: SlotProps) {
    const child = Children.only(children);
    if (!isValidElement<SlotProps>(child)) return null;

    return cloneElement(child, {
        ...props,
        ...child.props,
        ref: ref ? composeRefs(ref, child.props.ref) : child.props.ref,
        className: cn(className, child.props.className),
        onClick: composeClick(onClick, child.props.onClick),
    });
}

Slot.displayName = "Slot";

export { Slot };
export type { SlotProps };
