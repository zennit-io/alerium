"use client";

import type { Active, UniqueIdentifier } from "@dnd-kit/core";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Fragment, type ReactNode, useMemo, useState } from "react";
import { DragHandle, SortableItem } from "./sortable-item";
import { SortableOverlay } from "./sortable-overlay";

type BaseItem = {
  id: UniqueIdentifier;
};

type Props<T extends BaseItem> = {
  items: T[];
  onChange(items: T[]): void;
  renderItem(item: T): ReactNode;
};

export const SortableList = <T extends BaseItem>({
  items,
  onChange,
  renderItem,
}: Props<T>) => {
  const [active, setActive] = useState<Active | null>(null);
  const activeItem = useMemo(
    () => items.find((item) => item.id === active?.id),
    [active, items],
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        setActive(active);
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = items.findIndex(({ id }) => id === active.id);
          const overIndex = items.findIndex(({ id }) => id === over.id);

          onChange(arrayMove(items, activeIndex, overIndex));
        }
        setActive(null);
      }}
      onDragCancel={() => {
        setActive(null);
      }}
    >
      <SortableContext items={items}>
        <ul
          className={"flex list-none flex-col gap-2 p-0"}
          role={"application"}
        >
          {items.map((item) => (
            <Fragment key={item.id}>{renderItem(item)}</Fragment>
          ))}
        </ul>
      </SortableContext>
      <SortableOverlay>
        {activeItem ? renderItem(activeItem) : null}
      </SortableOverlay>
    </DndContext>
  );
};

SortableList.Item = SortableItem;
SortableList.DragHandle = DragHandle;
