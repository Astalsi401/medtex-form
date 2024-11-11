import { useForm, SubmitHandler, UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { DiscussionFormValue, Discussion } from "@types";
import { Button } from "./Button";
import { setDiscussionOther, setState, useAppDispatch, useAppSelector } from "@/assets/store";
import { submitForm } from "@functions";

export const DiscussionForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const other = useAppSelector((state) => state.discussionOther);
  const teamId = useAppSelector((state) => state.data.teamId);
  const saving = useAppSelector((state) => state.saving);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DiscussionFormValue>();
  const postData: (data: Discussion) => Promise<void> = async (body) => {
    const res = await submitForm("https://api.taiwan-healthcare.org/api/v1/discussion-application", body);
    if (res.error) {
      console.error(res.error);
      dispatch(setState({ saving: false, error: res.error }));
    } else {
      dispatch(setState({ saving: false, completed: res.completed }));
    }
  };
  const onSubmit: SubmitHandler<DiscussionFormValue> = async (data) => {
    if (saving) return;
    dispatch(setState({ saving: true }));
    const body: Discussion = {
      teamId,
      nameZh: data.nameZh,
      nameEn: data.nameEn,
      fundingRounds: data.fundingRounds,
      established: new Date(data.established).toLocaleDateString("fr-CA", { year: "numeric", month: "2-digit", day: "2-digit" }),
      capital: Number(data.capital),
      aum: Number(data.aum),
      fundSize: Number(data.fundSize),
      type: data.type === "其他" ? other.type : data.type,
      investmentFields: data.investmentFields.map((d) => (d === "其他" ? other.investmentFields : d)).filter((d) => d.length > 0),
      contact: {
        nameZh: data.contactNameZh,
        nameEn: data.contactNameEn,
        occupationZh: data.contactOccupationZh,
        occupationEn: data.contactOccupationEn,
        tel: data.contactTel,
        email: data.contactEmail,
      },
    };
    await postData(body);
  };
  return (
    <div className="col-12">
      <form className="d-flex flex-column page-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-12">
            <div className="px-sm-5 py-sm-4 p-3 page-bd page-rounded">
              <div className="row g-sm-4 g-3">
                <div className="col-12">
                  <Danger />
                  為必填欄位
                </div>
                <div className="col-sm-6">
                  <Input label="單位名稱 - 中文" name="nameZh" type="text" placeholder="請填寫中文全名" required={true} register={register} errors={errors} />
                </div>
                <div className="col-sm-6">
                  <Input label="單位名稱 - 英文" name="nameEn" type="text" placeholder="請填寫英文全名" required={true} register={register} errors={errors} />
                </div>
                <div className="col-sm-6">
                  <Input label="單位成立日期" name="established" type="date" placeholder="年 / 月/ 日" required={true} register={register} errors={errors} />
                </div>
                <div className="col-sm-6">
                  <Input label="資本額 (新台幣 - 元)" name="capital" type="number" placeholder="請以新台幣為單位" required={true} register={register} errors={errors} />
                </div>
                <div className="col-12">
                  <Select label="單位類型" name="type" type="radio" options={["VC", "CVC", "天使投資", "其他"]} required={true} register={register} errors={errors} watch={watch} />
                </div>
                <div className="col-sm-6">
                  <Input label="資產管理規模 AUM (新台幣 - 元)" name="aum" type="number" placeholder="請以新台幣為單位" required={true} register={register} errors={errors} />
                </div>
                <div className="col-sm-6">
                  <Input label="資金規模 Fund Size (新台幣 - 元)" name="fundSize" type="number" placeholder="請以新台幣為單位" required={true} register={register} errors={errors} />
                </div>
                <div className="col-12">
                  <Select label="投資領域" name="investmentFields" type="checkbox" options={["免疫治療", "基因治療", "創新醫材", "再生醫學", "新藥開發", "精準檢測", "智慧醫療", "健康科技", "環境綠能", "其他"]} required={true} register={register} errors={errors} watch={watch} />
                </div>
                <div className="col-12">
                  <Select label="投資案件階段" name="fundingRounds" type="checkbox" options={["種子輪", "天使輪", "Pre-A", "A", "B", "C", "Pre-IPO"]} required={true} register={register} errors={errors} watch={watch} />
                </div>
                <div className="col-sm-6">
                  <Input label="商洽聯絡人姓名 - 中文" name="contactNameZh" type="text" required={true} register={register} errors={errors} />
                </div>
                <div className="col-sm-6">
                  <Input label="商洽聯絡人姓名 - 英文" name="contactNameEn" type="text" required={true} register={register} errors={errors} />
                </div>
                <div className="col-sm-6">
                  <Input label="商洽聯絡人職稱 - 中文" name="contactOccupationZh" type="text" placeholder="請填寫目前擔任的職位名稱" required={true} register={register} errors={errors} />
                </div>
                <div className="col-sm-6">
                  <Input label="商洽聯絡人職稱 - 英文" name="contactOccupationEn" type="text" placeholder="請填寫目前擔任的職位名稱" required={true} register={register} errors={errors} />
                </div>
                <div className="col-sm-6">
                  <Input label="商洽聯絡人電話" name="contactTel" type="tel" placeholder="請包含國碼/區碼" required={true} register={register} errors={errors} />
                </div>
                <div className="col-sm-6">
                  <Input label="商洽聯絡人電子郵件" name="contactEmail" type="email" required={true} register={register} errors={errors} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <Button className="page-btn d-block p-3 my-5 mx-auto text-center fw-bold page-bd-primary page-bg-primary page-text-white" loading={saving}>
            提交商洽申請
            <i className="fa-solid fa-chevron-right ms-3" />
          </Button>
        </div>
      </form>
    </div>
  );
};

