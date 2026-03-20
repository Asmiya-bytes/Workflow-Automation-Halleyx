import { useEffect, useState } from "react";
import { api } from "../api/api";
import AuditTable from "../components/AuditTable";

export default function Audit() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/executions").then(res => setData(res.data));
  }, []);

  return <AuditTable data={data} />;
}