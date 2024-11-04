import type {
  DraggableAttributes,
  DraggableSyntheticListeners,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { CSSProperties, PropsWithChildren } from "react";
import { createContext, useContext, useMemo } from "react";

type Props = {
  id: UniqueIdentifier;
};

type Context = {
  attributes: DraggableAttributes;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
};

const SortableItemContext = createContext<Context>({
  attributes: {} as DraggableAttributes,
  listeners: undefined,
  ref() {},
});

export const SortableItem = ({ children, id }: PropsWithChildren<Props>) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef],
  );
  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };
  // hsla(var(--foreground),0.05)
  return (
    <SortableItemContext.Provider value={context}>
      <li
        className="box-border flex grow list-none items-center justify-between rounded-lg bg-background p-3 font-normal shadow-[0_0_0_calc(1px_/_var(--scale-x,1))_rgba(63,63,68,0.05),0_1px_calc(3px_/_var(--scale-x,1))_0_rgba(34,33,81,0.15)]"
        ref={setNodeRef}
        style={style}
      >
        {children}
      </li>
    </SortableItemContext.Provider>
  );
};

export const DragHandle = () => {
  const { attributes, listeners, ref } = useContext(SortableItemContext);

  return (
    <button
      className="flex w-3 flex-1 cursor-[var(--cursor,pointer)] touch-none appearance-none items-center justify-center rounded-lg border-[none] bg-transparent p-4 outline-none hover:bg-background-dimmed focus-visible:shadow-[0_0px_0px_2px_#4c9ffe]"
      {...attributes}
      {...listeners}
      ref={ref}
    >
      <svg
        viewBox="0 0 20 20"
        width="12"
        className="m-auto h-full flex-[0_0_auto] overflow-visible fill-[#919eab]"
      >
        <title>Drag handle</title>
        <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
      </svg>
    </button>
  );
};
