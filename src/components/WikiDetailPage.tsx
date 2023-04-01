import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import styles from "./wikiDetailPage.module.scss";
import { DUMMY_DATA } from "assets/datas/dummyData";

const WikiDetailPage = () => {
  const params = useParams();
  const [mode, setMode] = useState("read");
  const [data, setData] = useState({
    id: 0,
    title: "",
    contents: "",
  });
  const [modifyContents, setModifyContents] = useState("");

  useEffect(() => {
    const filterData = DUMMY_DATA.find((wiki) => wiki.id === Number(params.id));
    if (filterData) {
      setData(filterData);
      setModifyContents(filterData.contents);
    }
  }, [params]);

  const btnClickHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { name } = e.target as HTMLButtonElement;
      console.log(name);
      if (name === "modify") setMode(name);
      else if (name === "save") {
        setData({ ...data, contents: modifyContents });
        setMode("read");
      } else setMode("read");
    },
    [data, modifyContents, mode]
  );

  const contentChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setModifyContents(value);
    },
    [data]
  );

  return (
    <div>
      <h2>{data.title}</h2>
      {mode === "read" ? (
        <p>{data.contents}</p>
      ) : (
        <textarea value={modifyContents} onChange={contentChangeHandler} />
      )}
      <div className={styles.btnWrap} onClick={btnClickHandler}>
        {mode === "read" ? (
          <button type="button" name="modify">
            수정
          </button>
        ) : (
          <div className={styles.modifyBtnWrap}>
            <button type="button" name="save">
              저장
            </button>
            <button type="button" name="cancel">
              취소
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WikiDetailPage;
