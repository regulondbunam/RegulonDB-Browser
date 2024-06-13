import { DataVerifier } from "../../../../components/ui-components";

export default function Data({
  components = [],
  description,
  name,
  number,
  order,
  pathwayComponents,
  type,
}) {
  return (
    <div>
      {DataVerifier.isValidString(name) && (
        <>
          <p>
            <b>Name:</b>
          </p>
          <p dangerouslySetInnerHTML={{ __html: name }} />
        </>
      )}
      {DataVerifier.isValidString(description) && (
        <>
          <p>
            <b>Description:</b>
          </p>
          <p dangerouslySetInnerHTML={{ __html: description }} />
        </>
      )}
      {DataVerifier.isValidString(type) && (
        <>
          <p>
            <b>Type:</b>
          </p>
          <p dangerouslySetInnerHTML={{ __html: type }} />
        </>
      )}
      {DataVerifier.isValidString(pathwayComponents) && (
        <>
          <p>
            <b>PathwayComponents:</b>
          </p>
          <p dangerouslySetInnerHTML={{ __html: pathwayComponents }} />
        </>
      )}
      {DataVerifier.isValidArray(components) && (
        <table>
          <thead>
            <tr>
                <th colSpan={3} >Components</th>
            </tr>
            <tr>
              <th>Function</th>
              <th>Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {components.map((component, index) => {
              return (
                <tr key={"reaction_" + number + "_component_" + index}>
                  <td>{component.function}</td>
                  <td>{component.name}</td>
                  <td>{component.type}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
