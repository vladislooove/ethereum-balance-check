import { ChangeEvent, useState } from 'react';
import instance from './services/api';
import { API_KEY } from './constants';
import {
  TextField,
  Button,
  CircularProgress,
  Snackbar,
} from '@material-ui/core';
import Results from './components/Results';
import { Result } from './components/Results/types';

import './App.css';

function App() {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [isMessageShown, setIsMessageShown] = useState(false);
  const [result, setResult] = useState<null | Result>(null);

  const onClick = async () => {
    try {
      setIsLoading(true);
      setSnackMessage('');
      const { data } = await instance.get(`?module=account&action=balance&address=${address}&tag=latest&apikey=${API_KEY}`);

      if (data.message === 'NOTOK') {
        setSnackMessage(data.result);
        setIsMessageShown(true);
        return;
      }

      setResult({
        address,
        balance: data.result,
      });
    } catch {
      setIsMessageShown(true);
      setSnackMessage('Unexpected error occured');
    } finally {
      setIsLoading(false);
    }
  };

  const onAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const onSnackClose = () => setIsMessageShown(false);

  return (
    <div className="layout">
      {isLoading ? <CircularProgress /> : (
        <>
          <div className="layout__form">
            <TextField
              label="Address"
              value={address}
              onChange={onAddressChange}
            />
            <Button variant="contained" color="primary" disabled={!address} onClick={onClick}>
              Submit
            </Button>
          </div>
          {result && (
            <Results
              result={result}
            />
          )}
          <Snackbar
            open={isMessageShown}
            autoHideDuration={6000}
            message={snackMessage}
            onClose={onSnackClose}
          />
        </>
      )}
    </div>
  );
}

export default App;
