import React, { useEffect, useState } from 'react';
import { DataForm, modalState } from '@bsmp/react';
import { useRecoilState } from 'recoil';
import { Button, Modal as BsModal } from 'react-bootstrap';
import { useAppService } from '../hooks/';

type props = {
  data?;
  onFormSubmit?;
  excludedFields?;
  config?;
  formDefinitions?;
};

export const DataFormModal = ({
  data,
  onFormSubmit,
  excludedFields,
  config,
  formDefinitions,
}: props) => {
  const {
    Can,
    t,
  } = useAppService();
  const [modal, setModal] = useRecoilState(modalState);
  const a = excludedFields,
    b = ['id', 'type'];
  const excluded = a.concat(b.filter((item) => a.indexOf(item) < 0));

  useEffect(() => {
    config = {
      ...{
        isOpen: true,
        onHide: () => setModal({ ...modal, show: false }),
        ...config,
      },
    };
    setModal({ ...modal, ...config });
    const bsmform = document.getElementsByTagName('bsm-form')[0];
    if (bsmform) console.log(bsmform);
    if (bsmform) console.log(bsmform.excludedFields);
    // @ts-ignore
    if (bsmform) bsmform['setTranslateFunction'](t);
    //
  }, []);
  return (
    <>
      <BsModal.Body>
        <DataForm
          data={data}
          formDefinitions={formDefinitions}
          submitLabel={'submit'}
          excludedFields={excluded}
          onFormSubmit={async (data) => {
            await onFormSubmit(data);
            setModal({ ...modal, show: false });
          }}
        />
      </BsModal.Body>
    </>
  );
};

export const TestModal = ({ config }) => {
  const [modal, setModal] = useRecoilState(modalState);
  useEffect(() => {
    config = {
      ...{
        isOpen: true,
        centered: true,
        onHide: () => setModal({ ...modal, show: false }),
        ...config,
      },
    };
    setModal({ ...modal, ...config });
  }, []);
  return (
    <>
      <BsModal.Header closeButton>
        <BsModal.Title id="contained-modal-title-vcenter">title</BsModal.Title>
      </BsModal.Header>
      <BsModal.Body>
        <div className={'text-center'}>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </div>
      </BsModal.Body>

      <BsModal.Footer>
        <Button
          onClick={() => {
            modal.onHide();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            setModal({ ...modal, show: false });
          }}
        >
          Close
        </Button>
      </BsModal.Footer>
    </>
  );
};
