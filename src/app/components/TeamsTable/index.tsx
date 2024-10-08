"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { fetchTeams } from "../../services/api";
import Link from "next/link";


interface TeamData {
  id: number;
  logo: string;
  name: string;
  players: number;
}

function createData(
  id: number,
  logo: string,
  name: string,
  players: number
): TeamData {
  return { id, logo, name, players };
}

type Order = "asc" | "desc";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  id: keyof TeamData;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  { id: "logo", numeric: false, label: "Logo" },
  { id: "id", numeric: true, label: "ID" },
  { id: "name", numeric: false, label: "Nome" },
  { id: "players", numeric: false, label: "Quantidade de jogadores" },
];

interface EnhancedTableProps {
  order: Order;
  orderBy: string;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof TeamData
  ) => void;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof TeamData) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : undefined}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="right">Ações</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default function TeamsTable() {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof TeamData>("id");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState<TeamData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teams = await fetchTeams();
        const teamData = teams.map((team: Team) =>
          createData(team.id, team.image, team.name, team.players.length)
        );
        setRows(teamData);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchData();
  }, []);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof TeamData
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      rows
        .slice()
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, rows]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row) => (
                <TableRow hover tabIndex={-1} key={row.id}>
                    <TableCell>
                      <img
                        src={row.logo}
                        alt={`${row.name} logo`}
                        className="rounded-full object-cover w-12 h-12"
                      />
                    </TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell><Link href={`/times/${row.id}`}>{row.name}</Link></TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ ml: 1 }}>{row.players} jogadores</Box>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
