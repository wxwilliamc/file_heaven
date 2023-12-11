"use client"

import { FileType } from "@/type"
import { ColumnDef } from "@tanstack/react-table"
import prettyBytes from "pretty-bytes"
import { FileIcon, defaultStyles } from 'react-file-icon'
import CellAction from "./cell-action"

export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ renderValue, ...props }) => {

        const type = renderValue() as string
        const extension: string = type.split('/')[1]

        return (
            <div className="w-10">
                <FileIcon 
                    extension={extension}
                    //@ts-ignore
                    {...defaultStyles[extension]}
                />
            </div>
        )
    }
  },
  {
    accessorKey: "filename",
    header: "Filename",
  },
  {
    accessorKey: "timestamp",
    header: "Date added",
  },
  {
    accessorKey: "fullName",
    header: "Uploader",
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ renderValue, ...props }) => {
        return <span>{prettyBytes(renderValue() as number)}</span>
    }
  },
  {
    accessorKey: "downloadURL",
    header: "Preview",
    cell: ({ renderValue, ...props }) => {
      return (
        <a
            href={renderValue() as string}
            target="_blank"
            className="underline text-blue-500 hover:text-blue-600"
            download
        >
            View
        </a>
      )
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original}/>
  }

]
