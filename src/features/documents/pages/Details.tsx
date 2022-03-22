import { Card } from '@/componentes/Card/Card';
import { Breadcrumb } from '@/componentes/Elements/Breadcrumb/Breadcrumb';
import { Button } from '@/componentes/Elements/Button/Button';
import { Link } from '@/componentes/Elements/Link/Link';
import { Spinner } from '@/componentes/Elements/Spinner/Spinner';
import { Title } from '@/componentes/Elements/Title/Title';
import { Form } from '@/componentes/Form/Form';
import { Input } from '@/componentes/Form/Inputs';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { PageTitle } from '@/componentes/Layout/PageTitle';
import { Stepper } from '@/componentes/Stepper/Stepper';
import { useWalletContext } from '@/providers/Wallet.context';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getDocument } from '../api/getDocument';
import { mintNftDocument } from '../api/mintNftDocument';
import { ProjectPreview } from '../components/ProjectPreview';
import { UploadSteps } from './Upload';

export const DocumentDetails = () => {
  const { documentId } = useParams();
  const { t } = useTranslation();
  const document = getDocument(documentId as string);
  const mintDocument = mintNftDocument();
  const handleLogin = async (data: { email: string }) => {
    console.log(data);
  };

  const { account } = useWalletContext();
  const renderDocument = () => {
    if (document.data) {
      return (
        <>
          <Card>
            <ProjectPreview values={document.data} />
            <div>
              <Link href={document.data.document?.url}>preview</Link>
            </div>
          </Card>
          <Card>
            <div>
              <Form onSubmit={handleLogin} className="flex flex-col gap-4 text-left">
                <div className="mx-auto flex w-full max-w-sm items-center rounded bg-neutral-7 p-4 text-sm">
                  <div>
                    Climatecoins <br />
                    to transfer
                  </div>
                  <div className="flex-grow" />
                  <div className="text-right">
                    <div className="text-lg">{document.data.credits} CC</div>
                    <div>400 €</div>
                  </div>
                </div>
                <div className="mx-auto w-full max-w-sm text-center text-primary">
                  Address to send
                </div>
                <div className="mx-auto w-full max-w-sm text-sm text-neutral-4">
                  You can only send CC to this address, please check that the network is correct.
                  More info
                </div>
                <Input
                  name="address"
                  type="text"
                  defaultValue={account.data.account.address}
                  wrapperClassName="max-w-sm w-full mx-auto"
                  required
                />
                <div className="grid grid-cols-3">
                  <div />
                  <div />
                  <Button type="submit" size="sm">
                    Yes, confirm
                  </Button>
                </div>
              </Form>
            </div>
          </Card>
        </>
      );
    }
    if (document.error instanceof Error) {
      return <>{('An error has occurred: ' + document.error.message) as string}</>;
    }
    return (
      <div>
        <div>{'Loading...'}</div>
      </div>
    );
  };

  return (
    <MainLayout>
      <PageTitle
        title={t('documents.Upload.title')}
        description={t('documents.Upload.description')}
        linkTo="/"
      />
      <div className="grid md:grid-cols-3">
        <div id="left-column-wrapper" className="">
          <Stepper
            stepsEnum={UploadSteps}
            setCurrStep={() => null}
            currStep={UploadSteps.CONFIRMATION + 1}
            translationRoot="documents.Upload.stepper"
          />
        </div>
        <div className="md:col-span-2">{renderDocument()}</div>
      </div>
    </MainLayout>
  );
};
