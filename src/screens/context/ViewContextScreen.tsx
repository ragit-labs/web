import { useParams } from "react-router-dom";
import ContextInfo from "@/components/ContextInfo";

const ViewContextScreen = () => {
  let { id } = useParams();
  return <>{id && <ContextInfo contextId={id} />}</>;
};

export default ViewContextScreen;
