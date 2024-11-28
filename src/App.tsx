import { useEffect } from "react";
import { useAppSelector, useAppDispatch, setState } from "@store";
import { Info } from "@components/Info";
import { DiscussionForm } from "@components/DiscussionForm";
import { Loading } from "@components/Loading";
import { Modal } from "@components/Modal";
import { getTeamInfo, getSearchParam } from "@functions";
import "@styles/main.scss";

export const App = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.loading);
  const saving = useAppSelector((state) => state.saving);
  const error = useAppSelector((state) => state.error);
  const completed = useAppSelector((state) => state.completed);
  const getData = async () => {
    const data = await getTeamInfo(getSearchParam("teamId") || "03", "zh");
    if (data.error) console.error(data.error);
    dispatch(setState({ loading: false, ...(data.error ? { error: data.error } : { data }) }));
  };
  useEffect(() => {
    document.body.style.overflow = completed || error ? "hidden" : "auto";
  }, [completed, error]);
  useEffect(() => {
    getData();
  }, []);
  return loading ? (
    <Loading />
  ) : error ? (
    <Modal back={true} />
  ) : (
    <>
      <Header />
      <Content />
      {(completed || error || saving) && <Modal />}
      <Footer />
    </>
  );
};

const Content: React.FC = () => (
  <div className="container-xl py-5">
    <div className="row g-sm-4 g-3">
      <Info />
      <DiscussionForm />
    </div>
  </div>
);

const Header: React.FC = () => (
  <header className="page-text-white text-small">
    <div>
      <img className="logo d-block" src="https://expo.taiwan-healthcare.org//data/tmp/20230928/20230928epf7fo.svg" alt="logo" />
      <div className="px-2">
        <div>2024.12.03(Tue)-12.04(Wed)</div>
        <div>3F, Ballroom, Le Méridien Taipei</div>
      </div>
    </div>
  </header>
);

const Footer: React.FC = () => (
  <footer className="w-100 d-flex align-items-center justify-content-center">
    <img src="https://expo.taiwan-healthcare.org//data/tmp/20241105/20241105l6xrm4.png" alt="" className="d-block" />
  </footer>
);
