import { useMemo } from "react";
import { DataVerifier, FilterTable } from "../../../components/ui-components";

const COLUMNS = [
  {
    id: "reaction",
    header: "Reaction",
    columns: [
      {
        id: "Reaction_Number",
        filter: "fuzzyText",
        header: "#",
        accessorKey: "_number",
      },
      {
        id: "Reaction_pathwayComponents",
        filter: "fuzzyText",
        header: "pathwayComponents",
        accessorKey: "_pathwayComponents",
      },
      {
        id: "Reaction_Type",
        filter: "fuzzyText",
        header: "Type",
        accessorKey: "_type",
      }
    ],
  },
  {
    id: "components_reaction",
    header: "Components",
    columns: [
      {
        id: "component_name",
        filter: "fuzzyText",
        header: "Name",
        accessorKey: "_compName",
        cell: (info) => {
            const names = info.row.original.compName
            const id = info.row.original.id
            if(DataVerifier.isValidArray(names)){
                return (
                    <>
                    {names.map((name,i)=>{
                        return <p key={"comName_"+id+"_"+i+"_"+name} >{name}</p>
                    })}
                    </>
                  )
            }
            return info.getValue()
        },
      },
      {
        id: "component_Function",
        filter: "fuzzyText",
        header: "Function",
        accessorKey: "_compFunction",
        cell: (info) => {
            const funct = info.row.original.compFunction
            const id = info.row.original.id
            if(DataVerifier.isValidArray(funct)){
                return (
                    <>
                    {funct.map((fun,i)=>{
                        return <p key={"comFunction_"+id+"_"+i+"_"+fun} >{fun}</p>
                    })}
                    </>
                  )
            }
            return info.getValue()
        },
      },
      {
        id: "component_Type",
        filter: "fuzzyText",
        header: "Type",
        accessorKey: "_compType",
        cell: (info) => {
            const types = info.row.original.compType
            const id = info.row.original.id
            if(DataVerifier.isValidArray(types)){
                return (
                    <>
                    {types.map((type,i)=>{
                        return <p key={"comType_"+id+"_"+i+"_"+type} >{type}</p>
                    })}
                    </>
                  )
            }
            return info.getValue()
        },
      },
    ],
  }
];

function formatData(reactions = []) {
  let _data = [];
  if (DataVerifier.isValidArray(reactions)) {
    reactions.forEach((reaction) => {
      const components = reaction.components;
      let _compName = "",
        _compFunction = "",
        _compType = "";
        let compName = [],
        compFunction = [],
        compType = [];
        if (DataVerifier.isValidArray(components)) {
            components.forEach(component => {
                _compName += " "+component.name
                compName.push(component.name)
                _compFunction += " "+component.function
                compFunction.push(component.function)
                _compType += " "+component.type
                compType.push(component.type)
            });
        }
      _data.push({
        id: "R"+reaction.number,
        _number: reaction.number,
        _name: reaction.name,
        _type: reaction.type,
        _pathwayComponents: reaction.pathwayComponents,
        _compName: _compName,
        _compFunction: _compFunction,
        _compType: _compType,
        compName: compName,
        compFunction: compFunction,
        compType: compType,
      });
    });
  }
  return _data
}

export default function Table({ reactions }) {
    const data = useMemo(()=>{
        return formatData(reactions)
    },[reactions])
  return <FilterTable data={data} columns={COLUMNS} />;
}