type InputProps = { label: string; name: keyof DiscussionFormValue; register: UseFormRegister<DiscussionFormValue>; errors: FieldErrors<DiscussionFormValue>; required?: boolean };
type TextProps = InputProps & { type: "text" | "number" | "date" | "email" | "tel"; value?: string; placeholder?: string };
type SelectProps = InputProps & {
  type: "radio" | "checkbox";
  options: string[];
  watch: UseFormWatch<DiscussionFormValue>;
};

const Input: React.FC<TextProps> = ({ label, name, type, register, errors, value, placeholder = "", required = false }) => {
  return (
    <label className="w-100" htmlFor={name}>
      <div className="fw-bold">
        {label} {required && <Danger />}
      </div>
      <div className={`page-input ${errors[name] ? "is-invalid" : ""}`}>
        <input className="d-block w-100" type={type} value={value} placeholder={placeholder} {...register(name, { required })} />
      </div>
    </label>
  );
};

const Select: React.FC<SelectProps> = ({ label, name, type, options, register, errors, watch, required = false }) => {
  const dispatch = useAppDispatch();
  const current = watch(name);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setDiscussionOther({ [name]: e.target.value }));
  return (
    <div className="w-100">
      <div className="fw-bold">
        {label}
        {type === "checkbox" ? " (可複選)" : ""} {required && <Danger />}
      </div>
      <div className={`d-flex flex-wrap mt-2 page-select ${errors[name] ? "is-invalid" : ""}`}>
        {options.map((value) => (
          <div key={`${name}-${value}`}>
            <input id={`${name}-${value}`} type={type} value={value} {...register(name, { required })} />
            <label className="d-block text-center fw-bold" htmlFor={`${name}-${value}`}>
              {value}
            </label>
          </div>
        ))}
        {((typeof current === "string" && current === "其他") || (Array.isArray(current) && current.includes("其他"))) && (
          <div className="page-input">
            <input className="d-block" type="text" placeholder={`請輸入其他${label}`} onChange={onChange} required={required} />
          </div>
        )}
      </div>
    </div>
  );
};
const Danger: React.FC = () => <span className="text-danger">*</span>;
