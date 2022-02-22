import { algoIndexer } from '@/lib/algoIndexer';
import { useQuery } from 'react-query';

function getBalances(address: string): Promise<any> {
  return algoIndexer.get(`/accounts/${address}`);
}

// si no tenemos el address desactivamos la llamada
export const getBalance = (address: string | null) => {
  return useQuery(['account', address], () => getBalances(address as string), {
    enabled: !!address,
  });
};