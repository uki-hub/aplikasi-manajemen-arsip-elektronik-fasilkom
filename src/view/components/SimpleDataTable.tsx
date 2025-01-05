import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ChangeEvent, ReactElement, useMemo, useState } from "react";
import { CgSearchLoading } from "react-icons/cg";
import { FaRegFaceMehBlank } from "react-icons/fa6";

type BaseColumn = {
  className?: string;
};

type HeadColumnBuilder = (title: string) => ReactElement;
type BodyColumnBuilder<T, K extends keyof T> = (builderProps: {
  data: T[K] | null;
  rowData: T;
  rowIndex: number;
  lastRowIndex: number;
}) => ReactElement;

export interface HeadColumn extends BaseColumn {
  title: string;
  builder?: HeadColumnBuilder;
}

export interface BodyColumn<T> extends BaseColumn {
  field?: keyof T | null;
  builder?: BodyColumnBuilder<T, keyof T> | null;
}

export interface SimpleDataTableProps<T> {
  dataRows: T[];
  headColumns: HeadColumn[];
  bodyColumns: BodyColumn<T>[];
  defaultHeadColumnBuilder: HeadColumnBuilder;
  defaultBodyColumnBuilder: BodyColumnBuilder<T, keyof T>;
  searchByColumns?: Array<keyof T>;
  divClassName?: string;
  tableDivClassName?: string;
  tableClassName?: string;
  theadClassName?: string;
  theadTrClassName?: string;
  theadTrThClassName?: string;
  tbodyClassName?: string;
  tbodyTrClassName?: string;
  tbodyTrTdClassName?: string;
}

