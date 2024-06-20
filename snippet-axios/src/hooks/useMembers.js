import { useContext } from "react";
import { MemberListContext } from "../context";

const useMembers = () => {
  const { members, setMembers } = useContext(MemberListContext);

  return { members, setMembers };
};

export default useMembers;
