import { useAppSelector } from "@store";

export const Info: React.FC = () => {
  const {
    company,
    contact: { name, occupation, avatarUrl },
  } = useAppSelector((state) => state.data);
  return (
    <div className="col-12">
      <div className="overflow-hidden page-bd page-rounded">
        <div className="row mx-0">
          <div className="col-12 px-sm-4 px-3 py-3 page-text-white page-bg-third">申請洽談</div>
          <div className="col-md-7 p-sm-4 p-3 d-flex flex-column gap-3">
            <div className="fw-bold page-text-xx-large">To: {company}</div>
            <div>投資人與國際新創團隊之一對一商洽交流係採收費制(每時段40分鐘，費用NT$ 10,000元)。因時段有限，請填寫以下申請資料，主辦單位將於11/20前通知申請結果及安排交流時段。</div>
          </div>
          <div className="col-md-5 p-sm-4 p-3 d-flex gap-3 page-profile">
            <div className="d-flex align-items-center justify-content-center">
              <div className="page-avatar ">
                <img className="d-block" src={avatarUrl} alt="" />
              </div>
            </div>
            <div className="d-flex flex-wrap align-items-center justify-content-center">
              <div className="w-100">
                <div className="fw-bold page-text-x-large">{name}</div>
                <div>{occupation}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};