"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FileType } from "@/type"
import { Button } from "../ui/button"
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons"
import { useModalStates } from "@/store/store"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  // Update the date time data display
                  <TableCell key={cell.id}>
                    {cell.column.id === 'timestamp' ? (
                      <span>
                        <div className="flex flex-col">
                          <div className="text-sm">
                            {(cell.getValue() as Date).toLocaleDateString()}
                          </div>

                          <div className="text-xs text-gray-500">
                            {(cell.getValue() as Date).toLocaleTimeString()}
                          </div>
                        </div>
                      </span>
                    ) : cell.column.id === 'filename' ? (
                      <p className="underline flex items-center text-blue-500 hover:cursor-pointer">
                        {cell.getValue() as string} {""}
                      </p>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                You have no files.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