const SimpleDataTable = <T,>({
  dataRows,
  headColumns,
  bodyColumns,
  defaultHeadColumnBuilder,
  defaultBodyColumnBuilder,
  searchByColumns,
  divClassName,
  tableDivClassName,
  tableClassName,
  theadClassName,
  theadTrClassName,
  theadTrThClassName,
  tbodyClassName,
  tbodyTrClassName,
  tbodyTrTdClassName,
}: SimpleDataTableProps<T>) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const getPageNumbers = (totalPages: number) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 3) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return pages;
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleNextPage = (totalPages: number) => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const onRowsChangeHandler = (e: string) => {
    setCurrentPage(1);
    setRowsPerPage(+e);
  };

  const onSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    setSearchValue(e.target.value);
  };

  const filteredDataRows = useMemo(() => {
    if (!searchByColumns || !searchValue) return dataRows;

    return dataRows.filter((data) => searchByColumns.some((col) => String(data[col])?.includes(searchValue)));
  }, [dataRows, searchByColumns, searchValue]);

  const totalPages = Math.ceil(filteredDataRows.length / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const slicedDataRows = filteredDataRows.slice(indexOfFirstRow, indexOfLastRow);

  const isEmpty = dataRows.length < 1;
  const isNotFound = filteredDataRows.length < 1;

  return (
    <div className={cn("w-full flex flex-col gap-6", divClassName)}>
      <div className="flex flex-row justify-end items-center">
        <label htmlFor="SimpleDataTable_InputSearch" className="mr-2 select-none">
          Search:
        </label>
        <Input
          id="SimpleDataTable_InputSearch"
          aria-label="Search the data table"
          onChange={onSearchHandler}
          className="max-w-[200px] rounded-sm p-1.5 h-8 border-2 border-[#D9D9D9] focus-visible:ring-gray-400"
        />
      </div>
      <div className={cn("w-full", tableDivClassName)}>
        {isEmpty ? (
          <div className="flex flex-col items-center p-5 text-center border text-gray-400 border-gray-300">
            <FaRegFaceMehBlank className="font-light text-4xl mb-1" />
            <span>No Data</span>
          </div>
        ) : (
          <table className={cn("w-full", tableClassName)}>
            <thead className={theadClassName}>
              <tr className={theadTrClassName}>
                {headColumns.map((head) => (
                  <th scope="col" className={theadTrThClassName} key={head.title}>
                    {head.builder ? head.builder(head.title) : defaultHeadColumnBuilder(head.title)}
                  </th>
                ))}
              </tr>
            </thead>
            {isNotFound ? (
              <tr>
                <td colSpan={99}>
                  <div className="w-full h-full flex flex-col items-center p-5 text-center text-gray-400">
                    <CgSearchLoading className="font-light text-4xl mb-1" />
                    <span>No Data Found</span>
                  </div>
                </td>
              </tr>
            ) : (
              <tbody className={tbodyClassName}>
                {slicedDataRows.map((data, i) => (
                  <tr key={`${i}`} className={tbodyTrClassName}>
                    {bodyColumns.map((body, ii) => {
                      const rowData = data as T;
                      const columnData = body.field ? data[body.field] : null;

                      const builderProps = {
                        data: columnData,
                        rowData: rowData,
                        rowIndex: i,
                        lastRowIndex: indexOfFirstRow,
                      };

                      return (
                        <td className={tbodyTrTdClassName} key={`${i}-${ii}`}>
                          {body.builder ? body.builder(builderProps) : defaultBodyColumnBuilder!(builderProps)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        )}
      </div>
      <div className="flex flex-row justify-between items-center text-sm">
        <div className=" flex flex-row items-center gap-2 text-gray-500">
          <Select defaultValue="5" onValueChange={onRowsChangeHandler}>
            <SelectTrigger className="h-8 w-12 p-0 text-center shrink-0 justify-evenly text-black border-[#D9D9D9] focus-visible:ring-gray-400">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent className="text-black border-[#D9D9D9] focus-visible:ring-gray-400">
              <SelectGroup>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="25">25</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <span className="whitespace-nowrap select-none">
            Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, filteredDataRows.length)} of{" "}
            {filteredDataRows.length} entries
          </span>
        </div>
        <div className="flex flex-row items-center rounded border border-gray-400">
          <button
            aria-label="Go to the previous page"
            className="px-2 py-1 border-r overflow-hidden transition-colors bg-gray-500/15 hover:bg-gray-500/10 active:bg-gray-500/25 disabled:opacity-50  disabled:active:bg-gray-500/15"
            onClick={handlePrevPage}
            disabled={isEmpty || isNotFound || currentPage === 1}
          >
            Previous
          </button>
          {getPageNumbers(totalPages).map((page, i) =>
            typeof page === "number" ? (
              <button
                tabIndex={0}
                key={i}
                className={cn(
                  "px-2 py-1 transition-colors",
                  page === currentPage ? "font-semibold bg-[#1FA0CF] text-white" : "hover:bg-[#1FA0CF]/5 bg-white"
                )}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ) : (
              <span key={i} className="px-2">
                {page}
              </span>
            )
          )}
          <button
            aria-label="Go to the next page"
            className="px-2 py-1 border-l transition-colors bg-gray-500/15 hover:bg-gray-500/10 active:bg-gray-500/25 disabled:opacity-50 disabled:active:bg-gray-500/15"
            onClick={() => handleNextPage(totalPages)}
            disabled={isEmpty || isNotFound || currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

SimpleDataTable.Plain = <T,>({
  dataRows,
  headColumns,
  bodyColumns,
}: {
  dataRows: T[];
  headColumns: HeadColumn[];
  bodyColumns: BodyColumn<T>[];
}) => {
  return (
    <SimpleDataTable
      dataRows={dataRows}
      headColumns={headColumns}
      bodyColumns={bodyColumns}
      defaultHeadColumnBuilder={(title) => (
        <th className="text-left px-4 py-2 bg-gray-100 text-gray-800 font-semibold border-b border-gray-300">
          {title}
        </th>
      )}
      defaultBodyColumnBuilder={({ data }) => (
        <td className="px-4 py-2 border-b border-gray-200">{(data as string) ?? "N/A"}</td>
      )}
    />
  );
};

export default SimpleDataTable;
