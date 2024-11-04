"use client";

import { useControllableState } from "@radix-ui/react-use-controllable-state";
import {
  type FormattedFile,
  cn,
  formatBytes,
  formatFile,
} from "@zenncore/utils";
import { UploadIcon, XIcon } from "@zennui/icons";
import {
  type DragControls,
  Reorder,
  useDragControls,
  useMotionValue,
} from "framer-motion";
import Image from "next/image";
import {
  type ComponentProps,
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
} from "react";
import Dropzone, {
  type DropzoneProps,
  type FileRejection,
} from "react-dropzone";
import { toast } from "sonner";
import { useDragShadow } from "./_hooks/use-drag-shadow";
import { Button } from "./button";
import { Progress } from "./progress";
import { ScrollArea } from "./scroll-area";

export type FileUploaderProps = ComponentProps<"div"> & {
  /**
   * Value of the uploader.
   * @type File[]
   * @default undefined
   * @example value={files}
   */
  value?: File[] | FormattedFile[];

  /**
   * Default value of the uploader.
   * This is used when the component is uncontrolled.
   * @type File[]
   * @default undefined
   * @example defaultValue={files}
   */
  defaultValue?: File[];

  /**
   * Function to be called when the value changes.
   * @type Dispatch<SetStateAction<File[]>>
   * @default undefined
   * @example onValueChange={(files) => setFiles(files)}
   */
  onChange?: Dispatch<SetStateAction<File[]>>;

  /**
   * Function to be called when files are uploaded.
   * @type {(files: File[]) => Promise<void>}
   * @default undefined
   * @example onUpload={(files) => uploadFiles(files)}
   */
  onUpload?: (files: File[]) => Promise<void>;

  /**
   * Progress of the uploaded files.
   * @type {Record<string, number>} | undefined
   * @default undefined
   * @example progresses={{ "file1.png": 50 }}
   */
  progresses?: Record<string, number>;

  /**
   * Accepted file _types for the uploader.
   * @type { [key: string]: string[]}
   * @default
   * ```ts
   * { "image/*": [] }
   * ```
   * @example accept={["image/png", "image/jpeg"]}
   */
  accept?: DropzoneProps["accept"];

  /**
   * Maximum file size for the uploader.
   * @type number | undefined
   * @default 1024 * 1024 * 2 // 2MB
   * @example maxSize={1024 * 1024 * 2} // 2MB
   */
  maxSize?: DropzoneProps["maxSize"];

  /**
   * Maximum number of files for the uploader.
   * @type number | undefined
   * @default 1
   * @example maxFiles={5}
   */
  maxFiles?: DropzoneProps["maxFiles"];

  /**
   * Whether the uploader should accept multiple files.
   * @type boolean
   * @default false
   * @example multiple
   */
  multiple?: boolean;

  /**
   * Whether the uploader is disabled.
   * @type boolean
   * @default false
   * @example disabled
   */
  disabled?: boolean;

  /**
   * Whether the files that are uploaded are reorder able.
   * Will only take effect if multiple is true and maxFiles is greater than 1.
   * @type boolean
   * @default false
   * @example draggable
   */
  draggable?: boolean;
};

