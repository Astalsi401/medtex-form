import { useForm, SubmitHandler, UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { DiscussionFormValue, Discussion } from "@types";
import { Button } from "./Button";
import { setDiscussionOther, setState, useAppDispatch, useAppSelector, others } from "@/assets/store";
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
      type: data.type === others ? other.type : data.type,
      investmentFields: data.investmentFields.map((d) => (d === others ? other.investmentFields : d)).filter((d) => d.length > 0),
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
                  Required
                </div>
                <div className="col-sm-6">
                  <Input label="Company Name" name="nameZh" type="text" placeholder="Company Name" required={true} register={register} errors={errors} />
                </div>
                <div className="col-sm-6">
                  <Input label="Assets Under Management (USD)" name="capital" type="number" required={true} register={register} errors={errors} />
                </div>
                <div className="col-12">
                  <Select label="Preference Sector" name="investmentFields" type="checkbox" options={["Immunotherapy", "Gene Therapy", "Innovative Medical Devices", "Regenerative Medicine", "New Drug Development", "Precision Detection", "Smart Medical Devices", "Healthcare Technology", "Environment and Energy Technology", others]} required={true} register={register} errors={errors} watch={watch} />
                </div>
                <div className="col-12">
                  <Select label="Preference Stage" name="fundingRounds" type="checkbox" options={["Seed Stage", "Development Stage", "Growth Stage", "Expansion Stage", "Listed Company"]} required={true} register={register} errors={errors} watch={watch} />
                </div>
                <div className="col-sm-6">
                  <Input label="Contact Person Name" name="contactNameZh" type="text" required={true} register={register} errors={errors} />
                </div>
                <div className="col-sm-6">
                  <Input label="Contact Person Title" name="contactOccupationZh" type="text" required={true} register={register} errors={errors} />
                </div>
                <div className="col-sm-6">
                  <Input label="Contact Person Mobile" name="contactTel" type="tel" required={true} register={register} errors={errors} />
                </div>
                <div className="col-sm-6">
                  <Input label="Contact Person Email" name="contactEmail" type="email" required={true} register={register} errors={errors} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <Button className="page-btn d-block p-3 my-5 mx-auto text-center fw-bold page-bd-primary page-bg-primary page-text-white" loading={saving}>
            Submit
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
        {type === "checkbox" ? " (multi-select)" : ""} {required && <Danger />}
      </div>
      <div className={`d-flex flex-wrap mt-2 page-select ${errors[name] ? "is-invalid" : ""}`}>
        {options.map((value) => (
          <div key={`${name}-${value}`}>
            <input id={`${name}-${value}`} type={type} value={value} {...register(name, { required })} />
            <label className="d-flex align-items-center justify-content-center text-center fw-bold h-100" htmlFor={`${name}-${value}`}>
              {value}
            </label>
          </div>
        ))}
        {((typeof current === "string" && current === others) || (Array.isArray(current) && current.includes(others))) && (
          <div className="page-input d-flex">
            <input className="d-block" type="text" placeholder="please specify" onChange={onChange} required={required} />
          </div>
        )}
      </div>
    </div>
  );
};
const Danger: React.FC = () => <span className="text-danger">*</span>;
