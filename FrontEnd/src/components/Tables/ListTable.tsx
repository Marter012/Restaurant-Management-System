import {
  CardTable,
  ContainerRows,
  TableHeader,
} from "./ListTableStyles.ts";

interface DataTableProps {
  headers: string[];
  children: React.ReactNode;
  className?: string;
}

const ListTable = ({
  headers,
  children,
  className,
}: DataTableProps) => {
  return (
    <CardTable className={className}>
      <TableHeader
        className="table-header"
        $columns={headers.length}
      >
        {headers.map((header, index) => (
          <h4
            key={`${header}-${index}`}
            className={`table-header-${index}`}
          >
            {header}
          </h4>
        ))}
      </TableHeader>

      <ContainerRows>
        {children}
      </ContainerRows>
    </CardTable>
  );
};

export default ListTable;