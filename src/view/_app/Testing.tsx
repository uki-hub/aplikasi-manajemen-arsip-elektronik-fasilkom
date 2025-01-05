import SimpleDataTable, { BodyColumn, HeadColumn } from "../components/SimpleDataTable";

const Testing = () => {
  interface TestData {
    nama: string;
    umur: number;
    jurusan: string;
  }

  const data: TestData[] = [
    {
      nama: "uki",
      umur: 20,
      jurusan: "TKJ",
    },
    {
      nama: "sari",
      umur: 22,
      jurusan: "RPL",
    },
    {
      nama: "budi",
      umur: 21,
      jurusan: "Multimedia",
    },
  ];

  const headColumns: HeadColumn[] = [
    {
      title: "Nama Peserta",
    },
    {
      title: "Jurusan Peserta",
    },
    {
      title: "Umur Peserta",
    },
    {
      title: "Action",
    },
    {
      title: "Action",
    },
  ];

  const bodyColumns: BodyColumn<TestData>[] = [
    {
      field: "nama",
    },
    {
      field: "jurusan",
    },
    {
      field: "umur",
      builder: ({data, rowData}) => {
        //data should be type of string since the field is "nama"
        return (
          <label>
            {data} berumur {rowData.umur}
          </label>
        );
      },
    },
    {
      builder: ({rowData}) => {
        return (
          <button onClick={() => alert(`View on ${rowData.nama}`)} className="px-2.5 py-0.5 rounded-md bg-blue-500 text-white">
            View
          </button>
        );
      },
    },
    {
      field: "umur",
    },
  ];

  return (
    <div className="container p-10 text h-[750px] ">
      <SimpleDataTable<TestData>
        dataRows={data}
        headColumns={headColumns}
        bodyColumns={bodyColumns}
        defaultHeadColumnBuilder={(title) => {
          return <div>{title}</div>;
        }}
        defaultBodyColumnBuilder={({data}) => {
          return <div>{data as string}</div>;
        }}
        searchByColumns={["nama", "jurusan"]}
        tableClassName="border-2 border-collapse border-[#D9D9D9] "
        theadTrClassName="text-sm tracking-wider text-white bg-[#1FA0CF]"
        theadTrThClassName="border-2 border-collapse border-[#D9D9D9] font-normal p-2"
        tbodyTrClassName="transition-all hover:bg-[#188CB6]/10"
        tbodyTrTdClassName=" border-2 border-collapse border-[#D9D9D9] p-2 text-center"
      />
    </div>
  );
};

export default Testing;

