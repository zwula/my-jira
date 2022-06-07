import { Link, Navigate, Route, Routes } from "react-router-dom";
import { Signboard } from "../Signboard";
import { Tasks } from "../tasks";

export const Project = () => {
  return (
    <div>
      <div className="link-area">
        <Link to={"signboard"}>看板</Link>
        <Link to={"tasks"}>任务组</Link>
      </div>
      <div className="routes-area">
        <Routes>
          <Route path={"/signboard"} element={<Signboard />} />
          <Route path={"/tasks"} element={<Tasks />} />
          <Route path={"/*"} element={<Navigate to="signboard" />} />
        </Routes>
      </div>
    </div>
  );
};
