import type { ReactNode } from "react";

import {
  CardTable,
  ContainerRows,
  TableHeader,
  OrdersTableHeader,
} from "./ListTableStyles.ts";

interface DataTableProps {
  headers: string[];
  children: ReactNode;
  className?: string;
  variant?: "default" | "orders";
}

const ListTable = ({
  headers,
  children,
  className,
  variant = "default",
}: DataTableProps) => {
  const Header = variant === "orders" ? OrdersTableHeader : TableHeader;

  return (
    <CardTable className={className}>
      <div className="table-scroll">
        <Header
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
        </Header>

        <ContainerRows>{children}</ContainerRows>
      </div>
    </CardTable>
  );
};

export default ListTable;