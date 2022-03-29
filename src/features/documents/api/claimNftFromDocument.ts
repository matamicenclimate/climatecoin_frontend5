import { documentKeys, CarbonDocument } from './index';
import { httpClient } from '@/lib/httpClient';
import { useMutation, useQueryClient } from 'react-query';
import { useAlert } from 'react-alert';

function claimFromDocument(documentId: string, email: string): Promise<any> {
  return httpClient.post(`/utils/claim`, { carbonDocument: documentId, email });
}

export function claimNftFromDocument() {
  const queryClient = useQueryClient();
  const alert = useAlert();

  return useMutation(
    ({ email, documentId }: { documentId: string; email: string }) =>
      claimFromDocument(documentId, email),
    {
      onSuccess: (data: CarbonDocument) => {
        queryClient.invalidateQueries(documentKeys.detail(data._id as string));
      },
      onError: () => {
        alert.error('Error uploading document');
      },
    }
  );
}