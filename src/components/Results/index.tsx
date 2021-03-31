import { FC } from 'react';
import CsvDownload from 'react-json-to-csv';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@material-ui/core';
import { ResultsProps } from './types';
import './Results.css';

export const Results: FC<ResultsProps> = ({
  result,
}) => {
  const balance = Number(result.balance) / 1000000000000000000;
  return (
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
              <TableCell>{result.address}</TableCell>
              <TableCell>{balance} Ether</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <CsvDownload
        data={[{
          Address: result.address,
          Balance: balance,
        }]}
        filename="result.csv"
        className="results__btn"
      >
        <Button variant="contained" color="secondary">
          Export to CSV
        </Button>
      </CsvDownload>
    </div>
  );
};

export default Results;