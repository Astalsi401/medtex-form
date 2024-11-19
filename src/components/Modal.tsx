import { useAppSelector, useAppDispatch, setState } from "@store";

export const Modal: React.FC<{ redirect?: string; back?: boolean }> = ({ redirect, back }) => {
  const saving = useAppSelector((state) => state.saving);
  const completed = useAppSelector((state) => state.completed);
  const error = useAppSelector((state) => state.error);
  return (
    <div className="dialog">
      <div className="d-flex flex-column p-4 gap-5 page-bg-white page-rounded text-center">{saving ? <Saving /> : completed ? <Completed /> : error ? <Error redirect={redirect} back={back} /> : null}</div>
    </div>
  );
};

const Saving: React.FC = () => (
  <div className="d-flex flex-column gap-2">
    <div className="page-text-xx-large fw-bold">儲存中...</div>
    <div className="page-saving mx-auto"></div>
  </div>
);

const Completed: React.FC = () => (
  <>
    <div className="d-flex flex-column gap-2">
      <div className="page-text-xx-large fw-bold">已收到您的洽談申請！</div>
      <div>主辦單位將於11/20前通知申請結果及安排交流時段，謝謝!</div>
    </div>
    <a className="page-btn d-block p-3 mx-auto text-center fw-bold page-bd-primary page-bg-primary page-text-white" href="https://expo.taiwan-healthcare.org/zh/medtex/2024">
      確定
    </a>
  </>
);

const Error: React.FC<{ redirect?: string; back?: boolean }> = ({ redirect, back }) => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.error);
  const closeModal = () => {
    if (back) history.back();
    dispatch(setState({ completed: false, error: null }));
  };
  return (
    <>
      <div className="d-flex flex-column gap-2">
        <div className="page-text-xx-large fw-bold">Error！</div>
        <div>{error}</div>
      </div>
      <a className="page-btn d-block p-3 mx-auto text-center fw-bold page-bd-primary page-bg-primary page-text-white" {...(redirect ? { href: redirect } : { onClick: closeModal })}>
        確定
      </a>
    </>
  );
};
