import { useContext } from "react";
import { DepartmentIdContext } from "../context";

const useDepartmentId = () => {
  const { departmentId, setDepartmentId } = useContext(DepartmentIdContext);

  return { departmentId, setDepartmentId };
};

export default useDepartmentId;
