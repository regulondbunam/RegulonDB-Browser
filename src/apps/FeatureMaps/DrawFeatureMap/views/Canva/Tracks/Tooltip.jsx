import {useStore} from "../../../store";

export default function Tooltip({ feature }) {
  const { columns, columnMapping } = useStore();
  return (
    <div>
      {columns.map((column, i) => {
        return (
          <p
            style={{ color: "white", fontSize: "10px" }}
            key={feature._id + "_" + column + "_" + i}
          >
            <b>{`${column} :`}</b>
            {feature[columnMapping[i]]}
          </p>
        );
      })}
    </div>
  );
}