import { useAlert } from 'react-alert';
import { documentKeys } from './index';
import { SelectOption } from '@/componentes/Form/Select';
import { AxiosRequestConfig } from 'axios';
import { httpClient } from '@/lib/httpClient';
import { useMutation, useQueryClient } from 'react-query';

export type CarbonDocumentDTO = Record<string, any>;

function toFormData(carbonDocument: CarbonDocumentDTO) {
  const formData = new FormData();

  const { document, ...newDocument } = carbonDocument;

  newDocument.type = carbonDocument.type?.value;
  newDocument.registry = carbonDocument.registry?.value;
  newDocument.status = 'pending';

  // parse the object to formData
  Object.keys(newDocument).forEach((key) => {
    if (Array.isArray(newDocument[key])) {
      newDocument[key].forEach((option: SelectOption) => {
        formData.append(`${key}[]`, option.value);
      });
    } else {
      formData.append(key, newDocument[key]);
    }
  });

  if (document && document[0]) {
    formData.append('document', document[0]);
  }

  return formData;
}

export function uploadDocument() {
  const queryClient = useQueryClient();
  const alert = useAlert();

  const config: AxiosRequestConfig<FormData> = {
    headers: {
      'content-type': 'application/form-data',
    },
  };
  return useMutation(
    (carbonDocument: CarbonDocumentDTO) => {
      const formData = toFormData(carbonDocument);

      return httpClient.post(`/carbon-documents`, formData, config);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(documentKeys.lists());
      },
      onError: () => {
        alert.error('Error uploading document');
      },
    }
  );
}
