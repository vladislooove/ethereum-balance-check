import { FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { ResultsProps } from './types';
import './Results.css';

export const Results: FC<ResultsProps> = ({
  balance,
  address,
}) => (
  <div className="results">
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Address</TableCell>
            <TableCell>Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{address}</TableCell>
            <TableCell>{Number(balance) / 1000000000000000000} Ether</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </div>
);

export default Results;