/*
TODO: Features to Add to SimpleDataTable Library

1. Core Enhancements
   - [ ] Sorting
       - Add sortable headers (ascending/descending toggle).
       - Allow custom sorting logic for each column.
       Example:
       ```tsx
       const headColumns: HeadColumn[] = [
         { title: "Age", field: "age", sortable: true, customSort: (a, b) => a.age - b.age },
       ];
       ```

       Sorting Logic:
       ```tsx
       const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(null);

       const sortedDataRows = useMemo(() => {
         if (!sortConfig) return dataRows;

         return [...dataRows].sort((a, b) => {
           const aValue = a[sortConfig.key];
           const bValue = b[sortConfig.key];
           if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
           if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
           return 0;
         });
       }, [dataRows, sortConfig]);
       ```

   - [ ] Row Selection
       - Add checkboxes for single and multiple row selection.
       - Provide a `selectedRows` prop for accessing selected rows.
       Example:
       ```tsx
       <SimpleDataTable
         dataRows={data}
         selectableRows
         onRowSelect={(selectedRows) => console.log(selectedRows)}
       />
       ```

   - [ ] Row Expansion
       - Allow rows to expand and show additional details (e.g., nested data).
       Example:
       ```tsx
       <SimpleDataTable
         dataRows={data}
         expandableRows
         rowExpansionRenderer={(rowData) => (
           <div>
             <p>Details for {rowData.nama}</p>
           </div>
         )}
       />
       ```

   - [ ] Empty and Loading States
       - Add a `loading` prop for showing a spinner or skeleton.
       - Support a customizable empty state using `renderEmptyState`.
       Example:
       ```tsx
       <SimpleDataTable
         dataRows={[]}
         loading
         renderEmptyState={() => (
           <div>No data available, please try again later.</div>
         )}
       />
       ```

2. Advanced Filtering
   - [ ] Column-Specific Filters
       - Enable text, numeric range, and date range filters for individual columns.
       Example:
       ```tsx
       filters={[
         { field: "umur", type: "range" },
         { field: "nama", type: "text" },
       ]}
       ```

   - [ ] Global Search with Highlighting
       - Highlight matching text in cells during global search.
       Example:
       ```tsx
       <SimpleDataTable
         dataRows={data}
         searchHighlight
       />
       ```

3. Performance
   - [ ] Virtual Scrolling
       - Render only visible rows using libraries like `react-window` or `react-virtualized`.
       Example:
       ```tsx
       <SimpleDataTable
         dataRows={largeData}
         virtualScroll
         height={500} // Height of the table container
       />
       ```

   - [ ] Server-Side Pagination
       - Support pagination with server-side data fetching hooks.
       Example:
       ```tsx
       <SimpleDataTable
         dataRows={data}
         serverPagination
         onPageChange={(page, rowsPerPage) => fetchData(page, rowsPerPage)}
       />
       ```

4. Customization
   - [ ] Footer Row
       - Add support for footer rows to show summaries or totals.
       Example:
       ```tsx
       <SimpleDataTable
         footerColumns={[
           { title: "Total Age", builder: () => <div>{calculateTotalAge()}</div> },
         ]}
       />
       ```

   - [ ] Theming
       - Provide predefined themes (e.g., light, dark) or custom theming support.
       Example:
       ```tsx
       <SimpleDataTable
         dataRows={data}
         theme="dark"
       />
       ```

   - [ ] Cell Merging (Colspan/Rowspan)
       - Allow dynamic merging of cells based on data conditions.
       Example:
       ```tsx
       <SimpleDataTable
         dataRows={data}
         bodyColumns={[
           {
             field: "nama",
             colspan: (data) => (data.nama === "uki" ? 2 : 1),
           },
         ]}
       />
       ```

5. Export Features
   - [ ] Export to CSV/Excel
       - Add functionality to export table data in CSV or Excel formats.
       Example:
       ```tsx
       <SimpleDataTable
         dataRows={data}
         exportable
         exportFormats={["csv", "xlsx"]}
       />
       ```

6. Accessibility
   - [ ] Keyboard Navigation
       - Add keyboard shortcuts for pagination, row selection, and cell navigation.

   - [ ] ARIA Compliance
       - Enhance screen reader support using ARIA roles and attributes.
       Example:
       - `aria-sort="ascending"` for sortable headers.
       - `role="rowgroup"` for `<tbody>`.

7. Documentation and Developer Tools
   - [ ] Comprehensive Documentation
       - Write detailed documentation with examples for every feature.
       - Include interactive demos using CodeSandbox or Storybook.
       Example:
       ```markdown
       ## Example Usage
       ```tsx
       <SimpleDataTable dataRows={data} headColumns={headColumns} bodyColumns={bodyColumns} />
       ```
       ```

   - [ ] Testing Utilities
       - Provide utilities or guidelines for testing the table with Jest or React Testing Library.
       Example:
       ```tsx
       expect(screen.getByText("Nama Peserta")).toBeInTheDocument();
       ```

8. Advanced Features (Optional)
   - [ ] Nested Tables
       - Support rendering nested tables inside rows.
       Example:
       ```tsx
       <SimpleDataTable
         dataRows={data}
         rowExpansionRenderer={(rowData) => (
           <NestedTable data={rowData.details} />
         )}
       />
       ```

   - [ ] Drag-and-Drop
       - Allow reordering of rows or columns via drag-and-drop.
*/