export const FileUploader = ({
  value: valueProp,
  onChange,
  onUpload,
  progresses,
  accept = { "image/*": [] },
  maxSize = 1024 * 1024 * 2,
  maxFiles = 1,
  multiple = false,
  disabled = false,
  className,
  draggable,
  defaultValue,
  ...dropzoneProps
}: FileUploaderProps) => {
  const [files, setFiles] = useControllableState<FormattedFile[]>({
    prop: valueProp?.map((file) => {
      return "id" in file ? file : formatFile(file);
    }),
    defaultProp: defaultValue?.map((file) => formatFile(file)),
    onChange,
  });

  const isDraggable = draggable && multiple && maxFiles > 1;

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (!multiple && maxFiles === 1 && acceptedFiles.length > 1) {
        toast.error("Cannot upload more than 1 file at a time");
        return;
      }

      if ((files?.length ?? 0) + acceptedFiles.length > maxFiles) {
        toast.error(`Cannot upload more than ${maxFiles} files`);
        return;
      }

      const newFiles = acceptedFiles.map((file) => formatFile(file));
      const updatedFiles = files ? [...files, ...newFiles] : newFiles;

      setFiles(updatedFiles);

      if (rejectedFiles.length > 0) {
        for (const { file } of rejectedFiles) {
          toast.error(`File ${file.name} was rejected`);
        }
      }

      if (
        onUpload &&
        updatedFiles.length > 0 &&
        updatedFiles.length <= maxFiles
      ) {
        const target =
          updatedFiles.length > 0 ? `${updatedFiles.length} files` : "file";

        toast.promise(onUpload(updatedFiles), {
          loading: `Uploading ${target}...`,
          success: () => {
            setFiles([]);
            return `${target} uploaded`;
          },
          error: `Failed to upload ${target}`,
        });
      }
    },

    [files, maxFiles, multiple, onUpload, setFiles],
  );

  const onRemove = (removedFileId: string) => {
    if (!files) return;
    const updatedFiles = files.filter((file) => removedFileId !== file.id);
    setFiles(updatedFiles);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: should only run onUnmount
  useEffect(() => {
    return () => {
      if (!files) return;

      for (const file of files) {
        if (isFileWithPreview(file)) {
          URL.revokeObjectURL(file.preview);
        }
      }
    };
  }, []);

  const isDisabled = disabled || (files?.length ?? 0) >= maxFiles;

  return (
    <div className="relative flex flex-col gap-6 overflow-hidden">
      <Dropzone
        onDrop={onDrop}
        accept={accept}
        maxSize={maxSize}
        maxFiles={maxFiles}
        multiple={maxFiles > 1 || multiple}
        disabled={isDisabled}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            {...getRootProps()}
            className={cn(
              "group relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-2 border-foreground-dimmed/25 border-dashed px-5 py-2.5 text-center transition hover:bg-background-dimmed/25",
              "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isDragActive && "border-foreground-dimmed/50",
              isDisabled && "pointer-events-none opacity-60",
              className,
            )}
            {...dropzoneProps}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                <div className="flex items-center justify-center rounded-full border border-dashed p-3">
                  <UploadIcon
                    className="size-7 text-foreground-dimmed"
                    aria-hidden="true"
                  />
                </div>
                <p className="font-medium text-foreground-dimmed">
                  Drop the files here
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                <div className="rounded-full border border-dashed p-3">
                  <UploadIcon
                    className="size-7 text-foreground-dimmed"
                    aria-hidden="true"
                  />
                </div>
                <div className="space-y-px">
                  <p className="font-medium text-foreground-dimmed">
                    Drag {`'n'`} drop files here, or click to select files
                  </p>
                  <p className="text-foreground-dimmed/70 text-sm">
                    You can upload
                    {maxFiles > 1
                      ? ` ${maxFiles === Number.POSITIVE_INFINITY ? "multiple" : maxFiles}
                      files (up to ${formatBytes(maxSize)} each)`
                      : ` a file with ${formatBytes(maxSize)}`}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </Dropzone>
      {!!files?.length &&
        (!isDraggable ? (
          <ScrollArea
            className="h-fit w-full px-3"
            classList={{
              root: "bg-background-dimmed",
              scrollbar: {
                thumb: "bg-red-500",
              },
            }}
          >
            <div className="max-h-48 space-y-4">
              {files?.map((file) => (
                <FileCard
                  key={file.id}
                  file={file}
                  onRemove={() => onRemove(file.id)}
                  progress={progresses?.[file.name]}
                />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="px-3 pb-2">
            <Reorder.Group
              axis="y"
              values={files}
              onReorder={setFiles}
              layoutScroll
              className={"flex flex-col gap-2"}
            >
              {files.map((file) => (
                <FileCard
                  key={file.id}
                  file={file}
                  onRemove={() => onRemove(file.id)}
                  progress={progresses?.[file.name]}
                  isDraggable
                />
              ))}
            </Reorder.Group>
          </div>
        ))}
    </div>
  );
};

type FileCardProps = {
  isDraggable?: boolean;
} & Omit<FileCardContentProps, "dragControls">;

const FileCard = (props: FileCardProps) => {
  const y = useMotionValue<number>(0);
  const boxShadow = useDragShadow(y);
  const controls = useDragControls();

  return props.isDraggable ? (
    <Reorder.Item
      value={props.file}
      style={{ y, boxShadow }}
      dragListener={false}
      dragControls={controls}
      className={"rounded-lg bg-transparent"}
    >
      <FileCardContent
        dragControls={props.isDraggable ? controls : undefined}
        {...props}
      />
    </Reorder.Item>
  ) : (
    <FileCardContent {...props} />
  );
};

type FileCardContentProps = {
  file: FormattedFile;
  progress?: number;
  dragControls?: DragControls;
  onRemove: () => void;
  className?: string;
};

const FileCardContent = ({
  file,
  progress,
  onRemove,
  dragControls,
  className,
}: FileCardContentProps) => {
  return (
    <div
      className={cn(
        "relative flex select-none items-center space-x-4 rounded-lg bg-background p-3 shadow dark:shadow-black/40",
        className,
      )}
    >
      <div className="flex flex-1 space-x-4">
        {isFileWithPreview(file) &&
          (file.type.startsWith("image") ? (
            <Image
              src={file.preview}
              alt={file.name}
              width={48}
              height={48}
              className={"aspect-square shrink-0 rounded-md object-cover"}
            />
          ) : (
            <embed src={file.preview} width={48} height={48} type={file.type} />
          ))}
        <div className="flex w-full flex-col gap-2">
          <div className="space-y-px">
            <p className="line-clamp-1 font-medium text-foreground/80 text-sm">
              {file.name}
            </p>
            <p className="text-foreground-dimmed text-xs">
              {formatBytes(file.size)}
            </p>
          </div>
          {progress && <Progress value={progress} />}
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-7"
          onClick={onRemove}
        >
          <XIcon
            className="size-4 text-foreground"
            aria-hidden="true"
            fill={"red"}
          />
          <span className="sr-only">Remove file</span>
        </Button>
        {dragControls && <DragHandle dragControls={dragControls} />}
      </div>
    </div>
  );
};

const DragHandle = ({ dragControls }: { dragControls: DragControls }) => {
  return (
    <div
      className="flex w-3 flex-1 cursor-[var(--cursor,pointer)] touch-none appearance-none items-center justify-center rounded-lg border-[none] bg-transparent p-4 outline-none hover:bg-background-dimmed focus-visible:shadow-[0_0px_0px_2px_#4c9ffe]"
      onPointerDown={(e) => dragControls.start(e)}
    >
      <svg
        viewBox="0 0 20 20"
        width="12"
        className="m-auto h-full flex-[0_0_auto] overflow-visible fill-[#919eab]"
      >
        <title>Drag handle</title>
        <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
      </svg>
    </div>
  );
};

const isFileWithPreview = (file: File): file is FormattedFile => {
  return "preview" in file && typeof file.preview === "string";
};
